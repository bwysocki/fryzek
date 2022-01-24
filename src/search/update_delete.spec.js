const logger = require("../config/logger");
const utils = require("../utils");

const ud = require("./update_delete");

describe("ud", () => {
  it("should update", async () => {
    //await ud.deleteIndex();
    await ud.createIndex();

    const body = await ud.insertData([
      { id: 1, ip: "19.18.200.201" },
      { id: 2, ip: "12.12.223.223" }
    ]);

    const updateBody = await ud.update_by_query({
      query: {
        match: {
          ip: "12.12.223.223"
        }
      },
      script: {
        source: "ctx._source.ip='127.0.0.1'"
      }
    });

    //logger.info(`Update results = ${utils.pretty(updateBody)}`);

    await ud.refresh();

    const searchBody = await ud.search({
      query: {
        match: {
          id: 2
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    const deleteBody = await ud.delete_by_query({
      query: {
        match: {
          id: 2
        }
      }
    });

    //logger.info(`Delete results = ${utils.pretty(updateBody)}`);

    await ud.refresh();

    const searchBody2 = await ud.search({
      query: {
        match: {
          id: 2
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody2)}`);

    await ud.deleteIndex();
  });
});
