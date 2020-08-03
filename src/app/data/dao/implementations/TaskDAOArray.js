"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDAOArray = void 0;
var rxjs_1 = require("rxjs");
var TestData_1 = require("../../TestData");
var TaskDAOArray = /** @class */ (function () {
    function TaskDAOArray() {
    }
    TaskDAOArray.prototype.add = function (T) {
        return undefined;
    };
    TaskDAOArray.prototype.delete = function (id) {
        return undefined;
    };
    TaskDAOArray.prototype.get = function (id) {
        return undefined;
    };
    TaskDAOArray.prototype.getAll = function () {
        return rxjs_1.of(TestData_1.TestData.tasks);
    };
    TaskDAOArray.prototype.getCompletedCountInCategory = function (category) {
        return undefined;
    };
    TaskDAOArray.prototype.getTotalCount = function () {
        return undefined;
    };
    TaskDAOArray.prototype.getTotalCountInCategory = function (category) {
        return undefined;
    };
    TaskDAOArray.prototype.getUncompletedCountInCategory = function (category) {
        return undefined;
    };
    TaskDAOArray.prototype.search = function (category, searchText, status, priority) {
        return undefined;
    };
    TaskDAOArray.prototype.update = function (T) {
        return undefined;
    };
    return TaskDAOArray;
}());
exports.TaskDAOArray = TaskDAOArray;
