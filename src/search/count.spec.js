const logger = require("../config/logger");
const utils = require("../utils");

const count = require("./count");

describe("count", () => {
  it("should count", async () => {
    //await count.deleteIndex();
    await count.createIndex();

    const body = await count.insertData([
      { id: 1, ip: "19.18.200.201" },
      { id: 2, ip: "12.12.223.223" }
    ]);

    const searchBody = await count.count({
      query: {
        match: {
          ip: "12.12.223.223"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    const searchBody2 = await count.search({
      profile: true,
      query: {
        match: {
          ip: "12.12.223.223"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody2)}`);

    await count.deleteIndex();
  });
});
