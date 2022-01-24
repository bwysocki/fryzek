const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "objects_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      child: {
        type: "object", // object is optional by defaul
        enabled: true, // this establishes whether or not the object should be processed. If it's set to false, the data contained in the object is not indexed and it cannot be searched (default true).
        properties: {
          name: { type: "text" },
          lastName: { type: "text" }
        }
      }
    }
  }
};
const silent = true;

class ObjectMappings extends BaseMappingClass {}

module.exports = new ObjectMappings(indexName, mappings, silent);
