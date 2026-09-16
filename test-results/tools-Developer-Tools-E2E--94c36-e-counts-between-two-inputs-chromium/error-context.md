# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.js >> Developer Tools E2E Suite >> Diff Viewer highlights differences and line counts between two inputs
- Location: e2e/tools.spec.js:354:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Unified Diff Result')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Unified Diff Result')

```

```yaml
- text: Browser-Local Utilities execute transformations directly within your browser runtime using standard Web APIs.
- button "Close message"
- banner:
  - img "DevToolBoox Logo"
  - text: DevToolBoox v2.0 Tools for Every Developer
  - navigation:
    - button "Home"
    - button "All Tools"
    - button "Blog"
    - button "About"
    - button "Contact"
  - button "Search tools... K"
  - button "Starred (3)"
  - link "Star Us On GitHub":
    - /url: https://github.com/bhupanimounika/devtoolboox
- main:
  - button "Home"
  - button "formatters"
  - text: Diff Viewer
  - heading "Diff Viewer Dev" [level=1]
  - paragraph: Compare two text or code files side-by-side with additions and removals.
  - button "Favorite"
  - button "Share tool"
  - button "lines"
  - button "words"
  - button "chars"
  - button "Swap"
  - text: +5 -7 1 unchanged
  - button "Copy Patch"
  - text: Original (Before)
  - button "Clear original text"
  - textbox "Paste original code or text here...": "// Version 1.0.0 function calculateTotal(items) { let total = 0; for (let i = 0; i < items.length; i++) { total += items[i].price; } return total; }"
  - text: Modified (After)
  - button "Clear modified text"
  - textbox "Paste modified code or text here...": "// Version 2.0.0 function calculateTotal(items, taxRate = 0.08) { const subtotal = items.reduce((sum, item) => sum + item.price, 0); const tax = subtotal * taxRate; return Number((subtotal + tax).toFixed(2)); }"
  - text: "Interactive Visual Diff Comparison (lines) // Version 1.0.0 function calculateTotal(items) { let total = 0; for (let i = 0; i < items.length; i++) { total += items[i].price; } return total; // Version 2.0.0 function calculateTotal(items, taxRate = 0.08) { const subtotal = items.reduce((sum, item) => sum + item.price, 0); const tax = subtotal * taxRate; return Number((subtotal + tax).toFixed(2)); }"
  - heading "About Diff Viewer" [level=2]
  - paragraph: Inspect file differences with line-by-line, word-by-word, and character-by-character diffing, color-coded visual highlights, and patch export.
  - heading "Key Features" [level=3]
  - list:
    - listitem: Line, word, and character granularity diff modes
    - listitem: Color-coded additions (+ green) and deletions (- red)
    - listitem: Calculates total added, removed, and unchanged line counts
    - listitem: Export unified patch to clipboard
  - text: Local Data Guarantee
  - paragraph: Your input never travels across the network. All parsing and encoding is executed via browser WebAssembly & Web Crypto APIs.
  - text: Related Tools JSON Formatter & Minifier JSON Syntax Validator HTML Formatter & Beautifier
- contentinfo:
  - img "DevToolBoox Logo"
  - text: DevToolBoox
  - paragraph: Fast, focused developer utilities for formatting, regex evaluation, encoding, and data transformation. Processed locally in your browser.
  - text: Browser-Based Execution
  - heading "Popular Utilities" [level=4]
  - list:
    - listitem:
      - button "JSON Formatter & Minifier"
    - listitem:
      - button "JSON Syntax Validator"
    - listitem:
      - button "Regex Tester & Debugger"
    - listitem:
      - button "Base64 Encoder / Decoder"
    - listitem:
      - button "UUID / GUID Generator"
    - listitem:
      - button "Secure Password Generator"
  - heading "Resources" [level=4]
  - list:
    - listitem:
      - button "Tools Directory (All 11+)"
    - listitem:
      - button "Developer Articles & Guides"
    - listitem:
      - button "About & Architecture"
    - listitem:
      - button "Request New Developer Tool"
  - heading "Legal & Security" [level=4]
  - list:
    - listitem:
      - button "Privacy Policy"
    - listitem:
      - button "Terms of Service"
    - listitem:
      - button "Disclaimer"
    - listitem:
      - button "Contact & Feedback"
  - paragraph: © 2026 DevToolBoox. All rights reserved. Built with React & Tailwind CSS.
  - text: Engineered for developer productivity
