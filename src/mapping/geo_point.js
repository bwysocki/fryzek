const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "geo_point";

/*
Fields of type geo_point accept latitude-longitude pairs, which can be used:
  to find geopoints within a bounding box, within a certain distance of a central point, or within a polygon or within a geo_shape query.
  to aggregate documents geographically or by distance from a central point.
  to integrate distance into a document’s relevance score.
  to sort documents by distance.
*/
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      city: { type: "text" },
      location: { type: "geo_point" }
    }
  }
};
const silent = true;

class GeoPointMappings extends BaseMappingClass {}

module.exports = new GeoPointMappings(indexName, mappings, silent);
