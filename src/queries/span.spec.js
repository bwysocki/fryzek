const logger = require("../config/logger");
const utils = require("../utils");

const span = require("./span");

describe("span", () => {
  it("should search by span ", async () => {
    //await span.deleteIndex();
    await span.createIndex();

    const body = await span.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota" },
      { id: 2, tag: ["test", "a", "b"], tekst: "Kotek ma psa" },
      { id: 3, tag: ["b", "c"], tekst: "Pies i kot to fajne zwierzeta" }
    ]);

    let searchBody = await span.search({
      query: {
        span_or: {
          clauses: [
            {
              span_term: {
                tag: "a"
              }
            },
            {
              span_first: {
                match: {
                  span_term: {
                    tag: "b"
                  }
                },
                end: 1
              }
            }
          ]
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await span.deleteIndex();
  });
});
