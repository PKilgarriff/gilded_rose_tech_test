const { expect } = require("chai");
const Shop = require("../src/shop.js");
const Item = require("../src/item.js");

describe("Gilded Rose Feature Test", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
});
