'use client';

import { forwardRef } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';

// ----------------------------------------------------------------------

export const iconifyClasses = {
  root: 'mnl__icon__root',
};

export const Iconify = forwardRef(({ className, width = 20, icon, sx, ...other }: { className?: string, width?: number, sx?: any, [other:string]: any }, ref) => {
  const baseStyles = {
    width,
    height: width,
    flexShrink: 0,
    display: 'inline-flex',
  };

  const renderFallback = (
    <Box
      component="span"
      className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
      sx={{ ...baseStyles, ...sx }}
    />
  );

  return (
    <NoSsr fallback={renderFallback}>
      <Box
        ref={ref}
        component={Icon}
        icon={icon}
        className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
        sx={{ ...baseStyles, ...sx }}
        {...other}
      />
    </NoSsr>
  );
});


