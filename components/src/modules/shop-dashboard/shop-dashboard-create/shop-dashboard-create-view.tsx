import { CustomBreadcrumbs } from "../../../component/custom-breadcrumbs/custom-breadcrumbs"
import { ProductNewEditForm } from "../product-new-edit-form"
import { DashboardContent } from "../shop-dashboard-list/shop-dashboard-list-view"

const ShopDashboardCreateView = () => {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Create a new product"
                links={[
                    { name: 'Dashboard', href: "/" },
                    { name: 'Product', href: "/" },
                    { name: 'New product' },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <ProductNewEditForm />
        </DashboardContent>
    )
}

export default ShopDashboardCreateView