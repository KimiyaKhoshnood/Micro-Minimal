import { Box, Button, Divider, formHelperTextClasses, Grid, IconButton, Link, MenuItem, Rating, Stack, Typography } from "@mui/material"
import { forwardRef, useCallback, useEffect } from "react";
import { Image } from "../../../component/image/image";
import { Carousel } from "../../../component/carousel/carousel";
import { CarouselThumb, CarouselThumbs } from "../../../component/carousel/components/carousel-thumbs";
import { CarouselArrowNumberButtons } from "../../../component/carousel/components/carousel-arrow-buttons";
import { useCarousel } from "../../../component/carousel/hooks/use-carousel";
import { Lightbox } from "../../../component/lightbox/lightbox";
import { useLightBox } from "../../../component/lightbox/use-light-box";
import { Iconify } from "../../../component/iconify/iconify";
import { ColorPicker } from "../color-utils/color-picker";
import { Label } from "../../../component/label/label";
import { useForm, Controller } from 'react-hook-form';
import { fCurrency } from "../products/ProductUtils";
import { fShortenNumber } from "../../../hooks/hooks";
import { Field } from "../../../component/hook-form/fields";
import { Form } from "../../../component/hook-form/form-provider";

type FormValues = {
    id: string;
    name: string;
    coverUrl: string;
    available: boolean;
    price: number;
    colors: string[];
    size: string;
    quantity: number;
};

function ProductOverview({ product }: { product: { [key: string]: any } }) {
    const checkout = {
        "items": [],
        "onAddToCart": (newValue: any) => { },
        "onGotoStep": (step: any) => { }
    }
    return (
        <Grid container alignItems={"center"} spacing={{ xs: 3, md: 5, lg: 8 }}>
            <Grid size={{ xs: 12, md: 6, lg: 7 }} >
                <ProductDetailsCarousel images={product?.images} />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                {product && (
                    <ProductDetailsSummary
                        product={product}
                        items={checkout.items}
                        onAddCart={checkout.onAddToCart}
                        onGotoStep={checkout.onGotoStep}
                        disableActions={!product?.available}
                    />
                )}
            </Grid>
        </Grid>
    )
}

function ProductDetailsCarousel({ images }: { images: any[] }) {
    const carousel = useCarousel({
        thumbs: {
            slidesToShow: 'auto',
        },
    });

    const slides = images?.map((img) => ({ src: img })) || [];

    const lightbox = useLightBox(slides);

    useEffect(() => {
        if (lightbox.open) {
            carousel.mainApi?.scrollTo(lightbox.selected, true);
        }
    }, [carousel.mainApi, lightbox.open, lightbox.selected]);

    return (
        <>
            <div>
                <Box sx={{ mb: 2.5, position: 'relative' }}>
                    <CarouselArrowNumberButtons
                        {...carousel.arrows}
                        options={carousel.options}
                        totalSlides={carousel.dots.dotCount}
                        selectedIndex={carousel.dots.selectedIndex + 1}
                        sx={{ right: 16, bottom: 16, position: 'absolute' }}
                    />

                    <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
                        {slides.map((slide) => (
                            <Image
                                key={slide.src}
                                alt={slide.src}
                                src={slide.src}
                                ratio="1/1"
                                onClick={() => lightbox.onOpen(slide.src)}
                                sx={{ cursor: 'zoom-in', minWidth: 320 }}
                            />
                        ))}
                    </Carousel>
                </Box>

                <CarouselThumbs
                    ref={carousel.thumbs.thumbsRef}
                    options={carousel.options?.thumbs}
                    slotProps={{ disableMask: true }}
                    sx={{ width: 360 }}
                >
                    {slides.map((item: any, index: number) => (
                        <CarouselThumb
                            key={item.src}
                            index={index}
                            src={item.src}
                            selected={index === carousel.thumbs.selectedIndex}
                            onClick={() => carousel.thumbs.onClickThumb(index)}
                        />
                    ))}
                </CarouselThumbs>
            </div>

            <Lightbox
                index={lightbox.selected}
                slides={slides}
                open={lightbox.open}
                close={lightbox.onClose}
                onGetCurrentIndex={(index: number) => lightbox.setSelected(index)}
            />
        </>
    );
}

