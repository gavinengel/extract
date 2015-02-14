#!/usr/bin/env node
"use strict";

// THE SETUP "Character Introduction"
var program = require("commander");
var pkg = require("./package.json");
var ƒ = require("./functions");


// THE CONFRONTATION "Hustle"
program.version(pkg.version).description(pkg.description).usage("<path/file_name>.<zip|rar|bz2|gz|tar|tbz2|tgz|Z|7z|xz|ex|tar.bz2|tar.gz|tar.xz>").option("-f, --force", "allow existing extracted files to be clobbered").parse(process.argv);


// THE RESOLUTION "Flow"
if (program.args.length) {
  for (var i in program.args) {
    ƒ.extract(program.args[i], program.force);
  }
} else {
  program.help();
}
