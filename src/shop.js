class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        return;
      } else if (item.name === "Aged Brie") {
        item.sellIn = item.sellIn - 1;
        item.quality = item.quality + 1;
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          item.quality = 0;
        } else if (item.sellIn < 6) {
          item.quality += 3;
        } else if (item.sellIn < 11) {
          item.quality += 2;
        } else {
          item.quality += 1;
        }
      } else {
        item.sellIn = item.sellIn - 1;
        item.quality = item.quality - 1;
      }
    });

    return this.items;
  }
}
module.exports = Shop;
