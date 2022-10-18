import React from 'react';
import { hannaVars } from '@reykjavik/hanna-css';
import { EitherObj } from '@reykjavik/hanna-utils';

export type DummyBlockProps = EitherObj<{ big?: true }, { thin?: true }>;

export const DummyBlock = (props: DummyBlockProps) => (
  <div
    className="DummyBlock"
    style={{
      background: `${hannaVars.color_suld_50}
        linear-gradient(-45deg,
          ${hannaVars.color_suld_75} 12.5%,
          transparent 12.5%,
          transparent 37.5%,
          ${hannaVars.color_suld_75} 37.5%,
          ${hannaVars.color_suld_75} 62.5%,
          transparent 62.5%,
          transparent 87.5%,
          ${hannaVars.color_suld_75} 87.5%
        )`,
      backgroundPosition: '0 0',
      backgroundSize: '32px 32px',
      opacity: 0.5,
      margin: '1px 0',
      height: props.big ? '6.5rem' : props.thin ? '1rem' : '3rem',
      clear: 'both',
    }}
  />
);
