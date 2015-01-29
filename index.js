#!/usr/bin/env node
 
var program = require('commander');
var pkg = require('./package.json');
var sys = require('sys')
var exec = require('child_process').exec;


program
  .version(pkg.version)
  .description(pkg.description)
  .usage('<path/file_name>.<zip|rar|bz2|gz|tar|tbz2|tgz|Z|7z|xz|ex|tar.bz2|tar.gz|tar.xz>')

  //.option('-p, --peppers', 'Add peppers')
  //.option('-P, --pineapple', 'Add pineapple')
  //.option('-b, --bbq', 'Add bbq sauce')
  //.option(
  //  '-c, --cheese [type]', 
  //  'Add the specified type of cheese [marble]', 'marble'
  //)
  .parse(process.argv);
/* 
console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
*/
if(!program.args.length) {
    program.help()
    exit
}

program.args.forEach(_extract)

function _extract(target) {
  console.log('extract: '+target+"\n")

  var exts = {
    '.tar.bz2': 'tar xvjf',
    '.tar.gz': 'tar xvzf',
    '.tar.xz': 'tar xvJf',
    '.lzma': 'unlzma',
    '.bz2': 'bunzip2',
    '.rar': 'unrar x -ad',
    '.gz': 'gunzip',
    '.tar': 'tar xvf',
    '.tbz2': 'tar xvjf',
    '.tgz': 'tar xvzf',
    '.zip': 'unzip',
    '.Z': 'uncompress',
    '.7z': '7z x',
    '.xz': 'unxz',
    '.exe': 'cabextract'
  }

  for(key in exts) {
    if (_hasExtension(target, key)) {
      exec(exts[key]+' ./"'+target+'"', _puts)
    }
  }
}


function _puts(error, stdout, stderr) { sys.puts(stdout) }

function _hasExtension(target, ext) {
  var result = false

  // take the same size thing from the end of target..
  var size = ext.length * -1
  var targetExt = target.substr(size)

  // compare the two ends
  if (ext === targetExt) {
    result = true
  }

  return result;
}
