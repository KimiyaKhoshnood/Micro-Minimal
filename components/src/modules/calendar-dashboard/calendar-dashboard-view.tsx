import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Badge, Box, Button, Card, Chip, Dialog, DialogTitle, Divider, Drawer, IconButton, LinearProgress, ListItemButton, ListItemText, MenuItem, MenuList, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { fDate, fDateRangeShortLabel, fIsAfter, fIsBetween, useBoolean } from "../../hooks/hooks";
import { useSetState } from "../../table/table";
import { useCallback, useEffect } from "react";
import { Iconify } from "../../component/iconify/iconify";
import { error, info, primary, secondary, success, warning } from "../../theme/core/palette";
import { useCalendar, useEvent } from "./calender-utils";
import { chipProps, FiltersResult } from "../../component/filters-result/filters-result";
import { FiltersBlock } from "../../component/filters-result/filters-block";
import { varAlpha } from "../../theme/styles/utils";
import { Scrollbar } from "../../component/scrollbar/scrollbar";
import { ColorPicker } from "../shop/color-utils/color-picker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { fDateTime } from "../../post/newest-booking";
import { StyledCalendar } from "./styles";
import { CustomPopover } from "../../component/custom-popover/custom-popover";
import { usePopover } from "../../component/custom-popover/use-popover";
import { DashboardContent } from '../dashboard/dashboard/layout';
import { CalendarForm } from './calendar-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// ----------------------------------------------------------------------

export const CALENDAR_COLOR_OPTIONS = [
    primary.main,
    secondary.main,
    info.main,
    info.darker,
    success.main,
    warning.main,
    error.main,
    error.darker,
];

const events = [
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
        "title": "Summer Music Festival",
        "allDay": false,
        "color": "#00A76F",
        "description": "Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.",
        "start": "2025-07-13T10:49:03+00:00",
        "end": "2025-07-13T14:19:03+00:00",
        "textColor": "#00A76F"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
        "title": "Tech Innovators Conference",
        "allDay": false,
        "color": "#00B8D9",
        "description": "Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.",
        "start": "2025-07-19T10:49:03+00:00",
        "end": "2025-07-19T14:19:03+00:00",
        "textColor": "#00B8D9"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
        "title": "Charity Gala Dinner",
        "allDay": false,
        "color": "#22C55E",
        "description": "Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.",
        "start": "2025-07-28T14:19:03+00:00",
        "end": "2025-07-28T18:34:03+00:00",
        "textColor": "#22C55E"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
        "title": "Spring Art Exhibition",
        "allDay": false,
        "color": "#8E33FF",
        "description": "Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.",
        "start": "2025-07-25T10:19:03+00:00",
        "end": "2025-07-25T14:19:03+00:00",
        "textColor": "#8E33FF"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
        "title": "Corporate Training Workshop",
        "allDay": false,
        "color": "#FFAB00",
        "description": "Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.",
        "start": "2025-07-28T14:19:03+00:00",
        "end": "2025-07-28T14:49:03+00:00",
        "textColor": "#FFAB00"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
        "title": "Community Health Fair",
        "allDay": true,
        "color": "#FF5630",
        "description": "Est enim et sit non impedit aperiam cumque animi. Aut eius impedit saepe blanditiis. Totam molestias magnam minima fugiat.",
        "start": "2025-07-22T00:00:00+00:00",
        "end": "2025-07-22T23:59:59+00:00",
        "textColor": "#FF5630"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
        "title": "Startup Pitch Night",
        "allDay": false,
        "color": "#003768",
        "description": "Unde a inventore et. Sed esse ut. Atque ducimus quibusdam fuga quas id qui fuga.",
        "start": "2025-07-28T14:34:03+00:00",
        "end": "2025-07-28T14:49:03+00:00",
        "textColor": "#003768"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9",
        "title": "Regional Sports Tournament",
        "allDay": false,
        "color": "#00B8D9",
        "description": "Eaque natus adipisci soluta nostrum dolorem. Nesciunt ipsum molestias ut aliquid natus ut omnis qui fugiat. Dolor et rem. Ut neque voluptatem blanditiis quasi ullam deleniti.",
        "start": "2025-07-28T15:04:03+00:00",
        "end": "2025-07-28T15:14:03+00:00",
        "textColor": "#00B8D9"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10",
        "title": "Book Launch Event",
        "allDay": false,
        "color": "#7A0916",
        "description": "Nam et error exercitationem qui voluptate optio. Officia omnis qui accusantium ipsam qui. Quia sequi nulla perspiciatis optio vero omnis maxime omnis ipsum. Perspiciatis consequuntur asperiores veniam dolores.",
        "start": "2025-07-31T14:29:03+00:00",
        "end": "2025-07-31T14:39:03+00:00",
        "textColor": "#7A0916"
    }
]

