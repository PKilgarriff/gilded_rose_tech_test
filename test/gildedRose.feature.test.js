const { expect } = require("chai");
const Shop = require("../src/shop.js");
const Item = require("../src/item.js");

describe("Feature Test for Gilded Rose", function () {
  describe("updateQuality", function () {
    describe("correctly updates an inventory of multiple items", function () {
      let shop;
      let items;
      beforeEach(function () {
        items = [
          new Item("+5 Dexterity Vest", 10, 20),
          new Item("Aged Brie", 2, 0),
          new Item("Elixir of the Mongoose", 5, 7),
          new Item("Sulfuras, Hand of Ragnaros", 0, 80),
          new Item("Sulfuras, Hand of Ragnaros", -1, 80),
          new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
          // This Conjured item does not work properly yet
          // new Item("Conjured Mana Cake", 3, 6),
        ];
      });
      it("after 1 day", function () {
        shop = new Shop(items);
        let updatedInventory = shop.updateQuality();
        expect(updatedInventory).to.eql([
          {
            name: "+5 Dexterity Vest",
            quality: 19,
            sellIn: 9,
          },
          {
            name: "Aged Brie",
            quality: 1,
            sellIn: 1,
          },
          {
            name: "Elixir of the Mongoose",
            quality: 6,
            sellIn: 4,
          },
          {
            name: "Sulfuras, Hand of Ragnaros",
            quality: 80,
            sellIn: 0,
          },
          {
            name: "Sulfuras, Hand of Ragnaros",
            quality: 80,
            sellIn: -1,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            quality: 21,
            sellIn: 14,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            quality: 50,
            sellIn: 9,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            quality: 50,
            sellIn: 4,
          },
        ]);
      });
      it("after 10 days", function () {
        shop = new Shop(items);
        for (let i = 1; i < 10; i++) {
          shop.updateQuality();
        }
        let updatedInventory = shop.updateQuality();
        expect(updatedInventory).to.eql([
          {
            name: "+5 Dexterity Vest",
            sellIn: 0,
            quality: 10,
          },
          {
            name: "Aged Brie",
            sellIn: -8,
            quality: 10,
          },
          {
            name: "Elixir of the Mongoose",
            sellIn: -5,
            quality: 0,
          },
          {
            name: "Sulfuras, Hand of Ragnaros",
            sellIn: 0,
            quality: 80,
          },
          {
            name: "Sulfuras, Hand of Ragnaros",
            sellIn: -1,
            quality: 80,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            sellIn: 5,
            quality: 37,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            sellIn: 0,
            quality: 50,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            sellIn: -5,
            quality: 0,
          },
        ]);
      });
      it("after 50 days", function () {
        shop = new Shop(items);
        for (let i = 1; i < 50; i++) {
          shop.updateQuality();
        }
        let updatedInventory = shop.updateQuality();
        expect(updatedInventory).to.eql([
          {
            name: "+5 Dexterity Vest",
            sellIn: -40,
            quality: 0,
          },
          {
            name: "Aged Brie",
            sellIn: -48,
            quality: 50,
          },
          {
            name: "Elixir of the Mongoose",
            sellIn: -45,
            quality: 0,
          },
          {
            name: "Sulfuras, Hand of Ragnaros",
            sellIn: 0,
            quality: 80,
          },
          {
            name: "Sulfuras, Hand of Ragnaros",
            sellIn: -1,
            quality: 80,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            sellIn: -35,
            quality: 0,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            sellIn: -40,
            quality: 0,
          },
          {
            name: "Backstage passes to a TAFKAL80ETC concert",
            sellIn: -45,
            quality: 0,
          },
        ]);
      });
    });
  });
});
