import { getCharSheets, getCharSheetById } from "../src/lib/dataService.js";
import { expect } from "chai";

describe("http client test", function () {
  context("get character sheets", function () {
    it("Data should not be empty", async function () {
      var data = await getCharSheets();
      //console.log(data);
      expect(data).is.not.empty;
    });
  });
  context("get character sheet by id", function () {
    it("Data should not be null", async function () {
      var data = await getCharSheetById(1);
      //console.log(data);
      expect(data).is.not.null;
    });
  });
});
