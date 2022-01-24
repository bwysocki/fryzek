const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "ip_index";

/*
When Elasticsearch processes a new mapping and finds a _meta field, it stores it in the global mapping status and propagates the information to all the cluster nodes.
_meta is only used for storing purposes; it's not indexed and searchable.

It can be used for the following reasons:

 - Storing type metadata
 - Storing object relational mapping (ORM) related information
 - Storing type permission information
 - Storing extra type information (that is, icon filename used to display the type)
 - Storing template parts for rendering web interfaces
*/
const mappings = {
  mappings: {
    _meta: {
      class: "MyApp::IPClass",
      version: {
        min: "1.0",
        max: "1.3"
      }
    },
    properties: {
      id: { type: "integer" },
      ip: { type: "ip" } //  it tries to convert its value to a numerical form and generate tokens for fast value searching
    }
  }
};
const silent = true;

class IPMappings extends BaseMappingClass {}

module.exports = new IPMappings(indexName, mappings, silent);
