import { calculateProficiency } from "../src/lib/dndCalculation.js";
import { expect } from "chai";

describe("Dnd calcuation test", function () {
  context("calculate prof", function () {
    it("should return 2 if level < 5", async function () {
      const result = calculateProficiency(4);
      expect(result).is.equal(2);
    });
    it("should return 5 if level < 17 and greater than 12", async function () {
      const result = calculateProficiency(16);
      expect(result).is.equal(5);
    });
  });
});
