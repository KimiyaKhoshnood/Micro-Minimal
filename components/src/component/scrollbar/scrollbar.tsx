import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export const scrollbarClasses = { root: 'mnl__scrollbar__root' };

export const Scrollbar = forwardRef(
  ({ slotProps, children, fillContent, naturalScroll, sx, ...other }: { slotProps?: any, children?: any, fillContent?: any, naturalScroll?: any, sx?: any, [other:string]: any }, ref) => (
    <Box
      component={SimpleBar}
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={scrollbarClasses.root}
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .simplebar-wrapper': slotProps?.wrapper,
        '& .simplebar-content-wrapper': slotProps?.contentWrapper,
        '& .simplebar-content': {
          ...(fillContent && {
            minHeight: 1,
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
          }),

          ...slotProps?.content,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
);
