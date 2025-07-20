import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, IconButton, InputAdornment, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { Iconify } from "../../../component/iconify/iconify";
import { EmptyContent } from "../../../component/empty-content/empty-content";
import { Scrollbar } from "../../../component/scrollbar/scrollbar";
import { TableHeadCustom } from "../../../component/table/table-head-custom";
import { Label } from "../../../component/label/label";
import { ColorPreview } from "../color-utils/color-preview";
import { fCurrency } from "../products/ProductUtils";
import { IncrementerButton } from "../product/ProductOverview";
import { useEffect } from "react";

const TABLE_HEAD = [
    { id: 'product', label: 'Product' },
    { id: 'price', label: 'Price' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'totalAmount', label: 'Total Price', align: 'right' },
    { id: '' },
];

function CheckoutCart({ checkout, handleCheckout }: { checkout: any, handleCheckout: any }) {
    const empty = !checkout.items.length;

    useEffect(() => {
        updateTotalField()
    }, [checkout.items, checkout.shipping, checkout.billing, checkout.activeStep, checkout.discount])

    const updateTotalField = () => {
        const totalItems = checkout.items.reduce((total: any, item: any) => total + item.quantity, 0);

        const subtotal = checkout.items.reduce((total: any, item: any) => total + item.quantity * item.price, 0);

        handleCheckout((checkout: any) => ({
            ...checkout,
            totalItems: totalItems,
            subtotal: subtotal,
            total: subtotal - checkout.discount + checkout.shipping
        }));
    };

    const onIncreaseQuantity = (id: string) => {
        handleCheckout((checkout: any) => ({
            ...checkout,
            items: checkout.items.map((item: any) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            ),
        }))
    }

    const onDecreaseQuantity = (id: string) => {
        handleCheckout((checkout: any) => ({
            ...checkout,
            items: checkout.items.map((item: any) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            ),
        }))
    }

    const onDeleteCart = (id: string) => {
        handleCheckout({ ...checkout, items: checkout.items.filter((product: any) => product.id !== id) })
    }

    const onApplyDiscount = (discount: number) => {
        handleCheckout((checkout: any) => ({ ...checkout, discount: discount }))
    }

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
                <Card sx={{ mb: 3 }}>
                    <CardHeader
                        title={
                            <Typography variant="h6">
                                Cart
                                <Typography component="span" sx={{ color: 'text.secondary' }}>
                                    &nbsp;(
                                    {checkout.totalItems} item)
                                </Typography>
                            </Typography>
                        }
                        // sx={{ mb: 3 }}
                    />

                    {empty ? (
                        <EmptyContent
                            title="Cart is empty!"
                            description="Look like you have no items in your shopping cart."
                            imgUrl={`/assets/icons/empty/ic-cart.svg`}
                            sx={{ pt: 5, pb: 10 }}
                        />
                    ) : (
                        <CheckoutCartProductList
                            products={checkout.items}
                            onDelete={onDeleteCart}
                            onIncreaseQuantity={onIncreaseQuantity}
                            onDecreaseQuantity={onDecreaseQuantity}
                        />
                    )}
                </Card>

                <Button
                    // component={RouterLink}
                    // href={paths.product.root}
                    href={"/shop"}
                    color="inherit"
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                >
                    Continue shopping
                </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <CheckoutSummary
                    total={checkout.total}
                    discount={checkout.discount}
                    subtotal={checkout.subtotal}
                    onApplyDiscount={onApplyDiscount}
                />

                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={empty}
                    onClick={() => handleCheckout({ ...checkout, activeStep: checkout.activeStep + 1 })}
                >
                    Check out
                </Button>
            </Grid>
        </Grid>
    );
}

