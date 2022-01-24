const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "hightlighting_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      title: { type: "text" },
      description: { type: "text" }
    }
  }
};
const silent = true;

class HL extends BaseMappingClass {}

module.exports = new HL(indexName, mappings, silent);
