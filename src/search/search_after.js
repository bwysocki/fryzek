const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "search_after_index";

/*
Elasticsearch standard pagination using from and size perform very poorly on large datasets because, for every query,
you need to compute and discard all the results before the from value. Scrolling doesn't have this problem,
but it consumes a lot due to memory search contexts, so it cannot be used for frequent user queries.
*/
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      firstName: { type: "keyword" },
      lastName: { type: "keyword" }
    }
  }
};
const silent = true;

/*
Elasticsearch uses Lucene for indexing data. In Lucene indices, all the terms are sorted and stored in an ordered way,
so it's natural for Lucene to be extremely fast in skipping to a term value. This operation is managed in the Lucene
core with the skipTo method. This operation doesn't consume memory and in the case of search_after, a query is built
using search_after values to fast skip in Lucene search and to speed up the result pagination.

The search_after functionality was introduced in Elasticsearch 5.x,
but it must be kept as an important focal point to improve the user experience in search scrolling/pagination results.
*/
class SearchAfter extends BaseMappingClass {}

module.exports = new SearchAfter(indexName, mappings, silent);
