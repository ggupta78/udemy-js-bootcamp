#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, fileNames) => {
  if (err) {
    console.log(err);
  }

  const allStats = Array(fileNames.length).full(null);

  for (const filename of fileNames) {
    const index = fileNames.indexOf(filename);

    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }

      allStats[index] = stats;

      const ready = allStats.every((stats) => {
        return stats;
      });

      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(fileNames[index], stats.isFile());
        });
      }
    });
  }

  //console.log(fileNames);
});
