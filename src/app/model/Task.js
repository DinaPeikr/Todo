"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(id, title, completed, priority, category, date) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.priority = priority;
        this.category = category;
        this.date = date;
    }
    return Task;
}());
exports.Task = Task;
