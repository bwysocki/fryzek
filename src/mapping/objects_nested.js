const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "inner_hits";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      kids: {
        type: "nested",
        properties: {
          name: { type: "text" },
          lastName: { type: "text" }
        }
      }
    }
  }
};
const silent = true;

class InnerHitsMappings extends BaseMappingClass {}

module.exports = new InnerHitsMappings(indexName, mappings, silent);
