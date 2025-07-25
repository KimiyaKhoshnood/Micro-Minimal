import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import { usePopover } from '../custom-popover/use-popover';
import { varAlpha } from '../../theme/styles/utils';
import { Iconify } from '../iconify/iconify';
import { CustomPopover } from '../custom-popover/custom-popover';

// ----------------------------------------------------------------------

export function ChartSelect({ options, value, onChange, slotProps, ...other }: { options?: any, value?: any, onChange?: any, slotProps?: any, [other: string]: any }) {
  const popover = usePopover();

  return (
    <>
      <ButtonBase
        onClick={popover.onOpen}
        sx={{
          pr: 1,
          pl: 1.5,
          gap: 1.5,
          height: 34,
          borderRadius: 1,
          typography: 'subtitle2',
          border: (theme: any) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
          ...slotProps?.button,
        }}
        {...other}
      >
        {value}

        <Iconify
          width={16}
          icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
        />
      </ButtonBase>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList sx={slotProps?.popover}>
          {options.map((option: any) => (
            <MenuItem
              key={option}
              selected={option === value}
              onClick={() => {
                popover.onClose();
                onChange(option);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
