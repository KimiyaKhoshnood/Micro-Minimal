import { CustomBreadcrumbs } from "../../../component/custom-breadcrumbs/custom-breadcrumbs"
import { ProductNewEditForm } from "../product-new-edit-form"
import { DashboardContent } from "../shop-dashboard-list/shop-dashboard-list-view"

const ShopDashboardEditView = ({ product }: { product?: any }) => {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: "/" },
          { name: 'Product', href: "/" },
          { name: product?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewEditForm currentProduct={product} />
    </DashboardContent>
  )
}

export default ShopDashboardEditView