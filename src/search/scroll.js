const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "scroll_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      firstName: { type: "keyword" },
      lastName: { type: "keyword" }
    }
  }
};
const silent = true;

/*
The scroll API can be used to retrieve large numbers of results (or even all results) from a single search request, in much the same way as you would use a cursor on a traditional database.
Scrolling is not intended for real time user requests, but rather for processing large amounts of data, e.g. in order to reindex the contents of one index into a new index with a different configuration.
*/
class Scroll extends BaseMappingClass {
  async searchForScroll(scrollTimeout, reqBody) {
    const { body } = await client.search({
      index: this.indexName,
      scroll: scrollTimeout,
      size: 1, // for the sake of this example, we will get only one result per search
      body: reqBody
    });
    return body;
  }
  async scroll(scrollId) {
    const { body } = await client.scroll({
      scroll_id: scrollId
    });
    return body;
  }
}

module.exports = new Scroll(indexName, mappings, silent);
