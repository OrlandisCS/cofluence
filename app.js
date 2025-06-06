import fs from "fs";
import path from "path";
import TurndownService from "turndown";
import chalk from "chalk";
import ora from "ora";

import readline from "readline";

const inputDir = "./files";
const turndownService = new TurndownService();
turndownService.addRule("convertLocalHtmlLinksToMd", {
  filter: (node) =>
    node.nodeName === "A" &&
    node.getAttribute("href") &&
    node.getAttribute("href").endsWith(".html") &&
    !node.getAttribute("href").startsWith("http"),

  replacement: (content, node) => {
    const href = node.getAttribute("href").replace(/\.html$/, ".md");
    return `[${content}](${href})`;
  },
});

const delay = 500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function convertHtmlToMd(dir, baseOutDir, relativeSubPath = "") {
  const fullOutDir = path.join(baseOutDir, relativeSubPath);
  const items = fs.readdirSync(dir, { withFileTypes: true });
  let htmlFilesFound = false;

  for (const item of items) {
    const inputPath = path.join(dir, item.name);
    const relPath = path.join(relativeSubPath, item.name);
    const outputPath = path.join(baseOutDir, relPath).replace(/\.html$/, ".md");

    if (item.isDirectory()) {
      const convertedInSub = await convertHtmlToMd(
        inputPath,
        baseOutDir,
        relPath
      );
      if (convertedInSub) {
        htmlFilesFound = true;
      }
    } else if (
      item.isFile() &&
      path.extname(item.name).toLowerCase() === ".html"
    ) {
      ensureDirExists(path.dirname(outputPath));

      const spinner = ora(`Convirtiendo ${chalk.cyan(relPath)}...`).start();

      try {
        const html = fs.readFileSync(inputPath, "utf8");
        const markdown = turndownService.turndown(html);
        fs.writeFileSync(outputPath, markdown);
        await sleep(delay);
        spinner.succeed(
          `${chalk.green("✔")} ${chalk.cyan(relPath)} convertido`
        );
        htmlFilesFound = true;
      } catch (err) {
        spinner.fail(`${chalk.red("✖")} Error en ${relPath}`);
        console.error(err);
      }
    }
  }

  return htmlFilesFound;
}

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

line.question("Ingrese departamento: \n > ", (outputDir) => {
  try {
    (async () => {
      console.log(
        chalk.bold.blue("🚀 Buscando archivos HTML para convertir...\n")
      );

      if (!fs.existsSync(inputDir)) {
        console.error(
          chalk.red(`❌ La carpeta de entrada no existe: ${inputDir}`)
        );
        return;
      }

      ensureDirExists(outputDir);
      const hasConvertedFiles = await convertHtmlToMd(inputDir, outputDir);

      if (hasConvertedFiles) {
        console.log(chalk.bold.green("\n✅ Conversión completada con éxito."));
      } else {
        if (
          fs.existsSync(outputDir) &&
          fs.readdirSync(outputDir).length === 0
        ) {
          fs.rmdirSync(outputDir);
        }
        console.log(
          chalk.yellow("⚠️ No se encontraron archivos HTML para convertir.")
        );
      }
    })();
    line.close();
  } catch (error) {
    console.log(error);
    fs.rmSync(outputDir, { recursive: true, force: true });
    line.close();
  }
});
