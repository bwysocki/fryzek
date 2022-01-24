const logger = require("../config/logger");
const utils = require("../utils");

const terms = require("./terms");

describe("terms", () => {
  it("should search by terms ", async () => {
    await terms.createIndex();

    const body = await terms.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota" },
      { id: 2, tag: ["test", "a", "b"], tekst: "Kotek ma psa" },
      { id: 3, tag: ["b", "c"], tekst: "Pies i kot to fajne zwierzeta" }
    ]);

    let searchBody = await terms.search({
      query: {
        terms: {
          tag: ["b", "test", "c"]
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    searchBody = await terms.search({
      query: {
        match: {
          tekst: "kto i pies"
        }
      }
    });
    // The match query will apply the same standard analyzer to the search term and will therefore match what is stored in the index.
    // The term query does not apply any analyzers to the search term, so will only look for that exact term in the inverted index.

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await terms.deleteIndex();
  });
});
