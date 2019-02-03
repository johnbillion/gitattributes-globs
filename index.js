'use strict';

var fs = require('fs');
var gg = require('gitignore-globs');

// Prepare removes all lines that don't concern export-ignore.
function prepare(patterns) {
    return patterns.filter(function(pattern) {
        pattern = pattern.trim();
        if ( pattern.charAt(0) === '#' ) {
            return false;
        }
        return / export-ignore$/.test( pattern );
    });
}

// Map transforms export-ignore entries into plain file and directory names.
function map(patterns) {
    patterns = patterns.map(function(pattern) {
        return pattern.trim().replace( / export-ignore$/, '' ).trim();
    });

    return patterns;
}

// Parse a .gitattributes file and return its export-ignore entries as glob patterns in an array.
function parse(file, options) {
    var file = file || '.gitattributes';
    var options = options || {};
    options.negate = options.negate || false;

    var content = fs.readFileSync(file).toString();
    var patterns = content.split('\n');

    patterns = prepare(patterns);
    patterns = map(patterns);

    patterns = gg._prepare(patterns);
    var globs = gg._map(patterns);
    if (options.negate) {
        globs = gg._negate(globs);
    }

    return globs;
}

module.exports = parse;

module.exports._map = map;
module.exports._prepare = prepare;
