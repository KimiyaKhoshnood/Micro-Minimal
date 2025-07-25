import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import { useChart } from '../../component/chart/use-chart';
import { Chart } from '../../component/chart/chart';
import { ChartLegends } from '../../component/chart/chart-legends';

// ----------------------------------------------------------------------

export function AnalyticsCurrentSubject({ title, subheader, chart, ...other }: { title?: any, subheader?: any, chart?: any, [other: string]: any }) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    xaxis: {
      categories: chart.categories,
      labels: { style: { colors: [...Array(6)].map(() => theme.palette.text.secondary) } },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="radar"
        series={chart.series}
        options={chartOptions}
        width={300}
        height={300}
        loadingProps={{ sx: { py: 2.5 } }}
        sx={{ my: 1, mx: 'auto' }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ChartLegends
        labels={chart.series.map((item: any) => item.name)}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </Card>
  );
}
