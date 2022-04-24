const { expect } = require("chai");
// const sinon = require("sinon");
const Shop = require("../src/shop.js");
const Item = require("../src/item.js");

describe("Shop", function () {
  it("stores a list of items", function () {
    let gildedRose = new Shop([1, 2, 3]);
    expect(gildedRose.items).to.have.members([1, 2, 3]);
  });
  describe("updateQuality", function () {
    it("reduces a standard item's sellIn property by 1", function () {
      let items = [new Item("+5 Dexterity Vest", 10, 20)];
      let gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).to.equal(9);
    });
    it("reduces a standard item's quality property by 1", function () {
      let items = [new Item("+5 Dexterity Vest", 10, 20)];
      let gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).to.equal(19);
    });
    it("increases Aged Brie's quality property by 1", function () {
      let items = [new Item("Aged Brie", 3, 0)];
      let gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).to.equal(1);
    });
    it("decreases Aged Brie's sellIn property by 1", function () {
      let items = [new Item("Aged Brie", 3, 0)];
      let gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).to.equal(2);
    });
    it("does not affect Legendary items", function () {
      let items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
      let gildedRose = new Shop(items);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).to.equal(0);
      expect(gildedRose.items[0].quality).to.equal(80);
    });
  });
});
