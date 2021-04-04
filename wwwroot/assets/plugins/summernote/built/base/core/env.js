"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var isSupportAmd = typeof define === 'function' && define.amd; // eslint-disable-line
/**
 * returns whether font is installed or not.
 *
 * @param {String} fontName
 * @return {Boolean}
 */
var genericFontFamilies = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];
function validFontName(fontName) {
    return (jquery_1["default"].inArray(fontName.toLowerCase(), genericFontFamilies) === -1) ? "'" + fontName + "'" : fontName;
}
function isFontInstalled(fontName) {
    var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
    var testText = 'mmmmmmmmmmwwwww';
    var testSize = '200px';
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = testSize + " '" + testFontName + "'";
    var originalWidth = context.measureText(testText).width;
    context.font = testSize + ' ' + validFontName(fontName) + ', "' + testFontName + '"';
    var width = context.measureText(testText).width;
    return originalWidth !== width;
}
var userAgent = navigator.userAgent;
var isMSIE = /MSIE|Trident/i.test(userAgent);
var browserVersion;
if (isMSIE) {
    var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
    if (matches) {
        browserVersion = parseFloat(matches[1]);
    }
    matches = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(userAgent);
    if (matches) {
        browserVersion = parseFloat(matches[1]);
    }
}
var isEdge = /Edge\/\d+/.test(userAgent);
var isSupportTouch = (('ontouchstart' in window) ||
    (navigator.MaxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
// [workaround] IE doesn't have input events for contentEditable
// - see: https://goo.gl/4bfIvA
var inputEventName = (isMSIE) ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
/**
 * @class core.env
 *
 * Object which check platform and agent
 *
 * @singleton
 * @alternateClassName env
 */
exports["default"] = {
    isMac: navigator.appVersion.indexOf('Mac') > -1,
    isMSIE: isMSIE,
    isEdge: isEdge,
    isFF: !isEdge && /firefox/i.test(userAgent),
    isPhantom: /PhantomJS/i.test(userAgent),
    isWebkit: !isEdge && /webkit/i.test(userAgent),
    isChrome: !isEdge && /chrome/i.test(userAgent),
    isSafari: !isEdge && /safari/i.test(userAgent) && (!/chrome/i.test(userAgent)),
    browserVersion: browserVersion,
    jqueryVersion: parseFloat(jquery_1["default"].fn.jquery),
    isSupportAmd: isSupportAmd,
    isSupportTouch: isSupportTouch,
    isFontInstalled: isFontInstalled,
    isW3CRangeSupport: !!document.createRange,
    inputEventName: inputEventName,
    genericFontFamilies: genericFontFamilies,
    validFontName: validFontName
};
//# sourceMappingURL=env.js.map