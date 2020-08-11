"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCategoryDialogComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../confirm-dialog/confirm-dialog.component");
var EditCategoryDialogComponent = /** @class */ (function () {
    function EditCategoryDialogComponent(dialogRef, // для работы с текущим диалог. окном
    data, // данные, которые передали в диалоговое окно
    dialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    ) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialog = dialog;
    }
    EditCategoryDialogComponent.prototype.ngOnInit = function () {
        // получаем переданные в диалоговое окно данные
        this.categoryTitle = this.data[0];
        this.dialogTitle = this.data[1];
    };
    // нажали ОК
    EditCategoryDialogComponent.prototype.onConfirm = function () {
        this.dialogRef.close(this.categoryTitle);
    };
    // нажали отмену (ничего не сохраняем и закрываем окно)
    EditCategoryDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close(false);
    };
    // нажали Удалить
    EditCategoryDialogComponent.prototype.delete = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E: \"" + this.categoryTitle + "\"? (\u0441\u0430\u043C\u0438 \u0437\u0430\u0434\u0430\u0447\u0438 \u043D\u0435 \u0443\u0434\u0430\u043B\u044F\u044E\u0442\u0441\u044F)"
            },
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.dialogRef.close('delete'); // нажали удалить
            }
        });
    };
    EditCategoryDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-category-dialog',
            templateUrl: './edit-category-dialog.component.html',
            styleUrls: ['./edit-category-dialog.component.css']
        })
        // создание/редактирование категории
        ,
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], EditCategoryDialogComponent);
    return EditCategoryDialogComponent;
}());
exports.EditCategoryDialogComponent = EditCategoryDialogComponent;
