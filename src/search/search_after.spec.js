const logger = require("../config/logger");
const utils = require("../utils");

const sa = require("./search_after");

describe("search after", () => {
  it("should sort based on firstName correctly", async () => {
    //await sa.deleteIndex();
    await sa.createIndex();

    const body = await sa.insertData([
      {
        id: 1,
        firstName: "Stefan",
        lastName: "Bialas"
      },
      {
        id: 2,
        firstName: "Bartosz",
        lastName: "Wysocki"
      },
      {
        id: 3,
        firstName: "Kustosz",
        lastName: "Wysocki"
      },
      {
        id: 4,
        firstName: "Mark",
        lastName: "Twain"
      }
    ]);

    const searchBody = await sa.search({
      query: {
        match_all: {}
      },
      size: 2,
      sort: ["firstName", "_doc"]
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    const searchBody2 = await sa.search({
      query: {
        match_all: {}
      },
      size: 2,
      search_after: ["Kustosz", 2],
      sort: ["firstName", "_doc"]
    });

    //logger.info(`Search results = ${utils.pretty(searchBody2)}`);

    await sa.deleteIndex();
  });
});
