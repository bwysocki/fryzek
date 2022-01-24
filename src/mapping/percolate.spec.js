const logger = require("../config/logger");
const utils = require("../utils");

const percolate = require("./percolate");

describe("percolate", () => {
  it("should map percolate correctly", async () => {
    await percolate.createIndex();

    const body = await percolate.insertData([
      {
        query: {
          match: {
            message: "bonsai tree"
          }
        }
      }
    ]); // Register a query in the percolator:

    const searchBody = await percolate.search({
      query: {
        percolate: {
          field: "query",
          document: {
            message: "A new bonsai tree in the office"
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    /*
    Applies to:
      - price monitoring
      - news alerts
      - stock alerts
      - logs monitoring
    */

    await percolate.deleteIndex();
  });
});
