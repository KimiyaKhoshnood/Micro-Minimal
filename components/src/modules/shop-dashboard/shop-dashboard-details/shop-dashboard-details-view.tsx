import { useCallback, useEffect, useState } from "react";
import { useTabs } from "../../../hooks/hooks";
import { Box, Button, Card, Grid, IconButton, Link, MenuItem, MenuList, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { Iconify } from "../../../component/iconify/iconify";
import { varAlpha } from "../../../theme/styles/utils";
import { ProductDetailsDescription, ProductDetailsReview } from "../../shop/product/ProductDetails";
import { ProductDetailsCarousel, ProductDetailsSummary } from "../../shop/product/ProductOverview";
import { usePopover } from "../../../component/custom-popover/use-popover";
import { CustomPopover } from "../../../component/custom-popover/custom-popover";
import LoadingButton from '@mui/lab/LoadingButton';
import { DashboardContent } from "../../dashboard/dashboard/layout";

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

const PRODUCT_PUBLISH_OPTIONS = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
];

// ----------------------------------------------------------------------


const ShopDashboardDetailsView = ({ product, handleCheckout }: { product: any, handleCheckout?: (data: any) => void }) => {
    const tabs = useTabs('description');

    const [publish, setPublish] = useState('');

    useEffect(() => {
        if (product) {
            setPublish(product?.publish);
        }
    }, [product]);

    const handleChangePublish = useCallback((newValue: any) => {
        setPublish(newValue);
    }, []);

    return (
        <DashboardContent>
            <ProductDetailsToolbar
                backLink={"/"}
                editLink={"/"}
                liveLink={"/"}
                publish={publish}
                onChangePublish={handleChangePublish}
                publishOptions={PRODUCT_PUBLISH_OPTIONS}
            />

            <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
                <Grid size={{ xs: 12, md: 6, lg: 7 }}>
                    <ProductDetailsCarousel images={product?.images ?? []} />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                    {product && <ProductDetailsSummary handleCheckout={handleCheckout} disableActions product={product} />}
                </Grid>
            </Grid>

            <Box
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
                        boxShadow: (theme: any) =>
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
                    <ProductDetailsDescription description={product?.description ?? ''} />
                )}

                {tabs.value === 'reviews' && (
                    <ProductDetailsReview
                        ratings={product?.ratings ?? []}
                        reviews={product?.reviews ?? []}
                        totalRatings={product?.totalRatings ?? 0}
                        totalReviews={product?.totalReviews ?? 0}
                    />
                )}
            </Card>
        </DashboardContent>
    );
}

export default ShopDashboardDetailsView

// ----------------------------------------------------------------------

export function ProductDetailsToolbar({
    publish,
    backLink,
    editLink,
    liveLink,
    publishOptions,
    onChangePublish,
    sx,
    ...other
}: {
    publish?: any,
    backLink?: any,
    editLink?: any,
    liveLink?: any,
    publishOptions?: any,
    onChangePublish?: any,
    sx?: any,
    [other: string]: any
}) {
    const popover = usePopover();

    return (
        <>
            <Stack spacing={1.5} direction="row" sx={{ mb: { xs: 3, md: 5 }, ...sx }} {...other}>
                <Button
                    component={Link}
                    href={backLink}
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
                >
                    Back
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                {publish === 'published' && (
                    <Tooltip title="Go Live">
                        <IconButton component={Link} href={liveLink}>
                            <Iconify icon="eva:external-link-fill" />
                        </IconButton>
                    </Tooltip>
                )}

                <Tooltip title="Edit">
                    <IconButton component={Link} href={editLink}>
                        <Iconify icon="solar:pen-bold" />
                    </IconButton>
                </Tooltip>

                <LoadingButton
                    color="inherit"
                    variant="contained"
                    loading={!publish}
                    loadingIndicator="Loading…"
                    endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                    onClick={popover.onOpen}
                    sx={{ textTransform: 'capitalize' }}
                >
                    {publish}
                </LoadingButton>
            </Stack>

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: 'top-right' } }}
            >
                <MenuList>
                    {publishOptions.map((option: any) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === publish}
                            onClick={() => {
                                popover.onClose();
                                onChangePublish(option.value);
                            }}
                        >
                            {option.value === 'published' && <Iconify icon="eva:cloud-upload-fill" />}
                            {option.value === 'draft' && <Iconify icon="solar:file-text-bold" />}
                            {option.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </CustomPopover>
        </>
    );
}
