import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ArticleMeta from '@reykjavik/hanna-react/ArticleMeta';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ArticleMeta
        items={[
          {
            label: 'Mánudagur, 30. maí 2021',
          },
          {
            label: 'Dagur B. Eggertsson',
            href: '/borgarstjori',
          },
          {
            label: 'Hover Test',
            href: '/',
          },
        ]}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('a:text("Hover Test")').hover();
  },
};
