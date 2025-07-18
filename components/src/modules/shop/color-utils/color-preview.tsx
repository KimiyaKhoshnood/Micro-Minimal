import { forwardRef } from 'react';

import Box from '@mui/material/Box';

// import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

export const ColorPreview = forwardRef(({ colors, limit = 3, sx, ...other }:{colors?:any, limit?:number, sx?:any, [other:string]:any}, ref) => {
  const colorsRange = colors.slice(0, limit);

  const restColors = colors.length - limit;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...sx,
      }}
      {...other}
    >
      {colorsRange.map((color:any, index:number) => (
        <Box
          key={color + index}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            bgcolor: color,
            borderRadius: '50%',
            border: (theme) => `solid 2px white`,
            boxShadow: (theme) =>
              `inset -1px 1px 2px blue`,
          }}
        />
      ))}

      {colors.length > limit && (
        <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${restColors}`}</Box>
      )}
    </Box>
  );
});
