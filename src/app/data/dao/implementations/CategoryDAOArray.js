"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDAOArray = void 0;
var rxjs_1 = require("rxjs");
var TestData_1 = require("../../TestData");
var CategoryDAOArray = /** @class */ (function () {
    function CategoryDAOArray() {
    }
    CategoryDAOArray.prototype.add = function (T) {
        return undefined;
    };
    CategoryDAOArray.prototype.delete = function (id) {
        return undefined;
    };
    CategoryDAOArray.prototype.get = function (id) {
        return undefined;
    };
    CategoryDAOArray.prototype.getAll = function () {
        return rxjs_1.of(TestData_1.TestData.categories);
    };
    CategoryDAOArray.prototype.search = function (title) {
        return undefined;
    };
    CategoryDAOArray.prototype.update = function (T) {
        return undefined;
    };
    return CategoryDAOArray;
}());
exports.CategoryDAOArray = CategoryDAOArray;
