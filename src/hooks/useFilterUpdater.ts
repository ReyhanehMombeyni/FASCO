'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useFilterUpdater = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = useCallback((key: string, value: string | null) => {
        const currentParams = new URLSearchParams(searchParams.toString());

        if (value) {
            currentParams.set(key, value);
        } else {
            currentParams.delete(key);
        }

        if (currentParams.has('page')) {
            currentParams.delete('page');
        }

        router.push(`?${currentParams.toString()}`, { scroll: false });
    }, [router, searchParams]);

    const isFilterActive = useCallback((key: string, value: string) => {
        return searchParams.get(key) === value;
    }, [searchParams]);

    return { updateFilter, isFilterActive, currentParams: searchParams };
};