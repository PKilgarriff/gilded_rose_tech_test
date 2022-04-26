const QualityCalculator = require("./qualityCalculator");

class Shop {
  static legendaryItems = ["Sulfuras, Hand of Ragnaros"];

  constructor(items = [], calculator = QualityCalculator) {
    this.items = items;
    this.qualityCalculator = calculator;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (this.#isLegendary(item)) {
        return;
      }
      this.#decreaseSellIn(item);
      item.quality = this.qualityCalculator.calculate(item);
    });

    return this.items;
  }

  #decreaseSellIn(item) {
    item.sellIn -= 1;
  }

  #isLegendary(item) {
    return this.legendaryItems.includes(item.name);
  }
}
module.exports = Shop;
