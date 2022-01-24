const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "completition_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      name: { type: "text" },
      suggest: {
        type: "completion"
      }
    }
  }
};
const silent = true;

class CompletitionMappings extends BaseMappingClass {}

module.exports = new CompletitionMappings(indexName, mappings, silent);
