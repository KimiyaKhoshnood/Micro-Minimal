import { Badge, Box, Container, Link, Pagination, paginationClasses, Typography } from "@mui/material"
import ProductCard from "./ProductCard"
import { ProductFiltersSection } from "./ProductFiltersSection"
import { Iconify } from "../../../component/iconify/iconify"

function ProductsView({ products, checkoutProducts, handleCheckout }: { products: any[], checkoutProducts: { [key: string]: any }, handleCheckout: (data: any) => void }) {

    return (
        <Container sx={{ mb: 15 }}>
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

            <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
                Shop
            </Typography>

            <ProductFiltersSection products={products} />

            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
            >
                {products.map((product) => <ProductCard product={product} handleCheckout={handleCheckout} />)}
            </Box>

            {products.length > 8 && (
                <Pagination
                    count={8}
                    sx={{
                        mt: { xs: 5, md: 8 },
                        [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
                    }}
                />
            )}
        </Container>
    )
}

export default ProductsView