"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var ModalUI = /** @class */ (function () {
    function ModalUI($node /*, options */) {
        this.$modal = $node;
        this.$backdrop = jquery_1["default"]('<div class="note-modal-backdrop"/>');
    }
    ModalUI.prototype.show = function () {
        var _this = this;
        this.$backdrop.appendTo(document.body).show();
        this.$modal.addClass('open').show();
        this.$modal.trigger('note.modal.show');
        this.$modal.off('click', '.close').on('click', '.close', this.hide.bind(this));
        this.$modal.on('keydown', function (event) {
            if (event.which === 27) {
                event.preventDefault();
                _this.hide();
            }
        });
    };
    ModalUI.prototype.hide = function () {
        this.$modal.removeClass('open').hide();
        this.$backdrop.hide();
        this.$modal.trigger('note.modal.hide');
        this.$modal.off('keydown');
    };
    return ModalUI;
}());
exports["default"] = ModalUI;
//# sourceMappingURL=ModalUI.js.map