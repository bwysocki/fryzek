const logger = require("../config/logger");
const utils = require("../utils");

const alias = require("./alias");

describe("alias", () => {
  it("should allow search by alias", async () => {
    //await alias.deleteIndex();
    await alias.createIndex();

    const body = await alias.insertData([
      { id: 1, ip: "19.18.200.201" },
      { id: 2, ip: "12.12.223.223" }
    ]);

    const query = {
      query: {
        match: {
          ip: "12.12.223.223"
        }
      }
    };
    const searchBody = await alias.search(query); // we search here by index - normally

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await alias.createAlias(); // we are creating alias

    const searchBodyInAlias = await alias.searchInAlias(query); // we search here by alias

    //logger.info(`Search results = ${utils.pretty(searchBodyInAlias)}`);

    await alias.delAlias();
    await alias.deleteIndex();
  });
});
