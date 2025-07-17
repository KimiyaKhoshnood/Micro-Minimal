import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { CONFIG } from 'src/config-global';
// import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function EmptyContent({
  sx,
  imgUrl,
  action,
  filled,
  slotProps,
  description,
  title = 'No data',
  ...other
}: {
  sx?: any,
  imgUrl?: string,
  action?: any,
  filled?: boolean,
  slotProps?: any,
  description?: string,
  title?: string,
  [other: string]: any
}) {
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 3,
        height: 1,
        ...(filled && {
          borderRadius: 2,
          bgcolor: '#efefef',
          border: 'dashed 1px black',
        }),
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        alt="empty content"
        src={imgUrl ?? `http://localhost:1001/assets/icons/empty/ic-content.svg`}
        sx={{ width: 1, maxWidth: 160, ...slotProps?.img }}
      />

      {title && (
        <Typography
          variant="h6"
          component="span"
          sx={{
            mt: 1,
            textAlign: 'center',
            ...slotProps?.title,
            color: 'text.disabled',
          }}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            textAlign: 'center',
            color: 'text.disabled',
            ...slotProps?.description,
          }}
        >
          {description}
        </Typography>
      )}

      {action && action}
    </Stack>
  );
}
