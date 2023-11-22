/*global QUnit*/

sap.ui.define([
	"duocuc/controller/duocPrototipo.controller"
], function (Controller) {
	"use strict";

	QUnit.module("duocPrototipo Controller");

	QUnit.test("I should test the duocPrototipo controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
