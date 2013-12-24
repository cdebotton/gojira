'use strict';

var exec = require('child_process').exec,
    sysPath = require('path'),
    fs = require('fs'),
    mode = process.argv[2],
    fsExistSync = fs.fsExistSync || sysPath.fsExistSync;

switch(mode) {
  case 'update':
    execute('curl https://codeload.github.com/cdebotton/whats-in-the-box/zip/master', '> master.zip', function() {
      execute('unzip', 'master.zip', function() {
        execute('rm', 'master.zip');
        execute('mv -f whats-in-the-box-master/*', './', function() {
          execute('rm -rf whats-in-the-box-master');
          execute('npm install', function() {
            execute('bower install');
          });
        });
      });
    });
    break;
}
