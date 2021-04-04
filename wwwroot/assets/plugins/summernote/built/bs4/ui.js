"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var renderer_1 = require("../base/renderer");
var editor = renderer_1["default"].create('<div class="note-editor note-frame card"/>');
var toolbar = renderer_1["default"].create('<div class="note-toolbar card-header" role="toolbar"/>');
var editingArea = renderer_1["default"].create('<div class="note-editing-area"/>');
var codable = renderer_1["default"].create('<textarea class="note-codable" aria-multiline="true"/>');
var editable = renderer_1["default"].create('<div class="note-editable card-block" contentEditable="true" role="textbox" aria-multiline="true"/>');
var statusbar = renderer_1["default"].create([
    '<output class="note-status-output" role="status" aria-live="polite"></output>',
    '<div class="note-statusbar" role="status">',
    '<div class="note-resizebar" aria-label="Resize">',
    '<div class="note-icon-bar"></div>',
    '<div class="note-icon-bar"></div>',
    '<div class="note-icon-bar"></div>',
    '</div>',
    '</div>',
].join(''));
var airEditor = renderer_1["default"].create('<div class="note-editor note-airframe"/>');
var airEditable = renderer_1["default"].create([
    '<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"></div>',
    '<output class="note-status-output" role="status" aria-live="polite"></output>',
].join(''));
var buttonGroup = renderer_1["default"].create('<div class="note-btn-group btn-group">');
var dropdown = renderer_1["default"].create('<div class="note-dropdown-menu dropdown-menu" role="list">', function ($node, options) {
    var markup = Array.isArray(options.items) ? options.items.map(function (item) {
        var value = (typeof item === 'string') ? item : (item.value || '');
        var content = options.template ? options.template(item) : item;
        var option = (typeof item === 'object') ? item.option : undefined;
        var dataValue = 'data-value="' + value + '"';
        var dataOption = (option !== undefined) ? ' data-option="' + option + '"' : '';
        return '<a class="dropdown-item" href="#" ' + (dataValue + dataOption) + ' role="listitem" aria-label="' + value + '">' + content + '</a>';
    }).join('') : options.items;
    $node.html(markup).attr({ 'aria-label': options.title });
    if (options && options.codeviewKeepButton) {
        $node.addClass('note-codeview-keep');
    }
});
var dropdownButtonContents = function (contents) {
    return contents;
};
var dropdownCheck = renderer_1["default"].create('<div class="note-dropdown-menu dropdown-menu note-check" role="list">', function ($node, options) {
    var markup = Array.isArray(options.items) ? options.items.map(function (item) {
        var value = (typeof item === 'string') ? item : (item.value || '');
        var content = options.template ? options.template(item) : item;
        return '<a class="dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + item + '">' + icon(options.checkClassName) + ' ' + content + '</a>';
    }).join('') : options.items;
    $node.html(markup).attr({ 'aria-label': options.title });
    if (options && options.codeviewKeepButton) {
        $node.addClass('note-codeview-keep');
    }
});
var dialog = renderer_1["default"].create('<div class="modal note-modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function ($node, options) {
    if (options.fade) {
        $node.addClass('fade');
    }
    $node.attr({
        'aria-label': options.title
    });
    $node.html([
        '<div class="modal-dialog">',
        '<div class="modal-content">',
        (options.title ? '<div class="modal-header">' +
            '<h4 class="modal-title">' + options.title + '</h4>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>' +
            '</div>' : ''),
        '<div class="modal-body">' + options.body + '</div>',
        (options.footer ? '<div class="modal-footer">' + options.footer + '</div>' : ''),
        '</div>',
        '</div>',
    ].join(''));
});
var popover = renderer_1["default"].create([
    '<div class="note-popover popover in">',
    '<div class="arrow"></div>',
    '<div class="popover-content note-children-container"></div>',
    '</div>',
].join(''), function ($node, options) {
    var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';
    $node.addClass(direction);
    if (options.hideArrow) {
        $node.find('.arrow').hide();
    }
});
var checkbox = renderer_1["default"].create('<div class="form-check"></div>', function ($node, options) {
    $node.html([
        '<label class="form-check-label"' + (options.id ? ' for="note-' + options.id + '"' : '') + '>',
        '<input type="checkbox" class="form-check-input"' + (options.id ? ' id="note-' + options.id + '"' : ''),
        (options.checked ? ' checked' : ''),
        ' aria-label="' + (options.text ? options.text : '') + '"',
        ' aria-checked="' + (options.checked ? 'true' : 'false') + '"/>',
        ' ' + (options.text ? options.text : '') +
            '</label>',
    ].join(''));
});
var icon = function (iconClassName, tagName) {
    tagName = tagName || 'i';
    return '<' + tagName + ' class="' + iconClassName + '"></' + tagName + '>';
};
var ui = function (editorOptions) {
    return {
        editor: editor,
        toolbar: toolbar,
        editingArea: editingArea,
        codable: codable,
        editable: editable,
        statusbar: statusbar,
        airEditor: airEditor,
        airEditable: airEditable,
        buttonGroup: buttonGroup,
        dropdown: dropdown,
        dropdownButtonContents: dropdownButtonContents,
        dropdownCheck: dropdownCheck,
        dialog: dialog,
        popover: popover,
        icon: icon,
        checkbox: checkbox,
        options: editorOptions,
        palette: function ($node, options) {
            return renderer_1["default"].create('<div class="note-color-palette"/>', function ($node, options) {
                var contents = [];
                for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
                    var eventName = options.eventName;
                    var colors = options.colors[row];
                    var colorsName = options.colorsName[row];
                    var buttons = [];
                    for (var col = 0, colSize = colors.length; col < colSize; col++) {
                        var color = colors[col];
                        var colorName = colorsName[col];
                        buttons.push([
                            '<button type="button" class="note-color-btn"',
                            'style="background-color:', color, '" ',
                            'data-event="', eventName, '" ',
                            'data-value="', color, '" ',
                            'title="', colorName, '" ',
                            'aria-label="', colorName, '" ',
                            'data-toggle="button" tabindex="-1"></button>',
                        ].join(''));
                    }
                    contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
                }
                $node.html(contents.join(''));
                if (options.tooltip) {
                    $node.find('.note-color-btn').tooltip({
                        container: options.container || editorOptions.container,
                        trigger: 'hover',
                        placement: 'bottom'
                    });
                }
            })($node, options);
        },
        button: function ($node, options) {
            return renderer_1["default"].create('<button type="button" class="note-btn btn btn-light btn-sm" tabindex="-1">', function ($node, options) {
                if (options && options.tooltip) {
                    $node.attr({
                        title: options.tooltip,
                        'aria-label': options.tooltip
                    }).tooltip({
                        container: options.container || editorOptions.container,
                        trigger: 'hover',
                        placement: 'bottom'
                    }).on('click', function (e) {
                        jquery_1["default"](e.currentTarget).tooltip('hide');
                    });
                }
                if (options && options.codeviewButton) {
                    $node.addClass('note-codeview-keep');
                }
            })($node, options);
        },
        toggleBtn: function ($btn, isEnable) {
            $btn.toggleClass('disabled', !isEnable);
            $btn.attr('disabled', !isEnable);
        },
        toggleBtnActive: function ($btn, isActive) {
            $btn.toggleClass('active', isActive);
        },
        onDialogShown: function ($dialog, handler) {
            $dialog.one('shown.bs.modal', handler);
        },
        onDialogHidden: function ($dialog, handler) {
            $dialog.one('hidden.bs.modal', handler);
        },
        showDialog: function ($dialog) {
            $dialog.modal('show');
        },
        hideDialog: function ($dialog) {
            $dialog.modal('hide');
        },
        createLayout: function ($note) {
            var $editor = (editorOptions.airMode ? airEditor([
                editingArea([
                    codable(),
                    airEditable(),
                ]),
            ]) : (editorOptions.toolbarPosition === 'bottom'
                ? editor([
                    editingArea([
                        codable(),
                        editable(),
                    ]),
                    toolbar(),
                    statusbar(),
                ])
                : editor([
                    toolbar(),
                    editingArea([
                        codable(),
                        editable(),
                    ]),
                    statusbar(),
                ]))).render();
            $editor.insertAfter($note);
            return {
                note: $note,
                editor: $editor,
                toolbar: $editor.find('.note-toolbar'),
                editingArea: $editor.find('.note-editing-area'),
                editable: $editor.find('.note-editable'),
                codable: $editor.find('.note-codable'),
                statusbar: $editor.find('.note-statusbar')
            };
        },
        removeLayout: function ($note, layoutInfo) {
            $note.html(layoutInfo.editable.html());
            layoutInfo.editor.remove();
            $note.show();
        }
    };
};
exports["default"] = ui;
//# sourceMappingURL=ui.js.map