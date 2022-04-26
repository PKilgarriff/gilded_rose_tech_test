class QualityCalculator {
  static qualityMin = 0;
  static qualityMax = 50;

  static calculate(item) {
    return this.#qualityLimiter(
      item.name.startsWith("Backstage")
        ? this.#backstageQuality(item)
        : this.#calculateQuality(item)
    );
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
    if (item.name === "Aged Brie") {
      return (quality += 1);
    }
    quality -= 1 * this.#decayRate(item);
    return quality;
  }

  static #decayRate(item) {
    let baseRate = this.#isConjured(item) ? 2 : 1;
    let sellByRate = item.sellIn < 0 ? 2 : 1;
    return baseRate * sellByRate;
  }

  static #isConjured(item) {
    return item.name.startsWith("Conjured");
  }

  static #qualityLimiter(
    quality,
    lowerLimit = this.qualityMin,
    upperLimit = this.qualityMax
  ) {
    if (quality < lowerLimit) {
      quality = lowerLimit;
    } else if (quality > upperLimit) {
      quality = upperLimit;
    }
    return quality;
  }
}

module.exports = QualityCalculator;
