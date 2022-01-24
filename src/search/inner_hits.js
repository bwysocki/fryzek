const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "objects_nested";

// allows arrays of objects to be indexed in a way that they can be queried independently of each other
// if you need to index arrays of objects and to maintain the independence of each object in the array, use the nested data type instead of the object data type
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

class ObjectNestedMappings extends BaseMappingClass {}

module.exports = new ObjectNestedMappings(indexName, mappings, silent);
