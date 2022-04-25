class QualityCalculator {
  static calculate(item) {
    let quality = item.quality;
    if (this.isLegendary(item)) {
      return item.quality;
    }
    quality = item.name.startsWith("Backstage")
      ? this.#backstageQuality(item)
      : this.#calculateQuality(item);
    return this.#qualityLimiter(quality);
  }

  static isLegendary(item) {
    const legendaryItems = ["Sulfuras, Hand of Ragnaros"];
    return legendaryItems.includes(item.name);
  }

  static #backstageQuality(item) {
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

  static #calculateQuality(item) {
    let quality = item.quality;
    quality += item.name === "Aged Brie" ? 1 : -1;
    return quality;
  }

  static #qualityLimiter(quality, lowerLimit = 0, upperLimit = 50) {
    if (quality < lowerLimit) {
      quality = lowerLimit;
    } else if (quality > upperLimit) {
      quality = upperLimit;
    }
    return quality;
  }
}

module.exports = QualityCalculator;
