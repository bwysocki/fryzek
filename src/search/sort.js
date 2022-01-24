const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "sort_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      firstName: { type: "keyword" },
      lastName: { type: "keyword" },
      suggest: {
        type: "completion"
      }
    }
  }
};
const silent = true;

class Sort extends BaseMappingClass {}

module.exports = new Sort(indexName, mappings, silent);
