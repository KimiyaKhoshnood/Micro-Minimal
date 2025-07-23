import { menuItem } from '../../styles/utils';

// ----------------------------------------------------------------------

const MuiMenuItem = {
  styleOverrides: { root: ({ theme }) => ({ ...menuItem(theme) }) },
};

// ----------------------------------------------------------------------

export const menu = { MuiMenuItem };
