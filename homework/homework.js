"use strict";

var items = require('./items.json');
var itemTax = require('./itemTax.json');

class TaxCalculator {

    calculateTax() {
        var ordersCount = getOrdersCount();
        var state = getSelectedState();

        this.print(`----------${state}-----------`);

        for (var i = 0; i < ordersCount; i++) {
            var item = getSelectedItem();
            var result = this.calculatePriceFor(state, item);
            this.print(`${item}: $${result.toFixed(2)}`);
        }

        this.print(`----Have a nice day!-----`);
    }

    calculatePriceFor(state, item) {
        return (1 + this.calculateTaxPercent(state, items[item].type)) * items[item].price;
    }

    calculateTaxPercent(state, itemType) {
        if (itemTax[state][itemType] === "") {
            return 0;
        }
        return itemTax[state].base_tax + itemTax[state][itemType];
    }

    print(line) {
        console.log(line);
    }
}

calculateTaxes();

var calculator = new TaxCalculator();
var tests = [
            () => assertEquals(3.0 * (1 + 0.04), calculator.calculatePriceFor("Alabama", "eggs")),
            () => assertEquals(0.4 * (1 + 0.015 + 0.065), calculator.calculatePriceFor("Arkansas", "coca-cola")),
            () => assertEquals(6.7 * (1 + 0.0), calculator.calculatePriceFor("Alaska", "amoxicillin")),
            () => assertEquals(6.7 * (1 + 0.0), calculator.calculatePriceFor("California", "amoxicillin")),
            () => assertEquals(2 * (1 + 0.0635), calculator.calculatePriceFor("Connecticut", "hamburger")),
            () => assertEquals(6.7 * (1 + 0.07 + 0.05), calculator.calculatePriceFor("Tennessee", "amoxicillin")),
            () => assertEquals(6.7 * (1 + 0.0), calculator.calculatePriceFor("Texas", "amoxicillin")),
            () => assertEquals(2 * (1 + 0.0625), calculator.calculatePriceFor("Texas", "hamburger")),
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