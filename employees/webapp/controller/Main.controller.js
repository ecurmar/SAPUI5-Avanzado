sap.ui.define([
    "sap/ui/core/mvc/Controller",

], function(Controller) {
    'use strict';

    return Controller.extend("logaligroup.employee.controller.Main", {

        onInit : function() {
            var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            var i18nBundle = oView.getModel("i18n").getResourceBundle();

            // var oJSON =  {
            //     employeeId : "12345",
            //     countryKey : "UK",
            //     listCountry : [
            //         {
            //             key : "US",
            //             text : "United States"//i18nBundle.getText("countryUS")
            //         },
            //         {
            //             key : "UK",
            //             text : "United Kingdom" //i18nBundle.getText("countryUK")
            //         },
            //         {
            //             key : "ES",
            //             text : "Spain" //i18nBundle.getText("countryES")
            //         }
            //     ]
            // };

            //oJSONModel.setData(oJSON);
            oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            // oJSONModel.attachRequestCompleted(function(oEventModel) {
            //     console.log(JSON.stringify(oJSONModel.getData()))
            // })
            oView.setModel(oJSONModelEmpl, "jsonEmployees");

            var oJSONModelCountries = new sap.ui.model.json.JSONModel();
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
            oView.setModel(oJSONModelCountries, "jsonCountries");

            var oJSONModelLayout = new sap.ui.model.json.JSONModel();
            oJSONModelLayout.loadData("./localService/mockdata/Layouts.json", false);
            oView.setModel(oJSONModelLayout, "jsonLayout");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });
            oView.setModel(oJSONModelConfig, "jsonModelConfig");

            this._bus = sap.ui.getCore().getEventBus();
            this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);
        },

        showEmployeeDetails : function (category, nameEvent, path) {

            var detailView = this.getView().byId("detailEmployeeView");
            detailView.bindElement("jsonEmployees>" + path);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded")

        }
    })
    
});