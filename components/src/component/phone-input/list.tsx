import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { countries } from './countries';

// import { Iconify, FlagIcon } from 'src/components/iconify';
// import { SearchNotFound } from 'src/components/search-not-found';

// import { usePopover } from '../custom-popover';
// import { getCountry, applyFilter } from './utils';
import { Iconify } from '../iconify/iconify';
import { FlagIcon } from '../iconify/flag-icon';
import { usePopover } from '../custom-popover/use-popover';
import { applyFilter, getCountry } from './utils';

// ----------------------------------------------------------------------

export function CountryListPopover({ countryCode, onClickCountry }:{ countryCode?:any, onClickCountry?:any }) {
  const popover = usePopover();

  const selectedCountry = getCountry(countryCode);

  const [searchCountry, setSearchCountry] = useState('');

  const handleSearchCountry = useCallback((event:any) => {
    setSearchCountry(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: countries,
    query: searchCountry,
  });

  const notFound = !dataFiltered.length && !!setSearchCountry;

  const renderButton = (
    <ButtonBase disableRipple onClick={popover.onOpen}>
      <FlagIcon code={selectedCountry?.code} sx={{ width: 22, height: 22, borderRadius: '50%' }} />

      <Iconify
        icon="eva:chevron-down-fill"
        sx={{ ml: 0.5, flexShrink: 0, color: 'text.disabled' }}
      />

      <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
    </ButtonBase>
  );

  const renderList = (
    <MenuList>
      {dataFiltered.map((country:any) => {
        if (!country.code) {
          return null;
        }

        return (
          <MenuItem
            key={country.code}
            selected={countryCode === country.code}
            autoFocus={countryCode === country.code}
            onClick={() => {
              popover.onClose();
              setSearchCountry('');
              onClickCountry(country.code);
            }}
          >
            <FlagIcon
              code={country.code}
              sx={{ mr: 1, width: 22, height: 22, borderRadius: '50%' }}
            />

            <ListItemText
              primary={country.label}
              secondary={`${country.code} (+${country.phone})`}
              primaryTypographyProps={{ noWrap: true, typography: 'body2' }}
              secondaryTypographyProps={{ typography: 'caption' }}
            />
          </MenuItem>
        );
      })}
    </MenuList>
  );

  return (
    <>
      {renderButton}

      <Popover
        disableRestoreFocus
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={() => {
          popover.onClose();
          setSearchCountry('');
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 1,
              height: 320,
              maxWidth: 320,
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Box sx={{ px: 1, py: 1.5 }}>
          <TextField
            autoFocus
            fullWidth
            value={searchCountry}
            onChange={handleSearchCountry}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ flex: '1 1 auto', overflowX: 'hidden' }}>
          {/* {notFound ? <SearchNotFound query={searchCountry} sx={{ px: 2, pt: 5 }} /> : renderList} */}
          {notFound || renderList}
        </Box>
      </Popover>
    </>
  );
}
