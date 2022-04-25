const QualityCalculator = require("./qualityCalculator");

class Shop {
  constructor(items = [], calculator = QualityCalculator) {
    this.items = items;
    this.qualityCalculator = calculator;
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.#decreaseSellIn(item);
      item.quality = this.qualityCalculator.calculate(item);
    });

    return this.items;
  }

  #decreaseSellIn(item) {
    if (!this.qualityCalculator.isLegendary(item)) {
      item.sellIn -= 1;
    }
  }
}
module.exports = Shop;
