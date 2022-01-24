const logger = require("../config/logger");
const utils = require("../utils");

const multifield = require("./multi_fields");

describe("multifield", () => {
  it("should map single property - city - to many properties", async () => {
    await multifield.createIndex();

    const body = await multifield.insertData([
      { id: 1, city: "Borne Sulinowo" },
      { id: 2, city: "Biała Podlaska" }, // - polish stemmer!!!
      { id: 3, city: "Biały Bór" },
      { id: 4, city: "Biały Adam" },
      { id: 5, city: "Szczecin" }
    ]);

    const searchBody = await multifield.search({
      query: {
        match: {
          city: "Biały"
        }
      },
      sort: {
        "city.raw": "asc"
      },
      aggs: {
        Cities: {
          terms: {
            field: "city.raw"
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await multifield.deleteIndex();
  });
});
