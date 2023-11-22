sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/library",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Text",
    "sap/ndc/BarcodeScanner",
    "duocuc/utils/assets/files/base64PDF",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, coreLibrary, Dialog, Button, mobileLibrary, Text, BarcodeScanner, PDFJSON, MessageBox, MessageToast, JSONModel) {
        "use strict";
        // shortcut for sap.m.ButtonType
        var ButtonType = mobileLibrary.ButtonType;
        // shortcut for sap.m.DialogType
        var DialogType = mobileLibrary.DialogType;
        // shortcut for sap.ui.core.ValueState
        var ValueState = coreLibrary.ValueState;

        return Controller.extend("duocuc.controller.duocPrototipo", {
            onInit: function () {
                document.title = "DUOCUC Toma de Ramos"
            },

            navigationPages: function (oEvent) {
                var navCon = this.byId("main.navContainer");
                try {
                    let text = oEvent.getSource().getText()
                    let animation = 'slide';
                    switch (text) {
                        case "¡Olvidé mi contraseña 😥!":
                            navCon.to(this.byId("page0").getId(), animation);
                            break;
                        case "Iniciar Sesión":
                            navCon.to(this.byId("page2").getId(), animation);
                            break;
                        case "Iniciar Sesión":
                            navCon.to(this.byId("page3").getId(), animation);
                            break;
                        case "Iniciar Sesión":
                            navCon.to(this.byId("page4").getId(), animation);
                            break;
                        default:
                            navCon.back();
                            break;
                    }
                } catch (error) {
                    if (error.message === 'oEvent.getSource(...).getText is not a function') {
                        navCon.back();
                    }
                    else (console.log(error))
                }

            },
            buttonBackNav: function () {
                var navCon = this.byId("main.navContainer");
                navCon.back();
            },

            buttonBackNavInicio: function () {
                var navCon = this.byId("main.navContainer");
                navCon.to(this.byId("page1").getId(), "slide");
            },

            onDefaultMessageDialogIA: async function () {
                if (!this.oDefaultMessageDialog) {
                    this.oDefaultMessageDialog = new Dialog({
                        type: DialogType.Message,
                        contentWidth: "5em",
                        contentHeight: "8em",
                        title: "Paso 2 calculando ramos...",
                        busy: true
                    });
                }
                this.oDefaultMessageDialog.open()
                await this.sleep(3000)
                let navCon = this.byId("main.navContainer");
                navCon.to(this.byId("page3").getId(), "slide");
                this.oDefaultMessageDialog.close()
            },

            onScan: async function () {
                var navCon = this.byId("main.navContainer");
                this.idnavpage3 = this.byId("page3").getId()
                var that = this;
                await BarcodeScanner.scan(
                    function (result) { navCon.to(that.idnavpage3, "slide") },
                    function (error) { "testing" },
                    // function (result) { navCon.to(that.idnavpage3, "slide")}
                )
                
            },

            tomaManual: function () {
                let navCon = this.byId("main.navContainer");
                navCon.to(this.byId("page4").getId(), "slide");
            },
            moduloQR: function () {
                let navCon = this.byId("main.navContainer");
                navCon.to(this.byId("page5").getId(), "slide");
            },

            sleep: function (ms) {
                return new Promise(res => setTimeout(res, ms));
            },

            downloadPDF: function () {
                let pdf = PDFJSON
                const linkSource = `data:application/pdf;base64,${pdf}`;
                const downloadLink = document.createElement("a");
                const fileName = "test.pdf";
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            },

            onPopinLayoutChanged: function () {
                var oTable = this.byId("idProductsTable");
                var oComboBox = this.byId("idPopinLayout");
                var sPopinLayout = oComboBox.getSelectedKey();
                switch (sPopinLayout) {
                    case "Block":
                        oTable.setPopinLayout(sPopinLayout.Block);
                        break;
                    case "GridLarge":
                        oTable.setPopinLayout(sPopinLayout.GridLarge);
                        break;
                    case "GridSmall":
                        oTable.setPopinLayout(sPopinLayout.GridSmall);
                        break;
                    default:
                        oTable.setPopinLayout(sPopinLayout.Block);
                        break;
                }
            },

            onSelect: function (oEvent) {
                var bSelected = oEvent.getParameter("selected"),
                    sText = oEvent.getSource().getText(),
                    oTable = this.byId("idProductsTable"),
                    aSticky = oTable.getSticky() || [];

                if (bSelected) {
                    aSticky.push(sText);
                } else if (aSticky.length) {
                    var iElementIndex = aSticky.indexOf(sText);
                    aSticky.splice(iElementIndex, 1);
                }

                oTable.setSticky(aSticky);
            },

            onToggleInfoToolbar: function (oEvent) {
                var oTable = this.byId("idProductsTable");
                oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
            }
        });

    });
