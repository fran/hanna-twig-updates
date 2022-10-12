import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import BlockBreak from '@reykjavik/hanna-react/BlockBreak';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import PageFilter from '@reykjavik/hanna-react/PageFilter';
import Selectbox from '@reykjavik/hanna-react/Selectbox';
import TextInput from '@reykjavik/hanna-react/TextInput';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['BlockBreak'] };

const buttonRow = (resetButton: boolean) => (
  <Fragment>
    <ButtonPrimary>Sækja fundargerðir</ButtonPrimary>
    {resetButton && <ButtonTertiary disabled>Hreinsa</ButtonTertiary>}
  </Fragment>
);
const footnote = lorem.medium;

const pagefilters = [1, 2, 3, 4].map((i) => {
  return (
    <PageFilter
      key={i}
      title={
        i === 1
          ? 'No placeholder'
          : i === 2
          ? 'Page filter with a reset button and footnote ' // Page filter with a reset button and footnote
          : i === 3
          ? 'Hi! This title is a little bit longer than the previous one'
          : 'No line break'
      }
      summary={
        i === 1
          ? ' '
          : i === 4
          ? 'But has footnote and a reset button!'
          : 'With line break! ' + lorem.short
      }
      buttonRow={i % 2 === 0 ? buttonRow(true) : buttonRow(false)}
      filters={
        <Fragment>
          <TextInput label="Search terms" />
          {i === 2 || i === 3 ? <BlockBreak /> : ''}
          <TextInput label="Moar terms" />
          {i === 1 || i === 3 ? <TextInput label="Even more terms" /> : ''}
          <Selectbox
            label="Optional"
            placeholder={i === 1 ? '' : 'Placeholder text'}
            options={['', 'One option', 'Other option']}
          />
        </Fragment>
      }
      footnote={i % 2 === 0 ? footnote : undefined}
      startSeen
    />
  );
});

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>{pagefilters}</Minimal>
  );
}

export const testing: TestingInfo = {};
