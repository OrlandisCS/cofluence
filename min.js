import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { createInterface } from "readline";
import TurndownService from "turndown";
import ora from "ora";
import chalk from "chalk";

const inputDir = "./carpeta-html";
const outputDir = "./salida-md";
const turndownService = new TurndownService();
const delay = 300;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function convertFile(inputPath, outputPath, relPath) {
  const spinner = ora(`Convirtiendo ${chalk.cyan(relPath)}...`).start();

  try {
    const rl = createInterface({
      input: fs.createReadStream(inputPath),
      crlfDelay: Infinity,
    });

    let html = "";
    for await (const line of rl) {
      html += line + "\n";
    }

    const markdown = turndownService.turndown(html);

    ensureDirExists(path.dirname(outputPath));
    fs.writeFileSync(outputPath, markdown);
    await sleep(delay);
    spinner.succeed(`${chalk.green("✔")} ${chalk.cyan(relPath)} convertido`);
    return true;
  } catch (err) {
    spinner.fail(`${chalk.red("✖")} Error en ${relPath}`);
    console.error(err);
    return false;
  }
}

async function convertHtmlToMd(dir, baseOutDir, relativeSubPath = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  let htmlFilesFound = false;

  for (const item of items) {
    const inputPath = path.join(dir, item.name);
    const relPath = path.join(relativeSubPath, item.name);
    const outputPath = path.join(baseOutDir, relPath).replace(/\.html$/, ".md");

    if (item.isDirectory()) {
      const sub = await convertHtmlToMd(inputPath, baseOutDir, relPath);
      if (sub) htmlFilesFound = true;
    } else if (item.isFile() && path.extname(item.name) === ".html") {
      const converted = await convertFile(inputPath, outputPath, relPath);
      if (converted) htmlFilesFound = true;
    }
  }

  return htmlFilesFound;
}

(async () => {
  console.log(
    chalk.bold.blue("🚀 Conversión de HTML a Markdown (bajo consumo)...\n")
  );

  if (!fs.existsSync(inputDir)) {
    console.error(chalk.red(`❌ Carpeta de entrada no existe: ${inputDir}`));
    return;
  }

  ensureDirExists(outputDir);
  const hasConverted = await convertHtmlToMd(inputDir, outputDir);

  if (!hasConverted) {
    if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).length === 0) {
      fs.rmdirSync(outputDir);
    }
    console.log(
      chalk.yellow("⚠️ No se encontraron archivos HTML para convertir.")
    );
  } else {
    console.log(chalk.bold.green("\n✅ Conversión finalizada."));
  }
})();
