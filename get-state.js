const fs = require('fs');
const path = require('path');

// Directorios que deseamos omitir para mantener el reporte limpio
const ignoreDirs = ['node_modules', '.git', '.next', 'dist', 'build', '.supabaselogs'];

function walk(dir, prefix = '') {
  let results = '';
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file, index) => {
      if (ignoreDirs.includes(file)) return;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const isLast = index === list.length - 1;
      const marker = isLast ? '└── ' : '├── ';
      
      results += `${prefix}${marker}${file}\n`;
      
      if (stat.isDirectory()) {
        results += walk(filePath, prefix + (isLast ? '    ' : '│   '));
      }
    });
  } catch (err) {
    results += `${prefix}    [Error leyendo directorio]\n`;
  }
  return results;
}

console.log(`📁 Estructura del Proyecto: ${path.basename(process.cwd())}/\n`);
console.log(walk(process.cwd()));