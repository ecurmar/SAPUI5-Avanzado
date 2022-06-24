sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

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
        }
        

        return Main;
    });
