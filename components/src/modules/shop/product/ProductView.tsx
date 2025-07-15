import { Container } from "@mui/material"
import ProductOverview from "./ProductOverview"

function ProductView({ product }: { product: { [key: string]: any } }) {
    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            {/* <CartIcon totalItems={checkout.totalItems} /> */}

            {/* <CustomBreadcrumbs
                links={[
                    { name: 'Home', href: '/' },
                    { name: 'Shop', href: paths.product.root },
                    { name: product?.name },
                ]}
                sx={{ mb: 5 }}
            /> */}

            <ProductOverview product={product}/>

            {/* <Box
                gap={5}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                sx={{ my: 10 }}
            >
                {SUMMARY.map((item) => (
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

            <Card>
                <Tabs
                    value={tabs.value}
                    onChange={tabs.onChange}
                    sx={{
                        px: 3,
                        boxShadow: (theme) =>
                            `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                    }}
                >
                    {[
                        { value: 'description', label: 'Description' },
                        { value: 'reviews', label: `Reviews (${product?.reviews.length})` },
                    ].map((tab) => (
                        <Tab key={tab.value} value={tab.value} label={tab.label} />
                    ))}
                </Tabs>

                {tabs.value === 'description' && (
                    <ProductDetailsDescription description={product?.description} />
                )}

                {tabs.value === 'reviews' && (
                    <ProductDetailsReview
                        ratings={product?.ratings}
                        reviews={product?.reviews}
                        totalRatings={product?.totalRatings}
                        totalReviews={product?.totalReviews}
                    />
                )}
            </Card> */}
        </Container>
    )
}

export default ProductView