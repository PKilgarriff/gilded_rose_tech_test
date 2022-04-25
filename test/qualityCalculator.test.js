const { expect } = require("chai");
const QualityCalculator = require("../src/qualityCalculator.js");
const Item = require("../src/item.js");

describe("Quality Calculator", function () {
  describe("calculate", function () {
    describe("standard items", function () {
      it("reduces quality by 1", function () {
        let item = new Item("+5 Dexterity Vest", 10, 20);
        expect(QualityCalculator.calculate(item)).to.equal(19);
      });
    });
    describe("Aged Brie", function () {
      it("increases quality by 1", function () {
        let item = new Item("Aged Brie", 3, 0);
        expect(QualityCalculator.calculate(item)).to.equal(1);
      });
    });
    describe("Legendary Items", function () {
      it("are not affected", function () {
        let item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
        expect(QualityCalculator.calculate(item)).to.equal(80);
      });
    });
    describe("Backstage Passes", function () {
      it("quality increases by 1 when there are more than 10 days to the show", function () {
        let item = new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          15,
          20
        );
        expect(QualityCalculator.calculate(item)).to.equal(21);
      });
      it("quality increases by 2 when there are less than 11 days to the show", function () {
        let item = new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          10,
          20
        );
        expect(QualityCalculator.calculate(item)).to.equal(22);
      });
      it("quality increases by 3 when there are less than 6 days to the show", function () {
        let item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
        expect(QualityCalculator.calculate(item)).to.equal(23);
      });
      it("quality drops to 0 once the show has happened", function () {
        let item = new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          -1,
          20
        );
        expect(QualityCalculator.calculate(item)).to.equal(0);
      });
    });
    it("doesn't cause item quality to become negative", function () {
      let item = new Item("+5 Dexterity Vest", 5, 0);
      expect(QualityCalculator.calculate(item)).to.equal(0);
    });
    it("doesn't cause item quality to rise above 50", function () {
      let item = new Item("Aged Brie", 10, 50);
      expect(QualityCalculator.calculate(item)).to.equal(50);
    });
  });
});
