var Menu = require("../../shared/view-models/menu-view-model")
var frames = require("ui/frame")
var Observable = require("data/observable").Observable;

var menuList = new Menu()

exports.pageNavigatedTo = function(args) {
    var page = args.object
    page.bindingContext = menuList.getMenuItem(0);
}