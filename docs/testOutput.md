```
Feature Test for Gilded Rose
  updateQuality
    correctly updates an inventory of multiple items
      ✔ after 1 day
      ✔ after 10 days
      ✔ after 50 days

Quality Calculator
  calculate
    ✔ doesn't cause item quality to become negative
    ✔ doesn't cause item quality to rise above 50
    standard items
      ✔ reduces quality by 1
      ✔ once past sell-by, reduces quality by 2
    Aged Brie
      ✔ increases quality by 1
    conjured items
      ✔ reduces quality by 2
      ✔ once past sell-by, reduces quality by 4
    Backstage Passes
      ✔ quality increases by 1 when there are more than 10 days to the show
      ✔ quality increases by 2 when there are less than 11 days to the show
      ✔ quality increases by 3 when there are less than 6 days to the show
      ✔ quality drops to 0 once the show has happened

Shop
  ✔ stores a list of items
  ✔ defaults to an empty inventory
  updateQuality
    ✔ calls the calculate method of QualityCalculator for each item

17 passing (27ms)
```

| File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| -------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files            | 100     | 100      | 100     | 100     |
| item.js              | 100     | 100      | 100     | 100     |
| qualityCalculator.js | 100     | 100      | 100     | 100     |
| shop.js              | 100     | 100      | 100     | 100     |
