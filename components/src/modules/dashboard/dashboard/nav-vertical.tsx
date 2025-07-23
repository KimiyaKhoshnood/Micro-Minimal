import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// import { varAlpha, hideScrollY } from 'src/theme/styles';

// import { Logo } from 'src/components/logo';
// import { Scrollbar } from 'src/components/scrollbar';
import {  NavSectionVertical } from '../nav-section/vertical/nav-section-vertical';
import { NavSectionMini } from '../nav-section/mini/nav-section-mini';

// import { NavUpgrade } from '../components/nav-upgrade';
// import { NavToggleButton } from '../components/nav-toggle-button';
import { Scrollbar } from '../../../component/scrollbar/scrollbar';
import { hideScrollY } from '../../../theme/styles/mixins';
import { varAlpha } from '../../../theme/styles/utils';
import { NavUpgrade } from '../nav-upgrade';
import { NavToggleButton } from '../nav-toggle-button';

// ----------------------------------------------------------------------

export function NavVertical({ sx, data, slots, isNavMini, layoutQuery, onToggleNav, ...other }: { sx?: any, data?: any, slots?: any, isNavMini?: any, layoutQuery?: any, onToggleNav?: any, [other: string]: any }) {
  const theme = useTheme();

  const renderNavVertical = (
    <>
      {slots?.topArea ?? (
        <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
          {/* <Logo /> */} logooo
        </Box>
      )}

      <Scrollbar fillContent>
        <NavSectionVertical data={data} sx={{ px: 2, flex: '1 1 auto' }} {...other} />

        {slots?.bottomArea ?? <NavUpgrade />}
      </Scrollbar>
    </>
  );

  const renderNavMini = (
    <>
      {slots?.topArea ?? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2.5 }}>
          {/* <Logo /> */} logooo
        </Box>
      )}

      <NavSectionMini
        data={data}
        sx={{ pb: 2, px: 0.5, ...hideScrollY, flex: '1 1 auto', overflowY: 'auto' }}
        {...other}
      />

      {slots?.bottomArea}
    </>
  );

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        transition: theme.transitions.create(['width'], {
          easing: 'var(--layout-transition-easing)',
          duration: 'var(--layout-transition-duration)',
        }),
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavToggleButton
        isNavMini={isNavMini}
        onClick={onToggleNav}
        sx={{
          display: 'none',
          [theme.breakpoints.up(layoutQuery)]: {
            display: 'inline-flex',
          },
        }}
      />
      {isNavMini ? renderNavMini : renderNavVertical}
    </Box>
  );
}
