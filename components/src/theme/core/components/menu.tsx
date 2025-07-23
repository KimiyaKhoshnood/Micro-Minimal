import { menuItem } from "../../styles/mixins";

// ----------------------------------------------------------------------

const MuiMenuItem = {
  styleOverrides: { root: ({ theme }: any) => ({ ...menuItem(theme) }) },
};

// ----------------------------------------------------------------------

export const menu = { MuiMenuItem };
