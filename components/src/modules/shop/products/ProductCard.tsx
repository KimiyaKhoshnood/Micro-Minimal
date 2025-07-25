import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { Label } from "../../../component/label/label";
import { Image } from "../../../component/image/image";
import { Iconify } from "../../../component/iconify/iconify";
import { ColorPreview } from '../color-utils/color-preview';
import { fCurrency } from './ProductUtils';

// ----------------------------------------------------------------------

function ProductCard({ product, handleCheckout }: { product: { [key: string]: any }, handleCheckout: (data: any) => void }) {
  // const checkout = useCheckoutContext();

  const { id, name, coverUrl, price, colors, available, sizes, priceSale, newLabel, saleLabel } =
    product;

  // const linkTo = paths.product.details(id);

  const handleAddCart = () => {
    const newProduct = {
      id,
      name,
      coverUrl,
      available,
      price,
      colors: [colors[0]],
      size: sizes[0],
      quantity: 1,
    };
    try {
      handleCheckout((checkout: any) => ({ ...checkout, items: [...(checkout.items), newProduct] }))
      console.log(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        position: 'absolute',
        zIndex: 9,
        top: 16,
        right: 16,
      }}
    >
      {newLabel.enabled && (
        <Label variant="filled" color="info">
          {newLabel.content}
        </Label>
      )}
      {saleLabel.enabled && (
        <Label variant="filled" color="error">
          {saleLabel.content}
        </Label>
      )}
    </Stack>
  );

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      {!!available && (
        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="solar:cart-plus-bold" width={24} />
        </Fab>
      )}

      <Tooltip title={!available && 'Out of stock'} placement="bottom-end">
        <Image
          alt={name}
          src={coverUrl}
          ratio="1/1"
          sx={{ borderRadius: 4, ...(!available && { opacity: 0.48, filter: 'grayscale(1)' }) }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      {/* <Link component={RouterLink||} href={linkTo||""} color="inherit" variant="subtitle2" noWrap>
        {name}
      </Link> */}

      <Link href={`/shop/${name}`} color="inherit" variant="subtitle2" noWrap>
        {name}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ColorPreview colors={colors} />

        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          {priceSale && (
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Box>
          )}

          <Box component="span" fontWeight={800}>{fCurrency(price)}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ position: 'relative', borderRadius: 4, '&:hover .add-cart-btn': { opacity: 1 } }}>
      {renderLabels}

      {renderImg}

      {renderContent}
    </Card>
  );
}

export default ProductCard;
