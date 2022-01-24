const logger = require("../config/logger");
const utils = require("../utils");

const st = require("./search_template");

describe("st", () => {
  it("should allow to search by template ", async () => {
    const stName = "st-my-super-template";

    await st.createIndex();
    await st.createSearchTemplate(stName);

    const body = await st.insertData([
      { id: 1, tag: "test" },
      { id: 1, tag: ["test", "a", "b"] },
      { id: 1, tag: ["b", "c"] }
    ]);

    const searchBody = await st.search({
      stored_fields: ["id", "tag"],
      query: {
        match: {
          tag: "b"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    const searchBody2 = await st.searchTemplate({
      id: stName,
      params: {
        tag: "b"
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody2)}`);

    await st.deleteSearchTemplate(stName);
    await st.deleteIndex();
  });
});
