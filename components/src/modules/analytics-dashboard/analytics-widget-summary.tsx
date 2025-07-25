import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { useChart } from '../../component/chart/use-chart';
import { fNumber, fPercent, fShortenNumber } from '../../hooks/hooks';
import { Iconify } from '../../component/iconify/iconify';
import { bgGradient } from '../../theme/styles/mixins';
import { varAlpha } from '../../theme/styles/utils';
import { Chart } from '../../component/chart/chart';
import { SvgColor } from '../../component/svg-color/svg-color';

// import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';

// import { CONFIG } from 'src/config-global';
// import { varAlpha, bgGradient } from 'src/theme/styles';

// import { Iconify } from 'src/components/iconify';
// import { SvgColor } from 'src/components/svg-color';
// import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  chart,
  percent,
  color = 'primary',
  sx,
  ...other
}: {
  icon?: any,
  title?: any,
  total?: any,
  chart?: any,
  percent?: any,
  color?: string,
  sx?: any,
  [other: string]: any
}) {
  const theme: any = useTheme();

  const chartColors = [theme.palette[color].dark];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: { formatter: (value: any) => fNumber(value), title: { formatter: () => '' } },
    },
    ...chart.options,
  });

  const renderTrending = (
    <Box
      sx={{
        top: 16,
        gap: 0.5,
        right: 16,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <Iconify width={20} icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'} />
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {percent > 0 && '+'}
        {fPercent(percent)}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: 'none',
        position: 'relative',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>

      {renderTrending}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>
          <Box sx={{ typography: 'h4' }}>{fShortenNumber(total)}</Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={84}
          height={56}
        />
      </Box>

      <SvgColor
        src={`/assets/background/shape-square.svg`}
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}
