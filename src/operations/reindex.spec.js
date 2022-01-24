const logger = require("../config/logger");
const utils = require("../utils");
const client = require("../config/elastic");

const sampleIndex = require("../mapping/sample_index");

/*
The most common scenarios are as follows:
- Changing an analyzer for a mapping
- Adding a new subfield to a mapping, whereupon you need to reprocess all the records to search for the new subfield
- Removing an unused mapping
- Changing a record structure that requires a new mapping
*/
describe("reindexing", () => {
  it("should map ip correctly", async () => {
    const idx1Name = "sample_index_07.11.02.12";
    const idx2Name = "sample_index_07.15.02.12";
    const idx1 = sampleIndex(idx1Name, {
      mappings: {
        properties: {
          id: { type: "integer" },
          ip: { type: "ip" }
        }
      }
    });
    const idx2 = sampleIndex(idx2Name, {
      mappings: {
        properties: {
          id: { type: "integer" },
          ip: { type: "text" },
          ip_address: { type: "ip" }
        }
      }
    });

    await idx1.createIndex();
    await idx2.createIndex();

    const body = await idx1.insertData([
      { id: 1, ip: "19.18.200.201" },
      { id: 2, ip: "12.12.223.223" }
    ]);

    await client.reindex({
      waitForCompletion: true,
      refresh: true,
      body: {
        source: {
          index: idx1Name,
          query: {
            match: { id: 2 }
          }
        },
        dest: {
          index: idx2Name
        },
        script: {
          lang: "painless", // scripting language
          source: "ctx._source['ip_address'] = ctx._source['ip'];"
        }
      }
    });

    const searchBody = await idx2.search({
      query: {
        match: {
          ip_address: "12.12.223.223"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await idx1.deleteIndex();
    await idx2.deleteIndex();
  });
});
