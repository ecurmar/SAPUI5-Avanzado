sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onAfterRendering() {
            var oJSONModel = new sap.ui.model.json.JSONModel();
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
            oJSONModel.loadData("./localService/mockdata/Employees.json", false);
            // oJSONModel.attachRequestCompleted(function(oEventModel) {
            //     console.log(JSON.stringify(oJSONModel.getData()))
            // })
            oView.setModel(oJSONModel);
        }

        function onFilter() {

            var oJSON = this.getView().getModel().getData();

            var filters = [];

            if (oJSON.employeeId !== "") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.employeeId));
            }

            if (oJSON.countryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJSON.countryKey));
            }

            var oList = this.getView().byId("tableEmployees");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        }

        function onClearFilter() {
            var oModel = this.getView().getModel();
            oModel.setProperty("/employeeId","");
            oModel.setProperty("/countryKey","");
        }

        function showPostalCode(oEvent) {
            var itemPresssed = oEvent.getSource();
            var context = itemPresssed.getBindingContext();
            var objectContext = context.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);
        }

        var Main = Controller.extend("logaligroup.employees.controller.MainView", {});
           
        Main.prototype.onValidate = function() {
                var inputEmployee = this.byId("inputEmployee");
                var valueEmployee = inputEmployee.getValue();

                if (valueEmployee.length === 6) {
                    //inputEmployee.setDescription("OK");
                    this.byId("labelCountry").setVisible(true);
                    this.byId("slCountry").setVisible(true);
                } else {
                    //inputEmployee.setDescription("No OK");
                    this.byId("labelCountry").setVisible(false);
                    this.byId("slCountry").setVisible(false);
                }
        };

        Main.prototype.onAfterRendering = onAfterRendering;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;          
        Main.prototype.showPostalCode = showPostalCode;
        return Main;
    });
