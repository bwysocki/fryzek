const logger = require("../config/logger");
const utils = require("../utils");

const arrays = require("./arrays");

describe("arrays", () => {
  it("should map arrays correctly - very simple as it is a default Lucene behavior ", async () => {
    await arrays.createIndex();

    const body = await arrays.insertData([
      { id: 1, tag: "test" },
      { id: 1, tag: ["test", "a", "b"] },
      { id: 1, tag: ["b", "c"] }
    ]);

    const searchBody = await arrays.search({
      stored_fields: ["id", "tag"],
      query: {
        match: {
          tag: "b"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await arrays.deleteIndex();
  });
});
