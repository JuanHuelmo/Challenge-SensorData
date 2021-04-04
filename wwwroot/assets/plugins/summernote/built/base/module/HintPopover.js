"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var func_1 = require("../core/func");
var lists_1 = require("../core/lists");
var dom_1 = require("../core/dom");
var range_1 = require("../core/range");
var key_1 = require("../core/key");
var POPOVER_DIST = 5;
var HintPopover = /** @class */ (function () {
    function HintPopover(context) {
        var _this = this;
        this.context = context;
        this.ui = jquery_1["default"].summernote.ui;
        this.$editable = context.layoutInfo.editable;
        this.options = context.options;
        this.hint = this.options.hint || [];
        this.direction = this.options.hintDirection || 'bottom';
        this.hints = Array.isArray(this.hint) ? this.hint : [this.hint];
        this.events = {
            'summernote.keyup': function (we, e) {
                if (!e.isDefaultPrevented()) {
                    _this.handleKeyup(e);
                }
            },
            'summernote.keydown': function (we, e) {
                _this.handleKeydown(e);
            },
            'summernote.disable summernote.dialog.shown summernote.blur': function () {
                _this.hide();
            }
        };
    }
    HintPopover.prototype.shouldInitialize = function () {
        return this.hints.length > 0;
    };
    HintPopover.prototype.initialize = function () {
        var _this = this;
        this.lastWordRange = null;
        this.matchingWord = null;
        this.$popover = this.ui.popover({
            className: 'note-hint-popover',
            hideArrow: true,
            direction: ''
        }).render().appendTo(this.options.container);
        this.$popover.hide();
        this.$content = this.$popover.find('.popover-content,.note-popover-content');
        this.$content.on('click', '.note-hint-item', function (e) {
            _this.$content.find('.active').removeClass('active');
            jquery_1["default"](e.currentTarget).addClass('active');
            _this.replace();
        });
        this.$popover.on('mousedown', function (e) { e.preventDefault(); });
    };
    HintPopover.prototype.destroy = function () {
        this.$popover.remove();
    };
    HintPopover.prototype.selectItem = function ($item) {
        this.$content.find('.active').removeClass('active');
        $item.addClass('active');
        this.$content[0].scrollTop = $item[0].offsetTop - (this.$content.innerHeight() / 2);
    };
    HintPopover.prototype.moveDown = function () {
        var $current = this.$content.find('.note-hint-item.active');
        var $next = $current.next();
        if ($next.length) {
            this.selectItem($next);
        }
        else {
            var $nextGroup = $current.parent().next();
            if (!$nextGroup.length) {
                $nextGroup = this.$content.find('.note-hint-group').first();
            }
            this.selectItem($nextGroup.find('.note-hint-item').first());
        }
    };
    HintPopover.prototype.moveUp = function () {
        var $current = this.$content.find('.note-hint-item.active');
        var $prev = $current.prev();
        if ($prev.length) {
            this.selectItem($prev);
        }
        else {
            var $prevGroup = $current.parent().prev();
            if (!$prevGroup.length) {
                $prevGroup = this.$content.find('.note-hint-group').last();
            }
            this.selectItem($prevGroup.find('.note-hint-item').last());
        }
    };
    HintPopover.prototype.replace = function () {
        var $item = this.$content.find('.note-hint-item.active');
        if ($item.length) {
            var node = this.nodeFromItem($item);
            // If matchingWord length = 0 -> capture OK / open hint / but as mention capture "" (\w*)
            if (this.matchingWord !== null && this.matchingWord.length === 0) {
                this.lastWordRange.so = this.lastWordRange.eo;
                // Else si > 0 and normal case -> adjust range "before" for correct position of insertion
            }
            else if (this.matchingWord !== null && this.matchingWord.length > 0 && !this.lastWordRange.isCollapsed()) {
                var rangeCompute = this.lastWordRange.eo - this.lastWordRange.so - this.matchingWord.length;
                if (rangeCompute > 0) {
                    this.lastWordRange.so += rangeCompute;
                }
            }
            this.lastWordRange.insertNode(node);
            if (this.options.hintSelect === 'next') {
                var blank = document.createTextNode('');
                jquery_1["default"](node).after(blank);
                range_1["default"].createFromNodeBefore(blank).select();
            }
            else {
                range_1["default"].createFromNodeAfter(node).select();
            }
            this.lastWordRange = null;
            this.hide();
            this.context.invoke('editor.focus');
        }
    };
    HintPopover.prototype.nodeFromItem = function ($item) {
        var hint = this.hints[$item.data('index')];
        var item = $item.data('item');
        var node = hint.content ? hint.content(item) : item;
        if (typeof node === 'string') {
            node = dom_1["default"].createText(node);
        }
        return node;
    };
    HintPopover.prototype.createItemTemplates = function (hintIdx, items) {
        var hint = this.hints[hintIdx];
        return items.map(function (item /*, idx */) {
            var $item = jquery_1["default"]('<div class="note-hint-item"/>');
            $item.append(hint.template ? hint.template(item) : item + '');
            $item.data({
                'index': hintIdx,
                'item': item
            });
            return $item;
        });
    };
    HintPopover.prototype.handleKeydown = function (e) {
        if (!this.$popover.is(':visible')) {
            return;
        }
        if (e.keyCode === key_1["default"].code.ENTER) {
            e.preventDefault();
            this.replace();
        }
        else if (e.keyCode === key_1["default"].code.UP) {
            e.preventDefault();
            this.moveUp();
        }
        else if (e.keyCode === key_1["default"].code.DOWN) {
            e.preventDefault();
            this.moveDown();
        }
    };
    HintPopover.prototype.searchKeyword = function (index, keyword, callback) {
        var hint = this.hints[index];
        if (hint && hint.match.test(keyword) && hint.search) {
            var matches = hint.match.exec(keyword);
            this.matchingWord = matches[0];
            hint.search(matches[1], callback);
        }
        else {
            callback();
        }
    };
    HintPopover.prototype.createGroup = function (idx, keyword) {
        var _this = this;
        var $group = jquery_1["default"]('<div class="note-hint-group note-hint-group-' + idx + '"></div>');
        this.searchKeyword(idx, keyword, function (items) {
            items = items || [];
            if (items.length) {
                $group.html(_this.createItemTemplates(idx, items));
                _this.show();
            }
        });
        return $group;
    };
    HintPopover.prototype.handleKeyup = function (e) {
        var _this = this;
        if (!lists_1["default"].contains([key_1["default"].code.ENTER, key_1["default"].code.UP, key_1["default"].code.DOWN], e.keyCode)) {
            var range_2 = this.context.invoke('editor.getLastRange');
            var wordRange_1, keyword_1;
            if (this.options.hintMode === 'words') {
                wordRange_1 = range_2.getWordsRange(range_2);
                keyword_1 = wordRange_1.toString();
                this.hints.forEach(function (hint) {
                    if (hint.match.test(keyword_1)) {
                        wordRange_1 = range_2.getWordsMatchRange(hint.match);
                        return false;
                    }
                });
                if (!wordRange_1) {
                    this.hide();
                    return;
                }
                keyword_1 = wordRange_1.toString();
            }
            else {
                wordRange_1 = range_2.getWordRange();
                keyword_1 = wordRange_1.toString();
            }
            if (this.hints.length && keyword_1) {
                this.$content.empty();
                var bnd = func_1["default"].rect2bnd(lists_1["default"].last(wordRange_1.getClientRects()));
                var containerOffset = jquery_1["default"](this.options.container).offset();
                if (bnd) {
                    bnd.top -= containerOffset.top;
                    bnd.left -= containerOffset.left;
                    this.$popover.hide();
                    this.lastWordRange = wordRange_1;
                    this.hints.forEach(function (hint, idx) {
                        if (hint.match.test(keyword_1)) {
                            _this.createGroup(idx, keyword_1).appendTo(_this.$content);
                        }
                    });
                    // select first .note-hint-item
                    this.$content.find('.note-hint-item:first').addClass('active');
                    // set position for popover after group is created
                    if (this.direction === 'top') {
                        this.$popover.css({
                            left: bnd.left,
                            top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
                        });
                    }
                    else {
                        this.$popover.css({
                            left: bnd.left,
                            top: bnd.top + bnd.height + POPOVER_DIST
                        });
                    }
                }
            }
            else {
                this.hide();
            }
        }
    };
    HintPopover.prototype.show = function () {
        this.$popover.show();
    };
    HintPopover.prototype.hide = function () {
        this.$popover.hide();
    };
    return HintPopover;
}());
exports["default"] = HintPopover;
//# sourceMappingURL=HintPopover.js.map