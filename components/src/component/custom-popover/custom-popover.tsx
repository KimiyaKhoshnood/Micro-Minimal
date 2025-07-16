import Popover from '@mui/material/Popover';
import { listClasses } from '@mui/material/List';
import { menuItemClasses } from '@mui/material/MenuItem';
import { StyledArrow } from './styles';

// ----------------------------------------------------------------------

const POPOVER_DISTANCE = 0.75;

export function calculateAnchorOrigin(arrow:any) {
  let props;

  switch (arrow) {
    /**
     * top-*
     */
    case 'top-left':
      props = {
        paperStyles: { ml: -POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      };
      break;
    case 'top-center':
      props = {
        paperStyles: undefined,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      };
      break;
    case 'top-right':
      props = {
        paperStyles: { ml: POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
      };
      break;
    /**
     * bottom-*
     */
    case 'bottom-left':
      props = {
        paperStyles: { ml: -POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'bottom', horizontal: 'left' },
      };
      break;
    case 'bottom-center':
      props = {
        paperStyles: undefined,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        transformOrigin: { vertical: 'bottom', horizontal: 'center' },
      };
      break;
    case 'bottom-right':
      props = {
        paperStyles: { ml: POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'bottom', horizontal: 'right' },
      };
      break;
    /**
     * left-*
     */
    case 'left-top':
      props = {
        paperStyles: { mt: -POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      };
      break;
    case 'left-center':
      props = {
        paperStyles: undefined,
        anchorOrigin: { vertical: 'center', horizontal: 'right' },
        transformOrigin: { vertical: 'center', horizontal: 'left' },
      };
      break;
    case 'left-bottom':
      props = {
        paperStyles: { mt: POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'bottom', horizontal: 'left' },
      };
      break;
    /**
     * right-*
     */
    case 'right-top':
      props = {
        paperStyles: { mt: -POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
      };
      break;
    case 'right-center':
      props = {
        paperStyles: undefined,
        anchorOrigin: { vertical: 'center', horizontal: 'left' },
        transformOrigin: { vertical: 'center', horizontal: 'right' },
      };
      break;
    case 'right-bottom':
      props = {
        paperStyles: { mt: POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'bottom', horizontal: 'right' },
      };
      break;

    // top-right
    default:
      props = {
        paperStyles: { ml: POPOVER_DISTANCE },
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
      };
  }

  return props;
}

// ----------------------------------------------------------------------

export function CustomPopover({ open, onClose, children, anchorEl, slotProps, ...other }: { open?: boolean, onClose?: () => void, children?: any, anchorEl?: any, slotProps?: any, [other:string]: any }) {
  const arrowPlacement:string = slotProps?.arrow?.placement ?? 'top-right';

  const arrowSize = slotProps?.arrow?.size ?? 14;

  const arrowOffset = slotProps?.arrow?.offset ?? 17;

  const { paperStyles, anchorOrigin, transformOrigin } = calculateAnchorOrigin(arrowPlacement);

  return (
    <Popover
      open={!!open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin as any}
      transformOrigin={transformOrigin as any}
      slotProps={{
        ...slotProps,
        paper: {
          ...slotProps?.paper,
          sx: {
            ...paperStyles,
            overflow: 'inherit',
            [`& .${listClasses.root}`]: { minWidth: 140 },
            [`& .${menuItemClasses.root}`]: { gap: 2 },
            ...slotProps?.paper?.sx,
          },
        },
      }}
      {...other}
    >
      {!slotProps?.arrow?.hide && (
        <StyledArrow
          sx={slotProps?.arrow?.sx}
          placement={arrowPlacement}
          offset={arrowOffset}
          size={arrowSize}
        />
      )}

      {children}
    </Popover>
  );
}
