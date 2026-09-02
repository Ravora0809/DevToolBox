export const CATEGORIES = [
  { id: 'all', name: 'All Tools', icon: 'LayoutGrid' },
  { id: 'formatters', name: 'Formatters & Beautifiers', icon: 'Code' },
  { id: 'encoders', name: 'Encoders & Decoders', icon: 'Binary' },
  { id: 'generators', name: 'Generators', icon: 'Sparkles' },
  { id: 'converters', name: 'Converters & Parsers', icon: 'ArrowLeftRight' },
  { id: 'security', name: 'Security & Hashes', icon: 'ShieldCheck' },
  { id: 'text', name: 'Text & Analysis', icon: 'FileText' }
];

export const TOOLS = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Minifier',
    tagline: 'Format, beautify, validate, and minify JSON data with interactive tree viewing.',
    description: 'A powerful JSON beautifier and minifier with real-time error detection, custom indent spacing (2/4 spaces, tabs), line numbers, search, and collapsible tree structure.',
    category: 'formatters',
    icon: 'Braces',
    badge: 'Popular',
    featured: true,
    keywords: ['json', 'format', 'beautify', 'minify', 'pretty print', 'parse', 'indent'],
    features: [
      'Format JSON with 2 spaces, 4 spaces, or Tabs',
      'Minify JSON to single compact line for network payloads',
      'Live syntax error detection with line numbers',
      'Download output as .json or copy to clipboard instantly',
      'Interactive JSON tree explorer'
    ]
  },
  {
    id: 'json-validator',
    name: 'JSON Syntax Validator',
    tagline: 'Deep syntax validator pinpointing exact invalid characters and unexpected tokens.',
    description: 'Diagnose malformed JSON files, missing commas, unescaped quotes, trailing commas, and unexpected keys with precise line and column markers.',
    category: 'formatters',
    icon: 'CheckCircle2',
    badge: 'Essential',
    featured: true,
    keywords: ['json', 'validator', 'lint', 'syntax', 'error checker', 'fix json'],
    features: [
      'Exact line and column error pointers',
      'Automatic fix suggestion for common mistakes (trailing commas, single quotes)',
      'Schema conformity check'
    ]
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester & Debugger',
    tagline: 'Live regular expression tester with match highlight, group captures, and cheat sheet.',
    description: 'Test Javascript regular expressions against sample text in real time with support for global (g), case-insensitive (i), multiline (m), and dotAll (s) flags.',
    category: 'text',
    icon: 'Regex',
    badge: 'Popular',
    featured: true,
    keywords: ['regex', 'regular expression', 'test', 'matcher', 'pattern', 'preg_match', 'replace'],
    features: [
      'Real-time color-coded match highlighting',
      'Capture group inspection table',
      'Interactive flag toggles (g, i, m, s, u)',
      'Built-in regex cheat sheet and common pattern library (email, url, ip, phone)'
    ]
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder / Decoder',
    tagline: 'Encode text or binary files to Base64 and decode Base64 back to raw strings.',
    description: 'Convert plain text strings, URLs, or image files to Base64 data and decode Base64 strings with UTF-8 and URL-safe Base64 options.',
    category: 'encoders',
    icon: 'Binary',
    badge: 'Fast',
    featured: true,
    keywords: ['base64', 'encode', 'decode', 'btoa', 'atob', 'binary', 'data uri'],
    features: [
      'Text and file upload encoding support',
      'URL-safe Base64 encoding toggle',
      'Image Base64 Data URI generator with live image preview',
      'Zero-latency browser-side processing'
    ]
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder & Decoder',
    tagline: 'Encode special characters for query strings and decode encoded URLs.',
    description: 'Easily encode query strings, paths, and URIs with support for encodeURIComponent and encodeURI standards.',
    category: 'encoders',
    icon: 'Link',
    badge: 'Utility',
    featured: false,
    keywords: ['url', 'uri', 'percent encoding', 'encode', 'decode', 'query params', 'escape'],
    features: [
      'Standard URI vs URI Component encoding modes',
      'Query parameter key-value table builder',
      'Decodes percent-encoded UTF-8 strings accurately'
    ]
  },
  {
    id: 'uuid-generator',
    name: 'UUID / GUID Generator',
    tagline: 'Generate cryptographically strong Version 4 and Version 1 UUIDs in batch.',
    description: 'Generate batches of standard RFC 4122 v4 (random) and v1 UUIDs with options for uppercase, hyphen removal, braces, and quotes formatting.',
    category: 'generators',
    icon: 'KeyRound',
    badge: 'Popular',
    featured: true,
    keywords: ['uuid', 'guid', 'v4', 'v1', 'random id', 'unique identifier', 'generator'],
    features: [
      'Generate up to 500 UUIDs in one click',
      'Uppercase or Lowercase toggle',
      'Remove hyphens or wrap in curly braces {}',
      'Export as plain text, JSON array, or CSV list'
    ]
  },
  {
    id: 'password-generator',
    name: 'Secure Password Generator',
    tagline: 'Customizable high-entropy password generator with real-time strength meter.',
    description: 'Create uncrackable random passwords using client-side Web Crypto API with custom character sets, symbols, ambiguous character exclusion, and memorable passphrases.',
    category: 'security',
    icon: 'ShieldCheck',
    badge: 'Security',
    featured: true,
    keywords: ['password', 'generator', 'random', 'security', 'entropy', 'passphrase', 'crypto'],
    features: [
      'Cryptographically secure PRNG via crypto.getRandomValues',
      'Include/exclude uppercase, lowercase, numbers, symbols',
      'Exclude ambiguous characters (e.g. 0, O, 1, l, I)',
      'Password strength & crack-time estimator'
    ]
  },
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    tagline: 'Convert Unix epoch seconds and milliseconds to human-readable dates and back.',
    description: 'Translate epoch timestamps into local time, UTC, ISO 8601, RFC 2822, and relative time (e.g., "5 minutes ago"). Includes live current timestamp clock.',
    category: 'converters',
    icon: 'Clock',
    badge: 'Essential',
    featured: false,
    keywords: ['timestamp', 'epoch', 'unix', 'time', 'date converter', 'iso 8601', 'utc'],
    features: [
      'Live updating current Unix timestamp clock (seconds & ms)',
      'Human date to Unix timestamp picker',
      'Multi-format output: UTC, Local, ISO 8601, RFC 2822, Relative',
      'Timezone offset breakdown'
    ]
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    tagline: 'Comprehensive text analysis with word, char, sentence, reading, and speaking time.',
    description: 'Analyze written content in real time with character counts (with/without spaces), paragraph statistics, reading speed estimates, and top keyword density.',
    category: 'text',
    icon: 'FileText',
    badge: 'Writing',
    featured: false,
    keywords: ['word counter', 'character count', 'reading time', 'speaking time', 'text analysis', 'density'],
    features: [
      'Real-time word, character, sentence, and paragraph counters',
      'Estimated reading time (200 wpm) & speaking time (130 wpm)',
      'Top keyword frequency table',
      'Case transformations (UPPERCASE, lowercase, Title Case, camelCase)'
    ]
  },
  {
    id: 'html-formatter',
    name: 'HTML Formatter & Beautifier',
    tagline: 'Clean, indent, and format messy HTML markup or minify it for production.',
    description: 'Format nested HTML, XML, and SVG tags with customizable indentations and tag wrapping, or strip whitespace for efficient asset minification.',
    category: 'formatters',
    icon: 'Code2',
    badge: 'Clean',
    featured: false,
    keywords: ['html', 'formatter', 'beautifier', 'minify', 'xml', 'markup', 'indent'],
    features: [
      'Clean HTML tag indentation',
      'Minification mode removing excess whitespace & comments',
      'Live HTML rendering preview pane',
      'Escape HTML entities converter'
    ]
  },
  {
    id: 'tsx-to-jsx',
    name: 'TSX to JSX Converter',
    tagline: 'Strip TypeScript type annotations, interfaces, and generics from TSX code instantly.',
    description: 'Convert React TypeScript (.tsx) components into clean, standard JavaScript (.jsx) by stripping types, interfaces, type aliases, and generic angle brackets.',
    category: 'converters',
    icon: 'ArrowLeftRight',
    badge: 'New',
    featured: true,
    keywords: ['tsx', 'jsx', 'typescript', 'javascript', 'strip types', 'convert', 'react'],
    features: [
      'Strips interface & type declarations',
      'Removes function parameter and return types',
      'Removes React.FC<Props> and generic typings',
      'Preserves JSX markup, hooks, and code logic'
    ]
  }
];
