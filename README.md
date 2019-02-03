# gitattributes-globs

Parse the export-ignore entries in a `.gitattributes` file into an array of glob patterns.

Makes use of [gitignore-globs](https://www.npmjs.com/package/gitignore-globs) by Bernhard Wanger.

## Usage

.gitattributes:

    node_modules export-ignore
    package.json export-ignore

index.js:

    var parse = require('gitattributes-globs');

    var globs = parse('.gitattributes');

    console.log(globs);
    // Result: ['node_modules', '**/node_modules/**', 'package.json']

## API

### parse([filepath<string>], [options<array>])

* filepath (string; default: `process.cwd() + '.gitattributes'`) - Path to your `.gitattributes`.
* options (array) - Options see below.

#### Options:

    {
        negate: false
    }

* negate (bool; default: false) - Option to negated patterns. Example: `package.json` => `!package.json`

## Rules

This package utilises [gitignore-globs](https://www.npmjs.com/package/gitignore-globs). Read that package's readme for information about glob pattern rules.

## Test

    npm test

## License

MIT © John Blackbourn, [Sevenweb](https://sevenweb.com)
