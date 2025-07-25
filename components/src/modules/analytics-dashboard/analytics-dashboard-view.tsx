import { Grid, Typography } from "@mui/material"
import { DashboardContent } from "../dashboard/dashboard/layout"
import { AnalyticsConversionRates } from "./analytics-conversion-rates"
import { AnalyticsWidgetSummary } from "./analytics-widget-summary"
import { AnalyticsWebsiteVisits } from "./analytics-website-visits"
import { AnalyticsCurrentVisits } from "./analytics-current-visits"
import { AnalyticsCurrentSubject } from "./analytics-current-subject"
import { AnalyticsNews } from "./analytics-news"
import { AnalyticsOrderTimeline } from "./analytics-order-timeline"
import { AnalyticsTrafficBySite } from "./analytics-traffic-by-site"
import { AnalyticsTasks } from "./analytics-tasks"

// ----------------------------------------------------------------------

const _analyticPosts = [{
    id: 1,
    postedAt: Date(),
    title: "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    coverUrl: "/assets/images/cover/cover-1.webp",
    description: "The waves crashed against the shore, creating a soothing symphony of sound.",
},
{
    id: 2,
    postedAt: Date(),
    title: "The Role of Big Data in Transforming Business Strategies",
    coverUrl: "/assets/images/cover/cover-2.webp",
    description: "The delicate butterfly gracefully fluttered from flower to flower, sipping nectar with its slender proboscis.",
}]

const _analyticOrderTimeline = [
    {
        id: 1,
        title: "1983, orders, $4220",
        type: "order1",
        time: Date()
    },
    {
        id: 1,
        title: "12 Invoices have been paid",
        type: "order2",
        time: Date()
    }
]

export const _analyticTraffic = [
    {
        value: 'facebook',
        label: 'Facebook',
        total: 9911,
    },
    {
        value: 'google',
        label: 'Google',
        total: 1947,
    },
    {
        value: 'linkedin',
        label: 'Linkedin',
        total: 6984,
    },
    {
        value: 'twitter',
        label: 'Twitter',
        total: 8488,
    },
];

export const _analyticTasks = [
    {
        id: 1,
        name: "Analyze Customer Feedback",
    },
    {
        id: 2,
        name: "Update Website Content",
    }
]

// ----------------------------------------------------------------------

const AnalyticsDashboardView = () => {
    return (
        <DashboardContent maxWidth="xl">
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Hi, Welcome back 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <AnalyticsWidgetSummary
                        title="Weekly sales"
                        percent={2.6}
                        total={714000}
                        icon={
                            <img alt="icon" src={`/assets/icons/glass/ic-glass-bag.svg`} />
                        }
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [22, 8, 35, 50, 82, 84, 77, 12],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <AnalyticsWidgetSummary
                        title="New users"
                        percent={-0.1}
                        total={1352831}
                        color="secondary"
                        icon={
                            <img
                                alt="icon"
                                src={`/assets/icons/glass/ic-glass-users.svg`}
                            />
                        }
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [56, 47, 40, 62, 73, 30, 23, 54],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <AnalyticsWidgetSummary
                        title="Purchase orders"
                        percent={2.8}
                        total={1723315}
                        color="warning"
                        icon={
                            <img alt="icon" src={`/assets/icons/glass/ic-glass-buy.svg`} />
                        }
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [40, 70, 50, 28, 70, 75, 7, 64],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <AnalyticsWidgetSummary
                        title="Messages"
                        percent={3.6}
                        total={234}
                        color="error"
                        icon={
                            <img
                                alt="icon"
                                src={`/assets/icons/glass/ic-glass-message.svg`}
                            />
                        }
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [56, 30, 23, 54, 47, 40, 62, 73],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <AnalyticsCurrentVisits
                        title="Current visits"
                        chart={{
                            series: [
                                { label: 'America', value: 3500 },
                                { label: 'Asia', value: 2500 },
                                { label: 'Europe', value: 1500 },
                                { label: 'Africa', value: 500 },
                            ],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <AnalyticsWebsiteVisits
                        title="Website visits"
                        subheader="(+43%) than last year"
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                            series: [
                                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
                            ],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <AnalyticsConversionRates
                        title="Conversion rates"
                        subheader="(+43%) than last year"
                        chart={{
                            categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
                            series: [
                                { name: '2022', data: [44, 55, 41, 64, 22] },
                                { name: '2023', data: [53, 32, 33, 52, 13] },
                            ],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <AnalyticsCurrentSubject
                        title="Current subject"
                        chart={{
                            categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                            series: [
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <AnalyticsNews title="News" list={_analyticPosts} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <AnalyticsOrderTimeline title="Order timeline" list={_analyticOrderTimeline} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <AnalyticsTrafficBySite title="Traffic by site" list={_analyticTraffic} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <AnalyticsTasks title="Tasks" list={_analyticTasks} />
                </Grid>
            </Grid>
        </DashboardContent>
    )
}

export default AnalyticsDashboardView