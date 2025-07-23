import { m } from 'framer-motion';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha as hexAlpha } from '@mui/material/styles';

// import { paths } from 'src/routes/paths';

// import { CONFIG } from 'src/config-global';
// import { varAlpha, bgGradient } from 'src/theme/styles';

// import { Label } from 'src/components/label';

// import { useMockedUser } from 'src/auth/hooks';
import { Label } from '../../component/label/label';
import { bgGradient } from '../../theme/styles/mixins';
import { varAlpha } from '../../theme/styles/utils';

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    photoURL: "/assets/background/background-24.webp",
    phoneNumber: "+61 2 9876 5432",
    country: "India",
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}

export function NavUpgrade({ sx, ...other }: { sx?: any, [other: string]: any }) {
  const { user } = useMockedUser();

  return (
    <Stack sx={{ px: 2, py: 5, textAlign: 'center', ...sx }} {...other}>
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user?.photoURL} alt={user?.displayName} sx={{ width: 48, height: 48 }}>
            {user?.displayName?.charAt(0).toUpperCase()}
          </Avatar>

          <Label
            color="success"
            variant="filled"
            sx={{
              top: -6,
              px: 0.5,
              left: 40,
              height: 20,
              position: 'absolute',
              borderBottomLeftRadius: 2,
            }}
          >
            Free
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ color: 'var(--layout-nav-text-primary-color)' }}
          >
            {user?.displayName}
          </Typography>

          <Typography
            variant="body2"
            noWrap
            sx={{ color: 'var(--layout-nav-text-disabled-color)' }}
          >
            {user?.email}
          </Typography>
        </Stack>

        <Button variant="contained" href={""} target="_blank" rel="noopener">
          Upgrade to Pro
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function UpgradeBlock({ sx, ...other }: { sx?: any, [other: string]: any }) {
  return (
    <Stack
      sx={{
        ...bgGradient({
          color: `135deg, ${hexAlpha('#F7BB95', 0.92)}, ${hexAlpha('#5B2FF3', 0.92)}`,
          imgUrl: `/assets/background/background-7.webp`,
        }),
        px: 3,
        py: 4,
        borderRadius: 2,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          borderRadius: 2,
          position: 'absolute',
          border: (theme: any) => `solid 3px ${varAlpha(theme.vars.palette.common.whiteChannel, 0.16)}`,
        }}
      />

      <Box
        component={m.img}
        animate={{ y: [12, -12, 12] }}
        transition={{
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 0,
        }}
        alt="Small Rocket"
        src={`/assets/illustrations/illustration-rocket-small.webp`}
        sx={{ right: 0, width: 112, height: 112, position: 'absolute' }}
      />

      <Stack alignItems="flex-start" sx={{ position: 'relative' }}>
        <Box component="span" sx={{ typography: 'h5', color: 'common.white' }}>
          35% OFF
        </Box>

        <Box
          component="span"
          sx={{
            mb: 2,
            mt: 0.5,
            color: 'common.white',
            typography: 'subtitle2',
          }}
        >
          Power up Productivity!
        </Box>

        <Button variant="contained" size="small" color="warning">
          Upgrade to Pro
        </Button>
      </Stack>
    </Stack>
  );
}
