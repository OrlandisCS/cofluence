import path, { resolve } from "path";
import fs from "fs";
import readline from "readline";
import chalk from "chalk";
import ora from "ora";
import TurndownService from "turndown";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const turndownService = new TurndownService();

const oneQuest = () => {
  return new Promise((resolve, reject) => {
    return line.question(
      chalk.cyan("Ingresa el departamento para generar README.MD: \n >"),
      (quest) => {
        resolve(quest);
      }
    );
  });
};

async function main() {
  try {
    const inputDir = await oneQuest();
    if (!fs.existsSync(inputDir)) {
      console.error(
        chalk.red(`❌ La carpeta de entrada no existe: ${inputDir}`)
      );
      line.close();
      return;
    }
    const spinner = ora(`${chalk.green("Inciando conversión")}...`).start();
    const items = fs.readdirSync(inputDir, { withFileTypes: true });
    let readmeContent = "# Índice de contenido\n\n";

    items.map((item, index) => {
      if (item.isDirectory()) {
        const inputPath = path.join(inputDir, item.name);
        readmeContent += `${index}: [${item.name}](./${inputPath})\n`;
        readmeContent += "\n";
      }
    });
    await sleep(500);
    const outputPath = path.join("./", "README.md");
    fs.writeFileSync(outputPath, readmeContent, "utf8");

    spinner.succeed(chalk.green("📘 README.md generado correctamente"));
  } catch (error) {
    console.log(error);
    line.close();
  }
}

main();
