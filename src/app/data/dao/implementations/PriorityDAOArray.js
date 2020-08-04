"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityDAOArray = void 0;
var rxjs_1 = require("rxjs");
var TestData_1 = require("../../TestData");
var PriorityDAOArray = /** @class */ (function () {
    function PriorityDAOArray() {
    }
    PriorityDAOArray.prototype.add = function (T) {
        return undefined;
    };
    PriorityDAOArray.prototype.delete = function (id) {
        return undefined;
    };
    PriorityDAOArray.prototype.get = function (id) {
        return undefined;
    };
    PriorityDAOArray.prototype.getAll = function () {
        return rxjs_1.of(TestData_1.TestData.priorities);
    };
    PriorityDAOArray.prototype.update = function (T) {
        return undefined;
    };
    return PriorityDAOArray;
}());
exports.PriorityDAOArray = PriorityDAOArray;
