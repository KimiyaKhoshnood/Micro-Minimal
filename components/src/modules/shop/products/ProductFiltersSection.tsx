import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Autocomplete, Avatar, Badge, Box, Button, Checkbox, Chip, Divider, Drawer, FormControlLabel, IconButton, InputAdornment, InputBase, inputBaseClasses, MenuItem, MenuList, Radio, Rating, Slider, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { Iconify } from "../../../component/iconify/iconify";
import React, { useCallback, useState } from "react";
import { useBoolean, useDebounce } from '../../../hooks/hooks';
import { useSetState } from '../../../table/table';
import { ColorPicker } from '../color-utils/color-picker';
import { Scrollbar } from '../../../component/scrollbar/scrollbar';
import { CustomPopover } from '../../../component/custom-popover/custom-popover';
import { usePopover } from '../../../component/custom-popover/use-popover';
import { FiltersBlock } from '../../../component/filters-result/filters-block';
import { chipProps, FiltersResult } from '../../../component/filters-result/filters-result';

export const PRODUCT_COLOR_OPTIONS = [
    '#FF4842',
    '#1890FF',
    '#FFC0CB',
    '#00AB55',
    '#FFC107',
    '#7F00FF',
    '#000000',
    '#FFFFFF',
];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_GENDER_OPTIONS = [
    { label: 'Men', value: 'Men' },
    { label: 'Women', value: 'Women' },
    { label: 'Kids', value: 'Kids' },
];

export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const PRODUCT_SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High - Low' },
    { value: 'priceAsc', label: 'Price: Low - High' },
];

