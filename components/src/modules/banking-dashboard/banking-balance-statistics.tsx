import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import { useChart } from '../../component/chart/use-chart';
import { fCurrency } from '../shop/products/ProductUtils';
import { ChartSelect } from '../../component/chart/chart-select';
import { ChartLegends } from '../../component/chart/chart-legends';
import { fPercent } from '../../hooks/hooks';
import { Chart } from '../../component/chart/chart';

// ----------------------------------------------------------------------

export function BankingBalanceStatistics({ title, subheader, chart, ...other }: { title?: any, subheader?: any, chart?: any, [other: string]: any }) {
  const theme = useTheme();

  const [selectedSeries, setSelectedSeries] = useState('Yearly');

  const currentSeries = chart.series.find((i: any) => i.name === selectedSeries);

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    stroke: { width: 2, colors: ['transparent'] },
    colors: chartColors,
    xaxis: { categories: currentSeries?.categories },
    tooltip: { y: { formatter: (value: any) => fCurrency(value) } },
    ...chart.options,
  });

  const handleChangeSeries = useCallback((newValue: any) => {
    setSelectedSeries(newValue);
  }, []);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ChartSelect
            options={chart.series.map((item: any) => item.name)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
        sx={{ mb: 3 }}
      />

      <ChartLegends
        colors={chartOptions?.colors}
        labels={chart.series[0].data.map((item: any) => item.name)}
        sublabels={[`+${fPercent(43)}`, `+${fPercent(3)}`, `+${fPercent(8)}`]}
        values={[fCurrency(6789), fCurrency(1234), fCurrency(1012)]}
        sx={{ px: 3, gap: 3 }}
      />

      <Chart
        type="bar"
        series={currentSeries?.data}
        options={chartOptions}
        height={320}
        loadingProps={{ sx: { p: 2.5 } }}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
