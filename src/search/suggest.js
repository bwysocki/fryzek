const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "suggest_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      name: { type: "text" }
    }
  }
};
const silent = true;

class SuggestMappings extends BaseMappingClass {}

module.exports = new SuggestMappings(indexName, mappings, silent);
