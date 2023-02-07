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
export default function inject(targetHeadingText: string, targetAst: Root, toInjectAst: Root, _matcher?: Matcher | undefined): boolean;
export function defaultMatcher(headerText: string, searchedText: string): boolean;
export function includesMatcher(headerText: string, searchedText: string): boolean;
export function startsWithMatcher(headerText: string, searchedText: string): boolean;
/**
 * (headerText, searchedText) => boolean. Defines string equality for matching the first header that satisfies this function
 */
export type Matcher = (headerText: string, searchedText: string) => boolean;
/**
 *
 * /**
 */
export type Root = import('mdast').Root;
