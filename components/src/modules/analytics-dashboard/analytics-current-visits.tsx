import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import { useChart } from '../../component/chart/use-chart';
import { fNumber } from '../../hooks/hooks';
import { Chart } from '../../component/chart/chart';
import { ChartLegends } from '../../component/chart/chart-legends';

// import { fNumber } from 'src/utils/format-number';

// import { Chart, useChart, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------

export function AnalyticsCurrentVisits({ title, subheader, chart, ...other }: { title?: any, subheader?: any, chart?: any, [other: string]: any }) {
  const theme = useTheme();

  const chartSeries = chart.series.map((item: any) => item.value);

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.light,
    theme.palette.info.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item: any) => item.label),
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      y: {
        formatter: (value: any) => fNumber(value),
        title: { formatter: (seriesName: any) => `${seriesName}` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width={{ xs: 240, xl: 260 }}
        height={{ xs: 240, xl: 260 }}
        sx={{ my: 6, mx: 'auto' }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </Card>
  );
}
