import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Stack, Typography } from "@mui/material"
import { Iconify } from "../../../component/iconify/iconify"
import { useBoolean } from "../../../hooks/hooks";
import { CheckoutSummary } from "./CheckoutCart";
import { Label } from "../../../component/label/label";
import { check, z as zod } from "zod";
import { schemaHelper } from "../../../component/hook-form/schema-helper";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../component/hook-form/form-provider";
import { Field } from "../../../component/hook-form/fields";
import LoadingButton from '@mui/lab/LoadingButton';

const _addressBooks = [
    {
        id: 1,
        primary: true,
        name: "Jayvion Simon",
        email: "nannie.abernathy70@yahoo.com",
        fullAddress: "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",
        phoneNumber: "+61 2 9876 5432",
        company: "Bartell - Kovacek",
        addressType: 'Home',
    }, {
        id: 2,
        primary: false,
        name: "Lucian Obrien",
        email: "ashlynn.ohara62@gmail.com",
        fullAddress: "36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836",
        phoneNumber: "+91 22 1234 5678",
        company: "Schimmel - Raynor",
        addressType: 'Office',
    }
]

function CheckoutBillingAddress({ checkout, handleCheckout }: { checkout: any, handleCheckout: any }) {
    const addressForm = useBoolean();

    const onBackStep = () => {
        handleCheckout((checkout: any) => ({ ...checkout, activeStep: checkout.activeStep - 1 }))
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    {_addressBooks.slice(0, 4).map((address) => (
                        <Paper
                            sx={{
                                gap: 2,
                                display: 'flex',
                                position: 'relative',
                                alignItems: { md: 'flex-end' },
                                flexDirection: { xs: 'column', md: 'row' },
                                p: 3,
                                mb: 3,
                                borderRadius: 2,
                            }}
                        >
                            <Stack flexGrow={1} spacing={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="subtitle2">
                                        {address.name}
                                        <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                                            ({address.addressType})
                                        </Box>
                                    </Typography>

                                    {address.primary && (
                                        <Label color="info" sx={{ ml: 1 }}>
                                            Default
                                        </Label>
                                    )}
                                </Stack>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {address.fullAddress}
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {address.phoneNumber}
                                </Typography>
                            </Stack>

                            <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
                                {!address.primary && (
                                    <Button size="small" color="error" sx={{ mr: 1 }}>
                                        Delete
                                    </Button>
                                )}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={
                                        () => {
                                            handleCheckout({
                                                ...checkout, activeStep: checkout.activeStep + 1, billing: {
                                                    name: address.name,
                                                    phoneNumber: address.phoneNumber,
                                                    fullAddress: address.fullAddress,
                                                    addressType: address.addressType,
                                                    primary: address.primary,
                                                }
                                            })
                                        }
                                    }
                                >
                                    Deliver to this address
                                </Button>
                            </Stack>
                        </Paper>
                    ))}

                    <Stack direction="row" justifyContent="space-between">
                        <Button
                            size="small"
                            color="inherit"
                            onClick={onBackStep}
                            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                        >
                            Back
                        </Button>

                        <Button
                            size="small"
                            color="primary"
                            onClick={addressForm.onTrue}
                            startIcon={<Iconify icon="mingcute:add-line" />}
                        >
                            New address
                        </Button>
                    </Stack>
                </Grid >

                <Grid size={{ xs: 12, md: 4 }}>
                    <CheckoutSummary
                        total={checkout.total}
                        subtotal={checkout.subtotal}
                        discount={checkout.discount}
                    />
                </Grid>
            </Grid >

            <AddressNewForm
                checkout={checkout}
                handleCheckout={handleCheckout}
                open={addressForm.value}
                onClose={addressForm.onFalse}
                onCreate={checkout.onCreateBilling}
            />
        </>
    )
}

export const NewAddressSchema = zod.object({
    city: zod.string().min(1, { message: 'City is required!' }),
    state: zod.string().min(1, { message: 'State is required!' }),
    name: zod.string().min(1, { message: 'Name is required!' }),
    address: zod.string().min(1, { message: 'Address is required!' }),
    zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
    phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
    country: schemaHelper.objectOrNull({
        message: { required_error: 'Country is required!' },
    }),
    // Not required
    primary: zod.boolean(),
    addressType: zod.string(),
});

export function AddressNewForm({ open, onClose, onCreate, checkout, handleCheckout }:
    { open: boolean, onClose: () => void, onCreate: (data: any) => void, checkout: any, handleCheckout: (data: any) => void }) {
    const defaultValues = {
        name: '',
        city: '',
        state: '',
        address: '',
        zipCode: '',
        country: '',
        primary: true,
        phoneNumber: '',
        addressType: 'Home',
    };

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(NewAddressSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            onCreate({
                name: data.name,
                phoneNumber: data.phoneNumber,
                fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
                addressType: data.addressType,
                primary: data.primary,
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
            <Form methods={methods} onSubmit={onSubmit}>
                <DialogTitle>New address</DialogTitle>

                <DialogContent dividers>
                    <Stack spacing={3}>
                        <Field.RadioGroup
                            row
                            name="addressType"
                            options={[
                                { label: 'Home', value: 'Home' },
                                { label: 'Office', value: 'Office' },
                            ]}
                        />

                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <Field.Text name="name" label="Full name" />

                            <Field.Phone name="phoneNumber" label="Phone number" />
                        </Box>

                        <Field.Text name="address" label="Address" />

                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(3, 1fr)',
                            }}
                        >
                            <Field.Text name="city" label="Town/city" />

                            <Field.Text name="state" label="State" />

                            <Field.Text name="zipCode" label="Zip/code" />
                        </Box>

                        <Field.CountrySelect name="country" label="Country" placeholder="Choose a country" />

                        <Field.Checkbox name="primary" label="Use this address as default." />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Deliver to this address
                    </LoadingButton>
                </DialogActions>
            </Form>
        </Dialog>
    );
}

export default CheckoutBillingAddress