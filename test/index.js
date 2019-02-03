var multimatch = require('multimatch');
var expect = require('chai').expect;

var parse = require('../index');

describe('Prepare', function() {
    it('should ignore unrelated lines', function() {
        var result = parse._prepare(['foo', '', 'bar export-ignore']);

        expect(result).to.eql(['bar export-ignore']);
    });

    it('should ignore comments', function() {
        var result = parse._prepare(['# foo export-ignore', 'bar export-ignore']);

        expect(result).to.eql(['bar export-ignore']);
    });
});
