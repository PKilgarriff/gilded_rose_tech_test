class QualityCalculator {
  static qualityMin = 0;
  static qualityMax = 50;
  static itemModifiers = {
    Aged: +1,
    // Backstage: ,
    Conjured: -2,
    Standard: -1,
  };

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
    if (this.#isPastSellBy(item)) return 0;
    if (item.sellIn < 6) {
      return item.quality + 3;
    } else if (item.sellIn < 11) {
      return item.quality + 2;
    } else {
      return item.quality + 1;
    }
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
