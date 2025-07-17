import { Box, Button, Dialog, Divider, Link, Typography } from "@mui/material"
import { Iconify } from "../../../component/iconify/iconify"
import OrderCompleteIllustration from "./order-complete-illustration"

function CheckoutOrderComplete ({ open, onReset, onDownloadPDF }:{ open:boolean, onReset:()=>void, onDownloadPDF:()=>void }) {
  return (
    <Dialog
      fullWidth
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          width: { md: `calc(100% - 48px)` },
          height: { md: `calc(100% - 48px)` },
        },
      }}
    >
      <Box
        gap={5}
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{
          py: 5,
          m: 'auto',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">Thank you for your purchase!</Typography>

        <OrderCompleteIllustration />

        <Typography>
          Thanks for placing order
          <br />
          <br />
          <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link>
          <br />
          <br />
          We will send you a notification within 5 days when it ships.
          <br /> If you have any question or queries then fell to get in contact us. <br />
          All the best,
        </Typography>

        <Divider sx={{ width: 1, borderStyle: 'dashed' }} />

        <Box gap={2} display="flex" flexWrap="wrap" justifyContent="center">
          <Button
            size="large"
            color="inherit"
            variant="outlined"
            onClick={onReset}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Continue shopping
          </Button>

          <Button
            size="large"
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-download-fill" />}
            onClick={onDownloadPDF}
          >
            Download as PDF
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default CheckoutOrderComplete