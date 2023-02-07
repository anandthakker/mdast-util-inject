'use strict'

import { toString } from 'mdast-util-to-string'

/**
 * 
 * @param {any[]} array 
 * @param {(arg0: any, arg1?: any) => boolean} fn 
 * @returns 
 */
function findIndex (array, fn) {
  for (var i = 0; i < array.length; i++) {
    if (fn(array[i], i)) {
      return i
    }
  }
  return -1
}

/**

/**
 * @typedef {(headerText: string, searchedText: string) => boolean} Matcher (headerText, searchedText) => boolean. Defines string equality for matching the first header that satisfies this function
 * @typedef {import('mdast').Root} Root
 */

/**
 * Inject some markdown into some other markdown at a desired heading.  Heading
 * levels in the source markdown are adjusted to match the target document
 * based on the target heading's level.  targetAst is modified in place
 *
 * @param {string} targetHeadingText The heading to look for in the target ast
 * @param {Root} targetAst The target markdown document, as an mdast
 * @param {Root} toInjectAst The source markdown to be injected into the target, also as an mdast.
 * @param {Matcher=} _matcher function that determines what header text strings are equal (ex. includes, ===, startsWith, ecc...)
 * @return {boolean} whether the specified section was found and content inserted
 * @example
 * var mdast = require('mdast')
 * var inject = require('mdast-util-inject')
 *
 * var target = mdast.parse('# A document\n## Section1\nBlah\n## Section2\nBlargh')
 * var newStuff = mdast.parse('# Some other document\nwith some content')
 * inject('Section1', target, newStuff)
 *
 * console.log(mdast.stringify(target))
 * // outputs:
 * // # A document
 * //
 * // ## Section1
 * //
 * // ### Some other document
 * //
 * // with some content
 * //
 * // ## Section2
 * //
 * // Blargh
 */
export default function inject(targetHeadingText, targetAst, toInjectAst, _matcher) {
  let matcher = (_matcher || defaultMatcher)
  // find the heading after which to inject the new content
  var head = findIndex(targetAst.children, function (node) {
    return isHeading(matcher, node, targetHeadingText)
  })
  var heading = targetAst.children[head];

  if (head === -1 || heading.type !== 'heading') {
    return false
  }

  // find the next heading at the same heading level, which is where we'll
  // STOP inserting
  var depth = heading.depth
  var nextHead = findIndex(targetAst.children, function (node, i) {
    return isHeading(matcher, node, '', depth) && i > head
  })

  // bump heading levels so they fall within the parent documents' heirarchy
  bumpHeadings(toInjectAst, depth)

  // insert content
  targetAst.children.splice((nextHead >= 0 ? nextHead : targetAst.children.length), 0, ...toInjectAst.children)

  return true
}

/** @type {Matcher} */
export function defaultMatcher(headerText, searchedText) {
  return headerText===searchedText;
}

/** @type {Matcher} */
export function includesMatcher(headerText, searchedText) {
  return headerText.includes(searchedText);
}

/** @type {Matcher} */
export function startsWithMatcher(headerText, searchedText) {
  return headerText.startsWith(searchedText);
}

/**
 * Test if the given node is a heading, optionally with the given text,
 * or <= the given depth
 * @param {Matcher} matcher 
 * @param {import('mdast').Content} node 
 * @param {string} text 
 * @param {number=} depth 
 * @returns 
 */
function isHeading(matcher, node, text, depth) {
  if (node.type !== 'heading') {
    return false
  }

  if (text) {
    var headingText = toString(node)
    return matcher(headingText.trim().toLowerCase(), text.trim().toLowerCase())
  }

  if (depth) {
    return node.depth <= depth
  }

  return true
}

var MAX_HEADING_DEPTH = 99999

/**
 * @param {Root} root 
 * @param {number} baseDepth 
 */
function bumpHeadings (root, baseDepth) {
  var headings = /** @type {import('mdast').Heading[]} */ ([])
  
  walk(root, function (node) {
    if (node.type === 'heading') {
      headings.push(node)
    }
  })

  var minDepth = headings.reduce(function (memo, h) {
    return Math.min(memo, h.depth)
  }, MAX_HEADING_DEPTH)

  var diff = baseDepth + 1 - minDepth

  headings.forEach(function (h) {
    h.depth += diff
  })
}

/**
 * @param {import('mdast').Parent} node 
 * @param {(arg0: any) => void} fn 
 */
function walk (node, fn) {
  fn(node)
  if (node.children) {
    node.children.forEach(function (n) {
      walk(/** @type {import('mdast').Parent} */ (n), fn)
    })
  }
}
