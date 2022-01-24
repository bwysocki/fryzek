const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "ud_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      ip: { type: "ip" } //  it tries to convert its value to a numerical form and generate tokens for fast value searching
    }
  }
};
const silent = true;

class UDMappings extends BaseMappingClass {
  async delete_by_query(reqBody) {
    const { body } = await client.delete_by_query({
      index: this.indexName,
      body: reqBody
    });
    return body;
  }
  async update_by_query(reqBody) {
    const { body } = await client.update_by_query({
      index: this.indexName,
      body: reqBody
    });
    return body;
  }
}

module.exports = new UDMappings(indexName, mappings, silent);
