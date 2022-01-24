const logger = require("../config/logger");
const utils = require("../utils");

const ip = require("./ip");

describe("ip", () => {
  it("should map ip correctly", async () => {
    await ip.createIndex();

    const body = await ip.insertData([
      { id: 1, ip: "19.18.200.201" },
      { id: 2, ip: "12.12.223.223" }
    ]);

    const searchBody = await ip.search({
      query: {
        match: {
          ip: "12.12.223.223"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await ip.deleteIndex();
  });
});
