# Tech Test - Gilded Rose

[![Node.js CI](https://github.com/PKilgarriff/gilded_rose_tech_test/actions/workflows/node.js.yml/badge.svg)](https://github.com/PKilgarriff/gilded_rose_tech_test/actions/workflows/node.js.yml)

## Description

This tech test is based on a well known kata developed by [Terry Hughes](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/). It is commonly used to assess a candidate's ability to read, refactor and extend legacy code.

The full brief is available [here](./docs/brief.md), but to summarise:

- You are being brought onto an existing codebase, which manages the inventory of a shop in a fantasy realm
- A new supplier is now providing conjured goods to the shop, and these have different properties to the items already managed by the program
- You have been requested to make the update that will handle this change
- There are constraints in place that prevent you from modifying one of the pre-existing classes (Item)

## Technologies

- JavaScript - chosen programming language
- Node.js - JS runtime environment
- Mocha - testing framework
- Chai - assertions and expectations for TDD/BDD
- Sinon - mocking
- ESLint - linting
- GitHub - version control
- GitHub Actions - Continuous Integration

## Set-up

### Clone Repository

Run the following commands in your terminal.

```zsh
git clone https://github.com/PKilgarriff/gilded_rose_tech_test
```

### Install Dependencies

> These steps assume you have [Node.js](https://nodejs.org/en/) running on your system.

```zsh
cd gilded_rose_tech_test
npm install
```

### Run Program

<!-- How to run the program -->

### Test Program

There are npm scripts setup to test and lint the program

```bash
npm run test # Run linter then tests (with coverage checker)
npm run test:unit # Run tests (with coverage checker)
```

Both of the above run with coverage being checked, and you can see the current test coverage [here](#coverage), the test output is also available [here](./docs/testOutput.md).

## Approach

### Structure

The program is made up of three classes:

- Item
  - legacy code that stores an item's name, sellIn, and quality
- Shop
  - stores list of items, and interfaces with QualityCalculator to manage changes in quality of inventory
  - reduces sellIn value each time updateQuality() is called
- QualityCalculator
  - works out change in quality for each type of item

### Overview

- Legacy codebase in JavaScript was taken from [Emily Bache's repository](https://github.com/emilybache/GildedRose-Refactoring-Kata/tree/main/js-mocha)
- The Mocha testing framework was chosen as a chance to learn new technologies
- The first task was to understand the existing codebase
- the gildedRose.js file was split into class files to prevent temptation of updating Item code
- The intial refactor was scaffolded by adding unit tests to Shop, to ensure that any changes made weren't breaking the currently functioning code
- Named functions were added in order to make the code within the updateQuality method more declarative
- It became clear that these methods should reside within a separate class, and so the QualityCalculator class was created
- Tests were separated into separate files to ensure proper isolation of the classes under test
- The Sinon library was added to mock dependencies where appropriate
- Changes in rate of quality decline were test-driven
- the handling of **Conjured Items** was introduced as the code was now easier to extend
- Based on the learning points from the previous tech tests, logic was further encapsulated in clearly named methods
- Self-assessment form carried out

## Next Steps

- incorporate improvements based on self-assessment form
- decide upon route to actually run code (exampleRun.js vs REPL)
  - include screenshot of functioning code
- submit for Coach review

# Appendix

### Coverage

| File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| -------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files            | 100     | 100      | 100     | 100     |
| item.js              | 100     | 100      | 100     | 100     |
| qualityCalculator.js | 100     | 100      | 100     | 100     |
| shop.js              | 100     | 100      | 100     | 100     |

### Example Progression

| Standard Item | Day 0 | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 |
| ------------- | ----- | ----- | ----- | ----- | ----- | ----- |
| Quality       | 20    | 19    | 18    | 17    | _15_  | _13_  |
| Sell By       | 3     | 2     | 1     | 0     | -1    | -2    |

| Aged Item | Day 0 | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 |
| --------- | ----- | ----- | ----- | ----- | ----- | ----- |
| Quality   | 5     | 6     | 7     | 8     | 9     | 10    |
| Sell By   | 3     | 2     | 1     | 0     | -1    | -2    |

| Backstage Pass | Day 0 | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 |
| -------------- | ----- | ----- | ----- | ----- | ----- | ----- |
| Quality        | 5     | 8     | 11    | 14    | 0     | 0     |
| Sell By        | 3     | 2     | 1     | 0     | -1    | -2    |

| Legendary Item | Day 0 | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 |
| -------------- | ----- | ----- | ----- | ----- | ----- | ----- |
| Quality        | 80    | 80    | 80    | 80    | 80    | 80    |
| Sell By        | 0     | 0     | 0     | 0     | 0     | 0     |
