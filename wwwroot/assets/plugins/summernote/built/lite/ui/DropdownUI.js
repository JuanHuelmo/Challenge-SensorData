"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var DropdownUI = /** @class */ (function () {
    function DropdownUI($node, options) {
        this.$button = $node;
        this.options = jquery_1["default"].extend({}, {
            target: options.container
        }, options);
        this.setEvent();
    }
    DropdownUI.prototype.setEvent = function () {
        var _this = this;
        this.$button.on('click', function (e) {
            _this.toggle();
            e.stopImmediatePropagation();
        });
    };
    DropdownUI.prototype.clear = function () {
        var $parent = jquery_1["default"]('.note-btn-group.open');
        $parent.find('.note-btn.active').removeClass('active');
        $parent.removeClass('open');
    };
    DropdownUI.prototype.show = function () {
        this.$button.addClass('active');
        this.$button.parent().addClass('open');
        var $dropdown = this.$button.next();
        var offset = $dropdown.offset();
        var width = $dropdown.outerWidth();
        var windowWidth = jquery_1["default"](window).width();
        var targetMarginRight = parseFloat(jquery_1["default"](this.options.target).css('margin-right'));
        if (offset.left + width > windowWidth - targetMarginRight) {
            $dropdown.css('margin-left', windowWidth - targetMarginRight - (offset.left + width));
        }
        else {
            $dropdown.css('margin-left', '');
        }
    };
    DropdownUI.prototype.hide = function () {
        this.$button.removeClass('active');
        this.$button.parent().removeClass('open');
    };
    DropdownUI.prototype.toggle = function () {
        var isOpened = this.$button.parent().hasClass('open');
        this.clear();
        if (isOpened) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    return DropdownUI;
}());
jquery_1["default"](document).on('click', function (e) {
    if (!jquery_1["default"](e.target).closest('.note-btn-group').length) {
        jquery_1["default"]('.note-btn-group.open').removeClass('open');
        jquery_1["default"]('.note-btn-group .note-btn.active').removeClass('active');
    }
});
jquery_1["default"](document).on('click.note-dropdown-menu', function (e) {
    jquery_1["default"](e.target).closest('.note-dropdown-menu').parent().removeClass('open');
    jquery_1["default"](e.target).closest('.note-dropdown-menu').parent().find('.note-btn.active').removeClass('active');
});
exports["default"] = DropdownUI;
//# sourceMappingURL=DropdownUI.js.map