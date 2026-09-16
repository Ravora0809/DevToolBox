# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.js >> Developer Tools E2E Suite >> Url Parser breaks down protocol, host, and query parameters
- Location: e2e/tools.spec.js:400:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/api/search').first()
Expected: visible
Error: SyntaxError: Invalid flags supplied to RegExp constructor 'search'
    at new RegExp (<anonymous>)
    at createTextMatcher (<anonymous>:8173:16)
    at Object.queryAll (<anonymous>:6996:33)
    at InjectedScript._queryEngineAll (<anonymous>:6969:49)
    at InjectedScript.querySelectorAll (<anonymous>:6956:30)
    at callMatchedElements (eval at evaluate (:311:30), <anonymous>:2:29)
    at UtilityScript.evaluate (<anonymous>:313:16)
    at UtilityScript.<anonymous> (<anonymous>:1:44)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=/api/search').first()

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
            - generic [ref=e63]: Url Parser
          - generic [ref=e69]:
            - heading "Url Parser Web" [level=1] [ref=e70]:
              - text: Url Parser
              - generic [ref=e71]: Web
            - paragraph [ref=e72]: Inspect and parse URL protocol, hostname, port, pathname, hash, and query params.
        - generic [ref=e73]:
          - button "Favorite" [ref=e74]
          - button "Share tool" [ref=e78]
      - generic [ref=e86]:
        - generic [ref=e87]:
          - generic [ref=e88]:
            - generic [ref=e89]: Enter Full URL to Parse
            - generic [ref=e93]:
              - button "Load Sample URL" [ref=e94]
              - button "Clear input" [ref=e95]
          - textbox "https://example.com/path?key=value#hash" [active] [ref=e99]: https://example.com/api/search?q=developer&lang=en#section1
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]:
              - generic [ref=e103]: Protocol
              - button "Copy Protocol" [ref=e104]
            - generic [ref=e108]: "https:"
          - generic [ref=e109]:
            - generic [ref=e110]:
              - generic [ref=e111]: Hostname
              - button "Copy Hostname" [ref=e112]
            - generic [ref=e116]: example.com
          - generic [ref=e117]:
            - generic [ref=e118]:
              - generic [ref=e119]: Port
              - button "Copy Port" [ref=e120]
            - generic [ref=e124]: 443 (default)
          - generic [ref=e125]:
            - generic [ref=e126]:
              - generic [ref=e127]: Origin
              - button "Copy Origin" [ref=e128]
            - generic [ref=e132]: https://example.com
          - generic [ref=e133]:
            - generic [ref=e134]:
              - generic [ref=e135]: Pathname
              - button "Copy Pathname" [ref=e136]
            - generic [ref=e140]: /api/search
          - generic [ref=e141]:
            - generic [ref=e142]:
              - generic [ref=e143]: Hash / Anchor
              - button "Copy Hash / Anchor" [ref=e144]
            - generic [ref=e148]: "#section1"
          - generic [ref=e149]:
            - generic [ref=e150]:
              - generic [ref=e151]: Username
              - button "Copy Username" [ref=e152]
            - generic [ref=e156]: (none)
          - generic [ref=e157]:
            - generic [ref=e158]:
              - generic [ref=e159]: Password
              - button "Copy Password" [ref=e160]
            - generic [ref=e164]: (none)
        - generic [ref=e165]:
          - generic [ref=e166]: Path Segments
          - generic [ref=e167]:
            - generic [ref=e168]: /
            - generic [ref=e169]: api
            - generic [ref=e170]: /
            - generic [ref=e171]: search
        - generic [ref=e172]:
          - generic [ref=e173]:
            - generic [ref=e174]: Query Parameters (2)
            - button "Copy Query String" [ref=e175]
          - table [ref=e181]:
            - rowgroup [ref=e182]:
              - row [ref=e183]:
                - columnheader "Key" [ref=e184]
                - columnheader "Value" [ref=e185]
                - columnheader "Action" [ref=e186]
            - rowgroup [ref=e187]:
              - row [ref=e188]:
                - cell "q" [ref=e189]
                - cell "developer" [ref=e190]
                - cell [ref=e191]:
                  - button "Copy value" [ref=e192]
              - row [ref=e196]:
                - cell "lang" [ref=e197]
                - cell "en" [ref=e198]
                - cell [ref=e199]:
                  - button "Copy value" [ref=e200]
      - generic [ref=e204]:
        - generic [ref=e205]:
          - heading "About Url Parser" [level=2] [ref=e206]
          - paragraph [ref=e207]: Break down complex URLs into protocol, origin, host, port, path segments, and individual query parameters with quick copy actions for each component.
          - generic [ref=e208]:
            - heading "Key Features" [level=3] [ref=e209]
            - list [ref=e210]:
              - listitem [ref=e211]:
                - generic [ref=e213]: Full breakdown of Protocol, Origin, Host, Port, Path, and Hash
              - listitem [ref=e214]:
                - generic [ref=e216]: Visual interactive path segment pills
              - listitem [ref=e217]:
                - generic [ref=e219]: Search query parameter key-value table
              - listitem [ref=e220]:
                - generic [ref=e222]: One-click copy for any URL sub-component
        - generic [ref=e223]:
          - generic [ref=e224]:
            - generic [ref=e225]: Local Data Guarantee
            - paragraph [ref=e230]: Your input never travels across the network. All parsing and encoding is executed via browser WebAssembly & Web Crypto APIs.
          - generic [ref=e231]:
            - generic [ref=e232]: Related Tools
            - generic [ref=e233]:
              - generic [ref=e234] [cursor=pointer]: Unix Timestamp Converter
              - generic [ref=e239] [cursor=pointer]: TSX to JSX Converter
              - generic [ref=e244] [cursor=pointer]: ASCII Converter
  - contentinfo [ref=e249]:
    - generic [ref=e250]:
      - generic [ref=e251]:
        - generic [ref=e252]:
          - generic [ref=e253]:
            - img "DevToolBoox Logo" [ref=e255]
            - generic [ref=e256]: DevToolBoox
          - paragraph [ref=e257]: Fast, focused developer utilities for formatting, regex evaluation, encoding, and data transformation. Processed locally in your browser.
          - generic [ref=e258]: Browser-Based Execution
        - generic [ref=e263]:
          - heading "Popular Utilities" [level=4] [ref=e264]
          - list [ref=e265]:
            - listitem [ref=e266]:
              - button "JSON Formatter & Minifier" [ref=e267]
            - listitem [ref=e272]:
              - button "JSON Syntax Validator" [ref=e273]
            - listitem [ref=e278]:
              - button "Regex Tester & Debugger" [ref=e279]
            - listitem [ref=e284]:
              - button "Base64 Encoder / Decoder" [ref=e285]
            - listitem [ref=e290]:
              - button "UUID / GUID Generator" [ref=e291]
            - listitem [ref=e296]:
              - button "Secure Password Generator" [ref=e297]
        - generic [ref=e302]:
          - heading "Resources" [level=4] [ref=e303]
          - list [ref=e304]:
            - listitem [ref=e305]:
              - button "Tools Directory (All 11+)" [ref=e306]
            - listitem [ref=e307]:
              - button "Developer Articles & Guides" [ref=e308]
            - listitem [ref=e309]:
              - button "About & Architecture" [ref=e310]
            - listitem [ref=e311]:
              - button "Request New Developer Tool" [ref=e312]
        - generic [ref=e313]:
          - heading "Legal & Security" [level=4] [ref=e314]
          - list [ref=e315]:
            - listitem [ref=e316]:
              - button "Privacy Policy" [ref=e317]
            - listitem [ref=e318]:
              - button "Terms of Service" [ref=e319]
            - listitem [ref=e320]:
              - button "Disclaimer" [ref=e321]
            - listitem [ref=e322]:
              - button "Contact & Feedback" [ref=e323]
      - generic [ref=e324]:
        - paragraph [ref=e325]: © 2026 DevToolBoox. All rights reserved. Built with React & Tailwind CSS.
        - generic [ref=e326]: Engineered for developer productivity
```