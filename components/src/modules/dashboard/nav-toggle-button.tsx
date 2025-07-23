import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import { varAlpha } from '../../theme/styles/utils';

// import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function NavToggleButton({ isNavMini, sx, ...other }: { isNavMini?: any, sx?: any, [other: string]: any }) {
  return (
    <IconButton
      size="small"
      sx={{
        p: 0.5,
        top: 24,
        position: 'fixed',
        color: 'action.active',
        bgcolor: 'background.default',
        transform: 'translateX(-50%)',
        zIndex: 'var(--layout-nav-zIndex)',
        left: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
        border: (theme:any) => console.log(theme.vars.palette.grey),
        transition: (theme) =>
          theme.transitions.create(['left'], {
            easing: 'var(--layout-transition-easing)',
            duration: 'var(--layout-transition-duration)',
          }),
        '&:hover': {
          color: 'text.primary',
          bgcolor: 'background.neutral',
        },
        ...sx,
      }}
      {...other}
    >
      <SvgIcon
        sx={{
          width: 16,
          height: 16,
          ...(isNavMini && {
            transform: 'scaleX(-1)',
          }),
        }}
      >
        {/* https://icon-sets.iconify.design/eva/arrow-ios-back-fill/ */}
        <path
          fill="currentColor"
          d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64"
        />
      </SvgIcon>
    </IconButton>
  );
}
