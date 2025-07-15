import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

export function RHFAutocomplete({ name, label, helperText, hiddenLabel, placeholder, ...other }: { name?: any, label?: any, helperText?: any, hiddenLabel?: any, placeholder?: any, [other: string]: any }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
