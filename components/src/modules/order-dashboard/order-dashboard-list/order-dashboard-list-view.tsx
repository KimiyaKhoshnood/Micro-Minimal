import { Box, Button, Card, IconButton, Tab, Table, TableBody, Tabs, Tooltip } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { DashboardContent } from "../../shop-dashboard/shop-dashboard-list/shop-dashboard-list-view";
import { CustomBreadcrumbs } from "../../../component/custom-breadcrumbs/custom-breadcrumbs";
import { varAlpha } from "../../../theme/styles/utils";
import { Label } from "../../../component/label/label";
import { TableSelectedAction } from "../../../component/table/table-selected-action";
import { Iconify } from "../../../component/iconify/iconify";
import { Scrollbar } from "../../../component/scrollbar/scrollbar";
import { TableHeadCustom } from "../../../component/table/table-head-custom";
import { TableEmptyRows } from "../../../component/table/table-empty-rows";
import { emptyRows, getComparator, rowInPage } from "../../../component/table/utils";
import { TableNoData } from "../../../component/table/table-no-data";
import { TablePaginationCustom } from "../../../component/table/table-pagination-custom";
import { OrderTableRow } from "./order-table-row";
import { useSetState } from "../../../table/table";
import { fIsAfter, fIsBetween, useBoolean } from "../../../hooks/hooks";
import { useTable } from "../../../component/table/use-table";
import { OrderTableToolbar } from "./order-table-toolbar";
import { OrderTableFiltersResult } from "./order-table-filters-result";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ConfirmDialog } from "../../../component/custom-dialog/confirm-dialog";

// ----------------------------------------------------------------------

export const _orders = [
    {
        id: 1,
        orderNumber: `#6011`,
        createdAt: Date(),
        taxes: 10,
        items: [
            {
                id: 111,
                sku: `16H9UR1`,
                quantity: 1,
                name: "Elegance Stiletto Heels",
                coverUrl: "/assets/images/m-product/product-1.webp",
                price: 83.74,
            },
            {
                id: 112,
                sku: `16H9UR2`,
                quantity: 2,
                name: "Classic Leather Loafers",
                coverUrl: "/assets/images/m-product/product-2.webp",
                price: 97.14,
            }
        ],
        history: {
            orderTime: Date(),
            paymentTime: Date(),
            deliveryTime: Date(),
            completionTime: Date(),
            timeline: [
                { title: 'Delivery successful', time: Date() },
                { title: 'Transporting to [2]', time: Date() },
                { title: 'Transporting to [1]', time: Date() },
                { title: 'The shipping unit has picked up the goods', time: Date() },
                { title: 'Order has been created', time: Date() },
            ],
        },
        subtotal: 180.98,
        shipping: 10,
        discount: 10,
        customer: {
            id: 1,
            name: "Cristopher Cardenas",
            email: "joana.simonis84@gmail.com",
            avatarUrl: "/assets/images/avatar/avatar-1.webp",
            ipAddress: '192.158.1.38',
        },
        delivery: { shipBy: 'DHL', speedy: 'Standard', trackingNumber: 'SPX037739199373' },
        totalAmount: 180.03,
        totalQuantity: 3,
        shippingAddress: {
            fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
            phoneNumber: '365-374-4961',
        },
        payment: { cardType: 'mastercard', cardNumber: '**** **** **** 5678' },
        status: 'completed',
    },
    {
        id: 2,
        orderNumber: `#6012`,
        createdAt: Date(),
        taxes: 10,
        items: [
            {
                id: 111,
                sku: `16H9UR1`,
                quantity: 1,
                name: "Elegance Stiletto Heels",
                coverUrl: "/assets/images/m-product/product-3.webp",
                price: 83.74,
            },
            {
                id: 112,
                sku: `16H9UR2`,
                quantity: 2,
                name: "Classic Leather Loafers",
                coverUrl: "/assets/images/m-product/product-4.webp",
                price: 97.14,
            }
        ],
        history: {
            orderTime: Date(),
            paymentTime: Date(),
            deliveryTime: Date(),
            completionTime: Date(),
            timeline: [
                { title: 'Delivery successful', time: Date() },
                { title: 'Transporting to [2]', time: Date() },
                { title: 'Transporting to [1]', time: Date() },
                { title: 'The shipping unit has picked up the goods', time: Date() },
                { title: 'Order has been created', time: Date() },
            ],
        },
        subtotal: 320.23,
        shipping: 10,
        discount: 10,
        customer: {
            id: 1,
            name: "Cristopher Cardenas",
            email: "joana.simonis84@gmail.com",
            avatarUrl: "/assets/images/avatar/avatar-2.webp",
            ipAddress: '192.158.1.38',
        },
        delivery: { shipBy: 'DHL', speedy: 'Standard', trackingNumber: 'SPX037739199373' },
        totalAmount: 319.73,
        totalQuantity: 3,
        shippingAddress: {
            fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
            phoneNumber: '365-374-4961',
        },
        payment: { cardType: 'mastercard', cardNumber: '**** **** **** 2362' },
        status: 'completed',
    }
]

export const ORDER_STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'refunded', label: 'Refunded' },
];

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ORDER_STATUS_OPTIONS];

const TABLE_HEAD = [
    { id: 'orderNumber', label: 'Order', width: 88 },
    { id: 'name', label: 'Customer' },
    { id: 'createdAt', label: 'Date', width: 140 },
    {
        id: 'totalQuantity',
        label: 'Items',
        width: 120,
        align: 'center',
    },
    { id: 'totalAmount', label: 'Price', width: 140 },
    { id: 'status', label: 'Status', width: 110 },
    { id: '', width: 88 },
];

// ----------------------------------------------------------------------

