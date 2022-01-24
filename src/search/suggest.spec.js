const logger = require("../config/logger");
const utils = require("../utils");

const suggest = require("./suggest");

describe("suggest", () => {
  it("should suggest something", async () => {
    //await suggest.deleteIndex();
    await suggest.createIndex();

    const body = await suggest.insertData([
      {
        id: 1,
        name: "Bartosz Wysocki"
      },
      {
        id: 2,
        name: "Mark Twain"
      },
      {
        id: 3,
        name: "Bartosz Kanak"
      },
      {
        id: 4,
        name: "Bartoz Wegorz"
      }
    ]);

    /*
     completion suggester - a type of suggester which is optimized for auto-complete functionality
    */
    const searchBody = await suggest.search({
      suggest: {
        "name-suggest": {
          text: "Bartos",
          term: {
            field: "name"
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await suggest.deleteIndex();
  });
});
