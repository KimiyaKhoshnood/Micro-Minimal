import { Avatar, Box, Breakpoint, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Link, ListItemText, Stack, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CustomBreadcrumbs } from '../../../component/custom-breadcrumbs/custom-breadcrumbs';
import { EmptyContent } from '../../../component/empty-content/empty-content';
import { Iconify } from "../../../component/iconify/iconify";
import { Label } from "../../../component/label/label";
import { fDate, fTime, useBoolean } from "../../../hooks/hooks";
import { useSetState } from "../../../table/table";
import { layoutClasses } from '../../dashboard/classes';
import { Products } from '../../shop/products/ProductsData';
import { fCurrency } from "../../shop/products/ProductUtils";
import { ProductTableFiltersResult } from './product-table-filters-result';
import { ProductTableToolbar } from './product-table-toolbar';
import { DashboardContent } from "../../dashboard/dashboard/layout";

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

const PRODUCT_STOCK_OPTIONS = [
    { value: 'in stock', label: 'In stock' },
    { value: 'low stock', label: 'Low stock' },
    { value: 'out of stock', label: 'Out of stock' },
]

// ----------------------------------------------------------------------


const ShopDashboardListView = () => {
    const confirmRows = useBoolean();

    //   const router = useRouter();

    // const { products, productsLoading } = useGetProducts();
    const products = Products

    const filters = useSetState({ publish: [], stock: [] });

    const [tableData, setTableData] = useState<any>([]);

    const [selectedRowIds, setSelectedRowIds] = useState<any>([]);

    const [filterButtonEl, setFilterButtonEl] = useState<any>(null);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>(HIDE_COLUMNS);

    useEffect(() => {
        if (products.length) {
            setTableData(products);
        }
    }, [products]);

    const canReset = filters.state.publish.length > 0 || filters.state.stock.length > 0;

    const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

    console.log(dataFiltered, filters);

    const handleDeleteRow = useCallback(
        (id: string) => {
            const deleteRow = tableData.filter((row: any) => row.id !== id);

            toast.success('Delete success!');

            setTableData(deleteRow);
        },
        [tableData]
    );

    const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter((row: any) => !selectedRowIds.includes(row.id));

        toast.success('Delete success!');

        setTableData(deleteRows);
    }, [selectedRowIds, tableData]);

    const handleEditRow = useCallback(
        (id: string) => {
            //   router.push(paths.dashboard.product.edit(id));
        },
        // [router]
        []
    );

    const handleViewRow = useCallback(
        (id: string) => {
            //   router.push(paths.dashboard.product.details(id));
        },
        // [router]
        []
    );

    const CustomToolbarCallback = useCallback(
        () => (
            <CustomToolbar
                filters={filters}
                canReset={canReset}
                selectedRowIds={selectedRowIds}
                setFilterButtonEl={setFilterButtonEl}
                filteredResults={dataFiltered.length}
                onOpenConfirmDeleteRows={confirmRows.onTrue}
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filters.state, selectedRowIds]
    );

    const columns: GridColDef<(typeof dataFiltered)[number]>[] = [
        { field: 'category', headerName: 'Category', filterable: false },
        {
            field: 'name',
            headerName: 'Product',
            flex: 1,
            minWidth: 360,
            hideable: false,
            renderCell: (params: any) => (
                <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
                    <Avatar
                        alt={params.row.name}
                        src={params.row.coverUrl}
                        variant="rounded"
                        sx={{ width: 64, height: 64, mr: 2 }}
                    />

                    <ListItemText
                        disableTypography
                        primary={
                            <Link
                                noWrap
                                color="inherit"
                                variant="subtitle2"
                                onClick={() => handleViewRow(params.row.id)}
                                sx={{ cursor: 'pointer' }}
                            >
                                {params.row.name}
                            </Link>
                        }
                        secondary={
                            <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                                {params.row.category}
                            </Box>
                        }
                        sx={{ display: 'flex', flexDirection: 'column' }}
                    />
                </Stack>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Create at',
            width: 160,
            renderCell: (params: any) => (
                <Stack spacing={0.5}>
                    <Box component="span">{fDate(params.row.createdAt)}</Box>
                    <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
                        {fTime(params.row.createdAt)}
                    </Box>
                </Stack>
            ),
        },
        {
            field: 'inventoryType',
            headerName: 'Stock',
            width: 160,
            type: 'singleSelect',
            valueOptions: PRODUCT_STOCK_OPTIONS,
            renderCell: (params: any) => (
                <Stack justifyContent="center" sx={{ typography: 'caption', color: 'text.secondary' }}>
                    <LinearProgress
                        value={(params.row.available * 100) / params.row.quantity}
                        variant="determinate"
                        color={
                            (params.row.inventoryType === 'out of stock' && 'error') ||
                            (params.row.inventoryType === 'low stock' && 'warning') ||
                            'success'
                        }
                        sx={{ mb: 1, width: 1, height: 6, maxWidth: 80 }}
                    />
                    {!!params.row.available && params.row.available} {params.row.inventoryType}
                </Stack>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 140,
            editable: true,
            renderCell: (params: any) => fCurrency(params.row.price),
        },
        {
            field: 'publish',
            headerName: 'Publish',
            width: 110,
            type: 'singleSelect',
            editable: true,
            valueOptions: PUBLISH_OPTIONS,
            renderCell: (params: any) => (
                <Label variant="soft" color={(params.row.publish === 'published' && 'info') || 'default'}>
                    {params.row.publish}
                </Label>
            ),
        },
        {
            type: 'actions',
            field: 'actions',
            headerName: ' ',
            align: 'right',
            headerAlign: 'right',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            getActions: (params: any) => [
                <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:eye-bold" />}
                    label="View"
                    onClick={() => handleViewRow(params.row.id)}
                />,
                <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:pen-bold" />}
                    label="Edit"
                    onClick={() => handleEditRow(params.row.id)}
                />,
                <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    label="Delete"
                    onClick={() => {
                        handleDeleteRow(params.row.id);
                    }}
                    sx={{ color: 'error.main' }}
                />,
            ],
        },
    ];


    const getTogglableColumns = () =>
        columns
            .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
            .map((column) => column.field);

    return (
        <>
            <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <CustomBreadcrumbs
                    heading="List"
                    links={[
                        { name: 'Dashboard', href: "/" },
                        { name: 'Product', href: "/" },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            component={Link}
                            href={"/"}
                            variant="contained"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                        >
                            New product
                        </Button>
                    }
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                <Card
                    sx={{
                        flexGrow: { md: 1 },
                        display: { md: 'flex' },
                        height: { xs: 800, md: 1 },
                        flexDirection: { md: 'column' },
                    }}
                >
                    <DataGrid
                        checkboxSelection
                        disableRowSelectionOnClick
                        rows={dataFiltered}
                        columns={columns}
                        // loading={productsLoading}
                        loading={false}
                        getRowHeight={() => 'auto'}
                        pageSizeOptions={[5, 10, 25]}
                        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                        onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
                        columnVisibilityModel={columnVisibilityModel}
                        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                        slots={{
                            toolbar: CustomToolbarCallback,
                            noRowsOverlay: () => <EmptyContent />,
                            noResultsOverlay: () => <EmptyContent title="No results found" />,
                        }}
                        slotProps={{
                            panel: { anchorEl: filterButtonEl } as any,
                            toolbar: { setFilterButtonEl } as any,
                            columnsManagement: { getTogglableColumns },
                        }}
                        sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
                    />
                </Card>
            </DashboardContent>

            <Dialog fullWidth maxWidth="xs" open={confirmRows.value} onClose={confirmRows.onFalse}>
                <DialogTitle sx={{ pb: 2 }}>Delete</DialogTitle>

                <DialogContent sx={{ typography: 'body2' }}>
                    <>
                        Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
                    </>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows();
                            confirmRows.onFalse();
                        }}
                    >
                        Delete
                    </Button>

                    <Button variant="outlined" color="inherit" onClick={confirmRows.onFalse}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ShopDashboardListView

function CustomToolbar({
    filters,
    canReset,
    selectedRowIds,
    filteredResults,
    setFilterButtonEl,
    onOpenConfirmDeleteRows,
}: {
    filters?: any,
    canReset?: any,
    selectedRowIds?: any,
    filteredResults?: any,
    setFilterButtonEl?: any,
    onOpenConfirmDeleteRows?: any,
}) {
    return (
        <>
            <GridToolbarContainer>
                <ProductTableToolbar
                    filters={filters}
                    options={{ stocks: PRODUCT_STOCK_OPTIONS, publishs: PUBLISH_OPTIONS }}
                />

                <GridToolbarQuickFilter />

                <Stack
                    spacing={1}
                    flexGrow={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                >
                    {!!selectedRowIds.length && (
                        <Button
                            size="small"
                            color="error"
                            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                            onClick={onOpenConfirmDeleteRows}
                        >
                            Delete ({selectedRowIds.length})
                        </Button>
                    )}

                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton ref={setFilterButtonEl} />
                    <GridToolbarExport />
                </Stack>
            </GridToolbarContainer>

            {canReset && (
                <ProductTableFiltersResult
                    filters={filters}
                    totalResults={filteredResults}
                    sx={{ p: 2.5, pt: 0 }}
                />
            )}
        </>
    );
}

function applyFilter({ inputData, filters }: { inputData?: any, filters?: any }) {
    const { stock, publish } = filters;

    if (stock.length) {
        inputData = inputData.filter((product?: any) => stock.includes(product.inventoryType));
    }

    if (publish.length) {
        inputData = inputData.filter((product?: any) => publish.includes(product.publish));
    }

    return inputData;
}