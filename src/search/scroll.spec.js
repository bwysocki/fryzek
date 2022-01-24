const logger = require("../config/logger");
const utils = require("../utils");

const scroll = require("./scroll");

describe("scroll", () => {
  it("should work  correctly", async () => {
    //await scroll.deleteIndex();
    await scroll.createIndex();

    const body = await scroll.insertData([
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

    const searchBody = await scroll.searchForScroll("1m", {
      query: {
        match: {
          lastName: "Wysocki"
        }
      }
    });

    const scrollId = searchBody._scroll_id;

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);
    //logger.info(`Scroll id = ${scrollId}`);

    const scrollBody = await scroll.scroll(scrollId); // get the next response if there are more records to fetch

    //logger.info(`Scroll results = ${utils.pretty(scrollBody)}`);

    await scroll.deleteIndex();
  });
});
