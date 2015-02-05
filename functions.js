//  ƒ.js means misc functions that you don't want to stuff into index.js
var sys = require('sys')
var exec = require('child_process').exec
var fs = require('fs');


module.exports = {
  /**
   * 
   */ 
  extract: function (filename) {
    console.log('extract: '+filename+"\n")

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
      target = './"' + filename + '"';
    
      if (this.hasExtension(filename, key)) {            
        if (!this.exists(filename, key)) {
          exec(exts[key] + ' ' + target, this.puts)
        }
      }
    }
  },

  /**
   *
   */ 
  hasExtension: function (filename, ext) {
    var result = false

    // take the same size thing from the end of filename..
    var size = ext.length * -1
    var filenameExt = filename.substr(size)

    // compare the two ends
    if (ext === filenameExt) {
      result = true
    }

    return result
  },

  /**
   *
   */
  exists: function (target, ext) {
    var result = false

    var cutSize = target.length - ext.length
    var extractedTarget = target.substring(0, cutSize)
    if (fs.existsSync(extractedTarget)) {
      result = true
      console.log('ERROR: Extracted file already exists: ' + extractedTarget )
    }

    return result
  }, 

  /**
   *
   */ 
  puts: function(error, stdout, stderr) { sys.puts(stdout) }
}

