import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

export function RHFCheckbox({ name, helperText, label, slotProps, ...other }: { name?: any, helperText?: any, label?: any, slotProps?: any, [other: string]: any }) {
    const { control } = useFormContext();

    const ariaLabel = `Checkbox ${name}`;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Box sx={slotProps?.wrap}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...field}
                                checked={field.value}
                                {...slotProps?.checkbox}
                                inputProps={{
                                    ...(!label && { 'aria-label': ariaLabel }),
                                    ...slotProps?.checkbox?.inputProps,
                                }}
                            />
                        }
                        label={label}
                        {...other}
                    />

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} {...slotProps?.formHelperText}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    );
}

// ----------------------------------------------------------------------

export function RHFMultiCheckbox({ name, label, options, slotProps, helperText, ...other }: { name?: any, label?: any, options?: any, slotProps?: any, helperText?: any, [other: string]: any }) {
    const { control } = useFormContext();

    const getSelected = (selectedItems?: any, item?: any) =>
        selectedItems.includes(item)
            ? selectedItems.filter((value?: any) => value !== item)
            : [...selectedItems, item];

    const accessibility = (val?: any) => val;
    const ariaLabel = (val?: any) => `Checkbox ${val}`;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" sx={slotProps?.wrap}>
                    {label && (
                        <FormLabel
                            component="legend"
                            {...slotProps?.formLabel}
                            sx={{ mb: 1, typography: 'body2', ...slotProps?.formLabel?.sx }}
                        >
                            {label}
                        </FormLabel>
                    )}

                    <FormGroup {...other}>
                        {options.map((option?: any) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={field.value.includes(option.value)}
                                        onChange={() => field.onChange(getSelected(field.value, option.value))}
                                        name={accessibility(option.label)}
                                        {...slotProps?.checkbox}
                                        inputProps={{
                                            ...(!option.label && { 'aria-label': ariaLabel(option.label) }),
                                            ...slotProps?.checkbox?.inputProps,
                                        }}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </FormGroup>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} sx={{ mx: 0 }} {...slotProps?.formHelperText}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}
