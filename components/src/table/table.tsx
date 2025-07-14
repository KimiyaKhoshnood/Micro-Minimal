import { Avatar, Box, Button, Card, Checkbox, IconButton, Link, Stack, Tab, Table, TableBody, TableCell, TableRow, Tabs, Tooltip } from "@mui/material"
import { Label } from "../component/label/label";
import { Iconify } from "../component/iconify/iconify";
import { useTable } from "./table/use-table.js";
import { useCallback, useMemo, useState } from "react";
import { UserTableToolbar } from "./table/user-table-toolbar";
import { UserTableFiltersResult } from "./table/user-table-filters-result";
import { TableSelectedAction } from "./table/table-selected-action";
import { Scrollbar } from "../component/scrollbar/scrollbar";
import { TableHeadCustom } from "./table/table-head-custom";
import { TableEmptyRows } from "./table/table-empty-rows";
import { TableNoData } from "./table/table-no-data";
import { TablePaginationCustom } from "./table/table-pagination-custom";

const USER_STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'banned', label: 'Banned' },
    { value: 'rejected', label: 'Rejected' },
];

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
    { id: 'name', label: 'Name' },
    { id: 'phoneNumber', label: 'Phone number', width: 180 },
    { id: 'company', label: 'Company', width: 220 },
    { id: 'role', label: 'Role', width: 180 },
    { id: 'status', label: 'Status', width: 100 },
    { id: '', width: 88 },
];

function useBoolean(defaultValue = false) {
    const [value, setValue] = useState(defaultValue);

    const onTrue = useCallback(() => {
        setValue(true);
    }, []);

    const onFalse = useCallback(() => {
        setValue(false);
    }, []);

    const onToggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    const memoizedValue = useMemo(
        () => ({
            value,
            onTrue,
            onFalse,
            onToggle,
            setValue,
        }),
        [value, onTrue, onFalse, onToggle, setValue]
    );

    return memoizedValue;
}

export function isEqual(a: any, b: any): any {
    if (a === null || a === undefined || b === null || b === undefined) {
        return a === b;
    }

    if (typeof a !== typeof b) {
        return false;
    }

    if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
        return a === b;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }

        return a.every((item, index) => isEqual(item, b[index]));
    }

    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) {
            return false;
        }

        return keysA.every((key) => isEqual(a[key], b[key]));
    }

    return false;
}

type IInitialState = { [key: string]: any }

export function useSetState(initialState: IInitialState) {
    const [state, set] = useState(initialState);

    const canReset = !isEqual(state, initialState);

    const setState = useCallback((updateState: IInitialState) => {
        set((prevValue: IInitialState) => ({ ...prevValue, ...updateState }));
    }, []);

    const setField = useCallback(
        (name: string, updateValue: () => void) => {
            setState({
                [name]: updateValue,
            });
        },
        [setState]
    );

    const onResetState = useCallback(() => {
        set(initialState);
    }, [initialState]);

    const memoizedValue = useMemo(
        () => ({
            state,
            setState,
            setField,
            onResetState,
            canReset,
        }),
        [canReset, onResetState, setField, setState, state]
    );

    return memoizedValue;
}

function applyFilter({ inputData, comparator, filters }: any): any {
    const { name, status, role } = filters;

    const stabilizedThis = inputData.map((el:any, index:number) => [el, index]);

    stabilizedThis.sort((a:any, b:any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el:any) => el[0]);

    if (name) {
        inputData = inputData.filter(
            (user:any) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
        );
    }

    if (status !== 'all') {
        inputData = inputData.filter((user:any) => user.status === status);
    }

    if (role.length) {
        inputData = inputData.filter((user:any) => role.includes(user.role));
    }

    return inputData;
}

const _userList = [{
    id: 'id1',
    zipCode: '85807',
    state: 'Virginia',
    city: 'Rancho Cordova',
    role: 'CTO',
    email: 'ashlynn.ohara62@gmail.com',
    address: '908 Jack Locks',
    name: 'Jayvion Simon',
    isVerified: true,
    company: 'Wuckert Inc',
    country: 'Australia',
    avatarUrl: '',
    phoneNumber: '+234 1 123 4567',
    status: 'pending',
}, {
    id: 'id2',
    zipCode: '85807',
    state: 'Virginia',
    city: 'Rancho Cordova',
    role: 'Team Leader',
    email: 'milo.farrell@hotmail.com',
    address: '908 Jack Locks',
    name: 'Lucian Obrien',
    isVerified: false,
    company: 'Dibbert Inc',
    country: 'India',
    avatarUrl: '',
    phoneNumber: '+254 20 123 4567',
    status: 'active',
}]

