var sys = require('sys')
var exec = require('child_process').exec
var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

export function extract (filename, force) {
  var targetDir = path.dirname(filename) + path.sep;
  var targetName = path.basename(filename)
  var target = targetDir + path.basename(filename)


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
  


  for(let key in exts) {
    if (key === path.extname(target)) {            
      if (!this.exists(filename, key, force)) {
        var cmd = 'cd ' + targetDir + ';' + exts[key] + ' ' + targetName + '; cd -;'
        console.log(chalk.green(cmd))
        exec(cmd, this.puts)
      }
    }
  }
}

export function exists (target, ext, force) {
  var result = false

  var cutSize = target.length - ext.length
  var extractedTarget = './' + target.substring(0, cutSize)
  console.log(chalk.green('checking if exists:' + extractedTarget))
  if (fs.existsSync(extractedTarget)) {
    console.log(chalk.red('file exists.'))
    if (force) {
      exec('rm -f ' + extractedTarget)
      console.log(chalk.green('removed existing'))
    }
    else {
      result = true
      console.log(chalk.red('Extracted file already exists: ' + extractedTarget ))
    }
  }

  return result
} 

export function puts (error, stdout, stderr) { sys.puts(stdout) }


