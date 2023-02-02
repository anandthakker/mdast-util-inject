export = inject;
/**
 * Inject some markdown into some other markdown at a desired heading.  Heading
 * levels in the source markdown are adjusted to match the target document
 * based on the target heading's level.  targetAst is modified in place
 *
 * @param {string} targetHeadingText The heading to look for in the target ast
 * @param {object} targetAst The target markdown document, as an mdast
 * @param {object} toInjectAst The source markdown to be injected into the target, also as an mdast.
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
declare function inject(targetHeadingText: string, targetAst: object, toInjectAst: object): boolean;
