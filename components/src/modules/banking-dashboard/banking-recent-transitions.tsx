import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { Scrollbar } from '../../component/scrollbar/scrollbar';
import { TableHeadCustom } from '../../component/table/table-head-custom';
import { Iconify } from '../../component/iconify/iconify';
import { usePopover } from '../../component/custom-popover/use-popover';
import { fDate, fTime } from '../../hooks/hooks';
import { fCurrency } from '../shop/products/ProductUtils';
import { Label } from '../../component/label/label';
import { CustomPopover } from '../../component/custom-popover/custom-popover';

// import { fCurrency } from 'src/utils/format-number';
// import { fDate, fTime } from 'src/utils/format-time';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import { TableHeadCustom } from 'src/components/table';
// import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function BankingRecentTransitions({ title, subheader, tableData, headLabel, ...other }: { title?: any, subheader?: any, tableData?: any, headLabel?: any, [other: string]: any }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar sx={{ minHeight: 462 }}>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={headLabel} />

          <TableBody>
            {tableData.map((row:any) => (
              <RowItem key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function RowItem({ row }:{ row?: any }) {
  const theme = useTheme();

  const popover = usePopover();

  const lightMode = theme.palette.mode === 'light';

  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };

  const renderAvatar = (
    <Box sx={{ position: 'relative' }}>
      <Badge
        overlap="circular"
        color={row.type === 'Income' ? 'success' : 'error'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Iconify
            icon={
              row.type === 'Income'
                ? 'eva:diagonal-arrow-left-down-fill'
                : 'eva:diagonal-arrow-right-up-fill'
            }
            width={16}
          />
        }
        sx={{ [`& .${badgeClasses.badge}`]: { p: 0, width: 20 } }}
      >
        <Avatar
          src={row.avatarUrl || ''}
          sx={{
            width: 48,
            height: 48,
            color: 'text.secondary',
            bgcolor: 'background.neutral',
          }}
        >
          {row.category === 'Fast food' && <Iconify icon="ion:fast-food" width={24} />}
          {row.category === 'Fitness' && <Iconify icon="ic:round-fitness-center" width={24} />}
        </Avatar>
      </Badge>
    </Box>
  );

  return (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            {renderAvatar}
            <ListItemText primary={row.message} secondary={row.category} />
          </Box>
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(row.date)}
            secondary={fTime(row.date)}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
          />
        </TableCell>

        <TableCell>{fCurrency(row.amount)}</TableCell>

        <TableCell>
          <Label
            variant={lightMode ? 'soft' : 'filled'}
            color={
              (row.status === 'completed' && 'success') ||
              (row.status === 'progress' && 'warning') ||
              'error'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleDownload}>
            <Iconify icon="eva:cloud-download-fill" />
            Download
          </MenuItem>

          <MenuItem onClick={handlePrint}>
            <Iconify icon="solar:printer-minimalistic-bold" />
            Print
          </MenuItem>

          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" />
            Share
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
