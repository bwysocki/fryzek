const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "bool_index";

const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      ip: { type: "ip" }
    }
  }
};
const silent = true;

/*
must: A list of queries that must be satisfied. All the must queries must be verified to return the hits. It can be seen as an AND filter with all its sub queries.
must_not: A list of queries that must not be matched. It can be seen as not filter of an AND query.
should: A list of queries that can be verified. The minimum number of these queries that must be verified and this value is controlled by minimum_should_match (default 1).
filter: A list of queries to be used as the filter. They allow the user to filter out results without changing the score and relevance. The filter queries are faster than standard ones because they don't need to compute the score.
*/
class BoolMappings extends BaseMappingClass {}

module.exports = new BoolMappings(indexName, mappings, silent);
