import { CustomBreadcrumbs } from "../../../component/custom-breadcrumbs/custom-breadcrumbs"
import { DashboardContent } from "../../dashboard/dashboard/layout"
import { ProductNewEditForm } from "../product-new-edit-form"

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