export function ProductFiltersSection({ products }: { products: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    const debouncedQuery = useDebounce(searchQuery);
    const openFilters = useBoolean();
    // const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);

    const filters = useSetState({
        gender: [],
        colors: [],
        rating: '',
        category: 'all',
        priceRange: [0, 200],
    });

    const dataFiltered = applyFilter({ inputData: products, filters: filters.state, sortBy });

    const canReset =
        filters.state.gender?.length > 0 ||
        filters.state.colors?.length > 0 ||
        filters.state.rating !== '' ||
        filters.state.category !== 'all' ||
        filters.state.priceRange[0] !== 0 ||
        filters.state.priceRange[1] !== 200;

    const handleSortBy = useCallback((newValue?: string) => {
        newValue && setSortBy(newValue);
    }, []);

    const handleSearch = useCallback((inputValue: string) => {
        setSearchQuery(inputValue);
    }, []);

    return <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        <Stack
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-end', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
        >
            {products && <ProductSearch
                query={debouncedQuery}
                results={products}
                onSearch={handleSearch}
            // loading={searchLoading}
            />}

            <Stack direction="row" spacing={1} flexShrink={0}>
                <ProductFilters
                    filters={filters}
                    canReset={canReset}
                    open={openFilters.value}
                    onOpen={openFilters.onTrue}
                    onClose={openFilters.onFalse}
                    options={{
                        colors: PRODUCT_COLOR_OPTIONS,
                        ratings: PRODUCT_RATING_OPTIONS,
                        genders: PRODUCT_GENDER_OPTIONS,
                        categories: ['all', ...PRODUCT_CATEGORY_OPTIONS],
                    }}
                />

                <ProductSort sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />
            </Stack>
        </Stack>
        {canReset && <ProductFiltersResult filters={filters} totalResults={dataFiltered?.length} />}
    </Stack>
}

export function ProductSearch({ query, results, onSearch, loading }: { query?: string, results?: any, onSearch?: any, loading?: boolean }) {
    //   const router = useRouter();

    const handleClick = (id?: number) => {
        // router.push(paths.product.details(id));
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (query) {
            if (event.key === 'Enter') {
                const selectItem = results?.filter((product: any) => product?.name === query)[0];

                handleClick(selectItem.id);
            }
        }
    };

    return (
        <Autocomplete
            sx={{ width: { xs: 1, sm: 260 } }}
            loading={loading}
            autoHighlight
            popupIcon={null}
            options={results}
            onInputChange={(event, newValue) => onSearch(newValue)}
            getOptionLabel={(option: any) => option.name}
            //   noOptionsText={<SearchNotFound query={query} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            slotProps={{
                popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
                // paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search..."
                    onKeyUp={handleKeyUp}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <>
                                {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            renderOption={(props, product, { inputValue }) => {
                const matches = match(product.name, inputValue);
                const parts = parse(product.name, matches);

                return (
                    <Box component="li" {...props} onClick={() => handleClick(product.id)} key={product.id}>
                        <Avatar
                            key={product.id}
                            alt={product.name}
                            src={product.coverUrl}
                            variant="rounded"
                            sx={{
                                mr: 1.5,
                                width: 48,
                                height: 48,
                                flexShrink: 0,
                                borderRadius: 1,
                            }}
                        />

                        <div key={inputValue}>
                            {parts.map((part, index) => (
                                <Typography
                                    key={index}
                                    component="span"
                                    color={part.highlight ? 'primary' : 'textPrimary'}
                                    sx={{
                                        typography: 'body2',
                                        fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                                    }}
                                >
                                    {part.text}
                                </Typography>
                            ))}
                        </div>
                    </Box>
                );
            }}
        />
    );
}

export function ProductSort({ sort, onSort, sortOptions }: { sort: string, onSort: (value: any) => void, sortOptions: any[] }) {
    const popover = usePopover();

    const sortLabel = sortOptions.find((option) => option.value === sort)?.label;

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                onClick={popover.onOpen}
                endIcon={
                    <Iconify
                        icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                    />
                }
                sx={{ fontWeight: 'fontWeightSemiBold' }}
            >
                Sort by:
                <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
                    {sortLabel}
                </Box>
            </Button>

            <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
                <MenuList>
                    {sortOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === sort}
                            onClick={() => {
                                popover.onClose();
                                onSort(option.value);
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </CustomPopover>
        </>
    );
}

export function ProductFilters({ open, onOpen, onClose, canReset, filters, options }: { open?: boolean, onOpen?: () => void, onClose?: () => void, canReset?: boolean, filters?: any, options?: any }) {
    const marksLabel = [...Array(21)].map((_, index) => {
        const value = index * 10;

        const firstValue = index === 0 ? `$${value}` : `${value}`;

        return { value, label: index % 4 ? '' : firstValue };
    });

    const handleFilterGender = useCallback(
        (newValue: any) => {
            const checked = filters.state.gender.includes(newValue)
                ? filters.state.gender.filter((value: any) => value !== newValue)
                : [...filters.state.gender, newValue];

            filters.setState({ gender: checked });
        },
        [filters]
    );

    const handleFilterCategory = useCallback(
        (newValue: any) => {
            filters.setState({ category: newValue });
        },
        [filters]
    );

    const handleFilterColors = useCallback(
        (newValue: any) => {
            filters.setState({ colors: newValue });
        },
        [filters]
    );

    const handleFilterPriceRange = useCallback(
        (event: any, newValue: any) => {
            filters.setState({ priceRange: newValue });
        },
        [filters]
    );

    const handleFilterRating = useCallback(
        (newValue: any) => {
            filters.setState({ rating: newValue });
        },
        [filters]
    );

    const renderHead = (
        <>
            <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Filters
                </Typography>

                <Tooltip title="Reset">
                    <IconButton onClick={filters.onResetState}>
                        <Badge color="error" variant="dot" invisible={!canReset}>
                            <Iconify icon="solar:restart-bold" />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <IconButton onClick={onClose}>
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />
        </>
    );

    const renderGender = (
        <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Gender
            </Typography>
            {options.genders.map((option: any) => (
                <FormControlLabel
                    key={option.value}
                    control={
                        <Checkbox
                            checked={filters.state.gender.includes(option.label)}
                            onClick={() => handleFilterGender(option.label)}
                        />
                    }
                    label={option.label}
                />
            ))}
        </Box>
    );

    const renderCategory = (
        <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Category
            </Typography>
            {options.categories.map((option: any) => (
                <FormControlLabel
                    key={option}
                    control={
                        <Radio
                            checked={option === filters.state.category}
                            onClick={() => handleFilterCategory(option)}
                        />
                    }
                    label={option}
                    sx={{ ...(option === 'all' && { textTransform: 'capitalize' }) }}
                />
            ))}
        </Box>
    );

    const renderColor = (
        <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Color
            </Typography>
            <ColorPicker
                selected={filters.state.colors}
                onSelectColor={(colors: any) => handleFilterColors(colors)}
                colors={options.colors}
                limit={6}
            />
        </Box>
    );

    const renderPrice = (
        <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2">Price</Typography>

            <Box gap={5} display="flex" sx={{ my: 2 }}>
                <InputRange type="min" value={filters.state.priceRange} onFilters={filters.setState} />
                <InputRange type="max" value={filters.state.priceRange} onFilters={filters.setState} />
            </Box>

            <Slider
                value={filters.state.priceRange}
                onChange={handleFilterPriceRange}
                step={10}
                min={0}
                max={200}
                marks={marksLabel}
                getAriaValueText={(value) => `$${value}`}
                valueLabelFormat={(value) => `$${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 24px)` }}
            />
        </Box>
    );

    const renderRating = (
        <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Rating
            </Typography>

            {options.ratings.map((item: any, index: any) => (
                <Box
                    key={item}
                    onClick={() => handleFilterRating(item)}
                    sx={{
                        mb: 1,
                        gap: 1,
                        ml: -1,
                        p: 0.5,
                        display: 'flex',
                        borderRadius: 1,
                        cursor: 'pointer',
                        typography: 'body2',
                        alignItems: 'center',
                        '&:hover': { opacity: 0.48 },
                        ...(filters.state.rating === item && {
                            bgcolor: 'action.selected',
                        }),
                    }}
                >
                    <Rating readOnly value={4 - index} /> & Up
                </Box>
            ))}
        </Box>
    );

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                endIcon={
                    <Badge color="error" variant="dot" invisible={!canReset}>
                        <Iconify icon="ic:round-filter-list" />
                    </Badge>
                }
                onClick={onOpen}
            >
                Filters
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: 320 } }}
            >
                {renderHead}

                <Scrollbar sx={{ px: 2.5, py: 3 }}>
                    <Stack spacing={3}>
                        {renderGender}
                        {renderCategory}
                        {renderColor}
                        {renderPrice}
                        {renderRating}
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    );
}