```

# Test source

```ts
  258 | 
  259 |     // Format
  260 |     await formatBtn.click();
  261 |     const formattedHtml = await outputArea.inputValue();
  262 |     expect(formattedHtml).toContain('\n');
  263 |     expect(formattedHtml).toContain('  <header>');
  264 | 
  265 |     // Minify
  266 |     await minifyBtn.click();
  267 |     const minifiedHtml = await outputArea.inputValue();
  268 |     expect(minifiedHtml).toBe('<main><header><h1>DevToolBox</h1></header><p>Testing HTML Formatter</p></main>');
  269 |   });
  270 | 
  271 |   // 10. Password Generator
  272 |   test('Password Generator creates secure passwords with customized options and presets', async ({ page }) => {
  273 |     await page.goto('/#tool-password-generator');
  274 |     await expect(page.locator('h1')).toContainText('Password Generator');
  275 | 
  276 |     const passwordDisplay = page.locator('span.font-mono.select-all');
  277 |     await expect(passwordDisplay).not.toHaveText('');
  278 | 
  279 |     // Test PIN preset (length 6 digits)
  280 |     await page.locator('button:has-text("PIN")').click();
  281 |     const pinVal = await passwordDisplay.innerText();
  282 |     expect(pinVal).toHaveLength(6);
  283 |     expect(/^\d+$/.test(pinVal)).toBe(true);
  284 | 
  285 |     // Test High Security preset (length 32)
  286 |     await page.locator('button:has-text("High Security")').click();
  287 |     const secureVal = await passwordDisplay.innerText();
  288 |     expect(secureVal).toHaveLength(32);
  289 |     await expect(page.locator('text=Very Strong')).toBeVisible();
  290 | 
  291 |     // Copy password
  292 |     await page.locator('button:has-text("Copy")').first().click();
  293 |     await expect(page.locator('text=Copied')).toBeVisible();
  294 |   });
  295 | 
  296 |   // 11. Navbar Star Us On GitHub
  297 |   test('Navbar includes Star Us On GitHub link with correct repository URL', async ({ page }) => {
  298 |     await page.goto('/');
  299 |     const starBtn = page.locator('[data-testid="star-github-btn"]');
  300 |     await expect(starBtn).toBeVisible();
  301 |     await expect(starBtn).toHaveAttribute('href', 'https://github.com/bhupanimounika/devtoolboox');
  302 |   });
  303 | 
  304 |   // 12. ASCII Converter
  305 |   test('ASCII Converter translates text to decimal, hex, binary, and octal', async ({ page }) => {
  306 |     await page.goto('/#tool-ascii-converter');
  307 |     await expect(page.locator('h1')).toContainText('ASCII Converter');
  308 | 
  309 |     const input = page.locator('textarea[placeholder*="Type or paste text to convert to ASCII"]');
  310 |     await input.fill('ABC');
  311 | 
  312 |     // Output textarea should have decimal '65 66 67'
  313 |     const output = page.locator('textarea[placeholder*="Converted output will appear"]');
  314 |     await expect(output).toHaveValue('65 66 67');
  315 |   });
  316 | 
  317 |   // 13. Base64 Encoder
  318 |   test('Base64 Encoder converts strings to Base64 with URL-safe option', async ({ page }) => {
  319 |     await page.goto('/#tool-base64-encoder');
  320 |     await expect(page.locator('h1')).toContainText('Base64 Encoder');
  321 | 
  322 |     const input = page.locator('textarea[placeholder*="Type or paste plain text here"]');
  323 |     await input.fill('Hello World');
  324 | 
  325 |     const output = page.locator('textarea[placeholder*="Base64 output will appear here"]');
  326 |     await expect(output).toHaveValue('SGVsbG8gV29ybGQ=');
  327 |   });
  328 | 
  329 |   // 14. CSS Unit Converter
  330 |   test('CSS Unit Converter converts px to rem, em, %, and viewport units', async ({ page }) => {
  331 |     await page.goto('/#tool-css-unit-converter');
  332 |     await expect(page.locator('h1')).toContainText('CSS Unit Converter');
  333 | 
  334 |     const pxInput = page.locator('input[type="number"]').first();
  335 |     await pxInput.fill('32');
  336 | 
  337 |     // With 16px root, 32px is 2rem
  338 |     await expect(page.locator('text=2rem')).toBeVisible();
  339 |   });
  340 | 
  341 |   // 15. Color Converter
  342 |   test('Color Converter translates HEX to RGB, HSL, and shows WCAG contrast', async ({ page }) => {
  343 |     await page.goto('/#tool-color-converter');
  344 |     await expect(page.locator('h1')).toContainText('Color Converter');
  345 | 
  346 |     const hexInput = page.locator('input[placeholder*="#6366f1"]');
  347 |     await hexInput.fill('#000000');
  348 | 
  349 |     await expect(page.locator('text=rgb(0, 0, 0)')).toBeVisible();
  350 |     await expect(page.locator('text=hsl(0, 0%, 0%)')).toBeVisible();
  351 |   });
  352 | 
  353 |   // 16. Diff Viewer
  354 |   test('Diff Viewer highlights differences and line counts between two inputs', async ({ page }) => {
  355 |     await page.goto('/#tool-diff-viewer');
  356 |     await expect(page.locator('h1')).toContainText('Diff Viewer');
  357 | 
> 358 |     await expect(page.locator('text=Unified Diff Result')).toBeVisible();
      |                                                            ^ Error: expect(locator).toBeVisible() failed
  359 |   });
  360 | 
  361 |   // 17. Hash Generator
  362 |   test('Hash Generator computes MD5, SHA-1, SHA-256, and SHA-512', async ({ page }) => {
  363 |     await page.goto('/#tool-hash-generator');
  364 |     await expect(page.locator('h1')).toContainText('Hash Generator');
  365 | 
  366 |     const input = page.locator('textarea[placeholder*="Type or paste text string to hash"]');
  367 |     await input.fill('test');
  368 | 
  369 |     // SHA-256 for 'test' is 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
  370 |     await expect(page.locator('text=9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')).toBeVisible();
  371 |   });
  372 | 
  373 |   // 18. Line Sort and Dedupe
  374 |   test('Line Sort And Dedupe sorts lines and removes duplicates', async ({ page }) => {
  375 |     await page.goto('/#tool-line-sort-dedupe');
  376 |     await expect(page.locator('h1')).toContainText('Line Sort And Dedupe');
  377 | 
  378 |     const input = page.locator('textarea[placeholder*="Paste text lines here"]');
  379 |     await input.fill('banana\napple\nbanana\norange');
  380 | 
  381 |     // Default is remove duplicates + alphabetical sort
  382 |     const output = page.locator('textarea[placeholder*="Processed lines will appear here"]');
  383 |     await expect(output).toHaveValue('apple\nbanana\norange');
  384 |   });
  385 | 
  386 |   // 19. String Converter
  387 |   test('String Converter generates camelCase, snake_case, and kebab-case', async ({ page }) => {
  388 |     await page.goto('/#tool-string-converter');
  389 |     await expect(page.locator('h1')).toContainText('String Converter');
  390 | 
  391 |     const input = page.locator('textarea[placeholder*="Type or paste any string"]');
  392 |     await input.fill('hello world test');
  393 | 
  394 |     await expect(page.locator('text=helloWorldTest')).toBeVisible();
  395 |     await expect(page.locator('text=hello_world_test')).toBeVisible();
  396 |     await expect(page.locator('text=hello-world-test')).toBeVisible();
  397 |   });
  398 | 
  399 |   // 20. URL Parser
  400 |   test('Url Parser breaks down protocol, host, and query parameters', async ({ page }) => {
  401 |     await page.goto('/#tool-url-parser');
  402 |     await expect(page.locator('h1')).toContainText('Url Parser');
  403 | 
  404 |     const input = page.locator('input[placeholder*="https://example.com"]');
  405 |     await input.fill('https://example.com/api/search?q=developer&lang=en#section1');
  406 | 
  407 |     await expect(page.locator('text=https:').first()).toBeVisible();
  408 |     await expect(page.locator('text=example.com').first()).toBeVisible();
  409 |     await expect(page.locator('text=/api/search').first()).toBeVisible();
  410 |   });
  411 | });
  412 | 
```