import fs from "fs";
import path from "path";

const SRC = path.resolve("D:/Work/Asgard/shuttle-federation-hub/src/routes");
const OUT = path.resolve("D:/Work/Asgard/shuttle-federation-hub-next/src/views");

const routeMap = [
  ["index.tsx", "home.tsx"],
  ["about.tsx", "about.tsx"],
  ["events.tsx", "events.tsx"],
  ["news.tsx", "news.tsx"],
  ["players.tsx", "players.tsx"],
  ["players/$id.tsx", "players-id.tsx"],
  ["officials.tsx", "officials.tsx"],
  ["sponsors.tsx", "sponsors.tsx"],
  ["clubs.tsx", "clubs.tsx"],
  ["licence.tsx", "licence.tsx"],
  ["contact.tsx", "contact.tsx"],
  ["admin/index.tsx", "admin-dashboard.tsx"],
  ["admin/login.tsx", "admin-login.tsx"],
  ["admin/players.tsx", "admin-players.tsx"],
  ["admin/officials.tsx", "admin-officials.tsx"],
  ["admin/matches.tsx", "admin-matches.tsx"],
  ["admin/sponsors.tsx", "admin-sponsors.tsx"],
  ["admin/clubs.tsx", "admin-clubs.tsx"],
  ["admin/events.tsx", "admin-events.tsx"],
  ["admin/articles.tsx", "admin-articles.tsx"],
  ["admin/media.tsx", "admin-media.tsx"],
  ["admin/teams.tsx", "admin-teams.tsx"],
  ["admin/requests.tsx", "admin-requests.tsx"],
  ["admin/rankings.tsx", "admin-rankings.tsx"],
  ["admin/settings.tsx", "admin-settings.tsx"],
  ["preview/article/$articleId.tsx", "preview-article-id.tsx"],
];

