var Menu = require("../../shared/view-models/menu-view-model")
var viewModule = require("ui/core/view")
var dialogsModule = require("ui/dialogs")

var menu = new Menu();

exports.loaded = function(args) {
    var page = args.object
    page.bindingContext = menu
    menu.getToday()
}