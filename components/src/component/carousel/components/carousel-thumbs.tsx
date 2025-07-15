import { Children, forwardRef, isValidElement } from 'react';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';
import { StyledContainer, StyledRoot } from '../carousel';
import { carouselClasses } from '../classes';
import { CarouselSlide } from './carousel-slide';

// ----------------------------------------------------------------------

export const CarouselThumbs = forwardRef(({ children, slotProps, options, sx, ...other }: { children?: any, slotProps?: any, options?: any, sx?: any, other?: any }, ref) => {
  const axis = options?.axis ?? 'x';

  const slideSpacing = options?.slideSpacing ?? '12px';

  const maskStyles = useMaskStyle(axis);

  const renderChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const reactChild = child;

      return (
        <CarouselSlide
          key={reactChild.key}
          options={{ ...options, slideSpacing }}
          sx={slotProps?.slide}
        >
          {child}
        </CarouselSlide>
      );
    }
    return null;
  });

  return (
    <StyledRoot
      ref={ref}
      axis={axis}
      className={carouselClasses.thumbs}
      sx={{
        flexShrink: 0,
        ...(axis === 'x' && { p: 0.5, maxWidth: 1 }),
        ...(axis === 'y' && { p: 0.5, maxHeight: 1 }),
        ...(!slotProps?.disableMask && maskStyles),
        ...sx,
      }}
      {...other}
    >
      <StyledContainer
        // component="ul"
        axis={axis}
        slideSpacing={slideSpacing}
        className={carouselClasses.thumbContainer}
        sx={{
          ...slotProps?.container,
        }}
      >
        {renderChildren}
      </StyledContainer>
    </StyledRoot>
  );
});

// ----------------------------------------------------------------------

export function CarouselThumb({ sx, src, index, selected, ...other }: { sx?: any, src?: string, index?: number, selected?: any, [other:string]: any }) {
  return (
    <ButtonBase
      className={carouselClasses.thumb}
      sx={{
        width: 64,
        height: 64,
        opacity: 0.48,
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: 1.25,
        transition: (theme) =>
          theme.transitions.create(['opacity', 'box-shadow'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.short,
          }),
        ...(selected && {
          opacity: 1,
          boxShadow: `0 0 0 2px #efefef`,
        }),
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        alt={`carousel-thumb-${index}`}
        src={src}
        className={carouselClasses.thumbImage}
        sx={{
          width: 1,
          height: 1,
          objectFit: 'cover',
          borderRadius: 'inherit',
        }}
      />
    </ButtonBase>
  );
}

// ----------------------------------------------------------------------

function useMaskStyle(axis: any) {
  const theme = useTheme();

  const baseStyles = {
    zIndex: 9,
    content: '""',
    position: 'absolute',
  };

  const bgcolor = `#ffffff 20%, #efefef 100%)`;

  if (axis === 'y') {
    return {
      '&::before, &::after': {
        ...baseStyles,
        left: 0,
        height: 40,
        width: '100%',
      },
      '&::before': {
        top: -8,
        background: `linear-gradient(to bottom, ${bgcolor}`,
      },
      '&::after': {
        bottom: -8,
        background: `linear-gradient(to top, ${bgcolor}`,
      },
    };
  }

  return {
    '&::before, &::after': {
      ...baseStyles,
      top: 0,
      width: 40,
      height: '100%',
    },
    '&::before': {
      left: -8,
      background: `linear-gradient(to right, ${bgcolor}`,
    },
    '&::after': {
      right: -8,
      background: `linear-gradient(to left, ${bgcolor}`,
    },
  };
}
