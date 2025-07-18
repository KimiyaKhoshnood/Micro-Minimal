import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(({ theme }) => ({
  height: 6,
  maxWidth: 120,
  width: '100%',
  borderRadius: 6,
  overflow: 'hidden',
  position: 'relative',
  color: 'blue',
  backgroundColor: 'black',
}));

const StyledProgress = styled(Box)(() => ({
  top: 0,
  bottom: 0,
  width: '100%',
  left: '-100%',
  position: 'absolute',
  backgroundColor: 'currentColor',
}));

// ----------------------------------------------------------------------

export function CarouselProgressBar({ value, sx, ...other }:{ value:string, sx?:any, [other:string]:any }) {
  return (
    <StyledRoot sx={sx} className={carouselClasses.progress} {...other}>
      <StyledProgress
        className={carouselClasses.progressBar}
        sx={{
          transform: `translate3d(${value}%, 0px, 0px)`,
        }}
      />
    </StyledRoot>
  );
}
