const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "terms_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      tag: { type: "keyword", store: true },
      tekst: { type: "text" }
    }
  }
};
const silent = true;

class TermsMappings extends BaseMappingClass {}

module.exports = new TermsMappings(indexName, mappings, silent);
