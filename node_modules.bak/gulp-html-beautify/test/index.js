var beautify = require('../');
var should = require('should');
var gutil = require('gulp-util');
require('mocha');

describe('gulp-html-beautify', function() {
  describe('beautify()', function() {
    it('should beautify and compare two html files', function(done) {
      var stream = beautify({
        indent_size: 2
      });
      var fakeFile = new gutil.File({
        path: '/tmp/gulp-html-beautify/file.js',
        base: '/tmp/gulp-html-beautify/',
        cwd: '/tmp/',
        contents: new Buffer('<!DOCTYPE html><html><head><title></title></head><body></body></html>')
      });

      var expected = "<!DOCTYPE html>\n<html>\n\n<head>\n  <title></title>\n</head>\n\n<body></body>\n\n</html>";
      stream.on('error', done);
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        newFile.path.should.equal('/tmp/gulp-html-beautify/file.js');
        newFile.relative.should.equal('file.js');
        String(newFile.contents).should.equal(expected);
        done();
      });
      stream.write(fakeFile);
    });
  });
});
