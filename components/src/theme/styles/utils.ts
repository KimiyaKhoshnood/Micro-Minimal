// ----------------------------------------------------------------------

export const stylesMode = {
  light: '[data-mui-color-scheme="light"] &',
  dark: '[data-mui-color-scheme="dark"] &',
};

export const mediaQueries = {
  upXs: '@media (min-width:0px)',
  upSm: '@media (min-width:600px)',
  upMd: '@media (min-width:900px)',
  upLg: '@media (min-width:1200px)',
  upXl: '@media (min-width:1536px)',
};

export function remToPx(value?: any) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value?: any) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm?: any, md?: any, lg?: any }) {
  return {
    [mediaQueries.upSm]: { fontSize: pxToRem(sm) },
    [mediaQueries.upMd]: { fontSize: pxToRem(md) },
    [mediaQueries.upLg]: { fontSize: pxToRem(lg) },
  };
}

export function hexToRgbChannel(hex?: any) {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `${r} ${g} ${b}`;
}

export function createPaletteChannel(hexPalette?: any) {
  const channelPalette = {};

  Object.entries(hexPalette).forEach(([key, value]) => {
    (channelPalette as Record<string, string>)[`${key}Channel`] = hexToRgbChannel(value);
  });

  return { ...hexPalette, ...channelPalette };
}

export function varAlpha(color: string, opacity: number = 1) {
  const unsupported =
    color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('rgba') ||
    (!color.includes('var') && color.includes('Channel'));

  if (unsupported) {
    throw new Error(`[Alpha]: Unsupported color format "${color}".
     Supported formats are:
     - RGB channels: "0 184 217".
     - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
     Unsupported formats are:
     - Hex: "#00B8D9".
     - RGB: "rgb(0, 184, 217)".
     - RGBA: "rgba(0, 184, 217, 1)".
     `);
  }

  return `rgba(${color} / ${opacity})`;
}
