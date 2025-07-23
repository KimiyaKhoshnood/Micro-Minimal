import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useDebounce(value: string, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    const debounceHandler = useCallback(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    useEffect(() => {
        debounceHandler();
    }, [debounceHandler]);

    const memoizedValue = useMemo(() => debouncedValue, [debouncedValue]);

    return memoizedValue;
}

export function useBoolean(defaultValue: boolean = false) {
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

function processInput(inputValue: any) {
    if (inputValue == null || Number.isNaN(inputValue)) return null;
    return Number(inputValue);
}

export function fShortenNumber(inputValue?: any, options?: any) {
    const locale = { code: 'en-US', currency: 'USD' };

    const number = processInput(inputValue);
    if (number === null) return '';

    const fm = new Intl.NumberFormat(locale.code, {
        notation: 'compact',
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

export function useTabs(defaultValue: any) {
    const [value, setValue] = useState(defaultValue);

    const onChange = useCallback((event: any, newValue: any) => {
        setValue(newValue);
    }, []);

    const memoizedValue = useMemo(() => ({ value, setValue, onChange }), [onChange, value]);

    return memoizedValue;
}

export const formatStr = {
    dateTime: 'DD MMM YYYY h:mm a', // 17 Apr 2022 12:00 am
    date: 'DD MMM YYYY', // 17 Apr 2022
    time: 'h:mm a', // 12:00 am
    split: {
        dateTime: 'DD/MM/YYYY h:mm a', // 17/04/2022 12:00 am
        date: 'DD/MM/YYYY', // 17/04/2022
    },
    paramCase: {
        dateTime: 'DD-MM-YYYY h:mm a', // 17-04-2022 12:00 am
        date: 'DD-MM-YYYY', // 17-04-2022
    },
};

export function fDate(date: Date, format?: any) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).format(format ?? formatStr.date) : 'Invalid time value';
}

// ----------------------------------------------------------------------

/** output: 12:00 am
 */
export function fTime(date?: any, format?: any) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).format(format ?? formatStr.time) : 'Invalid time value';
}