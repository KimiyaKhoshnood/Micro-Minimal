import Box from '@mui/material/Box';
import ApexChart from 'react-apexcharts'

// ----------------------------------------------------------------------

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  loadingProps,
  width = '100%',
  ...other
}: {
  sx?: any,
  type?: any,
  series?: any,
  height?: any,
  options?: any,
  loadingProps?: any,
  width?: any,
  [other: string]: any
}) {
  return (
    <Box
      dir="ltr"
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <ApexChart
        type={type}
        series={series}
        options={options}
        width="100%"
        height="100%"
        loading={loadingProps}
      />
    </Box>
  );
}
