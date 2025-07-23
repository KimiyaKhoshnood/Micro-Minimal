import { listClasses } from '@mui/material/List';

import { paper } from '../../styles/utils';

// ----------------------------------------------------------------------

const MuiPopover = {
  styleOverrides: {
    paper: ({ theme }) => ({
      ...paper({ theme, dropdown: true }),
      [`& .${listClasses.root}`]: { paddingTop: 0, paddingBottom: 0 },
    }),
  },
};

// ----------------------------------------------------------------------

export const popover = { MuiPopover };
