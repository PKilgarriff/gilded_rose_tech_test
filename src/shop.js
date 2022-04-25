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
      item.quality = item.name.startsWith("Backstage")
        ? this.#backstageQuality(item)
        : this.#calculateQuality(item);
    });

    return this.items;
  }

  #isLegendary(item) {
    const legendaryItems = ["Sulfuras, Hand of Ragnaros"];
    return legendaryItems.includes(item.name);
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
    return this.#qualityLimiter(quality);
  }

  #decreaseSellIn(item) {
    item.sellIn -= 1;
  }

  #calculateQuality(item) {
    let quality = item.quality;
    quality += item.name === "Aged Brie" ? 1 : -1;
    return this.#qualityLimiter(quality);
  }

  #qualityLimiter(quality, lowerLimit = 0, upperLimit = 50) {
    if (quality < lowerLimit) {
      quality = lowerLimit;
    } else if (quality > upperLimit) {
      quality = upperLimit;
    }
    return quality;
  }
}
module.exports = Shop;
