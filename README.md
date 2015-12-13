[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A skeleton JavaScript project using a common toolset

## Features

-   [eslint](http://eslint.org/) is used to keep code clean
-   [tap](https://www.npmjs.com/package/tap) is used for testing and code coverage
-   [retire](https://blog.liftsecurity.io/2014/11/19/bower-components-with-known-vulnerabilities) is used to check for vulnerable modules
-   [documentation.js](http://documentation.js.org/) is used to generate documentation

## Usage

    git clone https://github.com/mapbox/jsskel.git
    mv jsskel <project name>
    cd <project name>
    npm init
    # Fill in the details
    git remote set-url origin <your project URL>

The following npm scripts are provided by package.json:

-   `npm run retire`: Check for vulnerable modules (run automatically as part of `npm test`)
-   `npm run lint`: Run linting (run automatically as part of `npm test`)
-   `npm run docs-page`: Generate documentation from JSDoc comments. You should check in the resulting output, which is set up assuming you'll be publishing to GitHub pages.
-   `npm run docs-readme`: Generate documentation from JSDoc comments, and inject them into the README (this file), replacing the `## API` section.

Feel free to adjust any of the defaults to taste after creating a new module.

## API

### index

Inject some markdown into some other markdown at a desired heading.  Heading
levels in the source markdown are adjusted to match the target document
based on the target heading's level.

**Parameters**

-   `targetHeadingText` **string** The heading to look for in the target ast
-   `targetAst` **object** The target markdown document, as an mdast
-   `toInjectAst` **object** The source markdown to be injected into the target.
