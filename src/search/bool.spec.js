const logger = require("../config/logger");
const utils = require("../utils");

const bool = require("./bool");

describe("bool", () => {
  it("should work", async () => {
    //await bool.deleteIndex();
    await bool.createIndex();

    const body = await bool.insertData([
      { id: 1, ip: "19.18.200.201" },
      { id: 2, ip: "12.12.223.223" },
      { id: 3, ip: "14.12.223.223" },
      { id: 4, ip: "123.12.223.223" }
    ]);

    // must contributes to the score. In filter, the score of the query is ignored.
    const searchBody2 = await bool.search({
      query: {
        bool: {
          /*must: [
            {
              range: {
                id: {
                  gt: 1
                }
              }
            }
          ],*/
          filter: [
            // Use filter for faster searches
            {
              range: {
                id: {
                  gt: 1
                }
              }
            }
          ]
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody2)}`);

    await bool.deleteIndex();
  });
});
