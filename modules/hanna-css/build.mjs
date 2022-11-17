// @ts-check
/* eslint-env es2022 */
import { execSync } from 'child_process';
import { compileCSSFromJS } from 'es-in-css/compiler';
import esbuild from 'esbuild';
import { readdir, readFile, writeFile } from 'fs/promises';
import globPkg from 'glob';

import {
  buildNpmLib,
  buildTests,
  distDir,
  exit1,
  externalDeps,
  opts,
  srcDir,
} from '../../build-helpers.mjs';

import { devDistCssFolder } from './scripts/config.js';

const glob = globPkg.sync;

const logError = (err) => {
  if (!opts.dev) {
    exit1(err);
  }
  const message = 'message' in err ? err.message : err;
  console.error(message);
};

// ---------------------------------------------------------------------------

/** @type {import('esbuild').BuildOptions} */
const baseOpts = {
  bundle: true,
  platform: 'node',
  target: ['node16'],
  format: 'cjs',
  watch: !!opts.dev,
};

/** @param {string} cssVersion */
const createStyleServerInfoTsFile = async (cssVersion) => {
  const cssFolders = await readdir('../../style-server/public/css').then((dir) =>
    dir.filter((name) => name !== 'dev')
  );
  /** @type {Record<string, 1>} */
  const cssFoldersPlus = {};
  cssFolders.forEach((name) => {
    cssFoldersPlus[name] = 1;
    const nameBits = name.split('.');
    let i = nameBits.length - 1;
    while (i > 0) {
      nameBits.pop();
      const shortName = nameBits.join('.');
      if (shortName in cssFoldersPlus) {
        break;
      }
      cssFoldersPlus[shortName] = 1;
      i--;
    }
  });

  const cssVersionsStr = Object.keys(cssFoldersPlus)
    .sort()
    .map((key) => `'${key}'`)
    .join(' | ');

  await writeFile(
    `${srcDir}/lib/style-server-info.ts`,
    [
      `// This file is auto-generated by build.mjs`,
      `/* eslint-disable prettier/prettier */`,
      ``,
      `export const cssVersion = ${JSON.stringify(cssVersion)};`,
      ``,
      `export type CssVersionParam = ${cssVersionsStr};`,
    ].join('\n')
  );
};

// ---------------------------------------------------------------------------
// Always start by exposing style-server-info from package-server.json
// (because tsc is limited)

await readFile('./package-server.json')
  .then((str) => JSON.parse(str.toString()))
  .then(({ cssVersion }) => createStyleServerInfoTsFile(cssVersion))
  .catch(exit1);

// ---------------------------------------------------------------------------
// Always start by building the iconfont

if (!opts.onlyLib) {
  execSync(`rm -rf ${devDistCssFolder}  &&  mkdir ${devDistCssFolder}`);
}
execSync(`yarn run gulp iconfont`);

//
// ---------------------------------------------------------------------------
// Build Unit Tests and NPM library

buildTests();

buildNpmLib('css', {
  src: 'src/lib',
  cpCmds: [
    `cp README-lib.md ${distDir}/README.md`,
    `cp CHANGELOG-lib.md ${distDir}/CHANGELOG.md`,
  ],
  entryGlobs: ['index.ts'],
});

// ---------------------------------------------------------------------------

if (!opts.onlyLib) {
  //
  // ---------------------------------------------------------------------------
  // Build CSS/SCSS files

  let fileMem = {};
  const toCSSSources = (res) => {
    const outputfiles = res.outputFiles
      .filter(({ path }) => !fileMem[path])
      .map((res) => ({ fileName: res.path, content: res.text }));
    fileMem = {};
    outputfiles.forEach(({ path }) => {
      fileMem[path] = true;
    });
    return outputfiles;
  };

  const cssCompile = (results) =>
    compileCSSFromJS(toCSSSources(results), {
      outbase: 'src/css',
      outdir: devDistCssFolder,
      redirect: (outFile) => outFile.replace(/\/\$\$.+?\$\$-/, '/'),
      minify: process.env.NODE_ENV === 'production',
      prettify: process.env.NODE_ENV !== 'production',
    });

  esbuild
    .build({
      ...baseOpts,
      external: externalDeps,
      entryPoints: glob('src/css/**/*.css.ts'),
      entryNames: '[dir]/$$[hash]$$-[name]',
      outbase: 'src/css',
      outdir: 'src/css',
      write: false,
      watch: !!opts.dev && {
        onRebuild: (error, results) => {
          if (!error) {
            cssCompile(results).catch(logError);
          }
        },
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    })
    .then(cssCompile)
    // FIXME: cleanup temporary .js files on error
    .catch(logError);

  // -------------------

  const scssCompile = (results) =>
    compileCSSFromJS(toCSSSources(results), {
      ext: 'scss',
      redirect: (outFile) => outFile.replace(/\/\$\$.+?\$\$-/, '/'),
      banner: '// This file is auto-generated. DO NOT EDIT!\n',
    });

  esbuild
    .build({
      ...baseOpts,
      external: externalDeps,
      entryPoints: glob('src/css/**/*.scss.ts'),
      entryNames: '[dir]/$$[hash]$$-[name]',
      outbase: 'src/css',
      outdir: 'src/css',
      watch: !!opts.dev && {
        onRebuild: (error, results) => {
          if (!error) {
            return scssCompile(results).catch(logError);
          }
        },
      },
      write: false,
    })
    .then(scssCompile)
    // FIXME: cleanup temporary .js files on error
    .catch(logError);
}
