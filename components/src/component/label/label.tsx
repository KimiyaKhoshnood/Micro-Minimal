'use client';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const labelClasses = { root: 'mnl__label__root', icon: 'mnl__label__icon' };

export const Label = forwardRef(
  ({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }:{children?:any, color?:string, variant?:string, startIcon?:any, endIcon?:any, sx?:any, [other:string]:any}, ref) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': {
        width: 1,
        height: 1,
        objectFit: 'cover',
      },
    };

    return (
      <Box
        ref={ref}
        component="span"
        className={labelClasses.root}
        // ownerState={{ color, variant }}
        sx={{
          bgcolor: '#1C252E',
          color: 'white',
          height: 24,
          minWidth: 24,
          lineHeight: 0,
          cursor: 'default',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          justifyContent: 'center',
          padding: theme.spacing(0, 0.75),
          fontSize: theme.typography.pxToRem(12),
          fontWeight: theme.typography.fontWeightBold,
          borderRadius: 2,
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shorter,
          }),
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx
        }}
        // theme={theme}
        {...other}
      >
        {startIcon && (
          <Box component="span" className={labelClasses.icon} sx={{ mr: 0.75, ...iconStyles }}>
            {startIcon}
          </Box>
        )}

        {typeof children === 'string' ? sentenceCase(children) : children}

        {endIcon && (
          <Box component="span" className={labelClasses.icon} sx={{ ml: 0.75, ...iconStyles }}>
            {endIcon}
          </Box>
        )}
      </Box>
    );
  }
);

// ----------------------------------------------------------------------

function sentenceCase(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
