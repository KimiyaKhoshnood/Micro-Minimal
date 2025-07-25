import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, IconButton, Link, ListItemText, MenuItem, MenuList, Paper, Stack, Typography } from "@mui/material"
import { DashboardContent } from "../../shop-dashboard/shop-dashboard-list/shop-dashboard-list-view"
import { Iconify } from "../../../component/iconify/iconify";
import { Label } from "../../../component/label/label";
import { fDateTime } from "../../../post/newest-booking";
import { usePopover } from "../../../component/custom-popover/use-popover";
import { CustomPopover } from "../../../component/custom-popover/custom-popover";
import { useCallback, useState } from "react";
import { Scrollbar } from "../../../component/scrollbar/scrollbar";
import { fCurrency } from "../../shop/products/ProductUtils";
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

// ----------------------------------------------------------------------

export const ORDER_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
];

// ----------------------------------------------------------------------

const OrderDashboardDetailsView = ({ order }: { order: any }) => {
  const [status, setStatus] = useState(order?.status);

  const handleChangeStatus = useCallback((newValue: any) => {
    setStatus(newValue);
  }, []);

  const popover = usePopover();

  const renderCustomer = (
    <>
      <CardHeader
        title="Customer info"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={order?.customer?.name}
          src={order?.customer?.avatarUrl}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{order?.customer?.name}</Typography>

          <Box sx={{ color: 'text.secondary' }}>{order?.customer?.email}</Box>

          <div>
            IP address:
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {order?.customer?.ipAddress}
            </Box>
          </div>

          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ mt: 1 }}
          >
            Add to Blacklist
          </Button>
        </Stack>
      </Stack>
    </>
  );

  const renderDelivery = (
    <>
      <CardHeader
        title="Delivery"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Ship by
          </Box>
          {order?.delivery?.shipBy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Speedy
          </Box>
          {order?.delivery?.speedy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tracking No.
          </Box>
          <Link underline="always" color="inherit">
            {order?.delivery?.trackingNumber}
          </Link>
        </Stack>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader
        title="Shipping"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>
          {order?.shippingAddress?.fullAddress}
        </Stack>

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone number
          </Box>
          {order?.shippingAddress?.phoneNumber}
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="Payment"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ p: 3, gap: 0.5, typography: 'body2' }}
      >
        {order?.payment?.cardNumber}
        <Iconify icon="logos:mastercard" width={24} />
      </Box>
    </>
  );

  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ p: 3, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(order?.subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
        <Box sx={{ width: 160, ...(order?.shipping && { color: 'error.main' }) }}>
          {order?.shipping ? `- ${fCurrency(order?.shipping)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box sx={{ width: 160, ...(order?.discount && { color: 'error.main' }) }}>
          {order?.discount ? `- ${fCurrency(order?.discount)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
        <Box sx={{ width: 160 }}>{order?.taxes ? fCurrency(order?.taxes) : '-'}</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(order?.totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  const renderSummary = (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        gap: 2,
        minWidth: 260,
        flexShrink: 0,
        borderRadius: 2,
        display: 'flex',
        typography: 'body2',
        borderStyle: 'dashed',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Order time</Box>
        {fDateTime(order?.history?.orderTime)}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Payment time</Box>
        {fDateTime(order?.history?.orderTime)}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Delivery time for the carrier</Box>
        {fDateTime(order?.history?.orderTime)}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Completion time</Box>
        {fDateTime(order?.history?.orderTime)}
      </Stack>
    </Paper>
  );

  const renderTimeline = (
    <Timeline
      sx={{ p: 0, m: 0, [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 } }}
    >
      {order?.history?.timeline.map((item:any, index:number) => {
        const firstTimeline = index === 0;

        const lastTimeline = index === order?.history.timeline.length - 1;

        return (
          <TimelineItem key={item.title}>
            <TimelineSeparator>
              <TimelineDot color={(firstTimeline && 'primary') || 'grey'} />
              {lastTimeline ? null : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography variant="subtitle2">{item.title}</Typography>

              <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                {fDateTime(item.time)}
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  return (
    <DashboardContent>
      {/* <OrderDetailsToolbar
        backLink={paths.dashboard.order.root}
        orderNumber={order?.orderNumber}
        createdAt={order?.createdAt}
        status={status}
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
      /> */}

      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: { xs: 3, md: 5 } }}>
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={Link} href={"/"}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4"> Order {order?.orderNumber} </Typography>
              <Label
                variant="soft"
                color={
                  (status === 'completed' && 'success') ||
                  (status === 'pending' && 'warning') ||
                  (status === 'cancelled' && 'error') ||
                  'default'
                }
              >
                {status}
              </Label>
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(order?.createdAt)}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={popover.onOpen}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Button>

          <Button
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          >
            Print
          </Button>

          <Button color="inherit" variant="contained" startIcon={<Iconify icon="solar:pen-bold" />}>
            Edit
          </Button>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuList>
          {ORDER_STATUS_OPTIONS.map((option: any) => (
            <MenuItem
              key={option.value}
              selected={option.value === status}
              onClick={() => {
                popover.onClose();
                handleChangeStatus(option.value);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            {/* <OrderDetailsItems
              items={order?.items}
              taxes={order?.taxes}
              shipping={order?.shipping}
              discount={order?.discount}
              subtotal={order?.subtotal}
              totalAmount={order?.totalAmount}
            />

            <OrderDetailsHistory history={order?.history} /> */}

            <Card>
              <CardHeader
                title="Details"
                action={
                  <IconButton>
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                }
              />

              <Scrollbar>
                {order?.items.map((item: any) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    alignItems="center"
                    sx={{
                      p: 3,
                      minWidth: 640,
                      borderBottom: (theme: any) => `dashed 2px ${theme.vars.palette.background.neutral}`,
                    }}
                  >
                    <Avatar src={item.coverUrl} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} />

                    <ListItemText
                      primary={item.name}
                      secondary={item.sku}
                      primaryTypographyProps={{ typography: 'body2' }}
                      secondaryTypographyProps={{
                        component: 'span',
                        color: 'text.disabled',
                        mt: 0.5,
                      }}
                    />

                    <Box sx={{ typography: 'body2' }}>x{item.quantity}</Box>

                    <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
                      {fCurrency(item.price)}
                    </Box>
                  </Stack>
                ))}
              </Scrollbar>

              {renderTotal}
            </Card>

            <Card>
              <CardHeader title="History" />
              <Stack
                spacing={3}
                alignItems={{ md: 'flex-start' }}
                direction={{ xs: 'column-reverse', md: 'row' }}
                sx={{ p: 3 }}
              >
                {renderTimeline}

                {renderSummary}
              </Stack>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* <OrderDetailsInfo
            customer={order?.customer}
            delivery={order?.delivery}
            payment={order?.payment}
            shippingAddress={order?.shippingAddress}
          /> */}
          <Card>
            {renderCustomer}

            <Divider sx={{ borderStyle: 'dashed' }} />

            {renderDelivery}

            <Divider sx={{ borderStyle: 'dashed' }} />

            {renderShipping}

            <Divider sx={{ borderStyle: 'dashed' }} />

            {renderPayment}
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  )
}

export default OrderDashboardDetailsView