import SvgIcon from '@mui/material/SvgIcon';

// ----------------------------------------------------------------------

const ArrowDownIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16"
    />
  </SvgIcon>
);

// ----------------------------------------------------------------------

const MuiSelect = {
  defaultProps: { IconComponent: ArrowDownIcon },

  styleOverrides: {
    icon: {
      right: 10,
      width: 18,
      height: 18,
      top: 'calc(50% - 9px)',
    },
  },
};

// ----------------------------------------------------------------------

const MuiNativeSelect = {
  defaultProps: { IconComponent: ArrowDownIcon },

  styleOverrides: {
    icon: {
      right: 10,
      width: 18,
      height: 18,
      top: 'calc(50% - 9px)',
    },
  },
};

// ----------------------------------------------------------------------

export const select = { MuiSelect, MuiNativeSelect };
