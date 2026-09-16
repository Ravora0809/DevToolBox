# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.js >> Developer Tools E2E Suite >> Hash Generator computes MD5, SHA-1, SHA-256, and SHA-512
- Location: e2e/tools.spec.js:362:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('textarea[placeholder*="Type or paste text string to hash"]')

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
            - button "security" [ref=e60]
            - generic [ref=e63]: Hash Generator
          - generic [ref=e69]:
            - heading "Hash Generator Crypto" [level=1] [ref=e70]:
              - text: Hash Generator
              - generic [ref=e71]: Crypto
            - paragraph [ref=e72]: Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes and HMACs.
        - generic [ref=e73]:
          - button "Favorite" [ref=e74]
          - button "Share tool" [ref=e78]
      - generic [ref=e86]:
        - generic [ref=e87]:
          - generic [ref=e88]:
            - generic [ref=e89] [cursor=pointer]:
              - checkbox "Uppercase Hex (A-F)" [ref=e90]
              - generic [ref=e91]: Uppercase Hex (A-F)
            - generic [ref=e92] [cursor=pointer]:
              - checkbox "HMAC Mode (Keyed Hash)" [ref=e93]
              - generic [ref=e94]: HMAC Mode (Keyed Hash)
          - generic [ref=e95] [cursor=pointer]: Upload File Checksum
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]: Input Text to Hash
            - generic [ref=e106]:
              - generic [ref=e107]: 34 characters
              - button "Clear input" [ref=e108]
          - textbox "Type or paste any text to hash..." [ref=e112]: DevToolBoox secure hash generation
        - generic [ref=e113]:
          - generic [ref=e114]:
            - generic [ref=e115]:
              - generic [ref=e116]:
                - generic [ref=e117]: MD5
                - generic [ref=e118]: 128 bits
                - generic [ref=e119]: Legacy / Checksums
              - button "Copy" [ref=e120]
            - generic [ref=e125]: eb6489acf0175eae475e86a33b38db7b
          - generic [ref=e126]:
            - generic [ref=e127]:
              - generic [ref=e128]:
                - generic [ref=e129]: SHA-1
                - generic [ref=e130]: 160 bits
                - generic [ref=e131]: Git / Legacy
              - button "Copy" [ref=e132]
            - generic [ref=e137]: c1a04e04835977ae4a4fb7675730f34283bb865f
          - generic [ref=e138]:
            - generic [ref=e139]:
              - generic [ref=e140]:
                - generic [ref=e141]: SHA-256
                - generic [ref=e142]: 256 bits
                - generic [ref=e143]: Standard & Recommended
              - button "Copy" [ref=e144]
            - generic [ref=e149]: f8e12b9f86589e5168b51ab0366765c251abb91bfb9345391d7aceb5c26924d5
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]:
                - generic [ref=e153]: SHA-384
                - generic [ref=e154]: 384 bits
                - generic [ref=e155]: High Security
              - button "Copy" [ref=e156]
            - generic [ref=e161]: 397414e7d6f580e1dfe5731d01e6112914ced2e7e30f1f7cb23870f80ecdbd5cf73ce6c8100d487d230e2138b78a06ca
          - generic [ref=e162]:
            - generic [ref=e163]:
              - generic [ref=e164]:
                - generic [ref=e165]: SHA-512
                - generic [ref=e166]: 512 bits
                - generic [ref=e167]: Maximum Security
              - button "Copy" [ref=e168]
            - generic [ref=e173]: 981d7f83c3e73862ed79305efc00347d816b11ec3a01c78347b8b2c0dff9c30eecf16f03cf98e089cf7ce541a112657e3849035173da7c1a6e4b47537eb8d6cb
      - generic [ref=e174]:
        - generic [ref=e175]:
          - heading "About Hash Generator" [level=2] [ref=e176]
          - paragraph [ref=e177]: Compute cryptographic hashes and HMAC digests directly in your browser using the Web Crypto API, with support for text input, secret keys, and local file checksums.
          - generic [ref=e178]:
            - heading "Key Features" [level=3] [ref=e179]
            - list [ref=e180]:
              - listitem [ref=e181]:
                - generic [ref=e183]: Simultaneous MD5, SHA-1, SHA-256, SHA-384, and SHA-512 calculation
              - listitem [ref=e184]:
                - generic [ref=e186]: HMAC keyed-hash authentication mode with secret key
              - listitem [ref=e187]:
                - generic [ref=e189]: Local file checksum calculation without uploading to any server
              - listitem [ref=e190]:
                - generic [ref=e192]: Uppercase and lowercase hexadecimal outputs
        - generic [ref=e193]:
          - generic [ref=e194]:
            - generic [ref=e195]: Local Data Guarantee
            - paragraph [ref=e200]: Your input never travels across the network. All parsing and encoding is executed via browser WebAssembly & Web Crypto APIs.
          - generic [ref=e201]:
            - generic [ref=e202]: Related Tools
            - generic [ref=e203]:
              - generic [ref=e204] [cursor=pointer]: Secure Password Generator
              - generic [ref=e209] [cursor=pointer]: JWT Viewer
  - contentinfo [ref=e213]:
    - generic [ref=e214]:
      - generic [ref=e215]:
        - generic [ref=e216]:
          - generic [ref=e217]:
            - img "DevToolBoox Logo" [ref=e219]
            - generic [ref=e220]: DevToolBoox
          - paragraph [ref=e221]: Fast, focused developer utilities for formatting, regex evaluation, encoding, and data transformation. Processed locally in your browser.
          - generic [ref=e222]: Browser-Based Execution
        - generic [ref=e227]:
          - heading "Popular Utilities" [level=4] [ref=e228]
          - list [ref=e229]:
            - listitem [ref=e230]:
              - button "JSON Formatter & Minifier" [ref=e231]
            - listitem [ref=e236]:
              - button "JSON Syntax Validator" [ref=e237]
            - listitem [ref=e242]:
              - button "Regex Tester & Debugger" [ref=e243]
            - listitem [ref=e248]:
              - button "Base64 Encoder / Decoder" [ref=e249]
            - listitem [ref=e254]:
              - button "UUID / GUID Generator" [ref=e255]
            - listitem [ref=e260]:
              - button "Secure Password Generator" [ref=e261]
        - generic [ref=e266]:
          - heading "Resources" [level=4] [ref=e267]
          - list [ref=e268]:
            - listitem [ref=e269]:
              - button "Tools Directory (All 11+)" [ref=e270]
            - listitem [ref=e271]:
              - button "Developer Articles & Guides" [ref=e272]
            - listitem [ref=e273]:
              - button "About & Architecture" [ref=e274]
            - listitem [ref=e275]:
              - button "Request New Developer Tool" [ref=e276]
        - generic [ref=e277]:
          - heading "Legal & Security" [level=4] [ref=e278]
          - list [ref=e279]:
            - listitem [ref=e280]:
              - button "Privacy Policy" [ref=e281]
            - listitem [ref=e282]:
              - button "Terms of Service" [ref=e283]
            - listitem [ref=e284]:
              - button "Disclaimer" [ref=e285]
            - listitem [ref=e286]:
              - button "Contact & Feedback" [ref=e287]
      - generic [ref=e288]:
        - paragraph [ref=e289]: © 2026 DevToolBoox. All rights reserved. Built with React & Tailwind CSS.
        - generic [ref=e290]: Engineered for developer productivity
```

# Test source

```ts
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
  358 |     await expect(page.locator('text=Unified Diff Result')).toBeVisible();
  359 |   });
  360 | 
  361 |   // 17. Hash Generator
  362 |   test('Hash Generator computes MD5, SHA-1, SHA-256, and SHA-512', async ({ page }) => {
  363 |     await page.goto('/#tool-hash-generator');
  364 |     await expect(page.locator('h1')).toContainText('Hash Generator');
  365 | 
  366 |     const input = page.locator('textarea[placeholder*="Type or paste text string to hash"]');
> 367 |     await input.fill('test');
      |                 ^ Error: locator.fill: Test timeout of 30000ms exceeded.
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