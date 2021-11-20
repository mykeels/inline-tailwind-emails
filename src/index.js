import { promises as fs } from "fs";
import inlineCss from "inline-css";

/**
 *
 * @param {string[]} htmlFilePaths absolute file paths to all HTML files to be inlined
 * @param {object} [deps]
 * @param {string} [deps.url] root URL for the page
 * @returns {Promise<{ filepath: string, html: string }[]>}
 */
export const inlineTailwindEmailFiles = async (
  htmlFilePaths,
  { url = "/" } = {}
) => {
  const BIG_SEP = "~~~~~sep~~~~~";
  const SMALL_SEP = "-----sep-----";
  const allHtml = await Promise.all(
    htmlFilePaths.map(filepath =>
      fs
        .readFile(filepath, "utf8")
        .then(html => [filepath, SMALL_SEP, html].join("\n"))
    )
  ).then(htmlContents => htmlContents.join(`\n${BIG_SEP}\n`));
  const inlinedHtml = await inlineTailwindEmail(allHtml, { url });
  const htmlContents = inlinedHtml.split(BIG_SEP);
  return htmlContents.map(chunk => {
    const [filepath, html] = chunk.split(SMALL_SEP).map(c => c.trim());
    return { filepath, html };
  });
};

/**
 *
 * @param {string} html HTML content
 * @param {object} [deps]
 * @param {string} [deps.url] root URL for the page
 * @returns {Promise<string>}
 */
export const inlineTailwindEmail = async (html, { url = "/" } = {}) => {
  const inlinedHtml = await inlineCss(html, {
    url,
    removeLinkTags: false,
    removeStyleTags: false,
    applyWidthAttributes: true,
    applyTableAttributes: true
  });
  return refineTailwindHtml(inlinedHtml);
};

function refineTailwindHtml(html) {
  const PATTERNS_TO_BE_REMOVED = [
    /--tw-ring-color: rgba\(59, 130, 246, 0.5\);/g,
    /--tw-ring-inset: var\(--tw-empty, \);/g,
    /--tw-ring-offset-color: #fff;/g,
    /--tw-ring-offset-shadow: 0 0 #0000;/g,
    /--tw-ring-offset-width: 0px;/g,
    /--tw-ring-shadow: 0 0 #0000;/g,
    /--tw-shadow: 0 0 #0000;/g,
    /--tw-bg-opacity: 1;/g,
    /--tw-border-opacity: 1;/g,
    /--tw-text-opacity: 1/g
  ];
  const PATTERNS_TO_BE_REPLACED = [
    [/var\(--tw-bg-opacity\)/g, `1`],
    [/var\(--tw-text-opacity\)/g, `1`],
    [/var\(--tw-border-opacity\)/g, `1`],
    [/style=" +/g, `style="`]
  ];

  const removedHtml = PATTERNS_TO_BE_REMOVED.reduce(
    (text, rm) => text.replace(rm, ""),
    html
  );
  const replacedHtml = PATTERNS_TO_BE_REPLACED.reduce(
    (text, [item, replacement]) => text.replace(item, replacement),
    removedHtml
  );
  return replacedHtml;
}
