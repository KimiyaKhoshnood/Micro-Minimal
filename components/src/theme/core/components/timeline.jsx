// ----------------------------------------------------------------------

const MuiTimelineDot = {
  styleOverrides: { root: { boxShadow: 'none' } },
};

const MuiTimelineConnector = {
  styleOverrides: { root: ({ theme }) => ({ backgroundColor: theme.vars.palette.divider }) },
};

// ----------------------------------------------------------------------

export const timeline = { MuiTimelineDot, MuiTimelineConnector };
