import SvgIcon from '@mui/material/SvgIcon';
import { buttonClasses } from '@mui/material/Button';
import { dialogActionsClasses } from '@mui/material/DialogActions';

import { stylesMode } from '../../styles/utils';

// ----------------------------------------------------------------------

export const PickerSwitchIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28"
    />
  </SvgIcon>
);
export const PickerLeftIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64"
    />
  </SvgIcon>
);
export const PickerRightIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
    />
  </SvgIcon>
);
export const PickerCalendarIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M6.96 2c.418 0 .756.31.756.692V4.09c.67-.012 1.422-.012 2.268-.012h4.032c.846 0 1.597 0 2.268.012V2.692c0-.382.338-.692.756-.692s.756.31.756.692V4.15c1.45.106 2.403.368 3.103 1.008c.7.641.985 1.513 1.101 2.842v1H2V8c.116-1.329.401-2.2 1.101-2.842c.7-.64 1.652-.902 3.103-1.008V2.692c0-.382.339-.692.756-.692"
    />
    <path
      fill="currentColor"
      d="M22 14v-2c0-.839-.013-2.335-.026-3H2.006c-.013.665 0 2.161 0 3v2c0 3.771 0 5.657 1.17 6.828C4.349 22 6.234 22 10.004 22h4c3.77 0 5.654 0 6.826-1.172C22 19.657 22 17.771 22 14"
      opacity="0.5"
    />
    <path fill="currentColor" d="M18 16.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" />
  </SvgIcon>
);
export const PickerClockIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 7.25a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V8a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </SvgIcon>
);

const defaultProps = {
  date: {
    openPickerIcon: PickerCalendarIcon,
    leftArrowIcon: PickerLeftIcon,
    rightArrowIcon: PickerRightIcon,
    switchViewIcon: PickerSwitchIcon,
  },
  time: {
    openPickerIcon: PickerClockIcon,
    rightArrowIcon: PickerRightIcon,
    switchViewIcon: PickerSwitchIcon,
  },
};

const MuiDatePicker = {

  defaultProps: { slots: defaultProps.date },
};

const MuiDateTimePicker = {
  defaultProps: { slots: defaultProps.date },
};

const MuiStaticDatePicker = {
  defaultProps: { slots: defaultProps.date },
};

const MuiDesktopDatePicker = {
  defaultProps: { slots: defaultProps.date },
};

const MuiDesktopDateTimePicker = {
  defaultProps: { slots: defaultProps.date },
};

const MuiMobileDatePicker = {
  defaultProps: { slots: defaultProps.date },
};

const MuiMobileDateTimePicker = {
  defaultProps: { slots: defaultProps.date },
};

const MuiTimePicker = {
  defaultProps: { slots: defaultProps.time },
};

const MuiMobileTimePicker = {
  defaultProps: { slots: defaultProps.time },
};

const MuiStaticTimePicker = {
  defaultProps: { slots: defaultProps.time },
};

const MuiDesktopTimePicker = {
  defaultProps: { slots: defaultProps.time },
};

const MuiPickersLayout = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${dialogActionsClasses.root}`]: {
        [`& .${buttonClasses.root}`]: {
          [`&:last-of-type`]: {
            color: theme.vars.palette.common.white,
            backgroundColor: theme.vars.palette.text.primary,
            [stylesMode.dark]: { color: theme.vars.palette.grey[800] },
          },
        },
      },
    }),
  },
};

const MuiPickersPopper = {
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: theme.customShadows.dropdown,
      borderRadius: theme.shape.borderRadius * 1.5,
    }),
  },
};

// ----------------------------------------------------------------------

export const datePicker = {
  MuiPickersPopper,
  MuiPickersLayout,
  MuiDatePicker,
  MuiDateTimePicker,
  MuiStaticDatePicker,
  MuiDesktopDatePicker,
  MuiDesktopDateTimePicker,
  MuiMobileDatePicker,
  MuiMobileDateTimePicker,
  MuiTimePicker,
  MuiMobileTimePicker,
  MuiStaticTimePicker,
  MuiDesktopTimePicker,
};
