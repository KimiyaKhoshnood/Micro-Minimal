import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { styled, useTheme } from '@mui/material/styles';

// import { useScrollOffSetTop } from 'src/hooks/use-scroll-offset-top';
import { useScroll, useMotionValueEvent } from 'framer-motion';

import { bgBlur } from '../../../theme/styles/mixins';
import { varAlpha } from '../../../theme/styles/utils';

import { layoutClasses } from '../classes';
import { useCallback, useMemo, useRef, useState } from 'react';

// ----------------------------------------------------------------------

export function useScrollOffSetTop(top = 0) {
  const elementRef = useRef(null);

  const { scrollY } = useScroll();

  const [offsetTop, setOffsetTop] = useState(false);

  const handleScrollChange = useCallback(
    (val:any) => {
      const scrollHeight = Math.round(val);

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementTop = Math.round(rect.top);

        setOffsetTop(elementTop < top);
      } else {
        setOffsetTop(scrollHeight > top);
      }
    },
    [elementRef, top]
  );

  useMotionValueEvent(
    scrollY,
    'change',
    useMemo(() => handleScrollChange, [handleScrollChange])
  );

  const memoizedValue = useMemo(() => ({ elementRef, offsetTop }), [offsetTop]);

  return memoizedValue;
}


const StyledElevation = styled('span')(({ theme }:any) => ({
  left: 0,
  right: 0,
  bottom: 0,
  m: 'auto',
  height: 24,
  zIndex: -1,
  opacity: 0.48,
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export function HeaderSection({
  sx,
  slots,
  slotProps,
  disableOffset,
  disableElevation,
  layoutQuery = 'md',
  ...other
}:{
  sx?:any,
  slots?:any,
  slotProps?:any,
  disableOffset?:any,
  disableElevation?:any,
  layoutQuery?:any,
  [other:string]:any
}) {
  const theme = useTheme();

  const { offsetTop } = useScrollOffSetTop();

  const toolbarStyles = {
    default: {
      minHeight: 'auto',
      height: 'var(--layout-header-mobile-height)',
      transition: theme.transitions.create(['height', 'background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
      [theme.breakpoints.up(layoutQuery)]: {
        height: 'var(--layout-header-desktop-height)',
      },
    },
    offset: {
      ...bgBlur({
        color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8),
      }),
    },
  };

  return (
    <AppBar
      position="sticky"
      className={layoutClasses.header}
      sx={{
        zIndex: 'var(--layout-header-zIndex)',
        ...sx,
      }}
      {...other}
    >
      {slots?.topArea}

      <Toolbar
        disableGutters
        {...slotProps?.toolbar}
        sx={{
          ...toolbarStyles.default,
          ...(!disableOffset && offsetTop && toolbarStyles.offset),
          ...slotProps?.toolbar?.sx,
        }}
      >
        <Container
          {...slotProps?.container}
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            ...slotProps?.container?.sx,
          }}
        >
          {slots?.leftArea}

          <Box sx={{ display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
            {slots?.centerArea}
          </Box>

          {slots?.rightArea}
        </Container>
      </Toolbar>

      {slots?.bottomArea}

      {!disableElevation && offsetTop && <StyledElevation />}
    </AppBar>
  );
}
