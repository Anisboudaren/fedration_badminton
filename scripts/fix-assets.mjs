import fs from "fs";
import path from "path";

const ROOT = path.resolve("D:/Work/Asgard/shuttle-federation-hub-next/src");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) fixFile(full);
  }
}

function fixFile(file) {
  let code = fs.readFileSync(file, "utf8");
  if (!code.includes('from "@/assets/') && !code.includes("from '@/assets/")) return;

  const imgProps = new Set();
  for (const m of code.matchAll(/src=\{([a-zA-Z][\w.]*)\}/g)) imgProps.add(m[1]);
  for (const m of code.matchAll(/image=\{([a-zA-Z][\w.]*)\}/g)) {
    if (m[1] !== "image") imgProps.add(m[1]);
  }

  if (imgProps.size === 0) return;

  if (!code.includes("assetUrl")) {
    if (code.includes('from "@/lib/utils"')) {
      code = code.replace(
        /import \{([^}]+)\} from "@\/lib\/utils";/,
        (_, imports) => {
          const parts = imports.split(",").map((s) => s.trim()).filter(Boolean);
          if (!parts.includes("assetUrl")) parts.push("assetUrl");
          return `import { ${parts.join(", ")} } from "@/lib/utils";`;
        },
      );
    } else {
      const useClient = code.startsWith('"use client"');
      const insert = 'import { assetUrl } from "@/lib/utils";\n';
      code = useClient
        ? code.replace('"use client";\n\n', `"use client";\n\n${insert}`)
        : insert + code;
    }
  }

  for (const prop of imgProps) {
    if (prop.includes("Url") || prop.includes(".") || prop === "src" || prop === "images") continue;
    code = code.replaceAll(`src={${prop}}`, `src={assetUrl(${prop})}`);
  }

  fs.writeFileSync(file, code);
  console.log("Fixed:", path.relative(ROOT, file));
}

walk(ROOT);
