import { parsePhoneNumber } from 'react-phone-number-input';

import { countries } from './countries';

// ----------------------------------------------------------------------

export function getCountryCode(inputValue: any, countryCode: any) {
  if (inputValue) {
    const phoneNumber = parsePhoneNumber(inputValue);

    if (phoneNumber) {
      return phoneNumber?.country;
    }
  }

  return countryCode ?? 'US';
}

// ----------------------------------------------------------------------

export function getCountry(countryCode: any) {
  const option = countries.filter((country) => country.code === countryCode)[0];
  return option;
}

export function applyFilter({ inputData, query }:any) {
  if (query) {
    return inputData.filter(
      (country: any) =>
        country.label.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        country.code.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        country.phone.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
