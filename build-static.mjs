import { readFile, mkdir, writeFile, cp } from "node:fs/promises";
const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
const worker = `const html=${JSON.stringify(html)};export default{async fetch(){return new Response(html,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"public, max-age=60"}})}};`;
await writeFile("dist/server/index.js", worker);
await cp(".openai/hosting.json", "dist/.openai/hosting.json");
console.log("Static mobile build ready");