function descendingComparator(a: any, b: any, orderBy: any) {
    if (a[orderBy] === null) {
        return 1;
    }
    if (b[orderBy] === null) {
        return -1;
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: any, orderBy: any) {
    return order === 'desc'
        ? (a:any, b:any) => descendingComparator(a, b, orderBy)
        : (a:any, b:any) => -descendingComparator(a, b, orderBy);
}

function rowInPage(data: any, page: any, rowsPerPage: any) {
  return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export const _roles = [
  `CEO`,
  `CTO`,
  `Project Coordinator`,
  `Team Leader`,
  `Software Developer`,
  `Marketing Strategist`,
  `Data Analyst`,
  `Product Owner`,
  `Graphic Designer`,
  `Operations Manager`,
];

export function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }:any) {
  const confirm = useBoolean();

//   const popover = usePopover();

  const quickEdit = useBoolean();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.company}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.role}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'active' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'banned' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Quick Edit" placement="top" arrow>
              <IconButton
                color={quickEdit.value ? 'inherit' : 'default'}
                onClick={quickEdit.onTrue}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton> */}
          </Stack>
        </TableCell>
      </TableRow>

      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

      {/* <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </MenuList>
      </CustomPopover> */}

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

export function emptyRows(page:any, rowsPerPage:any, arrayLength:any) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

const MainTable = () => {

    const table = useTable();

    // const router = useRouter();

    const confirm = useBoolean();

    const [tableData, setTableData] = useState(_userList);

    const filters = useSetState({ name: '', role: [], status: 'all' });

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters: filters.state,
    });

    const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

    const canReset =
        !!filters.state.name || filters.state.role.length > 0 || filters.state.status !== 'all';

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const handleDeleteRow = useCallback(
        (id: any) => {
            const deleteRow = tableData.filter((row) => row.id !== id);

            // toast.success('Delete success!');

            setTableData(deleteRow);

            table.onUpdatePageDeleteRow(dataInPage.length);
        },
        [dataInPage.length, table, tableData]
    );

    const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

        // toast.success('Delete success!');

        setTableData(deleteRows);

        table.onUpdatePageDeleteRows({
            totalRowsInPage: dataInPage.length,
            totalRowsFiltered: dataFiltered.length,
        });
    }, [dataFiltered.length, dataInPage.length, table, tableData]);

    const handleEditRow = useCallback(
        // (id) => {
        //     router.push(paths.dashboard.user.edit(id));
        // },
        // [router]
        (id:any) => {
            // router.push(paths.dashboard.user.edit(id));
        },
        []
    );

    const handleFilterStatus = useCallback(
        (event:any, newValue:any) => {
            table.onResetPage();
            filters.setState({ status: newValue });
        },
        [filters, table]
    );

    return <>
        <Card>
            <Tabs
                value={filters.state.status}
                onChange={handleFilterStatus}
                sx={{
                    px: 2.5,
                    // boxShadow: (theme) =>
                    //     `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
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
                                    (tab.value === 'active' && 'success') ||
                                    (tab.value === 'pending' && 'warning') ||
                                    (tab.value === 'banned' && 'error') ||
                                    'default'
                                }
                            >
                                {['active', 'pending', 'banned', 'rejected'].includes(tab.value)
                                    ? tableData.filter((user) => user.status === tab.value).length
                                    : tableData.length}
                            </Label>
                        }
                    />
                ))}
            </Tabs>

            <UserTableToolbar
                filters={filters}
                onResetPage={table.onResetPage}
                options={{ roles: _roles }}
            />

            {canReset && (
                <UserTableFiltersResult
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
                    onSelectAllRows={(checked:any) =>
                        table.onSelectAllRows(
                            checked,
                            dataFiltered.map((row:any) => row.id)
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

                <Scrollbar>
                    <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                        <TableHeadCustom
                            order={table.order}
                            orderBy={table.orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={dataFiltered.length}
                            numSelected={table.selected.length}
                            onSort={table.onSort}
                            onSelectAllRows={(checked:any) =>
                                table.onSelectAllRows(
                                    checked,
                                    dataFiltered.map((row:any) => row.id)
                                )
                            }
                        />

                        <TableBody>
                            {dataFiltered
                                .slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                )
                                .map((row:any) => (
                                    <UserTableRow
                                        key={row.id}
                                        row={row}
                                        selected={table.selected.includes(row.id)}
                                        onSelectRow={() => table.onSelectRow(row.id)}
                                        onDeleteRow={() => handleDeleteRow(row.id)}
                                        onEditRow={() => handleEditRow(row.id)}
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
        {/* <ConfirmDialog
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
        /> */}
    </>
}

export default MainTable;