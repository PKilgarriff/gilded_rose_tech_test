class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (this.#isLegendary(item)) {
        return;
      }
      this.#decreaseSellIn(item);
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
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
        item.quality = this.#calculateQuality(item);
      }
    });

    return this.items;
  }

  #isLegendary(item) {
    return item.name === "Sulfuras, Hand of Ragnaros";
  }

  #decreaseSellIn(item) {
    item.sellIn -= 1;
  }

  #calculateQuality(item) {
    let quality = item.quality;
    quality += item.name === "Aged Brie" ? 1 : -1;
    if (quality < 0) {
      quality = 0;
    } else if (quality > 50) {
      quality = 50;
    }
    return quality;
  }
}
module.exports = Shop;
