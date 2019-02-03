var multimatch = require('multimatch');
var expect = require('chai').expect;

var parse = require('../index');

describe('Prepare', function() {
    it('should ignore blank lines', function() {
        var result = parse._prepare(['foo', '', 'bar']);

        expect(result).to.eql(['foo', 'bar']);
    });

    it('should ignore comments', function() {
        var result = parse._prepare(['foo', '# Comment', 'bar']);

        expect(result).to.eql(result, ['foo', 'bar']);
    });
});

describe('Globs', function() {
    it('should match root', function() {
        var files = ['/foo', '/foo/', 'bar', 'bar/foo', 'bar/foo/baz'];
        var patterns = ['/foo'];

        var globs = parse._map(patterns);
        var result = multimatch(files, globs);

        expect(result).to.eql(['/foo', '/foo/']);
    });

    it('should match sub', function() {
        var files = ['/foo', '/foo/', 'bar', 'bar/foo', 'bar/foo/baz'];
        var patterns = ['foo'];

        var globs = parse._map(patterns);
        var result = multimatch(files, globs);

        expect(result).to.eql(['/foo', '/foo/', 'bar/foo', 'bar/foo/baz']);
    });

    it('should match dir', function() {
        var files = ['/foo', '/foo/', 'bar', 'bar/foo', 'bar/foo/baz'];
        var patterns = ['foo/'];

        var globs = parse._map(patterns);
        var result = multimatch(files, globs);

        expect(result).to.eql(['/foo/', 'bar/foo/baz']);
    });

    it('should match glob pattern', function() {
        var files = ['bar', 'foo/', 'foo/bar', 'foo/bar/baz'];
        var patterns = ['foo/*'];

        var globs = parse._map(patterns);
        var result = multimatch(files, globs);

        expect(result).to.eql(['foo/bar', 'foo/', 'foo/bar/baz']);
    });
});
