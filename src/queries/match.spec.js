const logger = require("../config/logger");
const utils = require("../utils");

const match = require("./match");

describe("match", () => {
  it("should search by match ", async () => {
    //await match.deleteIndex();
    await match.createIndex();

    const body = await match.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota" },
      { id: 2, tag: ["test", "a", "b"], tekst: "Kotek ma psa" },
      { id: 3, tag: ["b", "c"], tekst: "Pies i kot to fajne zwierzeta" }
    ]);

    let searchBody = await match.search({
      //The provided text is analyzed before matching.
      query: {
        match: {
          tekst: {
            query: "kot ma",
            fuzziness: 5
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await match.deleteIndex();
  });
  it("should search by match_phrase ", async () => {
    //await match.deleteIndex();
    await match.createIndex();

    const body = await match.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota" },
      { id: 2, tag: ["test", "a", "b"], tekst: "Kotek ma psa" },
      { id: 3, tag: ["b", "c"], tekst: "Pies i kot to fajne zwierzeta" }
    ]);

    /*
    match_phrase query will analyze the input if analyzers are defined for the queried field and find documents matching the following criteria:
    all the terms must appear in the field
    they must have the same order as the input value
    there must not be any intervening terms, i.e. be consecutive (potentially excluding stop-words but this can be complicated)
    */
    let searchBody = await match.search({
      query: {
        match_phrase: {
          tekst: "ma kota"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await match.deleteIndex();
  });
  it("should search by match_phrase_prefix ", async () => {
    //await match.deleteIndex();
    await match.createIndex();

    const body = await match.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota" },
      { id: 2, tag: ["test", "a", "b"], tekst: "Kotek ma psa" },
      { id: 3, tag: ["b", "c"], tekst: "Pies i kot to fajne zwierzeta" }
    ]);

    let searchBody = await match.search({
      query: {
        match_phrase_prefix: {
          tekst: "Ala ma"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await match.deleteIndex();
  });
  it("should search by multi_match ", async () => {
    //await match.deleteIndex();
    await match.createIndex();

    const body = await match.insertData([
      { id: 1, tag: "test", tekst: "Ala ma kota" },
      { id: 2, tag: ["test", "a", "b"], tekst: "Kotek ma psa" },
      { id: 3, tag: ["b", "c"], tekst: "Pies i kot to fajne zwierzeta" }
    ]);

    let searchBody = await match.search({
      query: {
        multi_match: {
          fields: ["tag", "tekst"],
          query: "test",
          operator: "and"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await match.deleteIndex();
  });
});
