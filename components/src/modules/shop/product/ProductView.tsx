import { Badge, Box, Container, Link, Typography } from "@mui/material"
import ProductOverview from "./ProductOverview"
import { Iconify } from "../../../component/iconify/iconify"
import { CustomBreadcrumbs } from "../../../component/custom-breadcrumbs/custom-breadcrumbs"
import ProductDetails from "./ProductDetails";

// ----------------------------------------------------------------------

const SUMMARY = [
    {
        title: '100% original',
        description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
        icon: 'solar:verified-check-bold',
    },
    {
        title: '10 days replacement',
        description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
        icon: 'solar:clock-circle-bold',
    },
    {
        title: 'Year warranty',
        description: 'Cotton candy gingerbread cake I love sugar sweet.',
        icon: 'solar:shield-check-bold',
    },
];

// ----------------------------------------------------------------------

function ProductView({ product, handleCheckout, checkoutProducts }: { product: { [key: string]: any }, handleCheckout: (data: any) => void, checkoutProducts: { [key: string]: any } }) {

    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            <Box
                component={Link}
                // href={paths.product.checkout}
                href={"/shop/checkout/"}
                sx={{
                    right: 0,
                    top: 112,
                    zIndex: 999,
                    display: 'flex',
                    cursor: 'pointer',
                    position: 'fixed',
                    color: 'text.primary',
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    bgcolor: 'background.paper',
                    padding: (theme) => theme.spacing(1, 3, 1, 2),
                    boxShadow: '2px 2px 2px 2px #efefef',
                    transition: (theme) => theme.transitions.create(['opacity']),
                    '&:hover': { opacity: 0.72 },
                }}
            >
                <Badge showZero badgeContent={checkoutProducts?.items.length} color="error" max={99}>
                    <Iconify icon="solar:cart-3-bold" width={24} />
                </Badge>
            </Box>

            <CustomBreadcrumbs
                links={[
                    { name: 'Home', href: '/' },
                    { name: 'Shop', href: '/shop' },
                    { name: product?.name },
                ]}
                sx={{ mb: 5 }}
            />

            <ProductOverview product={product} handleCheckout={handleCheckout} />

            <Box
                gap={5}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                sx={{ my: 10 }}
            >
                {SUMMARY.map((item: any) => (
                    <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
                        <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

                        <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
                            {item.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.description}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <ProductDetails product={product} />
        </Container>
    )
}

export default ProductView