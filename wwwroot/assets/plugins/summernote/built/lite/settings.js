"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
var ui_1 = require("./ui");
require("../base/settings.js");
require("../../styles/summernote-lite.scss");
jquery_1["default"].summernote = jquery_1["default"].extend(jquery_1["default"].summernote, {
    ui_template: ui_1["default"],
    interface: 'lite'
});
//# sourceMappingURL=settings.js.map