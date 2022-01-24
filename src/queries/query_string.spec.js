const logger = require("../config/logger");
const utils = require("../utils");

const qs = require("./query_string");

describe("qs", () => {
  it("should search qs ", async () => {
    //await qs.deleteIndex();
    await qs.createIndex();

    const body = await qs.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota i kot jest fajny" },
      { id: 2, tag: ["test", "a", "b"], tekst: "Kotek ma psa" },
      { id: 3, tag: ["b", "c"], tekst: "Pies i kot to fajne zwierzeta" }
    ]);

    let searchBody = await qs.search({
      query: {
        query_string: {
          query: `"kot" id:{ * TO 2 }`,
          fields: ["tekst"],
          default_operator: "and"
        }
      }
    });

    logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await qs.deleteIndex();
  });
});
