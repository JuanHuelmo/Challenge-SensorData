"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var lists_1 = require("../core/lists");
var dom_1 = require("../core/dom");
/**
 * Image popover module
 *  mouse events that show/hide popover will be handled by Handle.js.
 *  Handle.js will receive the events and invoke 'imagePopover.update'.
 */
var ImagePopover = /** @class */ (function () {
    function ImagePopover(context) {
        var _this = this;
        this.context = context;
        this.ui = jquery_1["default"].summernote.ui;
        this.editable = context.layoutInfo.editable[0];
        this.options = context.options;
        this.events = {
            'summernote.disable summernote.blur': function () {
                _this.hide();
            }
        };
    }
    ImagePopover.prototype.shouldInitialize = function () {
        return !lists_1["default"].isEmpty(this.options.popover.image);
    };
    ImagePopover.prototype.initialize = function () {
        this.$popover = this.ui.popover({
            className: 'note-image-popover'
        }).render().appendTo(this.options.container);
        var $content = this.$popover.find('.popover-content,.note-popover-content');
        this.context.invoke('buttons.build', $content, this.options.popover.image);
        this.$popover.on('mousedown', function (e) { e.preventDefault(); });
    };
    ImagePopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    ImagePopover.prototype.update = function (target, event) {
        if (dom_1["default"].isImg(target)) {
            var position = jquery_1["default"](target).offset();
            var containerOffset = jquery_1["default"](this.options.container).offset();
            var pos = {};
            if (this.options.popatmouse) {
                pos.left = event.pageX - 20;
                pos.top = event.pageY;
            }
            else {
                pos = position;
            }
            pos.top -= containerOffset.top;
            pos.left -= containerOffset.left;
            this.$popover.css({
                display: 'block',
                left: pos.left,
                top: pos.top
            });
        }
        else {
            this.hide();
        }
    };
    ImagePopover.prototype.hide = function () {
        this.$popover.hide();
    };
    return ImagePopover;
}());
exports["default"] = ImagePopover;
//# sourceMappingURL=ImagePopover.js.map