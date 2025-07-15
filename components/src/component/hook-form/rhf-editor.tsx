import { Controller, useFormContext } from 'react-hook-form';

// import { Editor } from '../editor';

// ----------------------------------------------------------------------

export function RHFEditor({ name, helperText, ...other }:{ name:any, helperText:any, [other:string]:any }) {
  const {
    control,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>editor</div>
        // <Editor
        //   {...field}
        //   error={!!error}
        //   helperText={error?.message ?? helperText}
        //   resetValue={isSubmitSuccessful}
        //   {...other}
        // />
      )}
    />
  );
}