function ProductDetailsSummary({
    items,
    product,
    onAddCart,
    onGotoStep,
    disableActions,
    ...other
}: {
    items?: any,
    product?: any,
    onAddCart?: any,
    onGotoStep?: any,
    disableActions?: any,
    other?: any
}) {
    //   const router = useRouter();

    const {
        id,
        name,
        sizes,
        price,
        coverUrl,
        colors,
        newLabel,
        available,
        priceSale,
        saleLabel,
        totalRatings,
        totalReviews,
        inventoryType,
        subDescription,
    } = product;

    const existProduct = !!items?.length && items.map((item: any) => item.id).includes(id);

    const isMaxQuantity =
        !!items?.length &&
        items.filter((item: any) => item.id === id).map((item: any) => item.quantity)[0] >= available;

    const defaultValues = {
        id,
        name,
        coverUrl,
        available,
        price,
        colors: colors[0],
        size: sizes[4],
        quantity: available < 1 ? 0 : 1,
    };

    const methods = useForm<FormValues>({ defaultValues });

    const { reset, watch, control, setValue, handleSubmit } = methods;

    const values = watch();

    useEffect(() => {
        if (product) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    const onSubmit = handleSubmit(async (data: FormValues) => {
        try {
            if (!existProduct) {
                onAddCart?.({ ...data, colors: [values.colors], subtotal: data.price * data.quantity });
            }
            onGotoStep?.(0);
            //   router.push(paths.product.checkout);
        } catch (error) {
            console.error(error);
        }
    });

    const handleAddCart = useCallback(() => {
        try {
            onAddCart?.({ ...values, colors: [values.colors], subtotal: values.price * values.quantity });
        } catch (error) {
            console.error(error);
        }
    }, [onAddCart, values]);

    const renderPrice = (
        <Box sx={{ typography: 'h5' }}>
            {priceSale && (
                <Box
                    component="span"
                    sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
                >
                    {fCurrency(priceSale)}
                </Box>
            )}

            {fCurrency(price)}
        </Box>
    );

    const renderShare = (
        <Stack direction="row" spacing={3} justifyContent="center">
            <Link
                variant="subtitle2"
                sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center' }}
            >
                <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
                Compare
            </Link>

            <Link
                variant="subtitle2"
                sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center' }}
            >
                <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
                Favorite
            </Link>

            <Link
                variant="subtitle2"
                sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center' }}
            >
                <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
                Share
            </Link>
        </Stack>
    );

    const renderColorOptions = (
        <Stack direction="row">
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                Color
            </Typography>

            <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                    <ColorPicker
                        colors={colors}
                        selected={field.value}
                        onSelectColor={(color: any) => field.onChange(color)}
                        limit={4}
                    />
                )}
            />
        </Stack>
    );

    const renderSizeOptions = (
        <Stack direction="row">
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                Size
            </Typography>

            <Field.Select
                name="size"
                size="small"
                helperText={
                    <Link underline="always" color="textPrimary">
                        Size chart
                    </Link>
                }
                sx={{
                    maxWidth: 88,
                    [`& .${formHelperTextClasses.root}`]: { mx: 0, mt: 1, textAlign: 'right' },
                }}
            >
                {sizes.map((size: any) => (
                    <MenuItem key={size} value={size}>
                        {size}
                    </MenuItem>
                ))}
            </Field.Select>
        </Stack>
    );

    const renderQuantity = (
        <Stack direction="row">
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                Quantity
            </Typography>

            <Stack spacing={1}>
                <IncrementerButton
                    name="quantity"
                    quantity={values.quantity}
                    disabledDecrease={values.quantity <= 1}
                    disabledIncrease={values.quantity >= available}
                    onIncrease={() => setValue('quantity', values.quantity + 1)}
                    onDecrease={() => setValue('quantity', values.quantity - 1)}
                />

                <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
                    Available: {available}
                </Typography>
            </Stack>
        </Stack>
    );

    const renderActions = (
        <Stack direction="row" spacing={2}>
            <Button
                fullWidth
                disabled={isMaxQuantity || disableActions}
                size="large"
                color="warning"
                variant="contained"
                startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
                onClick={handleAddCart}
                sx={{ whiteSpace: 'nowrap' }}
            >
                Add to cart
            </Button>

            <Button fullWidth size="large" type="submit" variant="contained" disabled={disableActions}>
                Buy now
            </Button>
        </Stack>
    );

    const renderSubDescription = (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {subDescription}
        </Typography>
    );

    const renderRating = (
        <Stack direction="row" alignItems="center" sx={{ color: 'text.disabled', typography: 'body2' }}>
            <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
            {`(${fShortenNumber(totalReviews)} reviews)`}
        </Stack>
    );

    const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
        <Stack direction="row" alignItems="center" spacing={1}>
            {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
            {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
        </Stack>
    );

    const renderInventoryType = (
        <Box
            component="span"
            sx={{
                typography: 'overline',
                color:
                    (inventoryType === 'out of stock' && 'error.main') ||
                    (inventoryType === 'low stock' && 'warning.main') ||
                    'success.main',
            }}
        >
            {inventoryType}
        </Box>
    );

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3} sx={{ pt: 3 }} {...other}>
                <Stack spacing={2} alignItems="flex-start">
                    {renderLabels}

                    {renderInventoryType}

                    <Typography variant="h5">{name}</Typography>

                    {renderRating}

                    {renderPrice}

                    {renderSubDescription}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {renderColorOptions}

                {renderSizeOptions}

                {renderQuantity}

                <Divider sx={{ borderStyle: 'dashed' }} />

                {renderActions}

                {renderShare}
            </Stack>
        </Form>
    );
}

export const IncrementerButton = forwardRef(
    ({ quantity, onIncrease, onDecrease, disabledIncrease, disabledDecrease, sx, ...other }:
        { quantity?: any, onIncrease?: any, onDecrease?: any, disabledIncrease?: any, disabledDecrease?: any, sx?: any, [other: string]: any }, ref) => (
        <Stack
            component={"button"}
            ref={ref as React.Ref<HTMLButtonElement>}
            flexShrink={0}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                p: 0.5,
                width: 88,
                borderRadius: 1,
                typography: 'subtitle2',
                border: 'solid 1px #efefef',
                ...sx,
            }}
            {...other}
        >
            <IconButton
                size="small"
                onClick={onDecrease}
                disabled={disabledDecrease}
                sx={{ borderRadius: 0.75 }}
            >
                <Iconify icon="eva:minus-fill" width={16} />
            </IconButton>

            {quantity}

            <IconButton
                size="small"
                onClick={onIncrease}
                disabled={disabledIncrease}
                sx={{ borderRadius: 0.75 }}
            >
                <Iconify icon="mingcute:add-line" width={16} />
            </IconButton>
        </Stack>
    )
);

export default ProductOverview