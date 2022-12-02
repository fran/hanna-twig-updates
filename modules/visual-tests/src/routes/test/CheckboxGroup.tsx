import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { CheckboxGroup } from '@reykjavik/hanna-react/CheckboxGroup';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
//export const handle = { cssTokens: [] };

export const options = [
  {
    value: 'text',
    label: (
      <Fragment>
        Some checkbox text <small>Extra info</small>
      </Fragment>
    ),
  },
  {
    disabled: true,
    value: 'random',
    label: 'Random text',
  },
  {
    value: 'long',
    label: (
      <Fragment>
        Long long long checkbox text <small>Longer extra info</small>
      </Fragment>
    ),
  },
  {
    value: 'great',
    label: 'Checkboxes are great',
  },
  {
    value: 'awesome',
    label: 'Checkboxes are so awesome!',
  },
];

export default function () {
  return (
    <Minimal>
      {([undefined, 'inline'] as const).map((layout, i) => {
        const opts = !layout ? options.slice(0, 3) : options;
        const name = layout || '';

        return (
          <Fragment key={i}>
            {i > 0 && <DummyBlock thin />}
            <CheckboxGroup
              layout={layout}
              label={'Checkbox Group'}
              options={opts}
              value={['text']}
              required={true}
              name={name + 'normal'}
            />
            <DummyBlock thin />
            <CheckboxGroup
              layout={layout}
              label={'Invalid Checkbox Group'}
              options={opts}
              value={['text']}
              invalid
              name={name + 'invalid'}
              errorMessage="This is an error message"
            />
            <DummyBlock thin />
            <CheckboxGroup
              layout={layout}
              label={'Checkbox Group'}
              disabled
              value={['text']}
              options={opts}
              required={true}
              name={name + 'disabled'}
            />
          </Fragment>
        );
      })}
    </Minimal>
  );
}

export const testing: TestingInfo = {};
