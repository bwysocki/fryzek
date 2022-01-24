const logger = require("../config/logger");
const utils = require("../utils");

const analyzer = require("./analyzers");

describe("analyzer", () => {
  it("shows how to map search and index analyzer", async () => {
    await analyzer.createIndex();

    const body = await analyzer.insertData([
      { id: 1, name: "test sentence number 1" },
      { id: 2, name: "some completely other sentence" }
    ]);

    const searchBody = await analyzer.search({
      query: {
        match: {
          name: "sentence"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await analyzer.deleteIndex();
  });
});
