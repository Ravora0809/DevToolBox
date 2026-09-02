export const BLOG_POSTS = [
  {
    id: 'json-best-practices',
    title: 'Modern JSON Formatting and Validation Best Practices in 2026',
    slug: 'json-formatting-validation-best-practices',
    date: 'Aug 28, 2026',
    readTime: '4 min read',
    category: 'Guides',
    summary: 'Learn how to handle massive JSON payloads, debug syntax anomalies, and optimize payloads for low-latency web APIs.',
    content: `
### Why Clean JSON Matters

JSON (JavaScript Object Notation) remains the standard data interchange format for modern web APIs, microservices, and configuration schemas. However, working with unformatted or minified JSON leads to sluggish debugging sessions and overlooked data anomalies.

#### 1. Indentation Standards
- **2 Spaces:** Industry standard for frontend development, config files (package.json, tsconfig.json), and API documentation.
- **4 Spaces:** Often preferred in backend ecosystems (Python, Java) for enhanced visual hierarchy in nested objects.
- **Minified (0 Spaces):** Essential for production network transit, reducing payload size by up to 30-40%.

#### 2. Common Syntax Traps
- **Trailing Commas:** While allowed in modern JavaScript objects, standard JSON specifications (RFC 8259) strictly forbid trailing commas in objects and arrays.
- **Single Quotes:** JSON keys and string values must always be enclosed in double quotes (\`"\`).
- **Unescaped Control Characters:** Line breaks and tabs within string values must be escaped (\`\\n\`, \`\\t\`).
    `
  },
  {
    id: 'mastering-regex',
    title: 'Mastering Regular Expressions: Common Patterns & Debugging Strategies',
    slug: 'mastering-regular-expressions-guide',
    date: 'Aug 14, 2026',
    readTime: '6 min read',
    category: 'Tutorials',
    summary: 'A deep dive into zero-width assertions, non-capturing groups, and avoiding catastrophic backtracking in your regex patterns.',
    content: `
### The Power of Regex in Modern Development

Regular expressions allow engineers to parse, validate, and extract complex string patterns with minimal code. However, poorly constructed patterns can cause CPU spikes known as catastrophic backtracking.

#### Key Regex Flags to Remember
- **\`g\` (Global):** Find all matches rather than stopping after the first match.
- **\`i\` (Case Insensitive):** Ignore case distinctions between lowercase and uppercase characters.
- **\`m\` (Multiline):** Makes \`^\` and \`$\` match the beginning and end of each individual line instead of the entire string.
- **\`s\` (DotAll):** Allows the dot (\`.\`) character to match newline characters as well.

#### Top Recommended Patterns
1. **Email RFC 5322 Simplified:** \`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\`
2. **ISO 8601 Date:** \`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:\\d{2})$\`
3. **URL Validator:** \`^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$\`
    `
  },
  {
    id: 'base64-explained',
    title: 'Understanding Base64 Encoding: What It Is and When to Use It',
    slug: 'understanding-base64-encoding-use-cases',
    date: 'Jul 29, 2026',
    readTime: '5 min read',
    category: 'Architecture',
    summary: 'Why Base64 isn\'t encryption, how binary-to-text radix 64 conversion works, and when to avoid inline Data URIs in web apps.',
    content: `
### What is Base64?

Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation. It consists of uppercase letters (\`A-Z\`), lowercase letters (\`a-z\`), digits (\`0-9\`), and two punctuation symbols (\`+\` and \`/\`, with \`=\` as padding).

#### Crucial Note: Base64 Is Not Encryption
Encoding is designed for data transmission compatibility across protocols that expect plain ASCII text (such as email MIME formats or embedded SVG icons in CSS). It does NOT provide security or secrecy.

#### When to Use Base64:
- Small icon/graphic embeds in CSS or HTML to prevent additional HTTP requests.
- Basic authentication headers in HTTP requests (\`Authorization: Basic <base64>\`).
- Passing binary thumbnails in WebSocket or JSON payloads without multipart form data.
    `
  }
];
