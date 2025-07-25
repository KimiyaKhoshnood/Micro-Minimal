import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { varAlpha } from '../../theme/styles/utils';
import { SocialIcon } from '../../component/iconify/social-icon';
import { fShortenNumber } from '../../hooks/hooks';

// ----------------------------------------------------------------------

export function AnalyticsTrafficBySite({ title, subheader, list, ...other }: { title?: any, subheader?: any, list?: any, [other: string]: any }) {
  const theme : any = useTheme();

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
        {list.map((site: any) => (
          <Box
            key={site.label}
            sx={{
              py: 2.5,
              display: 'flex',
              borderRadius: 1.5,
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
            }}
          >
            <SocialIcon width={32} icon={site.value} />

            <Typography variant="h6" sx={{ mt: 1 }}>
              {fShortenNumber(site.total)}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {site.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
