"use strict";

// Этот код можно менять как угодно


var items = {
    "milk": {price: 5.5, type: "Groceries"},
    "eggs": {price: 3.0, type: "Groceries"},
    "coca-cola": {price: 0.4, type: "Groceries"},
    "amoxicillin": {price: 6.7, type: "Groceries"},
    "aspirin": {price: 0.2, type: "PrescriptionDrug"},
    "marijuana": {price: 1.4, type: "PrescriptionDrug"},
    "hamburger": {price: 2, type: "PreparedFood"},
    "ceasar salad": {price: 4.2, type: "PreparedFood"},
};

var itemTypes =
    {
        "Groceries": {
            "Alabama": 0,
            "Alaska": 0,
            "Arizona": "",
            "Arkansas": 0.015,
            "California": "",
            "Colorado": "",
            "Connecticut": "",
            "Tennessee": 0.05,
            "Texas":0
        },
        "PrescriptionDrug": {
            "Alabama": "",
            "Alaska": 0,
            "Arizona": "",
            "Arkansas": "",
            "California": "",
            "Colorado": "",
            "Connecticut": "",
            "Tennessee":0,
            "Texas":0
        }
    };
function base(state) {
    var taxes = {
        "Alabama": 0.04,
        "Alaska": 0,
        "Arizona": 0.056,
        "Arkansas": 0.065,
        "California": 0.075,
        "Colorado": 0.029,
        "Connecticut": 0.0635,
        "Tennessee": 0.07,
        "Texas": 0.0625
    };
    return taxes[state];
}

var itemTypesTaxes = {
    "Alabama": {base: 0.04, Groceries: 0, PrescriptionDrug: "", PreparedFood: 0},
    "Alaska": {base: 0, Groceries: 0, PrescriptionDrug: 0, PreparedFood: 0},
    "Arizona": {base: 0.056, Groceries: "", PrescriptionDrug: "", PreparedFood: 0},
    "Arkansas": {base: 0.065, Groceries: 0.015, PrescriptionDrug: "", PreparedFood: 0},
    "California": {base: 0.075, Groceries: "", PrescriptionDrug: "", PreparedFood: 0},
    "Colorado": {base: 0.029, Groceries: "", PrescriptionDrug: "", PreparedFood: 0},
    "Connecticut": {base: 0.0635, Groceries: "", PrescriptionDrug: "", PreparedFood: 0},
    "Tennessee": {base: 0.07, Groceries: 0.05, PrescriptionDrug: "", PreparedFood: 0},
    "Texas": {base: 0.0625, Groceries: "freeTax", PrescriptionDrug: 0, PreparedFood:"freeTax"}
};

function calculatePriceFort(itemTypesTaxes, item) {
    if (itemTypesTaxes[item].type.Groceries === "freeTax") {
        return (items[item].price );
    }

    else {
        return (items[item].price * (itemTypesTaxes[item].base));

    }

}



function calc(state, itemType) {

    var itemTypeTaxModifier = itemTypes[itemType];
    if (itemTypeTaxModifier[state] === "") {
        return 0;
    }
    return base(state) + itemTypeTaxModifier[state];
}


//calculatePriceFor
function calculatePriceFor(state, item) {
    if (items[item].type === "PreparedFood") {

        return ( 1 + base(state) ) * items[item].price;
    }

    else {

        return calc(state, items[item].type) * items[item].price + items[item].price;
    }


}


class TaxCalculator {
    // У этой функции нелья менять интерфейс
    // Но можно менять содержимое
    calculateTax() {
        var ordersCount = getOrdersCount();
        var state = getSelectedState();
        console.log(`----------${state}-----------`);
        for (var i = 0; i < ordersCount; i++) {
            var item = getSelectedItem();
            var result = calculatePriceFor(state, item);
            console.log(`${item}: $${result.toFixed(2)}`);
        }
        console.log(`----Have a nice day!-----`);
    }
}

//############################
//Production - код:
calculateTaxes();

//############################
//Тесты:
var tests = [
    () => assertEquals(3.0 * (1 + 0.04), calculatePriceFor("Alabama", "eggs")),
    () => assertEquals(0.4 * (1 + 0.015 + 0.065), calculatePriceFor("Arkansas", "coca-cola")),
    () => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("Alaska", "amoxicillin")),
    () => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("California", "amoxicillin")),
    () => assertEquals(2 * (1 + 0.0635), calculatePriceFor("Connecticut", "hamburger")),
    () => assertEquals(3.0 * (1 + 0.07+0.05), calculatePriceFor("Tennessee", "eggs")),
    () => assertEquals(0.2 * (1 + 0.07), calculatePriceFor("Tennessee", "aspirin")),
    () => assertEquals(4.2 * (1 + 0.07), calculatePriceFor("Tennessee", "ceasar salad")),
    () => assertEquals(3.0 * (1 + 0.0625), calculatePriceFor("Texas", "eggs")),
    () => assertEquals(0.2 * (1 + 0.0625), calculatePriceFor("Texas", "aspirin")),
    () => assertEquals(4.2 * (1 + 0.0625), calculatePriceFor("Texas", "ceasar salad")),

   // () => assertEquals(4.2 * (1 + 0.0625), calculatePriceFort("Texas", "ceasar salad")),

];

//Раскомментируйте следующую строчку для запуска тестов:
runAllTests (tests);

//############################
//Код ниже этой строчки не надо менять для выполнения домашней работы

function calculateTaxes() {
    var calculator = new TaxCalculator();
    calculator.calculateTax();
}

function getSelectedItem() {
    var items = ["milk", "eggs", "coca-cola", "amoxicillin", "aspirin", "marijuana", "hamburger", "ceasar salad"];
    return items[Math.floor(Math.random() * items.length)];
}

function getSelectedState() {
    var state = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut","Tennessee","Texas"];
    return state[Math.floor(Math.random() * state.length)];
}

function getOrdersCount() {
    return Math.floor(Math.random() * 3) + 1;
}

//############################
// Кустарный способ писать тесты

function assertEquals(expected, actual) {
    var epsilon = 0.000001;
    var difference = Math.abs(expected - actual);
    if (difference > epsilon || difference === undefined || isNaN(difference)) {
        console.error(`Fail! Expected: ${expected}, Actual: ${actual}`);
        return -1;
    }
    return 0;
}

function runAllTests(tests) {
    var failedTests = tests
        .map((f) => f())
        .map((code) => {
            if (code === -1) {
                return 1
            } else {
                return 0
            }
        })
        .reduce((a, b) => a + b, 0);

    if (failedTests === 0) {
        console.log(`Success: ${tests.length} tests passed.`);
    }
    else {
        console.error(`Fail: ${failedTests} tests failed.`);
    }
}