import ReactMarkdown from 'react-markdown';
import './code-highlight-block.css';

import { useMemo } from 'react';
// import rehypeHighlight from 'rehype-highlight';
// import rehypeRaw from 'rehype-raw';
// import remarkGfm from 'remark-gfm';

// import Link from '@mui/material/Link';

// import { isExternalLink } from 'src/routes/utils';
// import { RouterLink } from 'src/routes/components';

import { styled } from '@mui/material';
// import { Image } from '../image/image';
import { htmlToMarkdown, isMarkdownContent } from './html-to-markdown';

// ----------------------------------------------------------------------

export const markdownClasses = {
  root: 'nml__markdown__root',
  content: {
    pre: 'nml__editor__content__pre',
    codeInline: 'nml__editor__content__codeInline',
    codeBlock: 'nml__editor__content__codeBlock',
    image: 'nml__editor__content__image',
    link: 'nml__editor__content__link',
  },
};

// export function Markdown({ children, sx, ...other }: { children: any, sx: any, [other: string]: any }) {
//   const content = useMemo(() => {
//     if (isMarkdownContent(`${children}`)) {
//       return children;
//     }
//     return htmlToMarkdown(`${children}`.trim());
//   }, [children]);

//   return (
//     <StyledRoot
//       children={content}
//       components={{
//         img: ({ ...props }) => (
//           <Image
//             ratio="16/9"
//             className={markdownClasses.content.image}
//             sx={{ borderRadius: 2 }}
//             {...props}
//           />
//         ),
//         a: ({ href = '', ...props }) => {
//           // const linkProps = isExternalLink(href)
//           //   ? { target: '_blank', rel: 'noopener' }
//           //   : { component: RouterLink };
//           const linkProps = { target: '_blank', rel: 'noopener' };
//           return (
//             <Link {...linkProps} href={href} className={markdownClasses.content.link} {...props} />
//           );
//         },
//         pre: ({ children }) => (
//           <div className={markdownClasses.content.codeBlock}>
//             <pre>{children}</pre>
//           </div>
//         ),
//         code: ({ className, children, ...props }) => {
//           const language = /language-(\w+)/.exec(className || '');
//           return language ? (
//             <code {...props} className={className}>
//               {children}
//             </code>
//           ) : (
//             <code {...props} className={markdownClasses.content.codeInline}>
//               {children}
//             </code>
//           );
//         },
//       }}
//       rehypePlugins={[rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]}
//       /* base64-encoded images
//        * https://github.com/remarkjs/react-markdown/issues/774
//        * urlTransform={(value: string) => value}
//        */
//       // className={markdownClasses.root}
//       sx={sx}
//       {...other}
//     />
//   );
// }

export function Markdown({ children, sx, ...other }: { children: any, sx: any, [other: string]: any }) {
  const content = useMemo(() => {
    if (isMarkdownContent(`${children}`)) {
      return children;
    }
    return htmlToMarkdown(`${children}`.trim());
  }, [children]);

  return (
    <StyledRoot
      dangerouslySetInnerHTML={{ __html: content }}
      className={markdownClasses.root}
      sx={sx}
      {...other}
    />
  );
}


const MARGIN = '0.75em';

const StyledRoot = styled("div")(({ theme }: any) => ({
  '> * + *': {
    marginTop: 0,
    marginBottom: MARGIN,
  },
  /**
   * Heading & Paragraph
   */
  h1: { ...theme.typography.h1, marginTop: 40, marginBottom: 8 },
  h2: { ...theme.typography.h2, marginTop: 40, marginBottom: 8 },
  h3: { ...theme.typography.h3, marginTop: 24, marginBottom: 8 },
  h4: { ...theme.typography.h4, marginTop: 24, marginBottom: 8 },
  h5: { ...theme.typography.h5, marginTop: 24, marginBottom: 8 },
  h6: { ...theme.typography.h6, marginTop: 24, marginBottom: 8 },
  p: { ...theme.typography.body1, marginBottom: '1.25rem' },
  /**
   * Hr Divider
   */
  hr: {
    flexShrink: 0,
    borderWidth: 0,
    margin: '2em 0',
    msFlexNegative: 0,
    WebkitFlexShrink: 0,
    borderStyle: 'solid',
    borderBottomWidth: 'thin',
    borderColor: '#efefef',
  },
  /**
   * Image
   */
  [`& .${markdownClasses.content.image}`]: {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    margin: 'auto auto 1.25em',
  },
  /**
   * List
   */
  '& ul': {
    listStyleType: 'disc',
  },
  '& ul, & ol': {
    paddingLeft: 16,
    '& > li': {
      lineHeight: 2,
      '& > p': { margin: 0, display: 'inline-block' },
    },
  },
  /**
   * Blockquote
   */
  '& blockquote': {
    lineHeight: 1.5,
    fontSize: '1.5em',
    margin: '24px auto',
    position: 'relative',
    fontFamily: 'Georgia, serif',
    padding: theme.spacing(3, 3, 3, 8),
    color: 'balck',
    borderLeft: `solid 8px #efefef}`,
    [theme.breakpoints.up('md')]: {
      width: '100%',
      maxWidth: 640,
    },
    '& p': {
      margin: 0,
      fontSize: 'inherit',
      fontFamily: 'inherit',
    },
    '&::before': {
      left: 16,
      top: -8,
      display: 'block',
      fontSize: '3em',
      content: '"\\201C"',
      position: 'absolute',
      color: '#f5f5f5',
    },
  },
  /**
   * Code inline
   */
  [`& .${markdownClasses.content.codeInline}`]: {
    padding: theme.spacing(0.25, 0.5),
    color: '#efefef',
    fontSize: theme.typography.body2.fontSize,
    borderRadius: 3,
    backgroundColor: "efefef",
  },
  /**
   * Code Block
   */
  [`& .${markdownClasses.content.codeBlock}`]: {
    position: 'relative',
    '& pre': {
      overflowX: 'auto',
      padding: theme.spacing(3),
      color: 'white',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'black',
      fontFamily: "'JetBrainsMono', monospace",
      '& code': { fontSize: theme.typography.body2.fontSize },
    },
  },
  /**
   * Table
   */
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: `1px solid #efefef`,
    'th, td': { padding: theme.spacing(1), border: `1px solid #efefef` },
    'tbody tr:nth-of-type(odd)': { backgroundColor: 'white' },
  },
  /**
   * Checkbox
   */
  input: {
    '&[type=checkbox]': {
      position: 'relative',
      cursor: 'pointer',
      '&:before': {
        content: '""',
        top: -2,
        left: -2,
        width: 17,
        height: 17,
        borderRadius: 3,
        position: 'absolute',
        backgroundColor: '#637381',
      },
      '&:checked': {
        '&:before': { backgroundColor: 'blue' },
        '&:after': {
          content: '""',
          top: 1,
          left: 5,
          width: 4,
          height: 9,
          position: 'absolute',
          transform: 'rotate(45deg)',
          msTransform: 'rotate(45deg)',
          WebkitTransform: 'rotate(45deg)',
          border: `solid white`,
          borderWidth: '0 2px 2px 0',
        },
      },
    },
  },
}));

