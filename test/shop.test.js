const { expect } = require("chai");
// const sinon = require("sinon");
const Shop = require("../src/shop.js");
const Item = require("../src/item.js");

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
    describe("standard items", function () {
      it("reduces sellIn by 1", function () {
        let gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
      });
      it("reduces quality by 1", function () {
        let gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(19);
      });
    });
    describe("Aged Brie", function () {
      it("decreases sellIn by 1", function () {
        let gildedRose = new Shop([new Item("Aged Brie", 3, 0)]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(2);
      });
      it("increases quality by 1", function () {
        let gildedRose = new Shop([new Item("Aged Brie", 3, 0)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
      });
    });
    describe("Legendary Items", function () {
      it("are not affected", function () {
        let gildedRose = new Shop([
          new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        ]);
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);
      });
    });
    describe("Backstage Passes", function () {
      it("decreases sellIn by 1", function () {
        let gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(14);
      });
      it("quality increases by 1 when there are more than 10 days to the show", function () {
        let gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(21);
      });
      it("quality increases by 2 when there are less than 11 days to the show", function () {
        let gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(22);
      });
      it("quality increases by 3 when there are less than 6 days to the show", function () {
        let gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(23);
      });
      it("quality drops to 0 once the show has happened", function () {
        let gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
      });
    });
    it("doesn't cause item quality to become negative", function () {
      let gildedRose = new Shop([new Item("+5 Dexterity Vest", 5, 3)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      let items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
    it("doesn't cause item quality to rise above 50", function () {
      let gildedRose = new Shop([new Item("Aged Brie", 10, 48)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      let items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });
  });
});
