import { varAlpha } from '../../styles/utils';

// ----------------------------------------------------------------------

const MuiBackdrop = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: varAlpha(theme.vars.palette.grey['800Channel'], 0.48),
    }),
    invisible: { background: 'transparent' },
  },
};

// ----------------------------------------------------------------------

export const backdrop = { MuiBackdrop };
