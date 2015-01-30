#!/usr/bin/env node

// The Setup: "Character Introduction"
var program = require('commander');
var pkg = require('./package.json');
var ƒ = require('./functions');


// The Confrontation: "Hustle"
program
  .version(pkg.version)
  .description(pkg.description)
  .usage('<path/file_name>.<zip|rar|bz2|gz|tar|tbz2|tgz|Z|7z|xz|ex|tar.bz2|tar.gz|tar.xz>')
  .parse(process.argv);

// The Resolution: "Flow"
if (program.args.length) {
  for (var i in program.args) { 
    ƒ.extract(program.args[i])
  }  
}
else {
  program.help()
}


