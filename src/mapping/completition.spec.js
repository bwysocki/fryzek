const logger = require("../config/logger");
const utils = require("../utils");

const completition = require("./completition");

describe("completition", () => {
  it("should suggest something", async () => {
    await completition.createIndex();

    const body = await completition.insertData([
      {
        id: 1,
        name: "Bartosz Wysocki",
        suggest: {
          input: ["Bartosz", "Wysocki"],
          weight: 20
        }
      },
      {
        id: 2,
        name: "Bartosz Fryderyk Nietsche",
        suggest: {
          input: ["Bartosz", "Nietsche, Freyderyk"],
          weight: 5
        }
      }
    ]);

    const searchBody = await completition.search({
      suggest: {
        "name-suggest": {
          prefix: "Bart",
          completion: {
            field: "suggest",
            size: 5,
            skip_duplicates: false, // only 1 record for this query
            fuzzy: {
              fuzziness: 2
            }
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await completition.deleteIndex();
  });
});
