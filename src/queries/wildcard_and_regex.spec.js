const logger = require("../config/logger");
const utils = require("../utils");

const war = require("./wildcard_and_regex");

describe("wilcard and regex", () => {
  it("should search by wilcard and regex ", async () => {
    await war.createIndex();

    const body = await war.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota" },
      { id: 2, tag: ["test", "ala", "buka"], tekst: "Kotek ma psa" },
      {
        id: 3,
        tag: ["babcia", "alicja"],
        tekst: "Pies i kot to fajne zwierzeta"
      }
    ]);

    let searchBody = await war.search({
      query: {
        wildcard: {
          tag: "al*"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    searchBody = await war.search({
      query: {
        regexp: {
          tag: {
            value: "al.*",
            flags: "ALL",
            case_insensitive: true
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await war.deleteIndex();
  });
});
