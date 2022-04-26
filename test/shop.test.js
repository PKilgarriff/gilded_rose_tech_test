const { expect } = require("chai");
const sinon = require("sinon");
const Shop = require("../src/shop.js");
const QualityCalculator = require("../src/qualityCalculator.js");

describe("Shop", function () {
  it("stores a list of items", function () {
    let gildedRose = new Shop([1, 2, 3]);
    expect(gildedRose.items).to.have.members([1, 2, 3]);
  });
  it("defaults to an empty inventory", function () {
    let gildedRose = new Shop();
    expect(gildedRose.items).to.have.lengthOf(0);
  });
  describe("updateQuality", function () {
    it("calls the calculate method of QualityCalculator for each item", function () {
      let item = { name: "example", sellIn: 5, quality: 6 };
      let calculatorStub = sinon.stub(QualityCalculator);
      calculatorStub.calculate
        .withArgs(item)
        .onFirstCall()
        .returns("The example item has been calculated");
      let gildedRose = new Shop([item], calculatorStub);
      let updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).to.contain(
        "The example item has been calculated"
      );
    });
  });
});
