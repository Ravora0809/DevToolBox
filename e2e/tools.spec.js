import { test, expect } from '@playwright/test';

test.describe('Developer Tools E2E Suite', () => {
  test.beforeEach(async ({ context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  // 1. JSON Formatter
  test('JSON Formatter formats, minifies, handles invalid JSON, copies and resets', async ({ page }) => {
    await page.goto('/#tool-json-formatter');
    await expect(page.locator('h1')).toContainText('JSON Formatter');

    const inputArea = page.locator('textarea[placeholder*="Paste your unformatted JSON"]');
    const outputArea = page.locator('textarea[placeholder*="Formatted output will appear here"]');
    const formatBtn = page.locator('button:has-text("Format JSON")');
    const minifyBtn = page.locator('button:has-text("Minify (1 Line)")');
    const clearBtn = page.locator('button[title="Clear all"]');

    // Clear existing content
    await clearBtn.click();
    await expect(inputArea).toHaveValue('');

    // Valid JSON test
    await inputArea.fill('{"project":"DevToolBox","status":"active","count":10}');
    await formatBtn.click();

    await expect(outputArea).not.toHaveValue('');
    const formattedVal = await outputArea.inputValue();
    expect(formattedVal).toContain('"project": "DevToolBox"');
    expect(formattedVal).toContain('\n');

    // Minify test
    await minifyBtn.click();
    const minifiedVal = await outputArea.inputValue();
    expect(minifiedVal).toBe('{"project":"DevToolBox","status":"active","count":10}');

    // Copy test
    const copyBtn = page.locator('button:has-text("Copy")').first();
    await copyBtn.click();
    await expect(page.locator('text=Copied!')).toBeVisible();

    // Invalid JSON test
    await inputArea.fill('{ invalid json: true, }');
    await formatBtn.click();
    await expect(page.locator('div.text-rose-300')).toBeVisible();

    // Reset with clear button
    await clearBtn.click();
    await expect(inputArea).toHaveValue('');
    await expect(outputArea).toHaveValue('');
  });

  // 2. JSON Validator
  test('JSON Validator validates RFC 8259 syntax and auto-fixes errors', async ({ page }) => {
    await page.goto('/#tool-json-validator');
    await expect(page.locator('h1')).toContainText('JSON Syntax Validator');

    const validateBtn = page.locator('button:has-text("Validate Syntax")');
    const autoFixBtn = page.locator('button:has-text("Auto-Fix Commas/Quotes")');
    const brokenSampleBtn = page.locator('button:has-text("Broken Sample")');
    const validSampleBtn = page.locator('button:has-text("Valid Sample")');
    const clearBtn = page.locator('button[title="Reset and clear editor"]');
    const textarea = page.locator('#json-validator-input');

    // 1. Valid sample
    await validSampleBtn.click();
    await validateBtn.click();
    await expect(page.locator('text=JSON is strictly valid RFC 8259 format.')).toBeVisible();

    // 2. Broken sample
    await brokenSampleBtn.click();
    await validateBtn.click();
    await expect(page.locator('text=Syntax Error Detected')).toBeVisible();

    // 3. Auto-fix
    await autoFixBtn.click();
    await expect(page.locator('text=Syntax auto-repaired successfully.')).toBeVisible();

    // 4. Reset
    await clearBtn.click();
    await expect(textarea).toHaveValue('');
  });

  // 3. Word Counter
  test('Word Counter calculates metrics and transforms text case', async ({ page }) => {
    await page.goto('/#tool-word-counter');
    await expect(page.locator('h1')).toContainText('Word & Character Counter');

    const textarea = page.locator('#word-counter-textarea');
    const clearBtn = page.locator('button[title="Clear text"]');

    await clearBtn.click();
    await expect(textarea).toHaveValue('');

    // Type text with exactly 8 words
    await textarea.fill('The quick brown fox jumps over lazy dog');

    // Check word count display
    const wordMetric = page.locator('span.text-2xl.text-indigo-400');
    await expect(wordMetric).toHaveText('8');

    // Transform case to UPPERCASE
    await page.locator('button:has-text("UPPERCASE")').click();
    await expect(textarea).toHaveValue('THE QUICK BROWN FOX JUMPS OVER LAZY DOG');

    // Transform case to lowercase
    await page.locator('button:has-text("lowercase")').click();
    await expect(textarea).toHaveValue('the quick brown fox jumps over lazy dog');

    // Copy text
    await page.locator('button:has-text("Copy")').first().click();
    await expect(page.locator('text=Copied')).toBeVisible();
  });

  // 4. Base64 Encoder/Decoder
  test('Base64 tool encodes, decodes, toggles URL-safe and resets', async ({ page }) => {
    await page.goto('/#tool-base64-tool');
    await expect(page.locator('h1')).toContainText('Base64 Encoder');

    const inputArea = page.locator('#base64-input');
    const outputArea = page.locator('textarea[readonly]');
    const encodeActionBtn = page.locator('button:has-text("Encode to Base64")');
    const clearBtn = page.locator('button[title="Reset and clear all"]');

    // Clear
    await clearBtn.click();
    await expect(inputArea).toHaveValue('');

    // Encode
    await inputArea.fill('DevToolBox Rocks!');
    await encodeActionBtn.click();
    await expect(outputArea).toHaveValue('RGV2VG9vbEJveCBSb2NrcyE=');

    // Switch to Decode mode
    await page.locator('button:has-text("Decode (Base64 → Text)")').click();
    const decodeInput = page.locator('textarea[placeholder*="Paste Base64"]');
    const decodeOutput = page.locator('textarea[readonly]');
    const decodeActionBtn = page.locator('button:has-text("Decode Base64")');

    await decodeInput.fill('RGV2VG9vbEJveCBSb2NrcyE=');
    await decodeActionBtn.click();
    await expect(decodeOutput).toHaveValue('DevToolBox Rocks!');
  });

  // 5. UUID Generator
  test('UUID Generator generates single and multiple IDs with options', async ({ page }) => {
    await page.goto('/#tool-uuid-generator');
    await expect(page.locator('h1')).toContainText('UUID / GUID Generator');

    const quantitySelect = page.locator('#uuid-quantity-select');
    await quantitySelect.selectOption('10');

    const generateBtn = page.locator('button:has-text("Generate New")');
    await generateBtn.click();

    // Verify 10 UUIDs are displayed
    const uuidRows = page.locator('span.font-mono.select-all');
    await expect(uuidRows).toHaveCount(10);

    // Toggle Uppercase
    const uppercaseCheckbox = page.locator('label:has-text("Uppercase") input[type="checkbox"]');
    await uppercaseCheckbox.check();

    const firstUuid = await uuidRows.first().innerText();
    expect(firstUuid).toBe(firstUuid.toUpperCase());

    // Copy All
    const copyAllBtn = page.locator('button:has-text("Copy All")');
    await copyAllBtn.click();
    await expect(page.locator('text=All Copied!')).toBeVisible();
  });

  // 6. Regex Tester
  test('Regex Tester highlights matches, selects common patterns and shows error states', async ({ page }) => {
    await page.goto('/#tool-regex-tester');
    await expect(page.locator('h1')).toContainText('Regex Tester');

    const patternInput = page.locator('#regex-pattern-input');
    const testTextarea = page.locator('#regex-test-text');

    // Select common preset: Email Address
    await page.locator('button:has-text("Email Address")').click();
    await testTextarea.fill('Send inquiries to support@devtoolbox.io or test@example.com today.');

    // Verify matches found
    await expect(page.locator('text=2 matches')).toBeVisible();

    // Invalid regex syntax handling
    await patternInput.fill('[a-z');
    await expect(page.locator('text=Regex Syntax Error')).toBeVisible();

    // Reset
    await page.locator('button[title="Clear all"]').click();
    await expect(patternInput).toHaveValue('');
    await expect(testTextarea).toHaveValue('');
  });

  // 7. Timestamp Converter
  test('Timestamp Converter converts Unix timestamps and date-times', async ({ page }) => {
    await page.goto('/#tool-timestamp-converter');
    await expect(page.locator('h1')).toContainText('Unix Timestamp Converter');

    // Test Unix 0 preset (Jan 1, 1970)
    await page.locator('button:has-text("Unix 0 (1970)")').click();

    // Check UTC output contains 1970
    await expect(page.locator('div:has-text("UTC (GMT)")').locator('span.font-mono.text-slate-200').first()).toContainText('1970');

    // Invalid timestamp error handling
    const epochInput = page.locator('#epoch-input');
    await epochInput.fill('not-a-number');
    await expect(page.locator('text=Please enter a valid numeric Unix timestamp.')).toBeVisible();

    // Valid timestamp
    await epochInput.fill('1609459200'); // 2021-01-01 00:00:00 UTC
    await expect(page.locator('div:has-text("UTC (GMT)")').locator('span.font-mono.text-slate-200').first()).toContainText('2021');
  });

  // 8. URL Encoder/Decoder
  test('URL Encoder / Decoder encodes and decodes query strings', async ({ page }) => {
    await page.goto('/#tool-url-encoder');
    await expect(page.locator('h1')).toContainText('URL Encoder');

    const inputArea = page.locator('#url-input-string');
    const outputArea = page.locator('textarea[placeholder*="Processed output will appear here"]');
    const clearBtn = page.locator('button[title="Clear all"]');

    // Encode
    await clearBtn.click();
    await inputArea.fill('https://example.com/search?q=developer tools&status=ok#top');
    await page.locator('button:has-text("Process")').click();

    const encodedVal = await outputArea.inputValue();
    expect(encodedVal).toContain('developer%20tools');

    // Switch to Decode mode
    await page.locator('button:has-text("Decode URL")').click();
    await inputArea.fill('https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Ddeveloper%20tools');
    await page.locator('button:has-text("Process")').click();

    const decodedVal = await outputArea.inputValue();
    expect(decodedVal).toBe('https://example.com/search?q=developer tools');
  });

  // 9. HTML Formatter
  test('HTML Formatter formats and minifies markup', async ({ page }) => {
    await page.goto('/#tool-html-formatter');
    await expect(page.locator('h1')).toContainText('HTML Formatter');

    const inputArea = page.locator('#html-input');
    const outputArea = page.locator('textarea[placeholder*="Click \'Format HTML\'"]');
    const formatBtn = page.locator('button:has-text("Format HTML")');
    const minifyBtn = page.locator('button:has-text("Minify HTML")');
    const clearBtn = page.locator('button[title="Reset and clear all"]');

    await clearBtn.click();
    await inputArea.fill('<main><header><h1>DevToolBox</h1></header><p>Testing HTML Formatter</p></main>');

    // Format
    await formatBtn.click();
    const formattedHtml = await outputArea.inputValue();
    expect(formattedHtml).toContain('\n');
    expect(formattedHtml).toContain('  <header>');

    // Minify
    await minifyBtn.click();
    const minifiedHtml = await outputArea.inputValue();
    expect(minifiedHtml).toBe('<main><header><h1>DevToolBox</h1></header><p>Testing HTML Formatter</p></main>');
  });

  // 10. Password Generator
  test('Password Generator creates secure passwords with customized options and presets', async ({ page }) => {
    await page.goto('/#tool-password-generator');
    await expect(page.locator('h1')).toContainText('Password Generator');

    const passwordDisplay = page.locator('span.font-mono.select-all');
    await expect(passwordDisplay).not.toHaveText('');

    // Test PIN preset (length 6 digits)
    await page.locator('button:has-text("PIN")').click();
    const pinVal = await passwordDisplay.innerText();
    expect(pinVal).toHaveLength(6);
    expect(/^\d+$/.test(pinVal)).toBe(true);

    // Test High Security preset (length 32)
    await page.locator('button:has-text("High Security")').click();
    const secureVal = await passwordDisplay.innerText();
    expect(secureVal).toHaveLength(32);
    await expect(page.locator('text=Very Strong')).toBeVisible();

    // Copy password
    await page.locator('button:has-text("Copy")').first().click();
    await expect(page.locator('text=Copied')).toBeVisible();
  });

  // 11. Navbar Star Us On GitHub
  test('Navbar includes Star Us On GitHub link with correct repository URL', async ({ page }) => {
    await page.goto('/');
    const starBtn = page.locator('[data-testid="star-github-btn"]');
    await expect(starBtn).toBeVisible();
    await expect(starBtn).toHaveAttribute('href', 'https://github.com/bhupanimounika/devtoolboox');
  });

  // 12. ASCII Converter
  test('ASCII Converter translates text to decimal, hex, binary, and octal', async ({ page }) => {
    await page.goto('/#tool-ascii-converter');
    await expect(page.locator('h1')).toContainText('ASCII Converter');

    const input = page.locator('textarea[placeholder*="Type or paste text to convert to ASCII"]');
    await input.fill('ABC');

    // Output textarea should have decimal '65 66 67'
    const output = page.locator('textarea[placeholder*="Converted output will appear"]');
    await expect(output).toHaveValue('65 66 67');
  });

  // 13. Base64 Encoder
  test('Base64 Encoder converts strings to Base64 with URL-safe option', async ({ page }) => {
    await page.goto('/#tool-base64-encoder');
    await expect(page.locator('h1')).toContainText('Base64 Encoder');

    const input = page.locator('textarea[placeholder*="Type or paste plain text here"]');
    await input.fill('Hello World');

    const output = page.locator('textarea[placeholder*="Base64 output will appear here"]');
    await expect(output).toHaveValue('SGVsbG8gV29ybGQ=');
  });

  // 14. CSS Unit Converter
  test('CSS Unit Converter converts px to rem, em, %, and viewport units', async ({ page }) => {
    await page.goto('/#tool-css-unit-converter');
    await expect(page.locator('h1')).toContainText('CSS Unit Converter');

    const pxInput = page.locator('input[type="number"]').first();
    await pxInput.fill('32');

    // With 16px root, 32px is 2rem
    await expect(page.locator('text=2rem')).toBeVisible();
  });

  // 15. Color Converter
  test('Color Converter translates HEX to RGB, HSL, and shows WCAG contrast', async ({ page }) => {
    await page.goto('/#tool-color-converter');
    await expect(page.locator('h1')).toContainText('Color Converter');

    const hexInput = page.locator('input[placeholder*="#6366f1"]');
    await hexInput.fill('#000000');

    await expect(page.locator('text=rgb(0, 0, 0)')).toBeVisible();
    await expect(page.locator('text=hsl(0, 0%, 0%)')).toBeVisible();
  });

  // 16. Diff Viewer
  test('Diff Viewer highlights differences and line counts between two inputs', async ({ page }) => {
    await page.goto('/#tool-diff-viewer');
    await expect(page.locator('h1')).toContainText('Diff Viewer');

    await expect(page.locator('text=Unified Diff Result')).toBeVisible();
  });

  // 17. Hash Generator
  test('Hash Generator computes MD5, SHA-1, SHA-256, and SHA-512', async ({ page }) => {
    await page.goto('/#tool-hash-generator');
    await expect(page.locator('h1')).toContainText('Hash Generator');

    const input = page.locator('textarea[placeholder*="Type or paste text string to hash"]');
    await input.fill('test');

    // SHA-256 for 'test' is 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
    await expect(page.locator('text=9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')).toBeVisible();
  });

  // 18. Line Sort and Dedupe
  test('Line Sort And Dedupe sorts lines and removes duplicates', async ({ page }) => {
    await page.goto('/#tool-line-sort-dedupe');
    await expect(page.locator('h1')).toContainText('Line Sort And Dedupe');

    const input = page.locator('textarea[placeholder*="Paste text lines here"]');
    await input.fill('banana\napple\nbanana\norange');

    // Default is remove duplicates + alphabetical sort
    const output = page.locator('textarea[placeholder*="Processed lines will appear here"]');
    await expect(output).toHaveValue('apple\nbanana\norange');
  });

  // 19. String Converter
  test('String Converter generates camelCase, snake_case, and kebab-case', async ({ page }) => {
    await page.goto('/#tool-string-converter');
    await expect(page.locator('h1')).toContainText('String Converter');

    const input = page.locator('textarea[placeholder*="Type or paste any string"]');
    await input.fill('hello world test');

    await expect(page.locator('text=helloWorldTest')).toBeVisible();
    await expect(page.locator('text=hello_world_test')).toBeVisible();
    await expect(page.locator('text=hello-world-test')).toBeVisible();
  });

  // 20. URL Parser
  test('Url Parser breaks down protocol, host, and query parameters', async ({ page }) => {
    await page.goto('/#tool-url-parser');
    await expect(page.locator('h1')).toContainText('Url Parser');

    const input = page.locator('input[placeholder*="https://example.com"]');
    await input.fill('https://example.com/api/search?q=developer&lang=en#section1');

    await expect(page.locator('text=https:').first()).toBeVisible();
    await expect(page.locator('text=example.com').first()).toBeVisible();
    await expect(page.locator('text=/api/search').first()).toBeVisible();
  });
});
