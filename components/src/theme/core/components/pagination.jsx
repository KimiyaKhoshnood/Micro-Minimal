import { paginationItemClasses } from '@mui/material/PaginationItem';

import { varAlpha, stylesMode } from '../../styles/utils';

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// ----------------------------------------------------------------------

const softVariant = {
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) =>
      !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
    style: ({ theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          fontWeight: theme.typography.fontWeightSemiBold,
          color: theme.vars.palette[color].dark,
          backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.08),
          '&:hover': { backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16) },
          [stylesMode.dark]: { color: theme.vars.palette[color].light },
        },
      },
    }),
  })),
  standardColor: [
    {
      props: ({ ownerState }) => ownerState.variant === 'soft' && ownerState.color === 'standard',
      style: ({ theme }) => ({
        [`& .${paginationItemClasses.root}`]: {
          [`&.${paginationItemClasses.selected}`]: {
            fontWeight: theme.typography.fontWeightSemiBold,
            backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            '&:hover': { backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16) },
          },
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

const MuiPagination = {
  variants: [
    ...[...softVariant.standardColor, ...softVariant.colors],
  ],

  styleOverrides: {

    text: ({ ownerState, theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          fontWeight: theme.typography.fontWeightSemiBold,
          ...(ownerState.color === 'standard' && {
            color: theme.vars.palette.common.white,
            backgroundColor: theme.vars.palette.text.primary,
            '&:hover': { backgroundColor: theme.vars.palette.grey[700] },
            [stylesMode.dark]: {
              color: theme.vars.palette.grey[800],
              '&:hover': { backgroundColor: theme.vars.palette.grey[100] },
            },
          }),
        },
      },
    }),
    outlined: ({ ownerState, theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
        [`&.${paginationItemClasses.selected}`]: {
          borderColor: 'currentColor',
          fontWeight: theme.typography.fontWeightSemiBold,
          ...(ownerState.color === 'standard' && {
            backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
          }),
        },
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const pagination = { MuiPagination };
