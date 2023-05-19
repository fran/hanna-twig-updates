import React from 'react';
import { Multiselect } from '@reykjavik/hanna-react/Multiselect';

import { StoryComponent, StoryParameters } from './storytypes.js';

// ===========================================================================

export default {
  title: 'Forms/Multiselect',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'mint-chocolate-chip', label: 'Mint Chocolate Chip' },
  { value: 'rocky-road', label: 'Rocky Road' },
  { value: 'cookies-and-cream', label: 'Cookies and Cream' },
  { value: 'butter-pecan', label: 'Butter Pecan' },
  { value: 'pistachio', label: 'Pistachio' },
  { value: 'maple-walnut', label: 'Maple Walnut' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'fudge', label: 'Fudge' },
];

export const _Multiselect: StoryComponent = () => {
  return (
    <>
      <Multiselect items={options} label="Veldu tegund" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};
