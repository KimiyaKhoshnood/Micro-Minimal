import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const imageClasses = {
  root: 'mnl__image__root',
  wrapper: 'mnl__image__wrapper',
  overlay: 'mnl__image__overlay',
};

const ImageWrapper = styled(Box)({
  overflow: 'hidden',
  position: 'relative',
  verticalAlign: 'bottom',
  display: 'inline-block',
  [`& .${imageClasses.wrapper}`]: {
    width: '100%',
    height: '100%',
    verticalAlign: 'bottom',
    backgroundSize: 'cover !important',
  },
});

const Overlay = styled('span')({
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export const Image = forwardRef(
  (
    {
      ratio,
      disabledEffect = false,
      //
      alt,
      src,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = 'blur',
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      //
      slotProps,
      sx,
      ...other
    }: {
      ratio?: string,
      disabledEffect?: boolean,
      alt?: string,
      src?: string,
      delayTime?: number,
      threshold?: any,
      beforeLoad?: any,
      delayMethod?: any,
      placeholder?: string,
      wrapperProps?: any,
      scrollPosition?: string,
      effect?: string,
      visibleByDefault?: boolean,
      wrapperClassName?: string,
      useIntersectionObserver?: any,
      slotProps?: any,
      sx?: any,
      [other:string]: any
    },
    ref
  ) => {
    const content = (
      <Box
        component={LazyLoadImage as any}
        alt={alt}
        src={src}
        delayTime={delayTime}
        threshold={threshold}
        beforeLoad={beforeLoad}
        delayMethod={delayMethod}
        placeholder={placeholder}
        wrapperProps={wrapperProps}
        scrollPosition={scrollPosition}
        visibleByDefault={visibleByDefault}
        effect={visibleByDefault || disabledEffect ? undefined : effect}
        useIntersectionObserver={useIntersectionObserver}
        wrapperClassName={wrapperClassName || imageClasses.wrapper}
        placeholderSrc={
          visibleByDefault || disabledEffect
            ? `http://localhost:1001/assets/transparent.png`
            : `http://localhost:1001/assets/placeholder.svg`
        }
        sx={{
          width: 1,
          height: 1,
          objectFit: 'cover',
          verticalAlign: 'bottom',
          aspectRatio: ratio,
        }}
      />
    );

    return (
      <Box
        ref={ref}
        component="span"
        className={imageClasses.root}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          verticalAlign: 'bottom',
          display: 'inline-block',
          [`& .${imageClasses.wrapper}`]: {
            width: '100%',
            height: '100%',
            verticalAlign: 'bottom',
            backgroundSize: 'cover !important',
          },
          ...(!!ratio && { width: 1 }), ...sx
        }}
        {...other}
      >
        {slotProps?.overlay && <Overlay className={imageClasses.overlay} sx={slotProps?.overlay} />}

        {content}
      </Box>
    );
  }
);
