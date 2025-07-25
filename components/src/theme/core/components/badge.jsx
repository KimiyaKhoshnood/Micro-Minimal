import { badgeClasses } from '@mui/material/Badge';

// ----------------------------------------------------------------------

const baseStyles = (theme) => ({
  width: 10,
  zIndex: 9,
  padding: 0,
  height: 10,
  minWidth: 'auto',
  '&::before, &::after': {
    content: "''",
    borderRadius: 1,
    backgroundColor: theme.vars.palette.common.white,
  },
  [`&.${badgeClasses.invisible}`]: { transform: 'unset' },
});

const MuiBadge = {
  variants: [
    {
      props: ({ ownerState }) => ownerState.variant === 'online',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          backgroundColor: theme.vars.palette.success.main,
        },
      }),
    },
    {
      props: ({ ownerState }) => ownerState.variant === 'alway',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          backgroundColor: theme.vars.palette.warning.main,
          '&::before': { width: 2, height: 4, transform: 'translateX(1px) translateY(-1px)' },
          '&::after': { width: 2, height: 4, transform: 'translateY(1px) rotate(125deg)' },
        },
      }),
    },
    {
      props: ({ ownerState }) => ownerState.variant === 'busy',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          backgroundColor: theme.vars.palette.error.main,
          '&::before': { width: 6, height: 2 },
        },
      }),
    },
    {
      props: ({ ownerState }) => ownerState.variant === 'offline',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          backgroundColor: theme.vars.palette.text.disabled,
          '&::before': { width: 6, height: 6, borderRadius: '50%' },
        },
      }),
    },
    {
      props: ({ ownerState }) => ownerState.variant === 'invisible',
      style: { [`& .${badgeClasses.badge}`]: { display: 'none' } },
    },
  ],

  styleOverrides: { dot: { borderRadius: '50%' } },
};

// ----------------------------------------------------------------------

export const badge = { MuiBadge };
