"use strict";
exports.__esModule = true;
var lists_1 = require("../core/lists");
var Clipboard = /** @class */ (function () {
    function Clipboard(context) {
        this.context = context;
        this.$editable = context.layoutInfo.editable;
    }
    Clipboard.prototype.initialize = function () {
        this.$editable.on('paste', this.pasteByEvent.bind(this));
    };
    /**
     * paste by clipboard event
     *
     * @param {Event} event
     */
    Clipboard.prototype.pasteByEvent = function (event) {
        var _this = this;
        var clipboardData = event.originalEvent.clipboardData;
        if (clipboardData && clipboardData.items && clipboardData.items.length) {
            var item = clipboardData.items.length > 1 ? clipboardData.items[1] : lists_1["default"].head(clipboardData.items);
            if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                // paste img file
                this.context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);
                event.preventDefault();
            }
            else if (item.kind === 'string') {
                // paste text with maxTextLength check
                if (this.context.invoke('editor.isLimited', clipboardData.getData('Text').length)) {
                    event.preventDefault();
                }
            }
        }
        else if (window.clipboardData) {
            // for IE
            var text = window.clipboardData.getData('text');
            if (this.context.invoke('editor.isLimited', text.length)) {
                event.preventDefault();
            }
        }
        // Call editor.afterCommand after proceeding default event handler
        setTimeout(function () {
            _this.context.invoke('editor.afterCommand');
        }, 10);
    };
    return Clipboard;
}());
exports["default"] = Clipboard;
//# sourceMappingURL=Clipboard.js.map