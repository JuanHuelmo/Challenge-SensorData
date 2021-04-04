"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var TooltipUI = /** @class */ (function () {
    function TooltipUI($node, options) {
        this.$node = $node;
        this.options = jquery_1["default"].extend({}, {
            title: '',
            target: options.container,
            trigger: 'hover focus',
            placement: 'bottom'
        }, options);
        // create tooltip node
        this.$tooltip = jquery_1["default"]([
            '<div class="note-tooltip">',
            '<div class="note-tooltip-arrow"></div>',
            '<div class="note-tooltip-content"></div>',
            '</div>',
        ].join(''));
        // define event
        if (this.options.trigger !== 'manual') {
            var showCallback_1 = this.show.bind(this);
            var hideCallback_1 = this.hide.bind(this);
            var toggleCallback_1 = this.toggle.bind(this);
            this.options.trigger.split(' ').forEach(function (eventName) {
                if (eventName === 'hover') {
                    $node.off('mouseenter mouseleave');
                    $node.on('mouseenter', showCallback_1).on('mouseleave', hideCallback_1);
                }
                else if (eventName === 'click') {
                    $node.on('click', toggleCallback_1);
                }
                else if (eventName === 'focus') {
                    $node.on('focus', showCallback_1).on('blur', hideCallback_1);
                }
            });
        }
    }
    TooltipUI.prototype.show = function () {
        var $node = this.$node;
        var offset = $node.offset();
        var targetOffset = jquery_1["default"](this.options.target).offset();
        offset.top -= targetOffset.top;
        offset.left -= targetOffset.left;
        var $tooltip = this.$tooltip;
        var title = this.options.title || $node.attr('title') || $node.data('title');
        var placement = this.options.placement || $node.data('placement');
        $tooltip.addClass(placement);
        $tooltip.find('.note-tooltip-content').text(title);
        $tooltip.appendTo(this.options.target);
        var nodeWidth = $node.outerWidth();
        var nodeHeight = $node.outerHeight();
        var tooltipWidth = $tooltip.outerWidth();
        var tooltipHeight = $tooltip.outerHeight();
        if (placement === 'bottom') {
            $tooltip.css({
                top: offset.top + nodeHeight,
                left: offset.left + (nodeWidth / 2 - tooltipWidth / 2)
            });
        }
        else if (placement === 'top') {
            $tooltip.css({
                top: offset.top - tooltipHeight,
                left: offset.left + (nodeWidth / 2 - tooltipWidth / 2)
            });
        }
        else if (placement === 'left') {
            $tooltip.css({
                top: offset.top + (nodeHeight / 2 - tooltipHeight / 2),
                left: offset.left - tooltipWidth
            });
        }
        else if (placement === 'right') {
            $tooltip.css({
                top: offset.top + (nodeHeight / 2 - tooltipHeight / 2),
                left: offset.left + nodeWidth
            });
        }
        $tooltip.addClass('in');
    };
    TooltipUI.prototype.hide = function () {
        var _this = this;
        this.$tooltip.removeClass('in');
        setTimeout(function () {
            _this.$tooltip.remove();
        }, 200);
    };
    TooltipUI.prototype.toggle = function () {
        if (this.$tooltip.hasClass('in')) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    return TooltipUI;
}());
exports["default"] = TooltipUI;
//# sourceMappingURL=TooltipUI.js.map