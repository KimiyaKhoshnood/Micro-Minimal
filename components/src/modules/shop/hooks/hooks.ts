// import { useMemo } from "react";

// export function useSearchProducts(query) {
//   const url = query ? [endpoints.product.search, { params: { query } }] : '';

//   const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
//     ...swrOptions,
//     keepPreviousData: true,
//   });

//   const memoizedValue = useMemo(
//     () => ({
//       searchResults: data?.results || [],
//       searchLoading: isLoading,
//       searchError: error,
//       searchValidating: isValidating,
//       searchEmpty: !isLoading && !data?.results.length,
//     }),
//     [data?.results, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }
