# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.js >> Developer Tools E2E Suite >> Line Sort And Dedupe sorts lines and removes duplicates
- Location: e2e/tools.spec.js:374:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('textarea[placeholder*="Paste text lines here"]')

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
            - button "text" [ref=e60]
            - generic [ref=e63]: Line Sort And Dedupe
          - generic [ref=e67]:
            - heading "Line Sort And Dedupe Fast" [level=1] [ref=e68]:
              - text: Line Sort And Dedupe
              - generic [ref=e69]: Fast
            - paragraph [ref=e70]: Sort lines alphabetically, naturally, or by length, and remove duplicates.
        - generic [ref=e71]:
          - button "Favorite" [ref=e72]
          - button "Share tool" [ref=e76]
      - generic [ref=e84]:
        - generic [ref=e85]:
          - generic [ref=e86]:
            - generic [ref=e87]:
              - generic [ref=e88]: "Sort:"
              - combobox [ref=e89]:
                - option "None (Keep original)"
                - option "A → Z Alphabetical" [selected]
                - option "Z → A Reverse"
                - option "Natural (1, 2, 10)"
                - option "Length (Shortest first)"
                - option "Length (Longest first)"
                - option "Invert order"
                - option "Random Shuffle"
            - generic [ref=e90]:
              - generic [ref=e91]: "Deduplicate:"
              - combobox [ref=e92]:
                - option "Remove Duplicates (Keep 1)" [selected]
                - option "Only Duplicate Lines"
                - option "Only Unique Lines (Count = 1)"
                - option "Keep All Duplicates"
            - generic [ref=e93] [cursor=pointer]:
              - checkbox "Case Sensitive" [ref=e94]
              - generic [ref=e95]: Case Sensitive
          - generic [ref=e96]:
            - generic [ref=e97]:
              - generic [ref=e98]: 12 in
              - generic [ref=e99]: 9 out
              - generic [ref=e100]: (-3)
            - button "Copy" [ref=e101]
        - generic [ref=e106]:
          - generic [ref=e107] [cursor=pointer]:
            - checkbox "Trim Whitespace" [checked] [ref=e108]
            - generic [ref=e109]: Trim Whitespace
          - generic [ref=e110] [cursor=pointer]:
            - checkbox "Remove Empty Lines" [checked] [ref=e111]
            - generic [ref=e112]: Remove Empty Lines
          - generic [ref=e113] [cursor=pointer]:
            - checkbox "Number Lines (1., 2.)" [ref=e114]
            - generic [ref=e115]: Number Lines (1., 2.)
          - generic [ref=e116]:
            - generic [ref=e117]: "Prefix:"
            - textbox "e.g. \"- \"" [ref=e118]
            - generic [ref=e119]: "Suffix:"
            - textbox "e.g. \",\"" [ref=e120]
        - generic [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]:
              - generic [ref=e124]: Raw Input Lines
              - generic [ref=e125]:
                - button "Sample" [ref=e126]
                - button "Clear input" [ref=e127]
            - textbox "Paste multiple lines of text or items here..." [ref=e131]: banana apple orange apple banana grape apple Pineapple mango 10 items 2 items 1 item
          - generic [ref=e132]:
            - generic [ref=e133]:
              - generic [ref=e134]: Sorted & Deduped Output
              - button "Download text file" [ref=e135]
            - textbox "Processed lines will appear here..." [ref=e139]: 1 item 10 items 2 items apple banana grape mango orange Pineapple
      - generic [ref=e140]:
        - generic [ref=e141]:
          - heading "About Line Sort And Dedupe" [level=2] [ref=e142]
          - paragraph [ref=e143]: Fast line-by-line list processor supporting alphabetical (A-Z, Z-A), natural numeric sort, length sorting, duplicate removal, case sensitivity, and numbering.
          - generic [ref=e144]:
            - heading "Key Features" [level=3] [ref=e145]
            - list [ref=e146]:
              - listitem [ref=e147]:
                - generic [ref=e149]: Alphabetical (A-Z, Z-A), natural (1, 2, 10), and line length sorting
              - listitem [ref=e150]:
                - generic [ref=e152]: Remove duplicate lines with optional case sensitivity
              - listitem [ref=e153]:
                - generic [ref=e155]: Filter to only duplicates or only unique lines
              - listitem [ref=e156]:
                - generic [ref=e158]: Add custom line prefixes, suffixes, or auto line numbering
        - generic [ref=e159]:
          - generic [ref=e160]:
            - generic [ref=e161]: Local Data Guarantee
            - paragraph [ref=e166]: Your input never travels across the network. All parsing and encoding is executed via browser WebAssembly & Web Crypto APIs.
          - generic [ref=e167]:
            - generic [ref=e168]: Related Tools
            - generic [ref=e169]:
              - generic [ref=e170] [cursor=pointer]: Regex Tester & Debugger
              - generic [ref=e176] [cursor=pointer]: Word & Character Counter
              - generic [ref=e181] [cursor=pointer]: Character / Word Counter
  - contentinfo [ref=e186]:
    - generic [ref=e187]:
      - generic [ref=e188]:
        - generic [ref=e189]:
          - generic [ref=e190]:
            - img "DevToolBoox Logo" [ref=e192]
            - generic [ref=e193]: DevToolBoox
          - paragraph [ref=e194]: Fast, focused developer utilities for formatting, regex evaluation, encoding, and data transformation. Processed locally in your browser.
          - generic [ref=e195]: Browser-Based Execution
        - generic [ref=e200]:
          - heading "Popular Utilities" [level=4] [ref=e201]
          - list [ref=e202]:
            - listitem [ref=e203]:
              - button "JSON Formatter & Minifier" [ref=e204]
            - listitem [ref=e209]:
              - button "JSON Syntax Validator" [ref=e210]
            - listitem [ref=e215]:
              - button "Regex Tester & Debugger" [ref=e216]
            - listitem [ref=e221]:
              - button "Base64 Encoder / Decoder" [ref=e222]
            - listitem [ref=e227]:
              - button "UUID / GUID Generator" [ref=e228]
            - listitem [ref=e233]:
              - button "Secure Password Generator" [ref=e234]
        - generic [ref=e239]:
          - heading "Resources" [level=4] [ref=e240]
          - list [ref=e241]:
            - listitem [ref=e242]:
              - button "Tools Directory (All 11+)" [ref=e243]
            - listitem [ref=e244]:
              - button "Developer Articles & Guides" [ref=e245]
            - listitem [ref=e246]:
              - button "About & Architecture" [ref=e247]
            - listitem [ref=e248]:
              - button "Request New Developer Tool" [ref=e249]
        - generic [ref=e250]:
          - heading "Legal & Security" [level=4] [ref=e251]
          - list [ref=e252]:
            - listitem [ref=e253]:
              - button "Privacy Policy" [ref=e254]
            - listitem [ref=e255]:
              - button "Terms of Service" [ref=e256]
            - listitem [ref=e257]:
              - button "Disclaimer" [ref=e258]
            - listitem [ref=e259]:
              - button "Contact & Feedback" [ref=e260]
      - generic [ref=e261]:
        - paragraph [ref=e262]: © 2026 DevToolBoox. All rights reserved. Built with React & Tailwind CSS.
        - generic [ref=e263]: Engineered for developer productivity
```

# Test source

```ts
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
> 379 |     await input.fill('banana\napple\nbanana\norange');
      |                 ^ Error: locator.fill: Test timeout of 30000ms exceeded.
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