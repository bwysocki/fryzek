const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "multi_fields";

// It is often useful to index the same field in different ways for different purposes.
// This is the purpose of multi-fields. For instance, a string field could be mapped
// as a text field for full-text search, and as a keyword field for sorting or aggregations:
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      city: {
        type: "text",
        fields: {
          //To define a multifield property, we need to define a dictionary containing the fields subfield
          raw: {
            type: "keyword"
          }
        }
      }
    }
  }
};
const silent = true;

class MultiFieldMappings extends BaseMappingClass {}

module.exports = new MultiFieldMappings(indexName, mappings, silent);
