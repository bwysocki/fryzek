const logger = require("../config/logger");
const utils = require("../utils");

const sort = require("./sort");

describe("sort", () => {
  it("should sort based on firstName correctly", async () => {
    //await sort.deleteIndex();
    await sort.createIndex();

    const body = await sort.insertData([
      {
        id: 1,
        firstName: "Stefan",
        lastName: "Bialas",
        suggest: {
          input: ["Stefan", "Bialas"],
          weight: 20
        }
      },
      {
        id: 2,
        firstName: "Bartosz",
        lastName: "Wysocki",
        suggest: {
          input: ["Bartosz", "Wysocki"],
          weight: 20
        }
      },
      {
        id: 3,
        firstName: "Kustosz",
        lastName: "Wysocki",
        suggest: {
          input: ["Kustosz", "Wysocki"],
          weight: 20
        }
      },
      {
        id: 4,
        firstName: "Mark",
        lastName: "Twain",
        suggest: {
          input: ["Mark", "Wsocki"],
          weight: 20
        }
      }
    ]);

    const searchBody = await sort.search({
      query: {
        match: {
          lastName: "Wysocki"
        }
      },
      /*suggest: {
        LastNameSuggest: {
          prefix: "Wys",
          completion: {
            field: "suggest",
            size: 5,
            skip_duplicates: false, // only 1 record for this query
            fuzzy: {
              fuzziness: 2
            }
          }
        }
      },*/
      sort: [
        {
          firstName: {
            order: "desc",
            unmapped_type: "string", //this defines the type of the sort parameter if the value is missing. It's a best practice to define it to prevent sorting errors due to missing values.
            missing: "_last"
          }
        },
        //"lastName",
        "_score"
      ]
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await sort.deleteIndex();
  });
});
