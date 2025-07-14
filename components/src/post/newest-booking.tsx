import { Avatar, Box, ListItemText } from "@mui/material"
import dayjs from "dayjs";
import { Iconify } from "../component/iconify/iconify";
import { Label } from "../component/label/label";
import { Image } from "../component/image/image";

export const formatStr = {
  dateTime: 'DD MMM YYYY h:mm a', // 17 Apr 2022 12:00 am
  date: 'DD MMM YYYY', // 17 Apr 2022
  time: 'h:mm a', // 12:00 am
  split: {
    dateTime: 'DD/MM/YYYY h:mm a', // 17/04/2022 12:00 am
    date: 'DD/MM/YYYY', // 17/04/2022
  },
  paramCase: {
    dateTime: 'DD-MM-YYYY h:mm a', // 17-04-2022 12:00 am
    date: 'DD-MM-YYYY', // 17-04-2022
  },
};

export function fDateTime(date: any, format?: any) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).format(format ?? formatStr.dateTime) : 'Invalid time value';
}

const NewestBooking = ({ item, sx, ...other }: any) => {
  return (
    <Box
      sx={{
        width: 1,
        borderRadius: 2,
        position: 'relative',
        bgcolor: '#f5f6f8',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ px: 2, pb: 1, gap: 2, pt: 2.5, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar alt={item.name} src={item.avatarUrl} />
          <ListItemText
            primary={item.name}
            secondary={fDateTime(item.bookedAt)}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Box>

        <Box
          sx={{
            rowGap: 1.5,
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.secondary',
          }}
        >
          <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
            <Iconify width={16} icon="solar:calendar-date-bold" sx={{ flexShrink: 0 }} />
            {item.duration}
          </Box>

          <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
            <Iconify width={16} icon="solar:users-group-rounded-bold" sx={{ flexShrink: 0 }} />
            {item.guests} guests
          </Box>
        </Box>
      </Box>

      <Label
        variant="filled"
        sx={{
          right: 16,
          zIndex: 9,
          bottom: 16,
          position: 'absolute',
        }}
      >
        {item.isHot && '🔥'} ${item.price}
      </Label>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Image alt={item.coverUrl} src={item.coverUrl} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>
    </Box>
  )
}

export default NewestBooking