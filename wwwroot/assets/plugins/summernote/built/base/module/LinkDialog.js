"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var env_1 = require("../core/env");
var key_1 = require("../core/key");
var func_1 = require("../core/func");
var LinkDialog = /** @class */ (function () {
    function LinkDialog(context) {
        this.context = context;
        this.ui = jquery_1["default"].summernote.ui;
        this.$body = jquery_1["default"](document.body);
        this.$editor = context.layoutInfo.editor;
        this.options = context.options;
        this.lang = this.options.langInfo;
        context.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
    }
    LinkDialog.prototype.initialize = function () {
        var $container = this.options.dialogsInBody ? this.$body : this.options.container;
        var body = [
            '<div class="form-group note-form-group">',
            "<label for=\"note-dialog-link-txt-" + this.options.id + "\" class=\"note-form-label\">" + this.lang.link.textToDisplay + "</label>",
            "<input id=\"note-dialog-link-txt-" + this.options.id + "\" class=\"note-link-text form-control note-form-control note-input\" type=\"text\"/>",
            '</div>',
            '<div class="form-group note-form-group">',
            "<label for=\"note-dialog-link-url-" + this.options.id + "\" class=\"note-form-label\">" + this.lang.link.url + "</label>",
            "<input id=\"note-dialog-link-url-" + this.options.id + "\" class=\"note-link-url form-control note-form-control note-input\" type=\"text\" value=\"http://\"/>",
            '</div>',
            !this.options.disableLinkTarget
                ? jquery_1["default"]('<div/>').append(this.ui.checkbox({
                    className: 'sn-checkbox-open-in-new-window',
                    text: this.lang.link.openInNewWindow,
                    checked: true
                }).render()).html()
                : '',
            jquery_1["default"]('<div/>').append(this.ui.checkbox({
                className: 'sn-checkbox-use-protocol',
                text: this.lang.link.useProtocol,
                checked: true
            }).render()).html(),
        ].join('');
        var buttonClass = 'btn btn-primary note-btn note-btn-primary note-link-btn';
        var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.link.insert + "\" disabled>";
        this.$dialog = this.ui.dialog({
            className: 'link-dialog',
            title: this.lang.link.insert,
            fade: this.options.dialogsFade,
            body: body,
            footer: footer
        }).render().appendTo($container);
    };
    LinkDialog.prototype.destroy = function () {
        this.ui.hideDialog(this.$dialog);
        this.$dialog.remove();
    };
    LinkDialog.prototype.bindEnterKey = function ($input, $btn) {
        $input.on('keypress', function (event) {
            if (event.keyCode === key_1["default"].code.ENTER) {
                event.preventDefault();
                $btn.trigger('click');
            }
        });
    };
    /**
     * toggle update button
     */
    LinkDialog.prototype.toggleLinkBtn = function ($linkBtn, $linkText, $linkUrl) {
        this.ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
    };
    /**
     * Show link dialog and set event handlers on dialog controls.
     *
     * @param {Object} linkInfo
     * @return {Promise}
     */
    LinkDialog.prototype.showLinkDialog = function (linkInfo) {
        var _this = this;
        return jquery_1["default"].Deferred(function (deferred) {
            var $linkText = _this.$dialog.find('.note-link-text');
            var $linkUrl = _this.$dialog.find('.note-link-url');
            var $linkBtn = _this.$dialog.find('.note-link-btn');
            var $openInNewWindow = _this.$dialog
                .find('.sn-checkbox-open-in-new-window input[type=checkbox]');
            var $useProtocol = _this.$dialog
                .find('.sn-checkbox-use-protocol input[type=checkbox]');
            _this.ui.onDialogShown(_this.$dialog, function () {
                _this.context.triggerEvent('dialog.shown');
                // If no url was given and given text is valid URL then copy that into URL Field
                if (!linkInfo.url && func_1["default"].isValidUrl(linkInfo.text)) {
                    linkInfo.url = linkInfo.text;
                }
                $linkText.on('input paste propertychange', function () {
                    // If linktext was modified by input events,
                    // cloning text from linkUrl will be stopped.
                    linkInfo.text = $linkText.val();
                    _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                }).val(linkInfo.text);
                $linkUrl.on('input paste propertychange', function () {
                    // Display same text on `Text to display` as default
                    // when linktext has no text
                    if (!linkInfo.text) {
                        $linkText.val($linkUrl.val());
                    }
                    _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                }).val(linkInfo.url);
                if (!env_1["default"].isSupportTouch) {
                    $linkUrl.trigger('focus');
                }
                _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                _this.bindEnterKey($linkUrl, $linkBtn);
                _this.bindEnterKey($linkText, $linkBtn);
                var isNewWindowChecked = linkInfo.isNewWindow !== undefined
                    ? linkInfo.isNewWindow : _this.context.options.linkTargetBlank;
                $openInNewWindow.prop('checked', isNewWindowChecked);
                var useProtocolChecked = linkInfo.url
                    ? false : _this.context.options.useProtocol;
                $useProtocol.prop('checked', useProtocolChecked);
                $linkBtn.one('click', function (event) {
                    event.preventDefault();
                    deferred.resolve({
                        range: linkInfo.range,
                        url: $linkUrl.val(),
                        text: $linkText.val(),
                        isNewWindow: $openInNewWindow.is(':checked'),
                        checkProtocol: $useProtocol.is(':checked')
                    });
                    _this.ui.hideDialog(_this.$dialog);
                });
            });
            _this.ui.onDialogHidden(_this.$dialog, function () {
                // detach events
                $linkText.off();
                $linkUrl.off();
                $linkBtn.off();
                if (deferred.state() === 'pending') {
                    deferred.reject();
                }
            });
            _this.ui.showDialog(_this.$dialog);
        }).promise();
    };
    /**
     * @param {Object} layoutInfo
     */
    LinkDialog.prototype.show = function () {
        var _this = this;
        var linkInfo = this.context.invoke('editor.getLinkInfo');
        this.context.invoke('editor.saveRange');
        this.showLinkDialog(linkInfo).then(function (linkInfo) {
            _this.context.invoke('editor.restoreRange');
            _this.context.invoke('editor.createLink', linkInfo);
        }).fail(function () {
            _this.context.invoke('editor.restoreRange');
        });
    };
    return LinkDialog;
}());
exports["default"] = LinkDialog;
//# sourceMappingURL=LinkDialog.js.map