function convert(content, filename) {
  let code = content;

  // Remove head() blocks inside createFileRoute
  code = code.replace(/head:\s*\(\)\s*=>\s*\(\{[\s\S]*?\}\),?\s*/g, "");
  code = code.replace(/beforeLoad:\s*\(\)\s*=>\s*\{[\s\S]*?\},?\s*/g, "");

  // Extract component name from createFileRoute
  const componentMatch = code.match(
    /export const Route = createFileRoute\([^)]*\)\(\{\s*component:\s*(\w+)/,
  );
  const componentName = componentMatch?.[1];

  // Remove createFileRoute export
  code = code.replace(/export const Route = createFileRoute\([^)]*\)\(\{[\s\S]*?\}\);\s*/g, "");

  // Router imports
  code = code.replace(
    /import\s*\{[^}]*\}\s*from\s*"@tanstack\/react-router";?\s*\n/g,
    (match) => {
      const needs = {
        Link: match.includes("Link"),
        useNavigate: match.includes("useNavigate"),
        useParams: match.includes("useParams") || code.includes("Route.useParams"),
        usePathname: match.includes("useRouterState"),
        redirect: match.includes("redirect"),
      };
      const imports = [];
      if (needs.Link) imports.push("Link");
      if (needs.useNavigate || needs.useParams || needs.usePathname) {
        const nav = [];
        if (needs.useNavigate) nav.push("useRouter");
        if (needs.useParams || code.includes("Route.useParams")) nav.push("useParams");
        if (needs.usePathname) nav.push("usePathname");
        imports.push(`{ ${nav.join(", ")} } from "next/navigation"`);
      }
      if (needs.Link) return `import Link from "next/link";\n${imports.filter((i) => i.startsWith("{")).join("\n") ? imports.filter((i) => i.startsWith("{")).map((i) => `import ${i};`).join("\n") + "\n" : ""}`;
      return imports.map((i) => (i.startsWith("{") ? `import ${i};` : `import ${i} from "next/link";`)).join("\n") + "\n";
    },
  );

  // Fix botched import merge - simplify with explicit replacements
  code = content;
  code = code.replace(/head:\s*\(\)\s*=>\s*\(\{[\s\S]*?\}\),?\s*/g, "");
  code = code.replace(/beforeLoad:\s*\(\)\s*=>\s*\{[\s\S]*?\},?\s*/g, "");
  code = code.replace(/export const Route = createFileRoute\([^)]*\)\(\{[\s\S]*?\}\);\s*/g, "");

  const usesRouter = /useNavigate|navigate\(/.test(code);
  const usesParams = /Route\.useParams/.test(code);
  const usesPathname = /useRouterState/.test(code);
  const usesLink = /<Link|Link,/.test(content);

  code = code.replace(/import\s*\{[^}]*\}\s*from\s*"@tanstack\/react-router";?\s*\n/g, "");

  const extraImports = [];
  if (usesLink) extraImports.push('import Link from "next/link";');
  const navImports = [];
  if (usesRouter) navImports.push("useRouter");
  if (usesParams) navImports.push("useParams");
  if (usesPathname) navImports.push("usePathname");
  if (navImports.length) extraImports.push(`import { ${navImports.join(", ")} } from "next/navigation";`);
  code = extraImports.join("\n") + "\n" + code;

  code = code.replace(/Route\.useParams\(\)/g, "useParams()");
  code = code.replace(/const navigate = useNavigate\(\)/g, "const router = useRouter()");
  code = code.replace(/navigate\(\{\s*to:\s*([^}]+)\s*\}\)/g, "router.push($1)");
  code = code.replace(/useRouterState\(\{\s*select:\s*\(s\)\s*=>\s*s\.location\.pathname\s*\}\)/g, "usePathname()");
  code = code.replace(/useRouterState\(\{\s*select:\s*\(s\)\s*=>\s*s\.status\s*===\s*"pending"\s*\}\)/g, "false /* navigation pending */");

  // Dynamic links with params
  code = code.replace(
    /to="\/players\/\$id"\s+params=\{\{\s*id:\s*([^}]+)\s*\}\}/g,
    "href={`/players/${$1}`}",
  );
  code = code.replace(
    /to="\/preview\/article\/\$articleId"\s+params=\{\{\s*articleId:\s*([^}]+)\s*\}\}/g,
    "href={`/preview/article/${$1}`}",
  );

  code = code.replace(/\bto=\{/g, "href={");
  code = code.replace(/\bto="/g, 'href="');
  code = code.replace(/\bto='/g, "href='");
  code = code.replace(/\s+preload="intent"/g, "");

  if (filename === "competitions.tsx") return null;

  if (!code.trim().startsWith('"use client"')) {
    code = '"use client";\n\n' + code;
  }

  if (componentName) {
    const fnRegex = new RegExp(`function ${componentName}\\(`);
    if (fnRegex.test(code) && !code.includes(`export default ${componentName}`)) {
      code += `\nexport default ${componentName};\n`;
    }
  }

  return code;
}

function fixComponents(dir) {
  for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, file.name);
    if (file.isDirectory()) {
      fixComponents(full);
      continue;
    }
    if (!file.name.endsWith(".tsx")) continue;
    let code = fs.readFileSync(full, "utf8");
    if (!code.includes("@tanstack/react-router")) continue;

    const usesRouter = /useNavigate|navigate\(/.test(code);
    const usesPathname = /useRouterState/.test(code);
    const usesLink = /from "@tanstack\/react-router"/.test(code) && /Link/.test(code);

    code = code.replace(/import\s*\{[^}]*\}\s*from\s*"@tanstack\/react-router";?\s*\n/g, "");
    const extra = [];
    if (usesLink) extra.push('import Link from "next/link";');
    const nav = [];
    if (usesRouter) nav.push("useRouter");
    if (usesPathname) nav.push("usePathname");
    if (nav.length) extra.push(`import { ${nav.join(", ")} } from "next/navigation";`);
    if (extra.length) code = extra.join("\n") + "\n" + code;

    code = code.replace(/import\s*\{\s*Navigate\s*\}\s*from\s*"@tanstack\/react-router";?\s*\n/g, "");
    code = code.replace(/<Navigate to="([^"]+)"\s*\/>/g, (_, to) => `{/* redirect to ${to} */ null}`);
    code = code.replace(/const navigate = useNavigate\(\)/g, "const router = useRouter()");
    code = code.replace(/navigate\(\{\s*to:\s*([^}]+)\s*\}\)/g, "router.push($1)");
    code = code.replace(/useRouterState\(\{\s*select:\s*\(s\)\s*=>\s*s\.location\.pathname\s*\}\)/g, "usePathname()");
    code = code.replace(/useRouterState\(\{\s*select:\s*\(s\)\s*=>\s*s\.status\s*===\s*"pending"\s*\}\)/g, "false");
    code = code.replace(/\bto=\{/g, "href={");
    code = code.replace(/\bto="/g, 'href="');
    code = code.replace(/\s+preload="intent"/g, "");

    if (!code.trim().startsWith('"use client"')) {
      code = '"use client";\n\n' + code;
    }

    fs.writeFileSync(full, code);
  }
}

fs.mkdirSync(OUT, { recursive: true });

for (const [src, dest] of routeMap) {
  const srcPath = path.join(SRC, src);
  if (!fs.existsSync(srcPath)) {
    console.warn("Missing:", src);
    continue;
  }
  const converted = convert(fs.readFileSync(srcPath, "utf8"), src);
  if (converted) fs.writeFileSync(path.join(OUT, dest), converted);
  console.log("Converted:", dest);
}

fixComponents(path.resolve("D:/Work/Asgard/shuttle-federation-hub-next/src/components"));
console.log("Fixed components");
