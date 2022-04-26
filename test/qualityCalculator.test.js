const { expect } = require("chai");
const QualityCalculator = require("../src/qualityCalculator.js");

describe("Quality Calculator", function () {
  describe("calculate", function () {
    describe("standard items", function () {
      it("reduces quality by 1", function () {
        let item = { name: "+5 Dexterity Vest", sellIn: 10, quality: 20 };
        expect(QualityCalculator.calculate(item)).to.equal(19);
      });
      it("once past sell-by, reduces quality by 2", function () {
        let item = { name: "+5 Dexterity Vest", sellIn: -1, quality: 20 };
        expect(QualityCalculator.calculate(item)).to.equal(18);
      });
    });
    describe("Aged Brie", function () {
      it("increases quality by 1", function () {
        let item = { name: "Aged Brie", sellIn: 3, quality: 0 };
        expect(QualityCalculator.calculate(item)).to.equal(1);
      });
    });
    describe("conjured items", function () {
      it("reduces quality by 2", function () {
        let item = { name: "Conjured Mana Cake", sellIn: 10, quality: 20 };
        expect(QualityCalculator.calculate(item)).to.equal(18);
      });
      it("once past sell-by, reduces quality by 4", function () {
        let item = { name: "Conjured Mana Cake", sellIn: -1, quality: 20 };
        expect(QualityCalculator.calculate(item)).to.equal(16);
      });
    });
    describe("Backstage Passes", function () {
      it("quality increases by 1 when there are more than 10 days to the show", function () {
        let item = {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 15,
          quality: 20,
        };
        expect(QualityCalculator.calculate(item)).to.equal(21);
      });
      it("quality increases by 2 when there are less than 11 days to the show", function () {
        let item = {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 10,
          quality: 20,
        };
        expect(QualityCalculator.calculate(item)).to.equal(22);
      });
      it("quality increases by 3 when there are less than 6 days to the show", function () {
        let item = {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 5,
          quality: 20,
        };
        expect(QualityCalculator.calculate(item)).to.equal(23);
      });
      it("quality drops to 0 once the show has happened", function () {
        let item = {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: -1,
          quality: 20,
        };
        expect(QualityCalculator.calculate(item)).to.equal(0);
      });
    });
    it("doesn't cause item quality to become negative", function () {
      let item = { name: "+5 Dexterity Vest", sellIn: 5, quality: 0 };
      expect(QualityCalculator.calculate(item)).to.equal(0);
    });
    it("doesn't cause item quality to rise above 50", function () {
      let item = { name: "Aged Brie", sellIn: 10, quality: 50 };
      expect(QualityCalculator.calculate(item)).to.equal(50);
    });
  });
});
