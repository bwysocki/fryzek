const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "query_string_index";
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

//The query_string query is one of the most powerful types of queries
class QueryStringMappings extends BaseMappingClass {}

module.exports = new QueryStringMappings(indexName, mappings, silent);