const VIEW_OPTIONS = [
    { value: 'dayGridMonth', label: 'Month', icon: 'mingcute:calendar-month-line' },
    { value: 'timeGridWeek', label: 'Week', icon: 'mingcute:calendar-week-line' },
    { value: 'timeGridDay', label: 'Day', icon: 'mingcute:calendar-day-line' },
    { value: 'listWeek', label: 'Agenda', icon: 'fluent:calendar-agenda-24-regular' },
];

// ----------------------------------------------------------------------

const CalendarDashboardView = () => {
    const theme = useTheme();

    const openFilters = useBoolean();

    const popover = usePopover();

    // const { events, eventsLoading } = useGetEvents();

    const filters = useSetState({
        colors: [],
        startDate: null,
        endDate: null,
    });

    const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

    const {
        calendarRef,
        //
        view,
        date,
        //
        onDatePrev,
        onDateNext,
        onDateToday,
        onDropEvent,
        onChangeView,
        onSelectRange,
        onClickEvent,
        onResizeEvent,
        onInitialView,
        //
        openForm,
        onOpenForm,
        onCloseForm,
        //
        selectEventId,
        selectedRange,
        //
        onClickEventInFilters,
    } = useCalendar();

    const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);

    useEffect(() => {
        onInitialView();
    }, [onInitialView]);

    const handleRemoveColor = useCallback(
        (inputValue: any) => {
            const newValue = filters.state.colors.filter((item: any) => item !== inputValue);

            filters.setState({ colors: newValue });
        },
        [filters]
    );

    const handleRemoveDate = useCallback(() => {
        filters.setState({ startDate: null, endDate: null });
    }, [filters]);

    const handleFilterColors = useCallback(
        (newValue: any) => {
            filters.setState({ colors: newValue });
        },
        [filters]
    );

    const handleFilterStartDate = useCallback(
        (newValue: any) => {
            filters.setState({ startDate: newValue });
        },
        [filters]
    );

    const handleFilterEndDate = useCallback(
        (newValue: any) => {
            filters.setState({ endDate: newValue });
        },
        [filters]
    );

    const selectedItem = VIEW_OPTIONS.filter((item) => item.value === view)[0];

    const canReset =
        filters.state.colors.length > 0 || (!!filters.state.startDate && !!filters.state.endDate);

    const dataFiltered = applyFilter({ inputData: events, filters: filters.state, dateError });

    const renderResults = (
        <FiltersResult totalResults={dataFiltered.length} onReset={filters.onResetState} sx={{ mb: { xs: 3, md: 5 } }}>
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
                                    border: (theme: any) =>
                                        `solid 1px ${varAlpha(theme.vars.palette.common.whiteChannel, 0.24)}`,
                                }}
                            />
                        }
                        onDelete={() => handleRemoveColor(item)}
                    />
                ))}
            </FiltersBlock>

            <FiltersBlock
                label="Date:"
                isShow={Boolean(filters.state.startDate && filters.state.endDate)}
            >
                <Chip
                    {...chipProps}
                    label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
                    onDelete={handleRemoveDate}
                />
            </FiltersBlock>
        </FiltersResult>
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

                <IconButton onClick={openFilters.onFalse}>
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />
        </>
    );

    const renderColors = (
        <Box display="flex" flexDirection="column" sx={{ my: 3, px: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Colors
            </Typography>
            <ColorPicker
                colors={CALENDAR_COLOR_OPTIONS}
                selected={filters.state.colors}
                onSelectColor={handleFilterColors}
            />
        </Box>
    );

    const renderDateRange = (
        <Box display="flex" flexDirection="column" sx={{ mb: 3, px: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Range
            </Typography>

            <DatePicker
                label="Start date"
                value={filters.state.startDate}
                onChange={handleFilterStartDate}
                sx={{ mb: 2.5 }}
            />

            <DatePicker
                label="End date"
                value={filters.state.endDate}
                onChange={handleFilterEndDate}
                slotProps={{
                    textField: {
                        error: dateError,
                        helperText: dateError ? 'End date must be later than start date' : null,
                    },
                }}
            />
        </Box>
    );

    const renderEvents = (
        <>
            <Typography variant="subtitle2" sx={{ px: 2.5, mb: 1 }}>
                Events ({events.length})
            </Typography>

            <Box component="ul">
                {orderBy(events, ['end'], ['desc']).map((event: any) => (
                    <Box component="li" key={event.id}>
                        <ListItemButton
                            onClick={() => onClickEvent(`${event.id}`)}
                            sx={{
                                py: 1.5,
                                borderBottom: (theme: any) => `dashed 1px ${theme.vars.palette.divider}`,
                            }}
                        >
                            <Box
                                sx={{
                                    top: 16,
                                    left: 0,
                                    width: 0,
                                    height: 0,
                                    position: 'absolute',
                                    borderRight: '10px solid transparent',
                                    borderTop: `10px solid ${event.color}`,
                                }}
                            />

                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography variant="subtitle2" sx={{ fontSize: 13, mt: 0.5 }}>
                                        {event.title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        sx={{ fontSize: 11, color: 'text.disabled' }}
                                    >
                                        {event.allDay
                                            ? fDate(event.start)
                                            : `${fDateTime(event.start)} - ${fDateTime(event.end)}`}
                                    </Typography>
                                }
                                sx={{ display: 'flex', flexDirection: 'column-reverse' }}
                            />
                        </ListItemButton>
                    </Box>
                ))}
            </Box>
        </>
    );

    const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: { xs: 3, md: 5 } }}
                >
                    <Typography variant="h4">Calendar</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={onOpenForm}
                    >
                        New event
                    </Button>
                </Stack>

                {canReset && renderResults}

                <Card sx={{ ...flexProps, minHeight: '50vh' }}>
                    <StyledCalendar sx={{ ...flexProps, '.fc.fc-media-screen': { flex: '1 1 auto' } }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ p: 2.5, pr: 2, position: 'relative' }}
                        >
                            <Button
                                size="small"
                                color="inherit"
                                onClick={popover.onOpen}
                                startIcon={<Iconify icon={selectedItem.icon} />}
                                endIcon={<Iconify icon="eva:arrow-ios-downward-fill" sx={{ ml: -0.5 }} />}
                                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                            >
                                {selectedItem.label}
                            </Button>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <IconButton onClick={onDatePrev}>
                                    <Iconify icon="eva:arrow-ios-back-fill" />
                                </IconButton>

                                <Typography variant="h6">{fDate(date)}</Typography>

                                <IconButton onClick={onDateNext}>
                                    <Iconify icon="eva:arrow-ios-forward-fill" />
                                </IconButton>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Button size="small" color="error" variant="contained" onClick={onDateToday}>
                                    Today
                                </Button>

                                <IconButton onClick={openFilters.onTrue}>
                                    <Badge color="error" variant="dot" invisible={!canReset}>
                                        <Iconify icon="ic:round-filter-list" />
                                    </Badge>
                                </IconButton>
                            </Stack>

                            {/* if loading */}
                            {/* <LinearProgress 
                                color="inherit"
                                sx={{
                                    left: 0,
                                    width: 1,
                                    height: 2,
                                    bottom: 0,
                                    borderRadius: 0,
                                    position: 'absolute',
                                }}
                            /> */}
                        </Stack>

                        <CustomPopover
                            open={popover.open}
                            anchorEl={popover.anchorEl}
                            onClose={popover.onClose}
                            slotProps={{ arrow: { placement: 'top-left' } }}
                        >
                            <MenuList>
                                {VIEW_OPTIONS.map((viewOption: any) => (
                                    <MenuItem
                                        key={viewOption.value}
                                        selected={viewOption.value === view}
                                        onClick={() => {
                                            popover.onClose();
                                            onChangeView(viewOption.value);
                                        }}
                                    >
                                        <Iconify icon={viewOption.icon} />
                                        {viewOption.label}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </CustomPopover>

                        <Calendar
                            weekends
                            editable
                            droppable
                            selectable
                            rerenderDelay={10}
                            allDayMaintainDuration
                            eventResizableFromStart
                            ref={calendarRef}
                            initialDate={date}
                            initialView={view}
                            dayMaxEventRows={3}
                            eventDisplay="block"
                            events={dataFiltered}
                            headerToolbar={false}
                            select={onSelectRange}
                            eventClick={onClickEvent}
                            aspectRatio={3}
                            // eventDrop={(arg: any) => {
                            //     onDropEvent(arg, updateEvent);
                            // }}
                            // eventResize={(arg: any) => {
                            //     onResizeEvent(arg, updateEvent);
                            // }}
                            plugins={[
                                listPlugin,
                                dayGridPlugin,
                                timelinePlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                        />
                    </StyledCalendar>
                </Card>
            </DashboardContent>

            <Dialog
                fullWidth
                maxWidth="xs"
                open={openForm}
                onClose={onCloseForm}
                transitionDuration={{
                    enter: theme.transitions.duration.shortest,
                    exit: theme.transitions.duration.shortest - 80,
                }}
                PaperProps={{
                    sx: {
                        display: 'flex',
                        overflow: 'hidden',
                        flexDirection: 'column',
                        '& form': { minHeight: 0, display: 'flex', flex: '1 1 auto', flexDirection: 'column' },
                    },
                }}
            >
                <DialogTitle sx={{ minHeight: 76 }}>
                    {openForm && <> {currentEvent?.id ? 'Edit' : 'Add'} event</>}
                </DialogTitle>

                <CalendarForm
                    currentEvent={currentEvent}
                    colorOptions={CALENDAR_COLOR_OPTIONS}
                    onClose={onCloseForm}
                />
            </Dialog>

            <Drawer
                anchor="right"
                open={openFilters.value}
                onClose={openFilters.onFalse}
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: 320 } }}
            >
                {renderHead}

                <Scrollbar>
                    {renderColors}
                    {renderDateRange}
                    {renderEvents}
                </Scrollbar>
            </Drawer>

            <Drawer
                anchor="right"
                open={openFilters.value}
                onClose={openFilters.onFalse}
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: 320 } }}
            >
                {renderHead}

                <Scrollbar>
                    {renderColors}
                    {renderDateRange}
                    {renderEvents}
                </Scrollbar>
            </Drawer>
        </LocalizationProvider>
    )
}

export default CalendarDashboardView


function applyFilter({ inputData, filters, dateError }: { inputData?: any, filters?: any, dateError?: any }) {
    const { colors, startDate, endDate } = filters;

    const stabilizedThis = inputData.map((el: any, index: number) => [el, index]);

    inputData = stabilizedThis.map((el: any) => el[0]);

    if (colors.length) {
        inputData = inputData.filter((event: any) => colors.includes(event.color));
    }

    if (!dateError) {
        if (startDate && endDate) {
            inputData = inputData.filter((event: any) => fIsBetween(event.start, startDate, endDate));
        }
    }

    return inputData;
}

export function orderBy(array?: any, properties?: any, orders?: any) {
    return array.slice().sort((a: any, b: any) => {
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