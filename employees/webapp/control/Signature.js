sap.ui.define(
    [
        "sap/ui/core/Control"
    ],
    function(Control) {
      "use strict";
  
      return Control.extend("logaligroup.employees.controller.Signature", {

        metadata : {
            properties : {
                "width" : {
                    type : "sap.iu.core.CSSSize",
                    defaultValue : "400px"
                },
                "height" : {
                    type : "sap.iu.core.CSSSize",
                    defaultValue : "100px"
                },
                "bgcolor" : {
                    type : "sap.iu.core.CSSColor",
                    defaultValue : "white"
                }
            }
        }, 

        onInit : function() {

        },

        renderer : function(oRM, oControl) {

            oRM.write("<div");
            oRM.addStyle("width", oControl.getProperty("width"));
            oRM.addStyle("height", oControl.getProperty("height"));
            oRM.addStyle("background-color", oControl.getProperty("bgcolor"));
            oRM.addStyle("border", "1px solid black");
            oRM.writeStyles();
            oRM.write(">");
            oRM.write("<canvas width='" + oControl.getProperty("width") + "' " + "height='"
                                        + oControl.getProperty("height") + "'");
            oRM.write("></canvas>");
            oRM.write("</div>");
        },

        onAfterRendering : function() {
            var canvas = document.querySelector("canvas");
            try {
                this.signaturePad = new SignaturePad(canvas);
            } catch (e) {
                console.error(e);
            }
        },

        clear : function() {
            this.signaturePad.clear();
        }
      });
    }
  );