function CheckoutCartProductList({
    products,
    onDelete,
    onIncreaseQuantity,
    onDecreaseQuantity,
}: {
    products: any[],
    onDelete: (id: string) => void,
    onIncreaseQuantity: (id: string) => void,
    onDecreaseQuantity: (id: string) => void,
}) {
    return (
        <Scrollbar>
            <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} sx={{bgcolor:"#f4f6f8"}}/>

                <TableBody>
                    {products.map((row) => (
                        <TableRow>
                            <TableCell sx={{ borderStyle:"dashed" ,borderColor:"#00000015"}}>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Avatar
                                        variant="rounded"
                                        alt={row.name}
                                        src={row.coverUrl}
                                        sx={{ width: 64, height: 64 }}
                                    />

                                    <Stack spacing={0.5}>
                                        <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                                            {row.name}
                                        </Typography>

                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            sx={{ typography: 'body2', color: 'text.secondary' }}
                                        >
                                            size: <Label sx={{ ml: 0.5 }}> {row.size} </Label>
                                            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
                                            <ColorPreview colors={row.colors} />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </TableCell>

                            <TableCell  sx={{ borderStyle:"dashed" ,borderColor:"#00000015"}}>{fCurrency(row.price)}</TableCell>

                            <TableCell  sx={{ borderStyle:"dashed" ,borderColor:"#00000015"}}>
                                <Box sx={{ width: 88, textAlign: 'right' }}>
                                    <IncrementerButton
                                        quantity={row.quantity}
                                        onDecrease={() => onDecreaseQuantity(row.id)}
                                        onIncrease={() => onIncreaseQuantity(row.id)}
                                        disabledDecrease={row.quantity <= 1}
                                        disabledIncrease={row.quantity >= row.available}
                                    />

                                    <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
                                        available: {row.available}
                                    </Typography>
                                </Box>
                            </TableCell>

                            <TableCell  sx={{ borderStyle:"dashed" ,borderColor:"#00000015"}} align="right">{fCurrency(row.price * row.quantity)}</TableCell>

                            <TableCell  sx={{ borderStyle:"dashed" ,borderColor:"#00000015", px: 1 }} align="right">
                                <IconButton href="" onClick={() => onDelete(row.id)}>
                                    <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Scrollbar>
    );
}

export function CheckoutSummary({ total, onEdit, discount, subtotal, shipping, onApplyDiscount }: { total?: number, onEdit?: () => void, discount?: number, subtotal?: number, shipping?: string, onApplyDiscount?: (discount: number) => void }) {
    const displayShipping = shipping !== null ? 'Free' : '-';

    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                title="Order summary"
                action={
                    onEdit && (
                        <Button size="small" onClick={onEdit} startIcon={<Iconify icon="solar:pen-bold" />}>
                            Edit
                        </Button>
                    )
                }
            />

            <Stack spacing={2} sx={{ p: 3 }}>
                <Box display="flex">
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ flexGrow: 1, color: 'text.secondary' }}
                    >
                        Sub total
                    </Typography>
                    <Typography component="span" variant="subtitle2">
                        {fCurrency(subtotal)}
                    </Typography>
                </Box>

                <Box display="flex">
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ flexGrow: 1, color: 'text.secondary' }}
                    >
                        Discount
                    </Typography>
                    <Typography component="span" variant="subtitle2">
                        {discount ? fCurrency(-discount) : '-'}
                    </Typography>
                </Box>

                <Box display="flex">
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ flexGrow: 1, color: 'text.secondary' }}
                    >
                        Shipping
                    </Typography>
                    <Typography component="span" variant="subtitle2">
                        {shipping ? fCurrency(shipping) : displayShipping}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box display="flex">
                    <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
                        Total
                    </Typography>

                    <Box sx={{ textAlign: 'right' }}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            sx={{ display: 'block', color: 'error.main' }}
                        >
                            {fCurrency(total)}
                        </Typography>
                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                            (VAT included if applicable)
                        </Typography>
                    </Box>
                </Box>

                {onApplyDiscount && (
                    <TextField
                        fullWidth
                        placeholder="Discount codes / Gifts"
                        defaultValue="DISCOUNT5"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button color="primary" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                                        Apply
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            </Stack>
        </Card>
    )
}

export default CheckoutCart