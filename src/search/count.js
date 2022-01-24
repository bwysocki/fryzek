const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "count_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      ip: { type: "ip" } //  it tries to convert its value to a numerical form and generate tokens for fast value searching
    }
  }
};
const silent = true;

class CountMappings extends BaseMappingClass {
  /*
   * To return the number of something (how many posts for a blog, how many comments for a post).
   * Validating whether some items are available. Are there posts? Are there comments?
   */
  async count(reqBody) {
    const { body } = await client.count({
      index: this.indexName,
      body: reqBody
    });
    return body;
  }
}

module.exports = new CountMappings(indexName, mappings, silent);
