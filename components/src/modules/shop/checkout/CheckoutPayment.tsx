import { Box, Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, InputAdornment, ListItemText, Paper, Stack, TextField, Tooltip } from "@mui/material"
import { Form } from "../../../component/hook-form/form-provider"
import { Iconify } from "../../../component/iconify/iconify"
import { CheckoutSummary } from "./CheckoutCart"
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { useBoolean } from "../../../hooks/hooks";
import { useEffect } from "react";

const DELIVERY_OPTIONS = [
    { value: 0, label: 'Free', description: '5-7 days delivery' },
    { value: 10, label: 'Standard', description: '3-5 days delivery' },
    { value: 20, label: 'Express', description: '2-3 days delivery' },
];

const PAYMENT_OPTIONS = [
    {
        value: 'paypal',
        label: 'Pay with Paypal',
        description: 'You will be redirected to PayPal website to complete your purchase securely.',
    },
    {
        value: 'credit',
        label: 'Credit / Debit card',
        description: 'We support Mastercard, Visa, Discover and Stripe.',
    },
    { value: 'cash', label: 'Cash', description: 'Pay with cash when your order is delivered.' },
];

const CARDS_OPTIONS = [
    { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
    { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
    { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

// ----------------------------------------------------------------------

export const PaymentSchema = zod.object({
    payment: zod.string().min(1, { message: 'Payment is required!' }),
    // Not required
    delivery: zod.number(),
});

// ----------------------------------------------------------------------

function CheckoutPayment({ checkout, handleCheckout }: { checkout: any, handleCheckout: any }) {
    // const { control } = useFormContext();
    const newCard = useBoolean();

    useEffect(() => {
        updateTotalField()
    }, [checkout.shipping, checkout.total])

    const updateTotalField = () => {
        const totalItems = checkout.items.reduce((total: any, item: any) => total + item.quantity, 0);

        const subtotal = checkout.items.reduce((total: any, item: any) => total + item.quantity * item.price, 0);

        handleCheckout((checkout: any) => ({
            ...checkout,
            totalItems: totalItems,
            subtotal: subtotal,
            total: checkout.subtotal - checkout.discount + checkout.shipping
        }));
    };

    const onBackStep = () => {
        handleCheckout((checkout: any) => ({ ...checkout, activeStep: checkout.activeStep - 1 }))
    }

    const onGotoStep = (step:number) => {
        handleCheckout((checkout: any) => ({ ...checkout, activeStep: step }))
    }

    const defaultValues = { delivery: checkout.shipping, payment: '' };

    const methods = useForm({
        resolver: zodResolver(PaymentSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data: any) => {
        try {
            checkout.onNextStep();
            checkout.onReset();
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    {/* <CheckoutDelivery onApplyShipping={checkout.onApplyShipping} options={DELIVERY_OPTIONS} /> */}
                    <Card>
                        <CardHeader title="Delivery" />

                        <Controller
                            name="delivery"
                            // control={control}
                            render={({ field }) => (
                                <Box
                                    columnGap={2}
                                    rowGap={2.5}
                                    display="grid"
                                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
                                    sx={{ p: 3 }}
                                >
                                    {DELIVERY_OPTIONS.map((option) => (
                                        <OptionItem
                                            key={option.label}
                                            option={option}
                                            selected={field.value === option.value}
                                            onClick={() => {
                                                handleCheckout({ ...checkout, shipping: option.value });
                                                field.onChange(option.value);
                                                checkout.onApplyShipping(option.value);
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                        />
                    </Card>

                    <Card sx={{ my: 3 }}>
                        <CardHeader title="Payment" />

                        <Controller
                            name="payment"
                            // control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
                                    {PAYMENT_OPTIONS.map((option) => (
                                        <OptionItem
                                            option={option}
                                            key={option.label}
                                            onOpen={newCard.onTrue}
                                            cardOptions={CARDS_OPTIONS}
                                            selected={field.value === option.value}
                                            isCredit={option.value === 'credit' && field.value === 'credit'}
                                            onClick={() => {
                                                field.onChange(option.value);
                                            }}
                                        />
                                    ))}

                                    {!!error && (
                                        <FormHelperText error sx={{ pt: 1, px: 2 }}>
                                            {error.message}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            )}
                        />
                    </Card>

                    <Dialog maxWidth="sm" onClose={newCard.onFalse} open={newCard.value}>
                        <DialogTitle> New card </DialogTitle>

                        <DialogContent sx={{ overflow: 'unset' }}>
                            <Stack spacing={2.5}>
                                <TextField
                                    autoFocus
                                    label="Card number"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    label="Card holder"
                                    placeholder="JOHN DOE"
                                    InputLabelProps={{ shrink: true }}
                                />

                                <Stack spacing={2} direction="row">
                                    <TextField
                                        label="Expiration date"
                                        placeholder="MM/YY"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        label="CVV/CVC"
                                        placeholder="***"
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Tooltip
                                                        arrow
                                                        placement="top"
                                                        title="Three-digit number on the back of your VISA card"
                                                        slotProps={{ tooltip: { sx: { maxWidth: 160, textAlign: 'center' } } }}
                                                    >
                                                        <Iconify width={18} icon="eva:info-outline" />
                                                    </Tooltip>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Stack>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    sx={{ typography: 'caption', color: 'text.disabled' }}
                                >
                                    <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
                                    Your transaction is secured with SSL encryption
                                </Stack>
                            </Stack>
                        </DialogContent>

                        <DialogActions>
                            <Button color="inherit" variant="outlined" onClick={newCard.onFalse}>
                                Cancel
                            </Button>

                            <Button variant="contained" onClick={newCard.onFalse}>
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>


                    {/* <CheckoutPaymentMethods
                        options={{
                            payments: PAYMENT_OPTIONS,
                            cards: CARDS_OPTIONS,
                        }}
                        sx={{ my: 3 }}
                    /> */}

                    <Button
                        size="small"
                        color="inherit"
                        onClick={onBackStep}
                        startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                    >
                        Back
                    </Button>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader
                            title="Address"
                            action={
                                <Button size="small" startIcon={<Iconify icon="solar:pen-bold" />} onClick={onBackStep}>
                                    Edit
                                </Button>
                            }
                        />
                        <Stack spacing={1} sx={{ p: 3 }}>
                            <Box sx={{ typography: 'subtitle2' }}>
                                {`${checkout.billing?.name} `}
                                <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
                                    ({checkout.billing?.addressType})
                                </Box>
                            </Box>

                            <Box sx={{ color: 'text.secondary', typography: 'body2' }}>{checkout.billing?.fullAddress}</Box>

                            <Box sx={{ color: 'text.secondary', typography: 'body2' }}>{checkout.billing?.phoneNumber}</Box>
                        </Stack>
                    </Card>

                    <CheckoutSummary
                        total={checkout.total}
                        subtotal={checkout.subtotal}
                        discount={checkout.discount}
                        shipping={checkout.shipping}
                        onEdit={() => onGotoStep(0)}
                    />

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        onClick={() => handleCheckout({ ...checkout, completed: true })}
                    >
                        Complete order
                    </LoadingButton>
                </Grid>
            </Grid>
        </Form>
    )
}

function OptionItem({ option, selected, ...other }: { option?: any, selected?: any, [other: string]: any }) {
    const { value, label, description } = option;

    return (
        <Paper
            variant="outlined"
            key={value}
            sx={{
                p: 2.5,
                cursor: 'pointer',
                display: 'flex',
                borderRadius: 3,
                ...(selected && { boxShadow: '0 0 0 2px black' }),
            }}
            {...other}
        >
            {label === 'Free' && <Iconify icon="carbon:bicycle" width={32} />}
            {label === 'Standard' && <Iconify icon="carbon:delivery" width={32} />}
            {label === 'Express' && <Iconify icon="carbon:rocket" width={32} />}

            <ListItemText
                sx={{ ml: 2 }}
                primary={
                    <Stack direction="row" alignItems="center">
                        <Box component="span" sx={{ flexGrow: 1 }}>
                            {label}
                        </Box>
                        {['credit', 'paypal', 'cash'].includes(value) && <Stack spacing={1} direction="row" alignItems="center">
                            {value === 'credit' && (
                                <>
                                    <Iconify icon="logos:mastercard" width={24} />
                                    ,
                                    <Iconify icon="logos:visa" width={24} />
                                </>
                            )}
                            {value === 'paypal' && <Iconify icon="logos:paypal" width={24} />}
                            {value === 'cash' && <Iconify icon="solar:wad-of-money-bold" width={32} />}
                        </Stack>}
                        {['credit', 'paypal', 'cash'].includes(value) || <Box component="span" sx={{ typography: 'h6' }}>{`$${value}`}</Box>}
                    </Stack>
                }
                secondary={description}
                primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
                secondaryTypographyProps={{ typography: 'body2' }}
            />
        </Paper>
    );
}

export default CheckoutPayment