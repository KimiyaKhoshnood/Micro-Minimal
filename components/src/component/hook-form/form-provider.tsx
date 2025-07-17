import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export function Form({ children, onSubmit, methods }: { children?: any, onSubmit?: any, methods?: any }) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFForm>
  );
}
