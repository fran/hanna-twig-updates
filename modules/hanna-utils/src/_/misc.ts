/**
 * Simple type-guarding filter function that filters out `null`y values (`null`
 * and `undefined`) in a type-aware way.
 *
 * ```ts
 * import { notNully } from '@reykjavik/hanna-utils';
 *
 * const mixed = ['hi', null, undefined, ''];
 * const strings: Array<string> = mixed.filter(notNully);
 * ```
 */
export const notNully = <T>(val: T | null | undefined): val is T => val != null;

export type Falsy = undefined | null | false | 0 | '';

/**
 * Simple type-guarding filter function that filters out "falsy" values (`""`,
 * `0`, `NaN`, false, `null` and `undefined`) in a type-aware way.
 *
 * ```ts
 * import { notFalsy } from '@reykjavik/hanna-utils';
 *
 * const mixed = ['hi', null, undefined, '', 0, false, 'ho'] as const;
 * const strings: Array<string> = mixed.filter(notFalsy);
 * ```
 */

export const notFalsy = <T>(val: T | Falsy): val is T => !!val;

/**
 * Simple 'foo bar' --> 'Foo bar' mapper.
 *
 * Default locale: `'is'`
 * (effectively same as either `"en"` or vanilla `toUpperCase()`)
 *
 * ```ts
 * import { capitalize } from '@reykjavik/hanna-utils';
 *
 * capitalize('hello world'); // "Hello world"
 * capitalize('istanbul', 'TR'); // "İstanbul"
 * ```
 */
export const capitalize = <S extends string>(
  str: S,
  locale?: string | Array<string>
): Capitalize<S> =>
  ((str[0] || '').toLocaleUpperCase(locale || 'IS') + str.slice(1)) as Capitalize<S>;
