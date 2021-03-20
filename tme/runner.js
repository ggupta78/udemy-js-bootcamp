const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const forbiddenDirs = ['node_modules'];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (const file of this.testFiles) {
      console.log(chalk.blueBright(`----Running file: ${file.shortName}`));
      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          fn();
          console.log(chalk.green(`\tTest passed - ${desc}`));
        } catch (error) {
          const message = error.message.replace(/\n/g, '\n\t\t');
          console.log(chalk.red(`\tTest failed - ${desc}`));
          console.log('\t', message);
        }
      };
      try {
        require(file.name);
      } catch (error) {
        console.log(chalk.red(`Test file loading error - ${file.name}`));
        console.log('\t', error);
      }
    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (const file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filepath);

        files.push(...childFiles.map((f) => path.join(file, f)));
        //console.log(files);
      }
    }
  }
}

module.exports = Runner;
