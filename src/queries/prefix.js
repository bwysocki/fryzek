const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "prefix_index";
const mappings = {
  settings: {
    analysis: {
      analyzer: {
        reverse_analyzer: {
          type: "custom",
          tokenizer: "keyword",
          filter: ["lowercase", "reverse"]
        }
      }
    }
  },
  mappings: {
    properties: {
      id: { type: "integer" },
      tag: { type: "keyword", store: true },
      tekst: { type: "text" },
      fileName: {
        type: "keyword"
      },
      fileNameSuffix: {
        type: "keyword"
      }
    }
  }
};
const silent = true;

class PrefixMappings extends BaseMappingClass {}

module.exports = new PrefixMappings(indexName, mappings, silent);
