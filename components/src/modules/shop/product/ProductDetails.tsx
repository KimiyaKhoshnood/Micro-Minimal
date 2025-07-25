import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Box, Button, ButtonBase, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, LinearProgress, ListItemText, Pagination, paginationClasses, Rating, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z as zod } from 'zod';
import { Field } from "../../../component/hook-form/fields";
import { Form } from "../../../component/hook-form/form-provider";
import { Iconify } from "../../../component/iconify/iconify";
import { Markdown } from "../../../component/markdown/markdown";
import { fDate, fShortenNumber, useBoolean, useTabs } from "../../../hooks/hooks";

// ----------------------------------------------------------------------

function ProductDetails({ product }: { product: any }) {
    const tabs = useTabs('description');

    return (
        <Card>
            <Tabs
                value={tabs.value}
                onChange={tabs.onChange}
                sx={{
                    px: 3,
                    boxShadow: 'inset 0 -2px 0 0 black',
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
        </Card>
    )
}

export function ProductDetailsDescription({ description }: { description: any }) {
    return (
        <Stack padding={3}>
            <Markdown
                children={description}
                sx={{
                    '& p, li, ol': {
                        typography: 'body2',
                    },
                    '& ol': {
                        p: 0,
                        display: { md: 'flex' },
                        listStyleType: 'none',
                        '& li': {
                            '&:first-of-type': { minWidth: 240, mb: { xs: 0.5, md: 0 } },
                        },
                    },
                }}
            />
        </Stack>
    );
}

export function ProductDetailsReview({ totalRatings, totalReviews, ratings = [], reviews = [] }: { totalRatings: number, totalReviews: number, ratings: any[], reviews: any[] }) {
    const review = useBoolean();

    function sumBy(array: any[], iteratee: any) {
        return array.reduce((sum, item) => sum + iteratee(item), 0);
    }

    const total = sumBy(ratings, (star: any) => star.starCount);

    const renderSummary = (
        <Stack spacing={1} alignItems="center" justifyContent="center">
            <Typography variant="subtitle2">Average rating</Typography>

            <Typography variant="h2">
                {totalRatings}
                /5
            </Typography>

            <Rating readOnly value={totalRatings} precision={0.1} />

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                ({fShortenNumber(totalReviews)} reviews)
            </Typography>
        </Stack>
    );

    const renderProgress = (
        <Stack
            spacing={1.5}
            sx={{
                py: 5,
                px: { xs: 3, md: 5 },
                borderLeft: { md: `dashed 1px black` },
                borderRight: { md: `dashed 1px black` },
            }}
        >
            {ratings
                .slice(0)
                .reverse()
                .map((rating) => (
                    <Stack key={rating.name} direction="row" alignItems="center">
                        <Typography variant="subtitle2" component="span" sx={{ width: 42 }}>
                            {rating.name}
                        </Typography>

                        <LinearProgress
                            color="inherit"
                            variant="determinate"
                            value={(rating.starCount / total) * 100}
                            sx={{ mx: 2, flexGrow: 1 }}
                        />

                        <Typography
                            variant="body2"
                            component="span"
                            sx={{ minWidth: 48, color: 'text.secondary' }}
                        >
                            {fShortenNumber(rating.reviewCount)}
                        </Typography>
                    </Stack>
                ))}
        </Stack>
    );

    const renderReviewButton = (
        <Stack alignItems="center" justifyContent="center">
            <Button
                size="large"
                variant="contained"
                color="inherit"
                onClick={review.onTrue}
                startIcon={<Iconify icon="solar:pen-bold" />}
            >
                Write your review
            </Button>
        </Stack>
    );

    return (
        <>
            <Box
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                sx={{ py: { xs: 5, md: 0 } }}
            >
                {renderSummary}

                {renderProgress}

                {renderReviewButton}
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <>
                {reviews.map((review) => (
                    <ProductReviewItem key={review.id} review={review} />
                ))}

                <Pagination
                    count={10}
                    sx={{
                        mx: 'auto',
                        [`& .${paginationClasses.ul}`]: { my: 5, mx: 'auto', justifyContent: 'center' },
                    }}
                />
            </>

            <ProductReviewNewForm open={review.value} onClose={review.onFalse} />
        </>
    );
}


// ----------------------------------------------------------------------

export const ReviewSchema = zod.object({
    rating: zod.number().min(1, 'Rating must be greater than or equal to 1!'),
    name: zod.string().min(1, { message: 'Name is required!' }),
    review: zod.string().min(1, { message: 'Review is required!' }),
    email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

export function ProductReviewNewForm({ onClose, ...other }: { onClose: () => void, [other: string]: any }) {
    const defaultValues = {
        rating: 0,
        review: '',
        name: '',
        email: '',
    };

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(ReviewSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            onClose();
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    const onCancel = useCallback(() => {
        onClose();
        reset();
    }, [onClose, reset]);

    return (
        <Dialog open onClose={onClose} {...other}>
            <Form methods={methods} onSubmit={onSubmit}>
                <DialogTitle> Add Review </DialogTitle>

                <DialogContent>
                    <div>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Your review about this product:
                        </Typography>
                        <Field.Rating name="rating" />
                    </div>

                    <Field.Text name="review" label="Review *" multiline rows={3} sx={{ mt: 3 }} />

                    <Field.Text name="name" label="Name *" sx={{ mt: 3 }} />

                    <Field.Text name="email" label="Email *" sx={{ mt: 3 }} />
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Post
                    </LoadingButton>
                </DialogActions>
            </Form>
        </Dialog>
    );
}

// ----------------------------------------------------------------------

export function ProductReviewItem({ review }: { review: any }) {
    const renderInfo = (
        <Stack
            spacing={2}
            alignItems="center"
            direction={{ xs: 'row', md: 'column' }}
            sx={{ width: { md: 240 }, textAlign: { md: 'center' } }}
        >
            <Avatar
                src={review.avatarUrl}
                sx={{ width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 } }}
            />

            <ListItemText
                primary={review.name}
                secondary={fDate(review.postedAt)}
                primaryTypographyProps={{ noWrap: true, typography: 'subtitle2', mb: 0.5 }}
                secondaryTypographyProps={{ noWrap: true, typography: 'caption', component: 'span' }}
            />
        </Stack>
    );

    const renderContent = (
        <Stack spacing={1} flexGrow={1}>
            <Rating size="small" value={review.rating} precision={0.1} readOnly />

            {review.isPurchased && (
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ color: 'success.main', typography: 'caption' }}
                >
                    <Iconify icon="ic:round-verified" width={16} sx={{ mr: 0.5 }} />
                    Verified purchase
                </Stack>
            )}

            <Typography variant="body2">{review.comment}</Typography>

            {!!review.attachments?.length && (
                <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ pt: 1 }}>
                    {review.attachments.map((attachment: any) => (
                        <Box
                            key={attachment}
                            component="img"
                            alt={attachment}
                            src={attachment}
                            sx={{ width: 64, height: 64, borderRadius: 1.5 }}
                        />
                    ))}
                </Stack>
            )}

            <Stack direction="row" spacing={2} sx={{ pt: 1.5 }}>
                <ButtonBase disableRipple sx={{ gap: 0.5, typography: 'caption' }}>
                    <Iconify icon="solar:like-outline" width={16} />
                    123
                </ButtonBase>

                <ButtonBase disableRipple sx={{ gap: 0.5, typography: 'caption' }}>
                    <Iconify icon="solar:dislike-outline" width={16} />
                    34
                </ButtonBase>
            </Stack>
        </Stack>
    );

    return (
        <Stack
            spacing={2}
            direction={{ xs: 'column', md: 'row' }}
            sx={{ mt: 5, px: { xs: 2.5, md: 0 } }}
        >
            {renderInfo}

            {renderContent}
        </Stack>
    );
}

export default ProductDetails