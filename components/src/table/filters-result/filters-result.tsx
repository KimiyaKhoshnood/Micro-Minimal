import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Iconify } from '../../component/iconify/iconify';

// ----------------------------------------------------------------------

export const chipProps: { size: 'small' | 'medium', variant: 'outlined' | 'filled' } = {
  size: 'small',
  variant: 'filled',
};

export function FiltersResult({ totalResults, onReset, sx, children }: { totalResults?: any, onReset?: any, sx?: any, children?: any }) {
  return (
    <Box sx={sx}>
      <Box sx={{ mb: 1.5, typography: 'body2' }}>
        <strong>{totalResults}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Box flexGrow={1} gap={1} display="flex" flexWrap="wrap" alignItems="center">
        {children}

        <Button
          color="error"
          onClick={onReset}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
}
