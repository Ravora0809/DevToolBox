# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.js >> Developer Tools E2E Suite >> String Converter generates camelCase, snake_case, and kebab-case
- Location: e2e/tools.spec.js:387:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=helloWorldTest')
Expected: visible
Error: strict mode violation: locator('text=helloWorldTest') resolved to 2 elements:
    1) <div class="text-sm font-bold font-mono text-indigo-300 group-hover:text-white transition-colors truncate">helloWorldTest</div> aka getByText('helloWorldTest', { exact: true })
    2) <div class="text-sm font-bold font-mono text-indigo-300 group-hover:text-white transition-colors truncate">HelloWorldTest</div> aka getByText('HelloWorldTest', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=helloWorldTest')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: Browser-Local
      - generic [ref=e7]: Utilities execute transformations directly within your browser runtime using standard Web APIs.
    - button "Close message" [ref=e8]
  - banner [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15] [cursor=pointer]:
          - img "DevToolBoox Logo" [ref=e17]
          - generic [ref=e18]:
            - generic [ref=e19]:
              - generic [ref=e20]: DevToolBoox
              - generic [ref=e21]: v2.0
            - generic [ref=e22]: Tools for Every Developer
        - navigation [ref=e23]:
          - button "Home" [ref=e24]
          - button "All Tools" [ref=e25]
          - button "Blog" [ref=e26]
          - button "About" [ref=e27]
          - button "Contact" [ref=e28]
      - generic [ref=e29]:
        - button "Search tools... K" [ref=e30]:
          - generic [ref=e34]: Search tools...
          - generic [ref=e35]: K
        - button "Starred (3)" [ref=e39]
        - link "Star Us On GitHub" [ref=e45] [cursor=pointer]:
          - /url: https://github.com/bhupanimounika/devtoolboox
  - main [ref=e52]:
    - generic [ref=e53]:
      - generic [ref=e54]:
        - generic [ref=e55]:
          - generic [ref=e56]:
            - button "Home" [ref=e57]
            - button "converters" [ref=e60]
            - generic [ref=e63]: String Converter
          - generic [ref=e68]:
            - heading "String Converter Essential" [level=1] [ref=e69]:
              - text: String Converter
              - generic [ref=e70]: Essential
            - paragraph [ref=e71]: Convert strings to camelCase, snake_case, PascalCase, kebab-case, and more.
        - generic [ref=e72]:
          - button "Favorite" [ref=e73]
          - button "Share tool" [ref=e77]
      - generic [ref=e85]:
        - generic [ref=e86]:
          - generic [ref=e87]:
            - generic [ref=e88]: Input String
            - generic [ref=e91]:
              - button "Load Sample" [ref=e92]
              - button "Clear text" [ref=e93]
          - textbox "Type or paste any string to convert across all formats..." [active] [ref=e97]: hello world test
          - generic [ref=e98]:
            - generic [ref=e99]: 3 words · 16 characters
            - generic [ref=e100]: Click any card to copy result
        - generic [ref=e101]:
          - generic [ref=e102] [cursor=pointer]:
            - generic [ref=e103]:
              - generic [ref=e104]: camelCase
              - button "Copy camelCase" [ref=e105]
            - generic [ref=e109]: helloWorldTest
          - generic [ref=e110] [cursor=pointer]:
            - generic [ref=e111]:
              - generic [ref=e112]: PascalCase
              - button "Copy PascalCase" [ref=e113]
            - generic [ref=e117]: HelloWorldTest
          - generic [ref=e118] [cursor=pointer]:
            - generic [ref=e119]:
              - generic [ref=e120]: snake_case
              - button "Copy snake_case" [ref=e121]
            - generic [ref=e125]: hello_world_test
          - generic [ref=e126] [cursor=pointer]:
            - generic [ref=e127]:
              - generic [ref=e128]: CONSTANT_CASE
              - button "Copy CONSTANT_CASE" [ref=e129]
            - generic [ref=e133]: HELLO_WORLD_TEST
          - generic [ref=e134] [cursor=pointer]:
            - generic [ref=e135]:
              - generic [ref=e136]: kebab-case
              - button "Copy kebab-case" [ref=e137]
            - generic [ref=e141]: hello-world-test
          - generic [ref=e142] [cursor=pointer]:
            - generic [ref=e143]:
              - generic [ref=e144]: Title Case
              - button "Copy Title Case" [ref=e145]
            - generic [ref=e149]: Hello World Test
          - generic [ref=e150] [cursor=pointer]:
            - generic [ref=e151]:
              - generic [ref=e152]: Sentence case
              - button "Copy Sentence case" [ref=e153]
            - generic [ref=e157]: Hello world test
          - generic [ref=e158] [cursor=pointer]:
            - generic [ref=e159]:
              - generic [ref=e160]: dot.case
              - button "Copy dot.case" [ref=e161]
            - generic [ref=e165]: hello.world.test
          - generic [ref=e166] [cursor=pointer]:
            - generic [ref=e167]:
              - generic [ref=e168]: path/case
              - button "Copy path/case" [ref=e169]
            - generic [ref=e173]: hello/world/test
          - generic [ref=e174] [cursor=pointer]:
            - generic [ref=e175]:
              - generic [ref=e176]: UPPERCASE
              - button "Copy UPPERCASE" [ref=e177]
            - generic [ref=e181]: HELLO WORLD TEST
          - generic [ref=e182] [cursor=pointer]:
            - generic [ref=e183]:
              - generic [ref=e184]: lowercase
              - button "Copy lowercase" [ref=e185]
            - generic [ref=e189]: hello world test
          - generic [ref=e190] [cursor=pointer]:
            - generic [ref=e191]:
              - generic [ref=e192]: aLtErNaTiNg cAsE
              - button "Copy aLtErNaTiNg cAsE" [ref=e193]
            - generic [ref=e197]: hElLo wOrLd tEsT
          - generic [ref=e198] [cursor=pointer]:
            - generic [ref=e199]:
              - generic [ref=e200]: Reversed String
              - button "Copy Reversed String" [ref=e201]
            - generic [ref=e205]: tset dlrow olleh
          - generic [ref=e206] [cursor=pointer]:
            - generic [ref=e207]:
              - generic [ref=e208]: ROT13 Cipher
              - button "Copy ROT13 Cipher" [ref=e209]
            - generic [ref=e213]: uryyb jbeyq grfg
          - generic [ref=e214] [cursor=pointer]:
            - generic [ref=e215]:
              - generic [ref=e216]: Hexadecimal Sequence
              - button "Copy Hexadecimal Sequence" [ref=e217]
            - generic [ref=e221]: 68 65 6c 6c 6f 20 77 6f 72 6c 64 20 74 65 73 74
      - generic [ref=e222]:
        - generic [ref=e223]:
          - heading "About String Converter" [level=2] [ref=e224]
          - paragraph [ref=e225]: Transform strings into all standard programming cases (camelCase, PascalCase, CONSTANT_CASE, kebab-case, Title Case, dot.case, path/case) and ciphers simultaneously.
          - generic [ref=e226]:
            - heading "Key Features" [level=3] [ref=e227]
            - list [ref=e228]:
              - listitem [ref=e229]:
                - generic [ref=e231]: Converts to 15 standard developer casing styles and representations
              - listitem [ref=e232]:
                - generic [ref=e234]: Supports camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE
              - listitem [ref=e235]:
                - generic [ref=e237]: Includes ROT13 cipher, reversed string, and hexadecimal sequence
              - listitem [ref=e238]:
                - generic [ref=e240]: One-click instant copy for every formatted variant
        - generic [ref=e241]:
          - generic [ref=e242]:
            - generic [ref=e243]: Local Data Guarantee
            - paragraph [ref=e248]: Your input never travels across the network. All parsing and encoding is executed via browser WebAssembly & Web Crypto APIs.
          - generic [ref=e249]:
            - generic [ref=e250]: Related Tools
            - generic [ref=e251]:
              - generic [ref=e252] [cursor=pointer]: Unix Timestamp Converter
              - generic [ref=e257] [cursor=pointer]: TSX to JSX Converter
              - generic [ref=e262] [cursor=pointer]: ASCII Converter
  - contentinfo [ref=e267]:
    - generic [ref=e268]:
      - generic [ref=e269]:
        - generic [ref=e270]:
          - generic [ref=e271]:
            - img "DevToolBoox Logo" [ref=e273]
            - generic [ref=e274]: DevToolBoox
          - paragraph [ref=e275]: Fast, focused developer utilities for formatting, regex evaluation, encoding, and data transformation. Processed locally in your browser.
          - generic [ref=e276]: Browser-Based Execution
        - generic [ref=e281]:
          - heading "Popular Utilities" [level=4] [ref=e282]
          - list [ref=e283]:
            - listitem [ref=e284]:
              - button "JSON Formatter & Minifier" [ref=e285]
            - listitem [ref=e290]:
              - button "JSON Syntax Validator" [ref=e291]
            - listitem [ref=e296]:
              - button "Regex Tester & Debugger" [ref=e297]
            - listitem [ref=e302]:
              - button "Base64 Encoder / Decoder" [ref=e303]
            - listitem [ref=e308]:
              - button "UUID / GUID Generator" [ref=e309]
            - listitem [ref=e314]:
              - button "Secure Password Generator" [ref=e315]
        - generic [ref=e320]:
          - heading "Resources" [level=4] [ref=e321]
          - list [ref=e322]:
            - listitem [ref=e323]:
              - button "Tools Directory (All 11+)" [ref=e324]
            - listitem [ref=e325]:
              - button "Developer Articles & Guides" [ref=e326]
            - listitem [ref=e327]:
              - button "About & Architecture" [ref=e328]
            - listitem [ref=e329]:
              - button "Request New Developer Tool" [ref=e330]
        - generic [ref=e331]:
          - heading "Legal & Security" [level=4] [ref=e332]
          - list [ref=e333]:
            - listitem [ref=e334]:
              - button "Privacy Policy" [ref=e335]
            - listitem [ref=e336]:
              - button "Terms of Service" [ref=e337]
            - listitem [ref=e338]:
              - button "Disclaimer" [ref=e339]
            - listitem [ref=e340]:
              - button "Contact & Feedback" [ref=e341]
      - generic [ref=e342]:
        - paragraph [ref=e343]: © 2026 DevToolBoox. All rights reserved. Built with React & Tailwind CSS.
        - generic [ref=e344]: Engineered for developer productivity
```

# Test source

```ts
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
  358 |     await expect(page.locator('text=Unified Diff Result')).toBeVisible();
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
> 394 |     await expect(page.locator('text=helloWorldTest')).toBeVisible();
      |                                                       ^ Error: expect(locator).toBeVisible() failed
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