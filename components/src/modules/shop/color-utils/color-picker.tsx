import { forwardRef, useCallback } from 'react';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import { alpha as hexAlpha } from '@mui/material/styles';
import { Iconify } from '../../../component/iconify/iconify';

// ----------------------------------------------------------------------

export const ColorPicker = forwardRef(
  ({ colors, selected, onSelectColor, limit = 'auto', sx, slotProps, ...other }: { colors?: any, selected?: any, onSelectColor?: any, limit?: number|'auto', sx?: () => void, slotProps?: any, [other:string]: any }, ref) => {
    const singleSelect = typeof selected === 'string';

    const handleSelect = useCallback(
      (color:any) => {
        if (singleSelect) {
          if (color !== selected) {
            onSelectColor(color);
          }
        } else {
          const newSelected = selected.includes(color)
            ? selected.filter((value:any) => value !== color)
            : [...selected, color];

          onSelectColor(newSelected);
        }
      },
      [onSelectColor, selected, singleSelect]
    );

    return (
      <Box
        ref={ref}
        component="ul"
        sx={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          display: 'inline-flex',
          ...(limit !== 'auto' && {
            width: limit * 36,
            justifyContent: 'flex-end',
          }),
          ...sx,
        }}
        {...other}
      >
        {colors.map((color:any) => {
          const hasSelected = singleSelect ? selected === color : selected.includes(color);

          return (
            <Box component="li" key={color} sx={{ display: 'inline-flex' }}>
              <ButtonBase
                aria-label={color}
                onClick={() => handleSelect(color)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  ...slotProps?.button,
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: color,
                    borderRadius: '50%',
                    border: () =>
                      `solid 1px gray`,
                    ...(hasSelected && {
                      transform: 'scale(1.3)',
                      boxShadow: `4px 4px 8px 0 ${hexAlpha(color, 0.48)}`,
                      outline: `solid 2px ${hexAlpha(color, 0.08)}`,
                      transition: (theme) =>
                        theme.transitions.create('all', {
                          duration: theme.transitions.duration.shortest,
                        }),
                    }),
                  }}
                >
                  <Iconify
                    width={hasSelected ? 12 : 0}
                    icon="eva:checkmark-fill"
                    sx={{
                      color: (theme:any) => theme.palette.getContrastText(color),
                      transition: (theme:any) =>
                        theme.transitions.create('all', {
                          duration: theme.transitions.duration.shortest,
                        }),
                    }}
                  />
                </Stack>
              </ButtonBase>
            </Box>
          );
        })}
      </Box>
    );
  }
);
