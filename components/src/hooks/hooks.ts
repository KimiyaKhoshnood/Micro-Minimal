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