// ----------------------------------------------------------------------

const MuiCard = {
  styleOverrides: {
    root: ({ theme }) => ({
      position: 'relative',
      boxShadow: theme.customShadows.card,
      borderRadius: theme.shape.borderRadius * 2,
      zIndex: 0,
    }),
  },
};

// ----------------------------------------------------------------------

const MuiCardHeader = {
  defaultProps: {
    titleTypographyProps: { variant: 'h6' },
    subheaderTypographyProps: { variant: 'body2', marginTop: '4px' },
  },

  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3, 3, 0),
    }),
  },
};

// ----------------------------------------------------------------------

const MuiCardContent = {
  styleOverrides: { root: ({ theme }) => ({ padding: theme.spacing(3) }) },
};

// ----------------------------------------------------------------------

export const card = { MuiCard, MuiCardHeader, MuiCardContent };
