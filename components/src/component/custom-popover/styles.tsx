import { styled } from '@mui/material/styles';
import { HTMLAttributes } from 'react';

// import { CONFIG } from 'src/config-global';
// import { varAlpha, stylesMode } from 'src/theme/styles';

// ----------------------------------------------------------------------

interface StyledArrowProps extends HTMLAttributes<HTMLSpanElement> {
  placement?: string;
  offset?: number;
  size?: number;
}

export const StyledArrow = styled('span', {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'placement' && prop !== 'offset',
})<StyledArrowProps>(({ placement, offset = 0, size = 0, theme }) => {
  const POSITION = -(size / 2) + 0.5;

  const alignmentStyles = {
    top: { top: POSITION, transform: 'rotate(135deg)' },
    bottom: { bottom: POSITION, transform: 'rotate(-45deg)' },
    left: { left: POSITION, transform: 'rotate(45deg)' },
    right: { right: POSITION, transform: 'rotate(-135deg)' },
    hCenter: { left: 0, right: 0, margin: 'auto' },
    vCenter: { top: 0, bottom: 0, margin: 'auto' },
  };

  const backgroundStyles = (color: string) => ({
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${size * 3}px ${size * 3}px`,
    backgroundImage: `url(/assets/${color}-blur.png)`,
    ...(color === 'cyan' && {
      backgroundPosition: 'top right',
    }),
    ...(color === 'red' && {
      backgroundPosition: 'bottom left',
    }),
  });

  return {
    width: size,
    height: size,
    position: 'absolute',
    backdropFilter: '6px',
    borderBottomLeftRadius: size / 4,
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    // backgroundColor: theme.vars.palette.background.paper,
    border: `solid 1px ##f3f5f4`,
    // [stylesMode.dark]: {
    //   border: `solid 1px ##f3f5f4`,
    // },
    /**
     * Top
     */
    ...(placement === 'top-left' && {
      ...alignmentStyles.top,
      left: offset,
    }),
    ...(placement === 'top-center' && {
      ...alignmentStyles.top,
      ...alignmentStyles.hCenter,
    }),
    ...(placement === 'top-right' && {
      ...backgroundStyles('cyan'),
      ...alignmentStyles.top,
      right: offset,
    }),
    /**
     * Bottom
     */
    ...(placement === 'bottom-left' && {
      ...backgroundStyles('red'),
      ...alignmentStyles.bottom,
      left: offset,
    }),
    ...(placement === 'bottom-center' && {
      ...alignmentStyles.bottom,
      ...alignmentStyles.hCenter,
    }),
    ...(placement === 'bottom-right' && {
      ...alignmentStyles.bottom,
      right: offset,
    }),
    /**
     * Left
     */
    ...(placement === 'left-top' && {
      ...alignmentStyles.left,
      top: offset,
    }),
    ...(placement === 'left-center' && {
      ...backgroundStyles('red'),
      ...alignmentStyles.left,
      ...alignmentStyles.vCenter,
    }),
    ...(placement === 'left-bottom' && {
      ...backgroundStyles('red'),
      ...alignmentStyles.left,
      bottom: offset,
    }),
    /**
     * Right
     */
    ...(placement === 'right-top' && {
      ...backgroundStyles('cyan'),
      ...alignmentStyles.right,
      top: offset,
    }),
    ...(placement === 'right-center' && {
      ...backgroundStyles('cyan'),
      ...alignmentStyles.right,
      ...alignmentStyles.vCenter,
    }),
    ...(placement === 'right-bottom' && {
      ...alignmentStyles.right,
      bottom: offset,
    }),
  };
});
