"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var lists_1 = require("../core/lists");
var AIRMODE_POPOVER_X_OFFSET = -5;
var AIRMODE_POPOVER_Y_OFFSET = 5;
var AirPopover = /** @class */ (function () {
    function AirPopover(context) {
        var _this = this;
        this.context = context;
        this.ui = jquery_1["default"].summernote.ui;
        this.options = context.options;
        this.hidable = true;
        this.onContextmenu = false;
        this.pageX = null;
        this.pageY = null;
        this.events = {
            'summernote.contextmenu': function (e) {
                if (_this.options.editing) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this.onContextmenu = true;
                    _this.update(true);
                }
            },
            'summernote.mousedown': function (we, e) {
                _this.pageX = e.pageX;
                _this.pageY = e.pageY;
            },
            'summernote.keyup summernote.mouseup summernote.scroll': function (we, e) {
                if (_this.options.editing && !_this.onContextmenu) {
                    _this.pageX = e.pageX;
                    _this.pageY = e.pageY;
                    _this.update();
                }
                _this.onContextmenu = false;
            },
            'summernote.disable summernote.change summernote.dialog.shown summernote.blur': function () {
                _this.hide();
            },
            'summernote.focusout': function () {
                if (!_this.$popover.is(':active,:focus')) {
                    _this.hide();
                }
            }
        };
    }
    AirPopover.prototype.shouldInitialize = function () {
        return this.options.airMode && !lists_1["default"].isEmpty(this.options.popover.air);
    };
    AirPopover.prototype.initialize = function () {
        var _this = this;
        this.$popover = this.ui.popover({
            className: 'note-air-popover'
        }).render().appendTo(this.options.container);
        var $content = this.$popover.find('.popover-content');
        this.context.invoke('buttons.build', $content, this.options.popover.air);
        // disable hiding this popover preemptively by 'summernote.blur' event.
        this.$popover.on('mousedown', function () { _this.hidable = false; });
        // (re-)enable hiding after 'summernote.blur' has been handled (aka. ignored).
        this.$popover.on('mouseup', function () { _this.hidable = true; });
    };
    AirPopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    AirPopover.prototype.update = function (forcelyOpen) {
        var styleInfo = this.context.invoke('editor.currentStyle');
        if (styleInfo.range && (!styleInfo.range.isCollapsed() || forcelyOpen)) {
            var rect = {
                left: this.pageX,
                top: this.pageY
            };
            var containerOffset = jquery_1["default"](this.options.container).offset();
            rect.top -= containerOffset.top;
            rect.left -= containerOffset.left;
            this.$popover.css({
                display: 'block',
                left: Math.max(rect.left, 0) + AIRMODE_POPOVER_X_OFFSET,
                top: rect.top + AIRMODE_POPOVER_Y_OFFSET
            });
            this.context.invoke('buttons.updateCurrentStyle', this.$popover);
        }
        else {
            this.hide();
        }
    };
    AirPopover.prototype.updateCodeview = function (isCodeview) {
        this.ui.toggleBtnActive(this.$popover.find('.btn-codeview'), isCodeview);
        if (isCodeview) {
            this.hide();
        }
    };
    AirPopover.prototype.hide = function () {
        if (this.hidable) {
            this.$popover.hide();
        }
    };
    return AirPopover;
}());
exports["default"] = AirPopover;
//# sourceMappingURL=AirPopover.js.map