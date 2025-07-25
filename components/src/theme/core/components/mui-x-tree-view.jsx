// ----------------------------------------------------------------------

const MuiTreeItem = {
  styleOverrides: {
    label: ({ theme }) => ({ ...theme.typography.body2 }),
    iconContainer: { width: 'auto' },
  },
};

// ----------------------------------------------------------------------

export const treeView = { MuiTreeItem };
