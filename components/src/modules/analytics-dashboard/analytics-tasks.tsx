import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Scrollbar } from '../../component/scrollbar/scrollbar';
import { usePopover } from '../../component/custom-popover/use-popover';
import { Iconify } from '../../component/iconify/iconify';
import { CustomPopover } from '../../component/custom-popover/custom-popover';

// ----------------------------------------------------------------------

export function AnalyticsTasks({ title, subheader, list, ...other }: { title?: any, subheader?: any, list?: any, [other: string]: any }) {
  const [selected, setSelected] = useState(['2']);

  const handleClickComplete = (taskId: any) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 304 }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{ minWidth: 560 }}>
          {list.map((item: any) => (
            <Item
              key={item.id}
              item={item}
              checked={selected.includes(item.id)}
              onChange={() => handleClickComplete(item.id)}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

function Item({ item, checked, onChange, sx, ...other }: { item?: any, checked?: any, onChange?: any, sx?: any, [other: string]: any }) {
  const popover = usePopover();

  const handleMarkComplete = () => {
    popover.onClose();
    console.info('MARK COMPLETE', item.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', item.id);
  };

  const handleEdit = () => {
    popover.onClose();
    console.info('EDIT', item.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', item.id);
  };

  return (
    <>
      <Box
        sx={{
          pl: 2,
          pr: 1,
          py: 1.5,
          display: 'flex',
          ...(checked && { color: 'text.disabled', textDecoration: 'line-through' }),
          ...sx,
        }}
        {...other}
      >
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              checked={checked}
              onChange={onChange}
              inputProps={{
                name: item.name,
                'aria-label': 'Checkbox demo',
              }}
            />
          }
          label={item.name}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleMarkComplete}>
            <Iconify icon="eva:checkmark-circle-2-fill" />
            Mark Complete
          </MenuItem>

          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" />
            Share
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
