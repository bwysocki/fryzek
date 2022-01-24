const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "match_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      tag: { type: "keyword" },
      tekst: { type: "text" }
    }
  }
};
const silent = true;

class MatchMappings extends BaseMappingClass {}

module.exports = new MatchMappings(indexName, mappings, silent);
