var config = require("../../shared/config")
var fetchModule = require("fetch")
var observableModule = require("data/observable")
var observableArrayModule = require("data/observable-array")

function Menu() {
    var model = new observableModule.Observable({
        "cafe1": new observableArrayModule.ObservableArray([]),
        "cafe3": new observableArrayModule.ObservableArray([]),
        "cafe8": new observableArrayModule.ObservableArray([]),
    })

    model.getMenuItem = function(index) {
    }


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

            cafes.forEach(function(cafe) {
                var menuItems = new observableArrayModule.ObservableArray([])
                cafe.categories.forEach(function(category) {
                    category.menuItems.forEach(function(item) {
                        model.get("cafe" + cafe.cafeId).push(item)
                    })
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