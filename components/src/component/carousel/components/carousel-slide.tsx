import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { carouselClasses } from '../classes';

const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'axis' && prop !== 'slideSpacing',
})<any>(({ axis, slideSpacing }) => ({
  display: 'block',
  position: 'relative',
  ...(axis === 'x' && {
    minWidth: 0,
    paddingLeft: slideSpacing,
  }),
  ...(axis === 'y' && {
    minHeight: 0,
    paddingTop: slideSpacing,
  }),
}));

const StyledContent = styled(Box)(() => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 'inherit',
}));

// ----------------------------------------------------------------------

export function CarouselSlide({ sx, options, children, ...other }: { sx?: any, options?: any, children?: any, [other:string]: any }) {
  const slideSize = getSize(options?.slidesToShow);

  return (
    <StyledRoot
      component="li"
      axis={options?.axis ?? 'x'}
      slideSpacing={options?.slideSpacing}
      className={carouselClasses.slide}
      sx={{
        flex: slideSize,
        ...sx,
      }}
      {...other}
    >
      {options?.parallax ? (
        <StyledContent className={carouselClasses.slideContent}>
          <div className="slide__parallax__layer">{children}</div>
        </StyledContent>
      ) : (
        children
      )}
    </StyledRoot>
  );
}

function getSize(slidesToShow: any) {
  if (slidesToShow && typeof slidesToShow === 'object') {
    return Object.keys(slidesToShow).reduce((acc, key) => {
      const sizeByKey = slidesToShow[key];
      (acc as Record<string, string>)[key] = getValue(sizeByKey);
      return acc;
    }, {});
  }

  return getValue(slidesToShow);
}

function getValue(value: any = 1) {
  if (typeof value === 'string') {
    const isSupported = value === 'auto' || value.endsWith('%') || value.endsWith('px');
    if (!isSupported) {
      throw new Error(`Only accepts values: auto, px, %, or number.`);
    }
    // value is either 'auto', ends with '%', or ends with 'px'
    return `0 0 ${value}`;
  }

  if (typeof value === 'number') {
    return `0 0 ${100 / value}%`;
  }

  // Default case should not be reached due to the type signature, but we include it for safety
  throw new Error(`Invalid value type. Only accepts values: auto, px, %, or number.`);
}
