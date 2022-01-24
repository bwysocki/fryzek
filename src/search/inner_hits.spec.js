const logger = require("../config/logger");
const utils = require("../utils");

const ih = require("./inner_hits");

describe("inner hits", () => {
  it("should return nested objects ", async () => {
    //await ih.deleteIndex();
    await ih.createIndex();

    const body = await ih.insertData([
      {
        id: 1,
        kids: [
          { name: "Bartosz", lastName: "Wysocki", street: "Poldesława 5" },
          { name: "Stefan", lastName: "Białas" }
        ]
      }
    ]);

    const searchBody = await ih.search({
      query: {
        nested: {
          path: "kids",
          query: {
            bool: {
              must: [
                {
                  match: {
                    "kids.name": "Bartosz"
                  }
                },
                {
                  match: {
                    "kids.lastName": "Wysocki"
                  }
                }
              ]
            }
          },
          inner_hits: {}
        }
      }
    });
    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await ih.deleteIndex();
  });
});
