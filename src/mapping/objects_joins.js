const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "objects_joins";

// The disadvantage of nested objects is their dependence from their parent. If you need to change a value of a nested object,
// you need to reindex the parent (this brings a potential performance overhead if the nested objects change too quickly).
// To solve this problem, Elasticsearch allows you to define child documents.
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      name: { type: "text" }, // kid first name - parent child documents reside in the same index.
      lastName: { type: "text" }, // kid last name - parent child documents reside in the same index.
      kids_join: {
        type: "join",
        relations: {
          theParent: "kid"
        }
      }
    }
  }
};
const silent = true;

class ObjectJoinMappings extends BaseMappingClass {}

module.exports = new ObjectJoinMappings(indexName, mappings, silent);
