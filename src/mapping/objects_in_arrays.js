const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "objects_in_arrays_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      childs: {
        properties: {
          name: { type: "text" },
          lastName: { type: "text" }
        }
      }
    }
  }
};
const silent = true;

class ObjectsInArraysMappings extends BaseMappingClass {}

module.exports = new ObjectsInArraysMappings(indexName, mappings, silent);