export function ProductFiltersResult({ filters, totalResults, sx }: { filters?: any, totalResults?: any, sx?: any }) {
    const handleRemoveGender = (inputValue: any) => {
        const newValue = filters.state.gender.filter((item: any) => item !== inputValue);

        filters.setState({ gender: newValue });
    };

    const handleRemoveCategory = () => {
        filters.setState({ category: 'all' });
    };

    const handleRemoveColor = (inputValue: any) => {
        const newValue = filters.state.colors.filter((item: any) => item !== inputValue);

        filters.setState({ colors: newValue });
    };

    const handleRemovePrice = () => {
        filters.setState({ priceRange: [0, 200] });
    };

    const handleRemoveRating = () => {
        filters.setState({ rating: '' });
    };

    return (
        <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
            <FiltersBlock label="Gender:" isShow={!!filters.state.gender.length}>
                {filters.state.gender.map((item: any) => (
                    <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveGender(item)} />
                ))}
            </FiltersBlock>

            <FiltersBlock label="Category:" isShow={filters.state.category !== 'all'}>
                <Chip {...chipProps} label={filters.state.category} onDelete={handleRemoveCategory} />
            </FiltersBlock>

            <FiltersBlock label="Colors:" isShow={!!filters.state.colors.length}>
                {filters.state.colors.map((item: any) => (
                    <Chip
                        {...chipProps}
                        key={item}
                        label={
                            <Box
                                sx={{
                                    ml: -0.5,
                                    width: 18,
                                    height: 18,
                                    bgcolor: item,
                                    borderRadius: '50%',
                                    border: (theme) =>
                                        `solid 1px #f3f5f4`,
                                }}
                            />
                        }
                        onDelete={() => handleRemoveColor(item)}
                    />
                ))}
            </FiltersBlock>

            <FiltersBlock
                label="Price:"
                isShow={filters.state.priceRange[0] !== 0 || filters.state.priceRange[1] !== 200}
            >
                <Chip
                    {...chipProps}
                    label={`$${filters.state.priceRange[0]} - ${filters.state.priceRange[1]}`}
                    onDelete={handleRemovePrice}
                />
            </FiltersBlock>

            <FiltersBlock label="Rating:" isShow={!!filters.state.rating}>
                <Chip {...chipProps} label={filters.state.rating} onDelete={handleRemoveRating} />
            </FiltersBlock>
        </FiltersResult>
    );
}

