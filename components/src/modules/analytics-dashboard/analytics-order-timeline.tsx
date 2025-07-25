import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { fDateTime } from '../../post/newest-booking';

// ----------------------------------------------------------------------

export function AnalyticsOrderTimeline({ title, subheader, list, ...other }: { title?: any, subheader?: any, list?: any, [other: string]: any }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item: any, index: number) => (
          <Item key={item.id} item={item} lastItem={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

function Item({ item, lastItem, ...other }: { item?: any, lastItem?: any, [other: string]: any }) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.type === 'order1' && 'primary') ||
            (item.type === 'order2' && 'success') ||
            (item.type === 'order3' && 'info') ||
            (item.type === 'order4' && 'warning') ||
            'error'
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item.title}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(item.time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
