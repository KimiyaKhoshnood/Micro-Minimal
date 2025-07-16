import TurndownService from 'turndown';

const excludeTags = ['pre', 'code'];

const turndownService = new TurndownService({ codeBlockStyle: 'fenced', fence: '```' });

const htmlTags = [
  'a',
  'abbr',
  'acronym',
  'address',
  'applet',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'bgsound',
  'big',
  'blink',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'center',
  'circle',
  'cite',
  'clipPath',
  'code',
  'col',
  'colgroup',
  'command',
  'content',
  'data',
  'datalist',
  'dd',
  'defs',
  'del',
  'details',
  'dfn',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'element',
  'ellipse',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'font',
  'footer',
  'foreignObject',
  'form',
  'frame',
  'frameset',
  'g',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'image',
  'img',
  'input',
  'ins',
  'isindex',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'line',
  'linearGradient',
  'link',
  'listing',
  'main',
  'map',
  'mark',
  'marquee',
  'mask',
  'math',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'multicol',
  'nav',
  'nextid',
  'nobr',
  'noembed',
  'noframes',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'path',
  'pattern',
  'picture',
  'plaintext',
  'polygon',
  'polyline',
  'pre',
  'progress',
  'q',
  'radialGradient',
  'rb',
  'rbc',
  'rect',
  'rp',
  'rt',
  'rtc',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'shadow',
  'slot',
  'small',
  'source',
  'spacer',
  'span',
  'stop',
  'strike',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'text',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'tspan',
  'tt',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'xmp',
];

const filterTags = htmlTags.filter((item: any) => !excludeTags.includes(item));

/**
 * Custom rule
 * https://github.com/mixmark-io/turndown/issues/241#issuecomment-400591362
 */
turndownService.addRule('keep', {
  filter: filterTags as any,
  replacement(content: any, node: any) {
    const { isBlock, outerHTML } = node;

    return node && isBlock ? `\n\n${outerHTML}\n\n` : outerHTML;
  },
});

// ----------------------------------------------------------------------

export function htmlToMarkdown(html: any) {
  return turndownService.turndown(html);
}

// ----------------------------------------------------------------------

export function isMarkdownContent(content: any) {
  // Checking if the content contains Markdown-specific patterns
  const markdownPatterns = [
    /* Heading */
    /^#+\s/,
    /* List item */
    /^(\*|-|\d+\.)\s/,
    /* Code block */
    /^```/,
    /* Table */
    /^\|/,
    /* Unordered list */
    /^(\s*)[*+-] [^\r\n]+/,
    /* Ordered list */
    /^(\s*)\d+\. [^\r\n]+/,
    /* Image */
    /!\[.*?\]\(.*?\)/,
    /* Link */
    /\[.*?\]\(.*?\)/,
  ];

  // Checking if any of the patterns match
  return markdownPatterns.some((pattern) => pattern.test(content));
}
