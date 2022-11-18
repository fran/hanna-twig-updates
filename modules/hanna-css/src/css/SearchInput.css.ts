import { css, pct_f } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { hoverActiveKeyboardFocus_selector } from './utils/focus-selectors';
import { hideText_css } from './utils/hideText';
import { prem } from './utils/miscUtils';

export default css`
  /*!@deps
    FormField
  */

  @media screen {
    .SearchInput {
    }

    input.SearchInput__input {
      margin-right: ${prem(52 + 4)};
    }

    // underlying inactive button-like icon
    .SearchInput > .FormField__input::after {
      ${iconStyle(vars.icon__search)}
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: ${prem(20)};
      width: ${prem(48)};
      font-size: ${prem(20)};
      line-height: ${prem(32)};
      padding-left: ${prem(24)};
      color: ${vars.color_suld_150};
      border-left: 2px solid currentColor;
      pointer-events: none;
    }
    .SearchInput.FormField--small > .FormField__input::after {
      line-height: ${prem(22)};
    }
    .SearchInput.FormField--focused:not(.FormField--readonly):not(.FormField--disabled)
      > .FormField__input::after {
      color: ${vars.color_faxafloi_100};
    }

    // Optional button, which then overlaps + hides the ::after pseudo.
    .SearchInput__button {
      ${hideText_css('soft')}
      position: absolute;
      top: 2px;
      bottom: 2px;
      right: 2px;
      z-index: 1;
      width: ${prem(66)};
      display: flex;
      align-items: center;
      background-color: inherit;
      color: ${vars.color_suld_150};
      font-size: ${prem(20)};
    }
    :disabled + .SearchInput__button,
    [readonly] + .SearchInput__button {
      display: none;
      pointer-events: none;
    }
    .SearchInput__button:disabled {
      opacity: 0.5;
    }

    .SearchInput__button::before {
      ${iconStyle(vars.icon__search)}
      width: calc(100% - 2px);
      margin-right: 1px;
      padding-left: ${prem(6)};
      transition: all 200ms ease-in;
    }
    .SearchInput__button::after {
      content: '';
      order: -1;
      position: relative;
      z-index: 1;
      height: ${pct_f(32 / 50)};
      border-left: 2px solid currentColor;
    }

    .SearchInput__button:not(:disabled) {
      ${hoverActiveKeyboardFocus_selector(false)(css`
        color: ${vars.color_faxafloi_100};

        &::before {
          background-color: ${vars.color_suld_25};
          transform: scale(1.15);
        }
      `)}
    }
  }

  @media screen {
    .AutoComplete__list {
      position: absolute;
      z-index: ${vars.zindex__overlay};
      top: calc(100% + 5px);
      left: 0;
      right: 0;
      padding: ${prem(16)};
      max-height: 184px;
      overflow: auto;
      background: ${vars.color_suld_0};
      box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.15), 0px 60px 120px rgba(0, 0, 0, 0.15);
    }
    .AutoComplete__list__item {
      color: ${vars.color_suld_150};
      margin-bottom: ${prem(16)};

      &:last-child {
        margin-bottom: 0;
      }
    }
    .AutoComplete__list__item.autoComplete_selected {
      color: ${vars.color_faxafloi_100};
    }
  }
`;
