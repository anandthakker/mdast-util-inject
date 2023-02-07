[![Circle CI](https://circleci.com/gh/anandthakker/mdast-util-inject.svg?style=svg)](https://circleci.com/gh/anandthakker/mdast-util-inject)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

An [mdast](https://github.com/wooorm/mdast) utility to inject some markdown
into some other markdown, keeping heading structure intact.

## Install

    npm install mdast-util-inject

## Usage

### inject

Inject some markdown into some other markdown at a desired heading.  Heading
levels in the source markdown are adjusted to match the target document
based on the target heading's level.  targetAst is modified in place

**Parameters**

-   `targetHeadingText` **string** The heading to look for in the target ast
-   `targetAst` **object** The target markdown document, as an mdast
-   `toInjectAst` **object** The source markdown to be injected into the target, also as an mdast.
-   `_matcher` A function that determines equality between the searched string and the headers present in the tree. If omitted it defaults to strict equality (===)

**Examples**

```javascript
var mdast = require('mdast')
var inject = require('mdast-util-inject')

var target = mdast.parse('# A document\n## Section1\nBlah\n## Section2\nBlargh')
var newStuff = mdast.parse('# Some other document\nwith some content')
inject('Section1', target, newStuff)

console.log(mdast.stringify(target))
// outputs:
// # A document
//
// ## Section1
//
// ### Some other document
//
// with some content
//
// ## Section2
//
// Blargh
```

Returns **boolean** whether the specified section was found and content inserted

**Matchers**

There are 3 default matchers available as named exports of the package:

- `defaultMatcher`: strict equality ===
- `includesMatcher`: headerText.includes(searchedText)
- `startsWithMatcher`: headerText.startsWith(searchedText)
    
You can pass a custom function as the matcher function, for example you could 
define a function to match a header based on a regular expression.

```javascript
function regExpMatcher(headerString, searchedString) {
    let regExp = new RegExp(searchedString)
    return regExp.test(headerString)
}

var target = mdast.parse('# A document\n## Section1\nBlah\n## Section2\nBlargh')
var newStuff = mdast.parse('# Some other document\nwith some content')
inject('[a-z A-Z]*[2-9]', target, newStuff, regExpMatcher)
```

This will inject into the first header that satisfies the matcher function, in this case 'Section2' is the first one.

**Note that all strings are trimmed and lowercased before being passed to the matcher**
