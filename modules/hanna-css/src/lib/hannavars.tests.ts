import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import { HannaCssVarToken, hannaVarOverride, hannaVars } from './hannavars';

o.spec('cssVars', () => {
  o('exposes known CSS variable tokens', () => {
    const expectedTokens: Record<HannaCssVarToken, true> = {
      cssVersion: true,
      browser_scrollbar_width: true,

      // zIndexVars
      zindex__sr_only: true,
      zindex__modal: true,
      zindex__header: true,
      zindex__overlay: true,
      zindex__Bling__overlay: true,
      zindex__Bling: true,
      // spaceVars
      space_1: true,
      space_2: true,
      space_3: true,
      space_4: true,
      space_5: true,
      space_6: true,
      space_7: true,
      space_8: true,
      space_9: true,
      space_0$5: true,
      space_1$5: true,
      space_1__neg: true,
      space_2__neg: true,
      space_3__neg: true,
      space_4__neg: true,
      space_5__neg: true,
      space_6__neg: true,
      space_7__neg: true,
      space_8__neg: true,
      space_9__neg: true,
      space_0$5__neg: true,
      space_1$5__neg: true,
      component_vspace__small: true,
      component_vspace__medium: true,
      component_vspace__large: true,
      component_vspace__xlarge: true,
      // layoutVars
      Layout$$header_height: true,
      Layout$$header_backgroundColor: true,
      Layout$$main_paddingTop: true,
      // mainMenuVars
      MainMenu_accentcolor: true,
      MainMenu_background: true,
      // borderEffectVars
      border_default: true,
      border_dark: true,
      // buttonVars
      Button__gapH: true,
      Button__gapV: true,

      // breakpints.js
      bp_w_phone: true,
      bp_w_phablet: true,
      bp_w_tablet: true,
      bp_w_netbook: true,
      bp_w_wide: true,
      bp_w_Hamburger: true,

      // colors.ts
      color_esja_25: true,
      color_esja_50: true,
      color_esja_75: true,
      color_esja_100: true,
      color_esja_150: true,
      color_faxafloi_25: true,
      color_faxafloi_50: true,
      color_faxafloi_75: true,
      color_faxafloi_100: true,
      color_faxafloi_150: true,
      color_nautholsvik_25: true,
      color_nautholsvik_50: true,
      color_nautholsvik_75: true,
      color_nautholsvik_100: true,
      color_nautholsvik_150: true,
      color_heidmork_25: true,
      color_heidmork_50: true,
      color_heidmork_75: true,
      color_heidmork_100: true,
      color_heidmork_150: true,
      color_ellidaardalur_25: true,
      color_ellidaardalur_50: true,
      color_ellidaardalur_75: true,
      color_ellidaardalur_100: true,
      color_ellidaardalur_150: true,
      color_blafjoll_25: true,
      color_blafjoll_50: true,
      color_blafjoll_75: true,
      color_blafjoll_100: true,
      color_blafjoll_150: true,
      color_sund_25: true,
      color_sund_50: true,
      color_sund_75: true,
      color_sund_100: true,
      color_sund_150: true,
      color_rokkur_25: true,
      color_rokkur_50: true,
      color_rokkur_75: true,
      color_rokkur_100: true,
      color_rokkur_150: true,
      color_suld_0: true,
      color_suld_25: true,
      color_suld_50: true,
      color_suld_75: true,
      color_suld_100: true,
      color_suld_150: true,
      color_suld_200: true,
      color_white: true,
      color_blackish: true,

      // fonts.ts
      font_family: true,
      font_weight__normal: true,
      font_weight__bold: true,
      font_base_size: true,
      font_base_leading: true,

      font_hd_xl_size: true,
      font_hd_xl_leading: true,
      font_hd_l_size: true,
      font_hd_l_leading: true,
      font_hd_m_size: true,
      font_hd_m_leading: true,
      font_hd_s_size: true,
      font_hd_s_leading: true,
      font_sh_l_size: true,
      font_sh_l_leading: true,
      font_sh_s_size: true,
      font_sh_s_leading: true,
      font_bd_l_size: true,
      font_bd_l_leading: true,
      font_bd_s_size: true,
      font_bd_s_leading: true,
      font_button_size: true,
      font_button_leading: true,
      font_label_size: true,
      font_label_leading: true,

      font_base: true,
      font_hd_xl: true,
      font_hd_l: true,
      font_hd_m: true,
      font_hd_s: true,
      font_sh_l: true,
      font_sh_l_thin: true,
      font_sh_s: true,
      font_bd_l: true,
      font_bd_s: true,
      font_button: true,
      font_label: true,

      baseVerticalMargin: true,
      baseVerticalMargin_2: true,

      // grid.ts
      grid_margin: true,
      grid_margin__neg: true,
      grid_margin__right: true,
      grid_margin__right__neg: true,

      grid_0_1: true,
      grid_1: true,
      grid_1_1: true,
      grid_2: true,
      grid_2_2: true,
      grid_3: true,
      grid_3_3: true,
      grid_4: true,
      grid_4_4: true,
      grid_5: true,
      grid_5_5: true,
      grid_6: true,
      grid_6_6: true,
      grid_7: true,
      grid_7_7: true,
      grid_8: true,
      grid_8_8: true,
      grid_9: true,
      grid_9_9: true,
      grid_10: true,
      grid_10_10: true,
      grid_11: true,
      grid_11_11: true,
      grid_12: true,

      grid_gutter: true,
      grid_column: true,
      grid_0_1__neg: true,
      grid_1__neg: true,
      grid_gutter__neg: true,
      grid_column__neg: true,

      // icons.ts
      icon__alert: true,
      icon__arrow_left_long: true,
      icon__arrow_left: true,
      icon__arrow_right: true,
      icon__arrow_up_long: true,
      icon__calendar: true,
      icon__chat: true,
      icon__checkmark: true,
      icon__chevron_down: true,
      icon__chevron_left: true,
      icon__chevron_right: true,
      icon__chevron_soft_right: true,
      icon__chevron_up: true,
      icon__close_thin: true,
      icon__close: true,
      icon__dash: true,
      icon__data: true,
      icon__document: true,
      icon__edit: true,
      icon__error: true,
      icon__external: true,
      icon__facebook: true,
      icon__fatchevron_up: true,
      icon__file_pdf: true,
      icon__home: true,
      icon__info: true,
      icon__link: true,
      icon__location: true,
      icon__menu: true,
      icon__pen: true, // deprecated
      icon__radioball: true,
      icon__search: true,
      icon__text: true,
      icon__time: true,
      icon__twitter: true,
      icon__user: true,
      icon__warning: true,

      // links.ts
      link_color: true,
      link_color__hover: true,
      link_weight: true,
      link_underline__thickness: true,
      link_underline__hairline: true,
      link_underline: true,
      link_underline__hover: true,
      link_underline_offset: true,
      link_transition: true,
      link_focus_outlineColor: true,
      link_focus_outline: true,
      link_focus_outlineOffset: true,

      // theme.ts
      theme_color_primary: true,
      theme_color_primary_25: true,
      theme_color_primary_50: true,
      theme_color_primary_75: true,

      theme_color_secondary: true,
      theme_color_secondary_25: true,
      theme_color_secondary_50: true,
      theme_color_secondary_75: true,

      theme_color_tertiary: true,
      theme_color_tertiary_25: true,
      theme_color_tertiary_50: true,
      theme_color_tertiary_75: true,

      theme_color_primary__text: true,
      theme_color_primary__dark: true,
      theme_color_primary__safe: true,
      theme_color_primary__safeish: true,
    };

    reportKeyMismatch(hannaVars, expectedTokens);
  });
});

o.spec('hannaVarOverride', () => {
  o('is an exported function', () => {
    o(hannaVarOverride({ cssVersion: 'hello' })).equals('--cssVersion: hello;\n');
  });
});
