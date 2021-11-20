import { inlineTailwindEmail } from "../src/index";

(async () => {
  const inlineHtml = await inlineTailwindEmail(
    `
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css">
        <div class="bg-red-500 text-white">
        Hello World
        </div>
        `,
    {
      url: "https://mywebsite.com"
    }
  );
  console.log(inlineHtml);
})();
