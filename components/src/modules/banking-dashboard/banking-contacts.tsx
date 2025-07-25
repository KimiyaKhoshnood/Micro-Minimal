import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import { Iconify } from '../../component/iconify/iconify';
import { Scrollbar } from '../../component/scrollbar/scrollbar';

// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function BankingContacts({ title, subheader, list, ...other }: { title?: any, subheader?: any, list?: any, [other: string]: any }) {
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          >
            View all
          </Button>
        }
      />

      <Scrollbar sx={{ minHeight: 364 }}>
        <Box
          sx={{
            p: 3,
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 360,
          }}
        >
          {list.map((item: any) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}

function Item({ item, sx, ...other }: { item?: any, sx?: any, [other: string]: any }) {
  return (
    <Box key={item.id} sx={{ gap: 2, display: 'flex', alignItems: 'center', ...sx }} {...other}>
      <Avatar src={item.avatarUrl} />

      <ListItemText primary={item.name} secondary={item.email} />

      <Tooltip title="Quick transfer">
        <IconButton>
          <Iconify icon="solar:transfer-horizontal-bold-duotone" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
