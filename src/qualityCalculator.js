class QualityCalculator {
  static qualityMin = 0;
  static qualityMax = 50;

  static calculate(item) {
    return this.#qualityLimiter(this.#calculatedQuality(item));
  }

  static #calculatedQuality(item) {
    if (this.#isAged(item)) return this.#agedQuality(item);
    if (this.#isBackstage(item)) return this.#backstageQuality(item);
    return this.#standardQuality(item);
  }

  static #isConjured(item) {
    return item.name.startsWith("Conjured");
  }

  static #isAged(item) {
    return item.name.startsWith("Aged");
  }

  static #isBackstage(item) {
    return item.name.startsWith("Backstage");
  }

  static #agedQuality(item) {
    return item.quality + 1;
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

  static #standardQuality(item) {
    return item.quality - 1 * this.#decayRate(item);
  }

  static #decayRate(item) {
    let baseRate = this.#isConjured(item) ? 2 : 1;
    let sellByRate = this.#isPastSellBy(item) ? 2 : 1;
    return baseRate * sellByRate;
  }

  static #isPastSellBy(item) {
    return item.sellIn < 0;
  }

  static #qualityLimiter(
    quality,
    lowerLimit = this.qualityMin,
    upperLimit = this.qualityMax
  ) {
    if (quality < lowerLimit) quality = lowerLimit;
    if (quality > upperLimit) quality = upperLimit;
    return quality;
  }
}

module.exports = QualityCalculator;
