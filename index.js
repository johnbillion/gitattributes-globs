'use strict';

var fs = require('fs');

// Prepare removes blank lines and comments.
function prepare(patterns) {
    return patterns.filter(function(pattern) {
        pattern = pattern.trim();
        return pattern.charAt(0) !== '#' && pattern !== '';
    });
}

// Map transforms .gitignore patterns into globs.
function map(patterns) {
    // Account for files and directories.
    patterns = patterns.map(function(pattern) {
        if (!isFile(pattern)) {
            var suffix = (pattern.slice(-1) == '*') ? '*' : '/**';
            if (pattern.slice(-1) === '/') {
              pattern = [pattern + suffix];
            } else {
              // Create pair of globs.
                pattern = [pattern, pattern + suffix];
            }
        }
        return pattern;
    });

    // Flatten previously created glob pairs.
    // TODO: Find a combined solution.
    patterns = Array.prototype.concat.apply([], patterns);

    // Account for subdirectories.
    patterns = patterns.map(function(pattern) {
        if (!isFile(pattern)) {
            if (pattern.charAt(0) !== '/') {
                return '**/' + pattern;
            }
        }
        return pattern;
    });

    return patterns;
}

// Parse a .gitignore file and return its glob patterns as an array.
function parse(file, options) {
    var file = file || '.gitignore';
    var options = options || {};
    options.negate = options.negate || false;

    var content = fs.readFileSync(file).toString();
    var patterns = content.split('\n');

    patterns = prepare(patterns);
    var globs = map(patterns);
    if (options.negate) {
        globs = negate(globs);
    }

    return globs;
}

module.exports = parse;

module.exports._map = map;
module.exports._prepare = prepare;
