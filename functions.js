//  ƒ.js means misc functions that you don't want to stuff into index.js
var sys = require('sys')
var exec = require('child_process').exec

module.exports = {
  extract: function (target) {
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
	   if (this.hasExtension(target, key)) {
	     exec(exts[key] + ' ./"' + target + '"', this.puts)
	   }
    }
  },
  hasExtension: function (target, ext) {
    var result = false

    // take the same size thing from the end of target..
    var size = ext.length * -1
    var targetExt = target.substr(size)

    // compare the two ends
    if (ext === targetExt) {
      result = true
    }

    return result
  },
  puts: function(error, stdout, stderr) { sys.puts(stdout) }
}

