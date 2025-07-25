import { useCallback, useMemo, useRef, useState } from "react";
import { useResponsive } from "../../hooks/hooks";
import { CALENDAR_COLOR_OPTIONS } from "./calendar-dashboard-view";
import dayjs from "dayjs";

export function useCalendar() {
    const calendarRef = useRef(null);

    const calendarEl: any = calendarRef.current;

    const smUp = useResponsive('up', 'sm');

    const [date, setDate] = useState(new Date());

    const [openForm, setOpenForm] = useState(false);

    const [selectEventId, setSelectEventId] = useState('');

    const [selectedRange, setSelectedRange] = useState<any>(null);

    const [view, setView] = useState(smUp ? 'dayGridMonth' : 'listWeek');

    const onOpenForm = useCallback(() => {
        setOpenForm(true);
    }, []);

    const onCloseForm = useCallback(() => {
        setOpenForm(false);
        setSelectedRange(null);
        setSelectEventId('');
    }, []);

    const onInitialView = useCallback(() => {
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            const newView = smUp ? 'dayGridMonth' : 'listWeek';
            calendarApi.changeView(newView);
            setView(newView);
        }
    }, [calendarEl, smUp]);

    const onChangeView = useCallback(
        (newView: any) => {
            if (calendarEl) {
                const calendarApi = calendarEl.getApi();

                calendarApi.changeView(newView);
                setView(newView);
            }
        },
        [calendarEl]
    );

    const onDateToday = useCallback(() => {
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    }, [calendarEl]);

    const onDatePrev = useCallback(() => {
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    }, [calendarEl]);

    const onDateNext = useCallback(() => {
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    }, [calendarEl]);

    const onSelectRange = useCallback(
        (arg: any) => {
            if (calendarEl) {
                const calendarApi = calendarEl.getApi();

                calendarApi.unselect();
            }

            onOpenForm();
            setSelectedRange({ start: arg.startStr, end: arg.endStr });
        },
        [calendarEl, onOpenForm]
    );

    const onClickEvent = useCallback(
        (arg: any) => {
            const { event } = arg;

            onOpenForm();
            setSelectEventId(event.id);
        },
        [onOpenForm]
    );

    const onResizeEvent = useCallback((arg: any, updateEvent: any) => {
        const { event } = arg;

        updateEvent({
            id: event.id,
            allDay: event.allDay,
            start: event.startStr,
            end: event.endStr,
        });
    }, []);

    const onDropEvent = useCallback((arg: any, updateEvent: any) => {
        const { event } = arg;

        updateEvent({
            id: event.id,
            allDay: event.allDay,
            start: event.startStr,
            end: event.endStr,
        });
    }, []);

    const onClickEventInFilters = useCallback(
        (eventId: any) => {
            if (eventId) {
                onOpenForm();
                setSelectEventId(eventId);
            }
        },
        [onOpenForm]
    );

    return {
        calendarRef,
        //
        view,
        date,
        //
        onDatePrev,
        onDateNext,
        onDateToday,
        onDropEvent,
        onClickEvent,
        onChangeView,
        onSelectRange,
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
    };
}

// ----------------------------------------------------------------------

export function useEvent(events?: any, selectEventId?: any, selectedRange?: any, openForm?: any) {
    const currentEvent = events.find((event:any) => event.id === selectEventId);

    const defaultValues = useMemo(
        () => ({
            id: '',
            title: '',
            description: '',
            color: CALENDAR_COLOR_OPTIONS[1],
            allDay: false,
            start: selectedRange ? selectedRange.start : dayjs(new Date()).format(),
            end: selectedRange ? selectedRange.end : dayjs(new Date()).format(),
        }),
        [selectedRange]
    );

    if (!openForm) {
        return undefined;
    }

    if (currentEvent || selectedRange) {
        return { ...defaultValues, ...currentEvent };
    }

    return defaultValues;
}