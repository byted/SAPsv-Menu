var config = require("../../shared/config")
var fetchModule = require("fetch")
var observableModule = require("data/observable")
var observableArrayModule = require("data/observable-array")

function Menu() {
    var model = new observableModule.Observable({
        cafe1: new observableArrayModule.ObservableArray([]),
        cafe3: new observableArrayModule.ObservableArray([]),
        cafe8: new observableArrayModule.ObservableArray([])
    });


    model.getToday = function () {
        return fetchModule.fetch(config.apiUrl + "today", { method: "GET" })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // config.menu = data.content
            var cafes = data.content[0]
            console.log(JSON.stringify(cafes))
            cafes[0].categories.forEach(function(category) {
                var menuItems = new observableArrayModule.ObservableArray(category.menuItems) 
                model.get('cafe1').push({
                    category: category.label,
                    menuItems: menuItems
                })
            })
            cafes[1].categories.forEach(function(category) {
                var menuItems = new observableArrayModule.ObservableArray(category.menuItems) 
                model.get('cafe3').push({
                    category: category.label,
                    menuItems: menuItems
                })
            })
            cafes[2].categories.forEach(function(category) {
                var menuItems = new observableArrayModule.ObservableArray(category.menuItems) 
                model.get('cafe8').push({
                    category: category.label,
                    menuItems: menuItems
                })
            })
        })
    }
    return model
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = Menu;