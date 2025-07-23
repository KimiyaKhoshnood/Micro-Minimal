// import { paths } from 'src/routes/paths';

import { Iconify } from "../../component/iconify/iconify";
import { Label } from "../../component/label/label";
import { SvgColor } from "../../component/svg-color/svg-color";

// import { CONFIG } from 'src/config-global';

// import { Label } from 'src/components/label';
// import { Iconify } from 'src/components/iconify';
// import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`$/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'App', path: "/", icon: ICONS.dashboard },
      { title: 'Ecommerce', path: "/", icon: ICONS.ecommerce },
      { title: 'Analytics', path: "/", icon: ICONS.analytics },
      { title: 'Banking', path: "/", icon: ICONS.banking },
      { title: 'Booking', path: "/", icon: ICONS.booking },
      { title: 'File', path: "/", icon: ICONS.file },
      { title: 'Course', path: "/", icon: ICONS.course },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: "/",
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: "/" },
          { title: 'Cards', path: "/" },
          { title: 'List', path: "/" },
          { title: 'Create', path: "/" },
          { title: 'Edit', path: "/" },
          { title: 'Account', path: "/" },
        ],
      },
      {
        title: 'Product',
        path: "/",
        icon: ICONS.product,
        children: [
          { title: 'List', path: "/" },
          { title: 'Details', path: "/" },
          { title: 'Create', path: "/" },
          { title: 'Edit', path: "/" },
        ],
      },
      {
        title: 'Order',
        path: "/",
        icon: ICONS.order,
        children: [
          { title: 'List', path: "/" },
          { title: 'Details', path: "/" },
        ],
      },
      {
        title: 'Invoice',
        path: "/",
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: "/" },
          { title: 'Details', path: "/" },
          { title: 'Create', path: "/" },
          { title: 'Edit', path: "/" },
        ],
      },
      {
        title: 'Blog',
        path: "/",
        icon: ICONS.blog,
        children: [
          { title: 'List', path: "/" },
          { title: 'Details', path: "/" },
          { title: 'Create', path: "/" },
          { title: 'Edit', path: "/" },
        ],
      },
      {
        title: 'Job',
        path: "/",
        icon: ICONS.job,
        children: [
          { title: 'List', path: "/" },
          { title: 'Details', path: "/" },
          { title: 'Create', path: "/" },
          { title: 'Edit', path: "/" },
        ],
      },
      {
        title: 'Tour',
        path: "/",
        icon: ICONS.tour,
        children: [
          { title: 'List', path: "/" },
          { title: 'Details', path: "/" },
          { title: 'Create', path: "/" },
          { title: 'Edit', path: "/" },
        ],
      },
      { title: 'File manager', path: "/", icon: ICONS.folder },
      {
        title: 'Mail',
        path: "/",
        icon: ICONS.mail,
        info: (
          <Label color="error" variant="inverted">
            +32
          </Label>
        ),
      },
      { title: 'Chat', path: "/", icon: ICONS.chat },
      { title: 'Calendar', path: "/", icon: ICONS.calendar },
      { title: 'Kanban', path: "/", icon: ICONS.kanban },
    ],
  },
  /**
   * Item State
   */
  {
    subheader: 'Misc',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'Permission',
        path: "/",
        icon: ICONS.lock,
        roles: ['admin', 'manager'],
        caption: 'Only admin can see this item',
      },
      {
        title: 'Level',
        path: '#/dashboard/menu_level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'Level 1a',
            path: '#/dashboard/menu_level/menu_level_1a',
            children: [
              {
                title: 'Level 2a',
                path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a',
              },
              {
                title: 'Level 2b',
                path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b',
                children: [
                  {
                    title: 'Level 3a',
                    path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a',
                  },
                  {
                    title: 'Level 3b',
                    path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b',
                  },
                ],
              },
            ],
          },
          { title: 'Level 1b', path: '#/dashboard/menu_level/menu_level_1b' },
        ],
      },
      {
        title: 'Disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },
      {
        title: 'Label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label
            color="info"
            variant="inverted"
            startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
          >
            NEW
          </Label>
        ),
      },
      {
        title: 'Caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'Params',
        path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        icon: ICONS.parameter,
      },
      {
        title: 'External link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
        info: <Iconify width={18} icon="prime:external-link" />,
      },
      { title: 'Blank', path: "/", icon: ICONS.blank },
    ],
  },
];
