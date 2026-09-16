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
  },
  {
    id: 'ascii-converter',
    name: 'ASCII Converter',
    tagline: 'Convert text to ASCII decimal, binary, hex, octal, HTML entities, and back.',
    description: 'Bidirectional ASCII converter supporting decimal, 8-bit binary, hexadecimal, octal, and HTML entities with per-character inspection and standard 0-127 reference table.',
    category: 'converters',
    icon: 'Cpu',
    badge: 'New',
    featured: true,
    keywords: ['ascii', 'converter', 'decimal', 'binary', 'hex', 'octal', 'html entities', 'unicode', 'charcode'],
    features: [
      'Text to ASCII & ASCII to Text bidirectional modes',
      'Decimal, 8-bit binary, hex, octal, and HTML entity representations',
      'Interactive per-character breakdown inspector table',
      'Searchable 0-127 standard ASCII table reference'
    ]
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    tagline: 'Encode plain text or binary files into standards-compliant Base64 strings.',
    description: 'Encode text strings and files into Base64 format with URL-safe replacement (- and _), padding removal options, and line wrapping for PEM/MIME formats.',
    category: 'encoders',
    icon: 'Binary',
    badge: 'New',
    featured: true,
    keywords: ['base64', 'encode', 'btoa', 'rfc 4648', 'url safe', 'data encoding'],
    features: [
      'UTF-8 and binary safe text encoding',
      'File upload to Base64 text conversion',
      'URL-safe alphabet toggle (- and _)',
      'Configurable line wrap (64 or 76 characters)'
    ]
  },
  {
    id: 'base64-image-encoder',
    name: 'Base64 Image Encoder',
    tagline: 'Convert images into Base64 Data URIs, HTML tags, and CSS backgrounds.',
    description: 'Upload, drag-and-drop, or paste images directly from your clipboard to generate Base64 Data URIs, HTML <img> tags, CSS background rules, and Markdown syntax.',
    category: 'encoders',
    icon: 'Image',
    badge: 'Popular',
    featured: true,
    keywords: ['image', 'base64', 'data uri', 'svg to base64', 'png to base64', 'embed image', 'css background'],
    features: [
      'Supports PNG, JPG, SVG, WebP, GIF, and ICO',
      'Direct clipboard paste (Ctrl+V / Cmd+V) support',
      'Outputs Data URI, raw Base64, HTML <img>, and CSS background-image',
      'Image dimension and byte size comparison metrics'
    ]
  },
  {
    id: 'css-unit-converter',
    name: 'CSS Unit Converter',
    tagline: 'Simultaneously convert between px, rem, em, %, vw, vh, pt, cm, and inches.',
    description: 'Interactive CSS unit calculator with customizable root font size and viewport dimensions, real-time visual box scale preview, and Tailwind spacing presets.',
    category: 'converters',
    icon: 'Scale',
    badge: 'CSS',
    featured: true,
    keywords: ['css', 'px to rem', 'rem to px', 'em', 'vw', 'vh', 'unit converter', 'responsive', 'tailwind'],
    features: [
      'Bidirectional live conversion across 9 CSS units',
      'Customizable root font size (default 16px) and viewport dimensions',
      'Live visual box scaling preview',
      'Common typography and spacing preset buttons'
    ]
  },
  {
    id: 'character-word-counter',
    name: 'Character / Word Counter',
    tagline: 'Real-time text analytics with character, word, sentence, and reading times.',
    description: 'Detailed writing and SEO text inspection tracking characters with and without spaces, words, paragraphs, reading speed estimates, and keyword frequency.',
    category: 'text',
    icon: 'FileText',
    badge: 'Writing',
    featured: false,
    keywords: ['word counter', 'character count', 'word count', 'reading time', 'speaking time', 'text analytics'],
    features: [
      'Real-time word, character, sentence, and paragraph counters',
      'Estimated reading (200 wpm) & speaking (130 wpm) times',
      'Top keyword density and frequency breakdown',
      'Case transformation shortcuts'
    ]
  },
  {
    id: 'clipboard-formatter',
    name: 'Clipboard Formatter',
    tagline: 'Clean up copied text by removing empty lines, spaces, HTML, and smart quotes.',
    description: 'Sanitize messy clipboard snippets with rules to trim whitespace, collapse multiple spaces, straighten curly smart quotes, strip HTML/markdown tags, and join lines.',
    category: 'formatters',
    icon: 'Clipboard',
    badge: 'Utility',
    featured: true,
    keywords: ['clipboard', 'formatter', 'clean text', 'remove empty lines', 'smart quotes', 'strip html'],
    features: [
      'One-click paste from clipboard with automatic formatting',
      'Straightens smart quotes (“” to "") and apostrophes',
      'Removes empty lines and normalizes consecutive spaces',
      'Optionally strips HTML markup or Markdown formatting'
    ]
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    tagline: 'Convert HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK with WCAG 2.1 contrast check.',
    description: 'Universal color model converter with visual color picker, alpha transparency slider, accessible WCAG 2.1 contrast evaluation, and auto-generated shades & tints.',
    category: 'converters',
    icon: 'Palette',
    badge: 'Design',
    featured: true,
    keywords: ['color', 'hex to rgb', 'rgb to hex', 'hsl', 'cmyk', 'wcag', 'contrast checker', 'palette'],
    features: [
      'Bidirectional conversion between HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK',
      'Built-in WCAG 2.1 contrast ratio against white and black backgrounds',
      'Color shades and tints generator palette',
      'Interactive visual picker with alpha transparency'
    ]
  },
  {
    id: 'diff-viewer',
    name: 'Diff Viewer',
    tagline: 'Compare two text or code files side-by-side with additions and removals.',
    description: 'Inspect file differences with line-by-line, word-by-word, and character-by-character diffing, color-coded visual highlights, and patch export.',
    category: 'formatters',
    icon: 'GitCompare',
    badge: 'Dev',
    featured: true,
    keywords: ['diff', 'compare', 'text diff', 'code diff', 'git diff', 'diff viewer', 'unified patch'],
    features: [
      'Line, word, and character granularity diff modes',
      'Color-coded additions (+ green) and deletions (- red)',
      'Calculates total added, removed, and unchanged line counts',
      'Export unified patch to clipboard'
    ]
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    tagline: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes and HMACs.',
    description: 'Compute cryptographic hashes and HMAC digests directly in your browser using the Web Crypto API, with support for text input, secret keys, and local file checksums.',
    category: 'security',
    icon: 'Hash',
    badge: 'Crypto',
    featured: true,
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'hmac', 'checksum', 'crypto'],
    features: [
      'Simultaneous MD5, SHA-1, SHA-256, SHA-384, and SHA-512 calculation',
      'HMAC keyed-hash authentication mode with secret key',
      'Local file checksum calculation without uploading to any server',
      'Uppercase and lowercase hexadecimal outputs'
    ]
  },
  {
    id: 'jwt-viewer',
    name: 'JWT Viewer',
    tagline: 'Decode, inspect, and verify JSON Web Tokens (JWT) with humanized expiration.',
    description: 'Decode and inspect JWT headers, payloads, and signatures with human-readable timestamp conversions (exp, iat, nbf), status badges, and color-coded claims.',
    category: 'security',
    icon: 'Shield',
    badge: 'Auth',
    featured: true,
    keywords: ['jwt', 'json web token', 'decode jwt', 'jwt viewer', 'jwt inspector', 'bearer token', 'auth'],
    features: [
      'Decodes Header, Payload, and Signature into pretty-printed JSON',
      'Human-readable expiration clock with countdown / expired status',
      'Color-coded token segment visualization',
      'Sample tokens for fast testing'
    ]
  },
  {
    id: 'line-sort-dedupe',
    name: 'Line Sort And Dedupe',
    tagline: 'Sort lines alphabetically, naturally, or by length, and remove duplicates.',
    description: 'Fast line-by-line list processor supporting alphabetical (A-Z, Z-A), natural numeric sort, length sorting, duplicate removal, case sensitivity, and numbering.',
    category: 'text',
    icon: 'ListFilter',
    badge: 'Fast',
    featured: true,
    keywords: ['sort lines', 'dedupe', 'remove duplicates', 'unique lines', 'alphabetize', 'line numbers'],
    features: [
      'Alphabetical (A-Z, Z-A), natural (1, 2, 10), and line length sorting',
      'Remove duplicate lines with optional case sensitivity',
      'Filter to only duplicates or only unique lines',
      'Add custom line prefixes, suffixes, or auto line numbering'
    ]
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    tagline: 'Live split-screen Markdown editor with rich preview, syntax toolbar, and export.',
    description: 'Feature-complete Markdown authoring tool with live side-by-side preview, formatting toolbar (headings, lists, code, tables), word counts, and .md download.',
    category: 'text',
    icon: 'Edit3',
    badge: 'Editor',
    featured: true,
    keywords: ['markdown', 'editor', 'markdown preview', 'react-markdown', 'gfm', 'notes'],
    features: [
      'Live split-screen and full-screen preview modes',
      'Formatting toolbar for bold, italic, headings, tables, and code blocks',
      'Real-time word count and estimated reading time',
      'Download document as clean .md file'
    ]
  },
  {
    id: 'qrcode-generator',
    name: 'QRCode Generator',
    tagline: 'Generate high-resolution QR codes for URLs, Wi-Fi, email, phone, and text.',
    description: 'Create custom QR codes with adjustable error correction levels (L, M, Q, H), foreground and background colors, custom margins, and instant high-res PNG download.',
    category: 'generators',
    icon: 'QrCode',
    badge: 'Popular',
    featured: true,
    keywords: ['qr code', 'qrcode', 'generate qr', 'wifi qr', 'url qr', 'barcode'],
    features: [
      'Pre-configured templates for URLs, Wi-Fi passwords, emails, and phone numbers',
      'Customizable foreground and background colors',
      'Adjustable error correction level up to 30% recovery',
      'Download as PNG image or copy Data URI'
    ]
  },
  {
    id: 'regex-checker',
    name: 'Regex Checker',
    tagline: 'Test and validate regular expressions with real-time match highlighting.',
    description: 'Test Javascript regular expressions against sample text in real time with support for global, case-insensitive, multiline, and dotAll flags, plus capture group inspection.',
    category: 'text',
    icon: 'Regex',
    badge: 'Essential',
    featured: false,
    keywords: ['regex', 'regex checker', 'regular expression', 'test regex', 'matcher'],
    features: [
      'Real-time match highlighting and group extraction',
      'Interactive flag toggles (g, i, m, s, u)',
      'Capture groups breakdown table',
      'Common regex cheat sheet'
    ]
  },
  {
    id: 'string-converter',
    name: 'String Converter',
    tagline: 'Convert strings to camelCase, snake_case, PascalCase, kebab-case, and more.',
    description: 'Transform strings into all standard programming cases (camelCase, PascalCase, CONSTANT_CASE, kebab-case, Title Case, dot.case, path/case) and ciphers simultaneously.',
    category: 'converters',
    icon: 'Type',
    badge: 'Essential',
    featured: true,
    keywords: ['string converter', 'case converter', 'camelcase', 'snake_case', 'kebab-case', 'pascalcase', 'slugify'],
    features: [
      'Converts to 15 standard developer casing styles and representations',
      'Supports camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE',
      'Includes ROT13 cipher, reversed string, and hexadecimal sequence',
      'One-click instant copy for every formatted variant'
    ]
  },
  {
    id: 'unix-time-converter',
    name: 'Unix Time Converter',
    tagline: 'Convert Unix epoch timestamps to human-readable dates and vice versa.',
    description: 'Translate epoch timestamps into UTC, local time, ISO 8601, RFC 2822, and relative time with live current timestamp counter and date picker.',
    category: 'converters',
    icon: 'Clock',
    badge: 'Essential',
    featured: false,
    keywords: ['unix time', 'epoch converter', 'timestamp', 'date time', 'iso 8601'],
    features: [
      'Live current Unix epoch timestamp counter in seconds & milliseconds',
      'Bidirectional timestamp to date and date to timestamp conversion',
      'Displays Local, UTC, ISO 8601, and RFC 2822 timestamps',
      'Relative time breakdown'
    ]
  },
  {
    id: 'url-decoder',
    name: 'Url Decoder',
    tagline: 'Decode percent-encoded URL strings, components, and query parameters.',
    description: 'Cleanly decode percent-encoded URLs, escape sequences, and multi-encoded query strings with automatic parameter extraction table and plus-to-space handling.',
    category: 'encoders',
    icon: 'Link',
    badge: 'Utility',
    featured: true,
    keywords: ['url decoder', 'decode url', 'percent decoding', 'urldecode', 'query params'],
    features: [
      'Decodes standard and component URL percent-encodings',
      'Optional multi-pass recursive decoding for double-encoded strings',
      'Automatic query parameter table extraction',
      'Toggle for decoding plus (+) signs as spaces'
    ]
  },
  {
    id: 'url-parser',
    name: 'Url Parser',
    tagline: 'Inspect and parse URL protocol, hostname, port, pathname, hash, and query params.',
    description: 'Break down complex URLs into protocol, origin, host, port, path segments, and individual query parameters with quick copy actions for each component.',
    category: 'converters',
    icon: 'Globe',
    badge: 'Web',
    featured: true,
    keywords: ['url parser', 'parse url', 'url breakdown', 'query parameters', 'hostname', 'pathname'],
    features: [
      'Full breakdown of Protocol, Origin, Host, Port, Path, and Hash',
      'Visual interactive path segment pills',
      'Search query parameter key-value table',
      'One-click copy for any URL sub-component'
    ]
  }
];
