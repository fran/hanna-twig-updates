/* eslint-disable no-await-in-loop */
import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import RelatedLinks, { RelatedLinkItem } from '@reykjavik/hanna-react/RelatedLinks';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: [] };
const links: Array<RelatedLinkItem> = [
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'External ',
    type: 'external',
    target: '_blank',
  },
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'Link ',
    target: '_blank',
  },
  {
    href: '/files/somepdfFile',
    label: 'PDF file',
    type: 'pdf',
  },
  {
    href: '/files/some.pdf',
    label: 'PDF with long title. -- ' + lorem.tiny.slice(0, 33),
  },
  {
    href: '/files/someOtherDocument',
    label: 'Document',
    type: 'document',
  },
  {
    href: '/normal/link',
    label: 'Related links',
    type: 'link',
  },
];
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <RelatedLinks title="Best title in the world" links={links} />
      <DummyBlock thin />
      <RelatedLinks
        title={'Linebreak title. ' + lorem.medium.slice(0, 120)}
        links={links.slice(0, 5)}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    // Only test first related links group
    const relatedLinksGroup = page.locator('.RelatedLinks >> nth = 0');
    const relatedLinks = await relatedLinksGroup.locator('li').elementHandles();
    for (const relatedlink of relatedLinks) {
      const label = ((await relatedlink.textContent()) || '').split('--')[0];

      await relatedlink.hover();
      await localScreenshot(relatedlink, label + '-hover', { margin: [5, 10] });
    }
  },
};
