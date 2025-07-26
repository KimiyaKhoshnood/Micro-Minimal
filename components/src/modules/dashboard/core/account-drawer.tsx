'use client';

import { useState, useCallback } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { UpgradeBlock, useMockedUser } from '../nav-upgrade'
import { varAlpha } from '../../../theme/styles/utils';
import { Iconify } from '../../../component/iconify/iconify'
import { Scrollbar } from '../../../component/scrollbar/scrollbar'
import { Label } from '../../../component/label/label';
import { SignOutButton } from './sign-out-button'
import { AnimateAvatar } from '../../../component/animate/animate-avatar';
import { varHover } from '../../../component/animate/variants/actions';
import { NoSsr, SvgIcon } from '@mui/material';

// ----------------------------------------------------------------------

const AVATAR = [
  {
    fullNames: 'Aspen Schmitt',
    avatarUrl: '/assets/images/avatar/avatar-1.webp',
  },
  {
    fullNames: 'Colten Aguilar',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
  },
  {
    fullNames: 'Angelique Morse',
    avatarUrl: '/assets/images/avatar/avatar-3.webp',
  }
]

// ----------------------------------------------------------------------

export function AccountDrawer({ data = [], sx, ...other }: { data?: any[], sx?: any, [other: string]: any }) {
  const theme: any = useTheme();

  // const router = useRouter();

  // const pathname = usePathname();

  const { user } = useMockedUser();

  const [open, setOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback(
    (path: any) => {
      handleCloseDrawer();
      // router.push(path);
    },
    // [handleCloseDrawer, router]
    [handleCloseDrawer]
  );

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user?.photoURL, alt: user?.displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user?.displayName?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        open={open}
        onClick={handleOpenDrawer}
        photoURL={user?.photoURL}
        displayName={user?.displayName}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {user?.displayName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
              {user?.email}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ p: 3 }}>
            {AVATAR.map((avatar) => (
              <Tooltip
                key={avatar.fullNames}
                title={`Switch to: ${avatar.fullNames}`}
              >
                <Avatar
                  alt={avatar.fullNames}
                  src={avatar.avatarUrl}
                  onClick={() => { }}
                />
              </Tooltip>
            ))}

            <Tooltip title="Add account">
              <IconButton
                sx={{
                  bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                  border: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
                }}
              >
                <Iconify icon="mingcute:add-line" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack
            sx={{
              py: 3,
              px: 2.5,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            {data.map((option) => {
              // const rootLabel = pathname.includes('/dashboard') ? 'Home' : 'Dashboard';

              // const rootHref = pathname.includes('/dashboard') ? '/' : paths.dashboard.root;

              return (
                <MenuItem
                  key={option.label}
                  // onClick={() => handleClickItem(option.label === 'Home' ? rootHref : option.href)}
                  sx={{
                    py: 1,
                    color: 'text.secondary',
                    '& svg': { width: 24, height: 24 },
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  {option.icon && (
                    <Iconify icon={option.icon.props.icon}/>
                  )}

                  <Box component="span" sx={{ ml: 2 }}>
                    {/* {option.label === 'Home' ? rootHref : option.label} */}
                    {option.label === 'Home' ? 'Home' : option.label}
                  </Box>

                  {option.info && (
                    <Label color="error" sx={{ ml: 1 }}>
                      {option.info}
                    </Label>
                  )}
                </MenuItem>
              );
            })}
          </Stack>

          <Box sx={{ px: 2.5, py: 3 }}>
            <UpgradeBlock />
          </Box>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </>
  );
}


export function AccountButton({ open, photoURL, displayName, sx, ...other }: { open?: any, photoURL?: any, displayName?: any, sx?: any, [other: string]: any }) {
  const theme: any = useTheme();

  const renderFallback = (
    <Avatar
      sx={{
        width: 40,
        height: 40,
        border: `solid 2px ${theme.vars.palette.background.default}`,
      }}
    >
      <SvgIcon>
        <circle cx="12" cy="6" r="4" fill="currentColor" />
        <path
          fill="currentColor"
          d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
          opacity="0.5"
        />
      </SvgIcon>
    </Avatar>
  );

  return (
    <IconButton
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(1.05)}
      sx={{ p: 0, ...sx }}
      {...other}
    >
      <NoSsr fallback={renderFallback}>
        <AnimateAvatar
          slotProps={{
            avatar: { src: photoURL, alt: displayName },
            overlay: {
              border: 1,
              spacing: 2,
              color: `conic-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main})`,
            },
          }}
        >
          {displayName?.charAt(0).toUpperCase()}
        </AnimateAvatar>
      </NoSsr>
    </IconButton>
  );
}