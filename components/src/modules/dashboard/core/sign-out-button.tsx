import { useCallback } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';

// import { useRouter } from 'src/routes/hooks';

// import { CONFIG } from 'src/config-global';

// import { toast } from 'src/components/snackbar';

// import { useAuthContext } from 'src/auth/hooks';
// import { signOut as jwtSignOut } from 'src/auth/context/jwt/action';
// import { signOut as amplifySignOut } from 'src/auth/context/amplify/action';
// import { signOut as supabaseSignOut } from 'src/auth/context/supabase/action';
// import { signOut as firebaseSignOut } from 'src/auth/context/firebase/action';

// ----------------------------------------------------------------------

// const signOut =
//   (CONFIG.auth.method === 'supabase' && supabaseSignOut) ||
//   (CONFIG.auth.method === 'firebase' && firebaseSignOut) ||
//   (CONFIG.auth.method === 'amplify' && amplifySignOut) ||
//   jwtSignOut;

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, ...other }: { onClose?: () => void, [other: string]: any }) {
  // const router = useRouter();

  // const { checkUserSession } = useAuthContext();

  // const { logout: signOutAuth0 } = useAuth0();

  // const handleLogout = useCallback(async () => {
  //   try {
  //     await signOut();
  //     await checkUserSession?.();

  //     onClose?.();
  //     router.refresh();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Unable to logout!');
  //   }
  // }, [checkUserSession, onClose, router]);

  // const handleLogoutAuth0 = useCallback(async () => {
  //   try {
  //     await signOutAuth0();

  //     onClose?.();
  //     router.refresh();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Unable to logout!');
  //   }
  // }, [onClose, router, signOutAuth0]);

  return (
    <Button
      fullWidth
      variant="contained"
      size="large"
      color="error"
      // onClick={CONFIG.auth.method === 'auth0' ? handleLogoutAuth0 : handleLogout}
      {...other}
    >
      Logout
    </Button>
  );
}
