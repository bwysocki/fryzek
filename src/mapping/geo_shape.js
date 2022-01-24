const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "geo_shape";

/*
Elasticsearch encodes geo_shape values as BKD trees by default. To use BKD encoding, do not specify the following mapping options:
  distance_error_pct
  points_only
  precision
  strategy
  tree_levels
  tree
*/
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      city: { type: "text" },
      location: { type: "geo_shape" } // many configurations here -> performance!!!
    }
  }
};
const silent = true;

class GeoShapeMappings extends BaseMappingClass {}

module.exports = new GeoShapeMappings(indexName, mappings, silent);
