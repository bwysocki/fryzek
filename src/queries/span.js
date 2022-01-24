const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "span_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      tag: { term_vector: "with_positions_offsets", store: true, type: "text" },
      tekst: { type: "text" }
    }
  }
};
const silent = true;

/*
The span query family is a group of queries that control a sequence of text tokens using their positions: the standard queries don't take care of the positional presence of text tokens.
Queries:
- span_term -  usage is similar to the term of the standard query
- span_first - query defines a query in which the span_term must match in the first token, or near it

*/
class SpanMappings extends BaseMappingClass {}

module.exports = new SpanMappings(indexName, mappings, silent);
