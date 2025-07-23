import { JSX } from "react"
import { ThemeProvider } from "../../../theme/theme-provider"
import DashboardLayout from "../dashboard/layout"

const DashboardLayoutView = ({ children }: { children: JSX.Element }) => {
    return (
        <ThemeProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
    )
}

export default DashboardLayoutView