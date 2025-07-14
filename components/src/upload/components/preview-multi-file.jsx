import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fData } from 'src/utils/format-number';

// import { varAlpha } from 'src/theme/styles';
import { Iconify } from '../../component/iconify/iconify';
import Tooltip from '@mui/material/Tooltip';

export function fileData(file) {
  // From url
  if (typeof file === 'string') {
    return {
      preview: file,
      name: fileNameByUrl(file),
      type: fileTypeByUrl(file),
      size: undefined,
      path: file,
      lastModified: undefined,
      lastModifiedDate: undefined,
    };
  }

  // From file
  return {
    name: file.name,
    size: file.size,
    path: file.path,
    type: file.type,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
  };
}

export function DownloadButton({ sx, ...other }) {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        p: 0,
        top: 0,
        right: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        opacity: 0,
        position: 'absolute',
        color: 'common.white',
        borderRadius: 'inherit',
        transition: theme.transitions.create(['opacity']),
        '&:hover': {
          // ...bgBlur({ color: varAlpha(theme.vars.palette.grey['900Channel'], 0.64) }),
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="eva:arrow-circle-down-fill" width={24} />
    </ButtonBase>
  );
}

export function RemoveButton({ sx, ...other }) {
  return (
    <IconButton
      size="small"
      sx={{
        p: 0.35,
        top: 4,
        right: 4,
        position: 'absolute',
        color: 'common.white',
        // bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
        // '&:hover': { bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.72) },
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:close-line" width={12} />
    </IconButton>
  );
}

export function FileThumbnail({
  sx,
  file,
  tooltip,
  onRemove,
  imageView,
  slotProps,
  onDownload,
  ...other
}) {
  const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

  const { name, path } = fileData(file);

  const format = fileFormat(path || previewUrl);

  const renderImg = (
    <Box
      component="img"
      src={previewUrl}
      className={fileThumbnailClasses.img}
      sx={{
        width: 1,
        height: 1,
        objectFit: 'cover',
        borderRadius: 'inherit',
        ...slotProps?.img,
      }}
    />
  );

  const renderIcon = (
    <Box
      component="img"
      src={fileThumb(format)}
      className={fileThumbnailClasses.icon}
      sx={{ width: 1, height: 1, ...slotProps?.icon }}
    />
  );

  const renderContent = (
    <Stack
      component="span"
      className={fileThumbnailClasses.root}
      sx={{
        width: 36,
        height: 36,
        flexShrink: 0,
        borderRadius: 1.25,
        alignItems: 'center',
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      {format === 'image' && imageView ? renderImg : renderIcon}

      {onRemove && (
        <RemoveButton
          onClick={onRemove}
          className={fileThumbnailClasses.removeBtn}
          sx={slotProps?.removeBtn}
        />
      )}

      {onDownload && (
        <DownloadButton
          onClick={onDownload}
          className={fileThumbnailClasses.downloadBtn}
          sx={slotProps?.downloadBtn}
        />
      )}
    </Stack>
  );

  if (tooltip) {
    return (
      <Tooltip
        arrow
        title={name}
        slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -12] } }] } }}
      >
        {renderContent}
      </Tooltip>
    );
  }

  return renderContent;
}

// ----------------------------------------------------------------------

function processInput(inputValue) {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

export function fData(inputValue) {
  const number = processInput(inputValue);
  if (number === null || number === 0) return '0 bytes';

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
  const decimal = 2;
  const baseValue = 1024;

  const index = Math.floor(Math.log(number) / Math.log(baseValue));
  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}
// ----------------------------------------------------------------------

export function MultiFilePreview({
  sx,
  onRemove,
  lastNode,
  thumbnail,
  slotProps,
  firstNode,
  files = [],
}) {
  const renderFirstNode = firstNode && (
    <Box
      component="li"
      sx={{
        ...(thumbnail && {
          width: 'auto',
          display: 'inline-flex',
        }),
      }}
    >
      {firstNode}
    </Box>
  );

  const renderLastNode = lastNode && (
    <Box
      component="li"
      sx={{
        ...(thumbnail && { width: 'auto', display: 'inline-flex' }),
      }}
    >
      {lastNode}
    </Box>
  );

  return (
    <Box
      component="ul"
      sx={{
        gap: 1,
        display: 'flex',
        flexDirection: 'column',
        ...(thumbnail && {
          flexWrap: 'wrap',
          flexDirection: 'row',
        }),
        ...sx,
      }}
    >
      {renderFirstNode}

      {files.map((file) => {
        const { name, size } = fileData(file);

        if (thumbnail) {
          return (
            <Box component="li" key={name} sx={{ display: 'inline-flex' }}>
              <FileThumbnail
                tooltip
                imageView
                file={file}
                onRemove={() => onRemove?.(file)}
                sx={{
                  width: 80,
                  height: 80,
                  // border: (theme) =>
                  //   `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                }}
                slotProps={{ icon: { width: 36, height: 36 } }}
                {...slotProps?.thumbnail}
              />
            </Box>
          );
        }

        return (
          <Box
            component="li"
            key={name}
            sx={{
              py: 1,
              pr: 1,
              pl: 1.5,
              gap: 1.5,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              // border: (theme) =>
              //   `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
            }}
          >
            <FileThumbnail file={file} {...slotProps?.thumbnail} />

            <ListItemText
              primary={name}
              secondary={fData(size)}
              secondaryTypographyProps={{ component: 'span', typography: 'caption' }}
            />

            {onRemove && (
              <IconButton size="small" onClick={() => onRemove(file)}>
                <Iconify icon="mingcute:close-line" width={16} />
              </IconButton>
            )}
          </Box>
        );
      })}

      {renderLastNode}
    </Box>
  );
}