const OrderDashboardListView = () => {
    const table = useTable({ defaultOrderBy: 'orderNumber' });

    // const router = useRouter();

    const confirm = useBoolean();

    const [tableData, setTableData] = useState(_orders);

    const filters = useSetState({
        name: '',
        status: 'all',
        startDate: null,
        endDate: null,
    });

    const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters: filters.state,
        dateError,
    });

    const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

    const canReset =
        !!filters.state.name ||
        filters.state.status !== 'all' ||
        (!!filters.state.startDate && !!filters.state.endDate);

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const handleDeleteRow = useCallback(
        (id: string) => {
            const deleteRow = tableData.filter((row: any) => row.id !== id);

            toast.success('Delete success!');

            setTableData(deleteRow);

            table.onUpdatePageDeleteRow(dataInPage.length);
        },
        [dataInPage.length, table, tableData]
    );

    const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter((row: any) => !table.selected.includes(row.id));

        toast.success('Delete success!');

        setTableData(deleteRows);

        table.onUpdatePageDeleteRows({
            totalRowsInPage: dataInPage.length,
            totalRowsFiltered: dataFiltered.length,
        });
    }, [dataFiltered.length, dataInPage.length, table, tableData]);

    const handleViewRow = useCallback(
        (id: string) => {
            // router.push(paths.dashboard.order.details(id));
        },
        // [router]
        []
    );

    const handleFilterStatus = useCallback(
        (event: any, newValue: any) => {
            table.onResetPage();
            filters.setState({ status: newValue });
        },
        [filters, table]
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardContent>
                <CustomBreadcrumbs
                    heading="List"
                    links={[
                        { name: 'Dashboard', href: "/" },
                        { name: 'Order', href: "/" },
                        { name: 'List' },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                <Card>
                    <Tabs
                        value={filters.state.status}
                        onChange={handleFilterStatus}
                        sx={{
                            px: 2.5,
                            boxShadow: (theme: any) =>
                                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                        }}
                    >
                        {STATUS_OPTIONS.map((tab) => (
                            <Tab
                                key={tab.value}
                                iconPosition="end"
                                value={tab.value}
                                label={tab.label}
                                icon={
                                    <Label
                                        variant={
                                            ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                                            'soft'
                                        }
                                        color={
                                            (tab.value === 'completed' && 'success') ||
                                            (tab.value === 'pending' && 'warning') ||
                                            (tab.value === 'cancelled' && 'error') ||
                                            'default'
                                        }
                                    >
                                        {['completed', 'pending', 'cancelled', 'refunded'].includes(tab.value)
                                            ? tableData.filter((user: any) => user.status === tab.value).length
                                            : tableData.length}
                                    </Label>
                                }
                            />
                        ))}
                    </Tabs>

                    <OrderTableToolbar
                        filters={filters}
                        onResetPage={table.onResetPage}
                        dateError={dateError}
                    />

                    {canReset && (
                        <OrderTableFiltersResult
                            filters={filters}
                            totalResults={dataFiltered.length}
                            onResetPage={table.onResetPage}
                            sx={{ p: 2.5, pt: 0 }}
                        />
                    )}

                    <Box sx={{ position: 'relative' }}>
                        <TableSelectedAction
                            dense={table.dense}
                            numSelected={table.selected.length}
                            rowCount={dataFiltered.length}
                            onSelectAllRows={(checked: any) =>
                                table.onSelectAllRows(
                                    checked,
                                    dataFiltered.map((row: any) => row.id)
                                )
                            }
                            action={
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={confirm.onTrue}>
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar sx={{ minHeight: 444 }}>
                            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                                <TableHeadCustom
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={dataFiltered.length}
                                    numSelected={table.selected.length}
                                    onSort={table.onSort}
                                    onSelectAllRows={(checked: any) =>
                                        table.onSelectAllRows(
                                            checked,
                                            dataFiltered.map((row: any) => row.id)
                                        )
                                    }
                                />

                                <TableBody>
                                    {dataFiltered
                                        .slice(
                                            table.page * table.rowsPerPage,
                                            table.page * table.rowsPerPage + table.rowsPerPage
                                        )
                                        .map((row: any) => (
                                            <OrderTableRow
                                                key={row.id}
                                                row={row}
                                                selected={table.selected.includes(row.id)}
                                                onSelectRow={() => table.onSelectRow(row.id)}
                                                onDeleteRow={() => handleDeleteRow(row.id)}
                                                onViewRow={() => handleViewRow(row.id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={table.dense ? 56 : 56 + 20}
                                        emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                                    />

                                    <TableNoData notFound={notFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </Box>

                    <TablePaginationCustom
                        page={table.page}
                        dense={table.dense}
                        count={dataFiltered.length}
                        rowsPerPage={table.rowsPerPage}
                        onPageChange={table.onChangePage}
                        onChangeDense={table.onChangeDense}
                        onRowsPerPageChange={table.onChangeRowsPerPage}
                    />
                </Card>
            </DashboardContent>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete <strong> {table.selected.length} </strong> items?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows();
                            confirm.onFalse();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </LocalizationProvider>
    )
}

export default OrderDashboardListView


function applyFilter({ inputData, comparator, filters, dateError }: { inputData?: any, comparator?: any, filters?: any, dateError?: any }) {
    const { status, name, startDate, endDate } = filters;

    const stabilizedThis = inputData.map((el: any, index: number) => [el, index]);

    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el: any) => el[0]);

    if (name) {
        inputData = inputData.filter(
            (order: any) =>
                order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
                order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
                order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
        );
    }

    if (status !== 'all') {
        inputData = inputData.filter((order: any) => order.status === status);
    }

    if (!dateError) {
        if (startDate && endDate) {
            inputData = inputData.filter((order: any) => fIsBetween(order.createdAt, startDate, endDate));
        }
    }

    return inputData;
}
