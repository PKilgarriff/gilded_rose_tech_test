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
    describe("standard items", function () {
      it("reduces sellIn by 1", function () {
        let items = [new Item("+5 Dexterity Vest", 10, 20)];
        let gildedRose = new Shop(items);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(9);
      });
      it("reduces quality by 1", function () {
        let items = [new Item("+5 Dexterity Vest", 10, 20)];
        let gildedRose = new Shop(items);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).to.equal(19);
      });
    });
    describe("Aged Brie", function () {
      it("increases quality by 1", function () {
        let items = [new Item("Aged Brie", 3, 0)];
        let gildedRose = new Shop(items);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).to.equal(1);
      });
      it("decreases sellIn by 1", function () {
        let items = [new Item("Aged Brie", 3, 0)];
        let gildedRose = new Shop(items);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(2);
      });
    });
    describe("Legendary Items", function () {
      it("are not affected", function () {
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
});
