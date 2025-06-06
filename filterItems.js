import fs from "fs";
import path from "path";
import TurndownService from "turndown";
import chalk from "chalk";
import ora from "ora";

import readline from "readline";
const dir = "./files";
const outputDir = "./Tecnologia";

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
function main() {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const item = items[1];
  const inputPath = path.join(dir, item.name);
  const relPath = path.join(outputDir, item.name);

  if (item.isFile() && path.extname(item.name).toLowerCase() === ".html") {
    const spinner = ora(`Convirtiendo ${chalk.cyan(relPath)}...`).start();

    try {
      const html = fs.readFileSync(inputPath, "utf8");
      const markdown = turndownService.turndown(html);

      console.log(chalk.red(markdown));
      spinner.succeed(`${chalk.green("✔")} ${chalk.cyan(relPath)} convertido`);
    } catch (error) {
      spinner.fail(`${chalk.red("✖")} Error en ${relPath}`);
      console.error(err);
    }
  }
}

main();
