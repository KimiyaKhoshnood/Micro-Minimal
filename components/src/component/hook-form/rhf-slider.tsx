import { Controller, useFormContext } from 'react-hook-form';

import Slider from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText';

// ----------------------------------------------------------------------

export function RHFSlider({ name, helperText, ...other }: { name?: any, helperText?: any, [other:string]: any }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </>
      )}
    />
  );
}
