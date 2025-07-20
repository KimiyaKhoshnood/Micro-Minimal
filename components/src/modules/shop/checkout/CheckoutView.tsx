import { Box, Container, Grid, Stack, Step, StepLabel, stepLabelClasses, Stepper, styled, Typography } from "@mui/material"
import { Checkout } from "./CheckoutData"
import { Iconify } from "../../../component/iconify/iconify";
import CheckoutCart from "./CheckoutCart";
import { useState } from "react";
import CheckoutBillingAddress from "./CheckoutBillingAddress";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutOrderComplete from "./CheckoutOrderComplete";
import MuiStepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

const StepConnector = styled(MuiStepConnector)(({ theme }) => ({
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 2,
        borderColor: "#00000015",
    },
    [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: { borderColor: "green" },
    },
}));

function CheckoutView() {
    const [checkout, setCheckout] = useState(Checkout)

    const handleCheckout = (data: any) => setCheckout(data)

    console.log(checkout);

    return (
        <Container sx={{ mb: 10 }}>
            <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
                Checkout
            </Typography>

            <Grid container justifyContent={checkout.completed ? 'center' : 'flex-start'}>
                <Grid size={{ xs: 12, md: 8 }} >
                    <Stepper
                        alternativeLabel
                        activeStep={checkout.activeStep}
                        connector={<StepConnector />}
                        sx={{ mb: { xs: 3, md: 5 } }}
                    >
                        {PRODUCT_CHECKOUT_STEPS.map((label, index) => (
                            <Step key={label}>
                                <StepLabel
                                    icon={<Stack
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{ width: 24, height: 24, color: 'text.disabled' }}
                                    >
                                        {index < checkout.activeStep ? <Iconify icon="eva:checkmark-fill" sx={{ color: 'green' }} />
                                        : <Box
                                            sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: checkout.activeStep == index ? 'green' : 'currentColor' }}
                                        />}
                                    </Stack>}
                                    sx={{ [`& .${stepLabelClasses.label}`]: { fontWeight: 'fontWeightSemiBold' } }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>
            </Grid>

            <>
                {checkout.activeStep === 0 && <CheckoutCart checkout={checkout} handleCheckout={handleCheckout} />}

                {checkout.activeStep === 1 && <CheckoutBillingAddress checkout={checkout} handleCheckout={handleCheckout} />}

                {checkout.activeStep === 2 && <CheckoutPayment checkout={checkout} handleCheckout={handleCheckout} />}

                {checkout.completed && (
                    <CheckoutOrderComplete open onReset={() => setCheckout(Checkout)} onDownloadPDF={() => { }} />
                )}
            </>
        </Container>
    )
}

export default CheckoutView