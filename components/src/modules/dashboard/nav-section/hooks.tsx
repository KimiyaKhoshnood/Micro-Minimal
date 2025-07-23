import { Link } from '@mui/material';
import { cloneElement } from 'react';

// import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function useNavItem({
  path,
  icon,
  info,
  depth,
  render,
  hasChild,
  externalLink,
  enabledRootRedirect,
}: {
  path?: any,
  icon?: any,
  info?: any,
  depth?: any,
  render?: any,
  hasChild?: any,
  externalLink?: any,
  enabledRootRedirect?: any,
}) {
  const rootItem = depth === 1;

  const subItem = !rootItem;

  const subDeepItem = Number(depth) > 2;

  const linkProps = externalLink
    ? { href: path, target: '_blank', rel: 'noopener' }
    : { component: Link, href: path };

  const baseProps = hasChild && !enabledRootRedirect ? { component: 'div' } : linkProps;

  /**
   * Render @icon
   */
  let renderIcon = null;

  if (icon && render?.navIcon && typeof icon === 'string') {
    renderIcon = render?.navIcon[icon];
  } else {
    renderIcon = icon;
  }

  /**
   * Render @info
   */
  let renderInfo = null;

  if (info && render?.navInfo && Array.isArray(info)) {
    const [key, value] = info;
    const element = render.navInfo(value)[key];

    renderInfo = element ? cloneElement(element) : null;
  } else {
    renderInfo = info;
  }

  return {
    subItem,
    rootItem,
    subDeepItem,
    baseProps,
    renderIcon,
    renderInfo,
  };
}
