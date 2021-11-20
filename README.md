## Inline Tailwind Emails

This tool helps you inline your Email templates that use Tailwind.

### Usage

```sh
npm i inline-tailwind-emails
```

and inline a single file with:

```js
const { inlineTailwindEmail } = require("inline-tailwind-emails");

const inlineHtml = await inlineTailwindEmail(
    `
        <div class="bg-red-500">
            Hello World!
        </div>
    `,
    {
        url: "https://www.mywebsite.com"
    }
);
```

or inline multiple files at once with:

```js
const { inlineTailwindEmailFiles } = require("inline-tailwind-emails");

const results = await inlineTailwindEmailFiles(
    [
        "/path/to/file1.html",
        "/path/to/file2.html",
        "/path/to/file3.html"
    ],
    {
        url: "https://www.mywebsite.com"
    }
);
/**
 * results:
 * [
 *   {
 *      "filepath": "/path/to/file1.html",
 *      "html": "<div>...</div>",
 *   },
 *   {
 *      "filepath": "/path/to/file2.html",
 *      "html": "<div>...</div>",
 *   },
 *   {
 *      "filepath": "/path/to/file3.html",
 *      "html": "<div>...</div>",
 *   }
 * ]
 * 
 */
```