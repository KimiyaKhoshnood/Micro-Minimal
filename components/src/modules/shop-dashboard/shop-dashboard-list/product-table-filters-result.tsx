import { useCallback } from 'react';

import Chip from '@mui/material/Chip';
import { chipProps, FiltersResult } from '../../../component/filters-result/filters-result';
import { FiltersBlock } from '../../../component/filters-result/filters-block';

// import { sentenceCase } from 'src/utils/change-case';

// import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function ProductTableFiltersResult({ filters, totalResults, sx }:any) {
  const handleRemoveStock = useCallback(
    (inputValue:any) => {
      const newValue = filters.state.stock.filter((item:any) => item !== inputValue);

      filters.setState({ stock: newValue });
    },
    [filters]
  );

  const handleRemovePublish = useCallback(
    (inputValue:any) => {
      const newValue = filters.state.publish.filter((item:any) => item !== inputValue);

      filters.setState({ publish: newValue });
    },
    [filters]
  );

  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
      <FiltersBlock label="Stock:" isShow={!!filters.state.stock.length}>
        {filters.state.stock.map((item:any) => (
          <Chip
            {...chipProps}
            key={item}
            label={item.charAt(0).toUpperCase() + item.slice(1)}
            onDelete={() => handleRemoveStock(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Publish:" isShow={!!filters.state.publish.length}>
        {filters.state.publish.map((item:any) => (
          <Chip
            {...chipProps}
            key={item}
            label={item.charAt(0).toUpperCase() + item.slice(1)}
            onDelete={() => handleRemovePublish(item)}
          />
        ))}
      </FiltersBlock>
    </FiltersResult>
  );
}
