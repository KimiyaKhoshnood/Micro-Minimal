import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

// import { usePathname } from 'src/routes/hooks';

// import { Logo } from 'src/components/logo';
// import { Scrollbar } from 'src/components/scrollbar';
// import { NavSectionVertical } from 'src/components/nav-section';

// import { NavUpgrade } from '../components/nav-upgrade';
import { Scrollbar } from '../../../component/scrollbar/scrollbar';
import { NavSectionVertical } from '../nav-section/vertical/nav-section-vertical';
import { NavUpgrade } from '../nav-upgrade';

// ----------------------------------------------------------------------

export function NavMobile({ data, open, onClose, slots, sx, ...other }: { data?: any, open?: any, onClose?: any, slots?: any, sx?: any, [other: string]: any }) {
  // const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pathname]);
  }, []);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      {slots?.topArea ?? (
        <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
          {/* <Logo /> */} logo
        </Box>
      )}

      <Scrollbar fillContent>
        <NavSectionVertical data={data} sx={{ px: 2, flex: '1 1 auto' }} {...other} />
        <NavUpgrade />
      </Scrollbar>

      {slots?.bottomArea}
    </Drawer>
  );
}
