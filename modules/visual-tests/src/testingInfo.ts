import type {
  Expect,
  Locator,
  LocatorScreenshotOptions,
  PageScreenshotOptions,
  test,
} from '@playwright/test';

/**
 * Meta-data/configuration for how a test-page should be tested.
 *
 * All test page modules under `src/routes/test/**` must export a
 * `testing` token of this type.
 *
 * Minimal example with no customiation:
 * ```ts
 * export const testing: TestingInfo = {};
 * ```
 */
export type TestingInfo = TestInfoObj | Array<TestInfoObj>;

// ---------------------------------------------------------------------------

export type TestInfoObj = {
  /**
   * Custom name suffix for the test. Default is a 1-based index applied
   * to the second test onwards.
   * (Thus a single/first test receives no label by default.)
   *
   * The base name for a test (the prefix) is the name of its containing
   * module/route file.
   *
   * E.g. The test for `src/routes/test/SomeComponent` would be named
   * `SomeComponent-{label}`
   */
  label?: string;

  /**
   * Callback that is called BEFORE the automatic full-page screenshot
   * is snapped. This allows you to activate component states, apply
   * `.hover()`, etc.
   *
   * NOTE: If you snap a pageScreenshot inside the prep handler,
   * the `skipScreenshot` option implictly flips to `true`,
   * and no default screenshot is snapped.
   */
  prep?: (args: TestFnArgs) => Promise<void>;

  /**
   * Skips the automatic pageScreenshot that gets snapped if the
   * prep function didn't snap any.
   */
  skipScreenshot?: boolean;

  /**
   * Callback that is called AFTER the automatic full-page screenshot
   * is snapped. This allows you to take more screenshots, if needed.
   */
  extras?: (args: TestFnArgs) => Promise<void>;

  tags?: Array<TestTag>;
};

// ---------------------------------------------------------------------------

export type TestFnArgs = Pick<
  Parameters<Parameters<typeof test>[1]>[0],
  'page' | 'context' | 'browserName' | 'isMobile' | 'hasTouch'
> & {
  /** Re-expot of PlayWright's expect function. */
  expect: Expect;

  /**
   * Sugar function to snap a screenshot of a single element locator
   * and gives it a nicely formatted, labelled filename
   */
  localScreenshot: (
    /** Locator for the Element to snap screenshot of */
    locator: Locator,
    /** Label is required to make a stable + readable screenshot filenames */
    label: string,
    opts?: LocatorScreenshotOptions
  ) => Promise<void>;

  /**
   * Sugar function to snap a full-page screenshot, with a nicely
   * formatted, labelled filename.
   *
   * Takes care of resizing the viewport to prevent <body>-element
   * from overflowing (and thus cropping the image).
   */
  pageScreenshot: (
    /** Label is required to make a stable + readable screenshot filenames */
    label: string,
    opts?: PageScreenshotOptions
  ) => Promise<void>;
};

// ---------------------------------------------------------------------------

export type TestTag = 'meta' | `${'only' | 'also'}-${'chrome' | 'safari'}`;
