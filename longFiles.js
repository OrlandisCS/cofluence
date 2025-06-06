import fs from "fs";
import path from "path";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 100 MB
const EXTENSIONES = [".zip", ".rar", ".gz"];

function eliminarArchivosGrandesYPorExtension(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      eliminarArchivosGrandesYPorExtension(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const stats = fs.statSync(fullPath);

      if (EXTENSIONES.includes(ext)) {
        console.log(`Eliminando por extensión: ${fullPath}`);
        fs.unlinkSync(fullPath);
      } else if (stats.size > MAX_SIZE_BYTES) {
        console.log(
          `Eliminando por tamaño (${(stats.size / 1024 / 1024).toFixed(
            2
          )} MB): ${fullPath}`
        );
        fs.unlinkSync(fullPath);
      }
    }
  });
}

// Ejecutar desde el directorio actual
const rootDir = process.cwd();
console.log(`Iniciando limpieza en: ${rootDir}`);
eliminarArchivosGrandesYPorExtension(rootDir);
console.log("✅ Limpieza completada.");
