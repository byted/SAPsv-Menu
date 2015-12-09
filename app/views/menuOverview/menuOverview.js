var Menu = require("../../shared/view-models/menu-view-model")
var frames = require("ui/frame")
var Observable = require("data/observable").Observable;
var dialogsModule = require("ui/dialogs");

var menuList = new Menu()
var pageData = new Observable({
    isLoading: true,
    menu: menuList
})


exports.loaded = function(args) {
    var page = args.object
    page.bindingContext = pageData
    menuList.getToday()
        .catch(function(err) {
            console.log(error);
            dialogsModule.alert({
                message: "An error occurred while loading the menu.",
                okButtonText: "Hmkay..."
            })
        })
        .then(function() {
            pageData.set("isLoading", false)
        })
}

exports.showDetails = function(args) {
    var item = args.view.bindingContext;
    frames.topmost().navigate({
        moduleName: "views/menuDetails/menuDetails",
        context: item
    })
}