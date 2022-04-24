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
      if (item.name.startsWith("Backstage")) {
        item.quality = this.#backstageQuality(item);
      } else {
        item.quality = this.#calculateQuality(item);
      }
    });

    return this.items;
  }

  #isLegendary(item) {
    return item.name === "Sulfuras, Hand of Ragnaros";
  }

  #backstageQuality(item) {
    let quality = item.quality;
    let sellIn = item.sellIn;
    if (sellIn < 0) {
      quality = 0;
    } else if (sellIn < 6) {
      quality += 3;
    } else if (sellIn < 11) {
      quality += 2;
    } else {
      quality += 1;
    }
    return quality;
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