// ----------------------------------------------------------------------

function InputRange({ type, value, onFilters }: { type: 'min' | 'max', value: number[], onFilters: (element: any) => void }) {

    const min = value[0];

    const max = value[1];

    const handleBlurInputRange = useCallback(() => {
        if (min < 0) {
            onFilters({ priceRange: [0, max] });
        }
        if (min > 200) {
            onFilters({ priceRange: [200, max] });
        }
        if (max < 0) {
            onFilters({ priceRange: [min, 0] });
        }
        if (max > 200) {
            onFilters({ priceRange: [min, 200] });
        }
    }, [max, min, onFilters]);

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography
                variant="caption"
                sx={{
                    flexShrink: 0,
                    color: 'text.disabled',
                    textTransform: 'capitalize',
                    fontWeight: 'fontWeightSemiBold',
                }}
            >
                {`${type} ($)`}
            </Typography>

            <InputBase
                fullWidth
                value={type === 'min' ? min : max}
                onChange={(event) =>
                    type === 'min'
                        ? onFilters({ priceRange: [Number(event.target.value), max] })
                        : onFilters({ priceRange: [min, Number(event.target.value)] })
                }
                onBlur={handleBlurInputRange}
                inputProps={{
                    step: 10,
                    min: 0,
                    max: 200,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
                sx={{
                    maxWidth: 48,
                    borderRadius: 0.75,
                    bgcolor: '##f3f5f4',
                    [`& .${inputBaseClasses.input}`]: {
                        pr: 1,
                        py: 0.75,
                        textAlign: 'right',
                        typography: 'body2',
                    },
                }}
            />
        </Stack>
    );
}

function applyFilter({ inputData, filters, sortBy }: any) {
    const { gender, category, colors, priceRange, rating } = filters;

    const min = priceRange[0];

    const max = priceRange[1];

    // Sort by
    if (sortBy === 'featured') {
        inputData = orderBy(inputData, ['totalSold'], ['desc']);
    }

    if (sortBy === 'newest') {
        inputData = orderBy(inputData, ['createdAt'], ['desc']);
    }

    if (sortBy === 'priceDesc') {
        inputData = orderBy(inputData, ['price'], ['desc']);
    }

    if (sortBy === 'priceAsc') {
        inputData = orderBy(inputData, ['price'], ['asc']);
    }

    // filters
    if (gender.length) {
        inputData = inputData?.filter((product: any) => product.gender.some((i: any) => gender.includes(i)));
    }

    if (category !== 'all') {
        inputData = inputData?.filter((product: any) => product.category === category);
    }

    if (colors.length) {
        inputData = inputData?.filter((product: any) =>
            product.colors.some((color: any) => colors.includes(color))
        );
    }

    if (min !== 0 || max !== 200) {
        inputData = inputData?.filter((product: any) => product.price >= min && product.price <= max);
    }

    if (rating) {
        inputData = inputData?.filter((product: any) => {
            const convertRating = (value: any) => {
                if (value === 'up4Star') return 4;
                if (value === 'up3Star') return 3;
                if (value === 'up2Star') return 2;
                return 1;
            };
            return product.totalRatings > convertRating(rating);
        });
    }

    return inputData;
}

function orderBy(array: any, properties: any, orders: any) {
    return array?.slice().sort((a: any, b: any) => {
        for (let i = 0; i < properties.length; i += 1) {
            const property = properties[i];
            const order = orders && orders[i] === 'desc' ? -1 : 1;

            const aValue = a[property];
            const bValue = b[property];

            if (aValue < bValue) return -1 * order;
            if (aValue > bValue) return 1 * order;
        }
        return 0;
    });
}