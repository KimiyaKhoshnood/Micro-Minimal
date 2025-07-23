'use client';

import { getInitColorSchemeScript as _getInitColorSchemeScript } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const schemeConfig: { modeStorageKey: string, defaultMode: 'light' | 'dark' | 'system' } = {
  modeStorageKey: 'theme-mode',
  defaultMode: 'light',
};

export const getInitColorSchemeScript = _getInitColorSchemeScript(schemeConfig);
