const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

// Every field is automatically managed as an array. There is no difference if you declare a single value or a multi-value due to its Lucene core nature.
const indexName = "arrays_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      tag: { type: "keyword", store: true }
    }
  }
};
const silent = true;

/**
 * 'store' flag in mapping + `stored_fields` property in query
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-store.html
 *
 * Example normal query response:
 *  "hits": [
      {
        "_index": "arrays_index",
        "_type": "_doc",
        "_id": "4w9n_nwBswMui3RrLp9w",
        "_score": 0.5908618,
        "_source": { <-------------------------------------
          "id": 1,
          "tag": [
            "test",
            "a",
            "b"
          ]
        }
      }
    ]
 *
 * Example stored_fields: ["id", "tag"] query:
 *  "hits": [
      {
        "_index": "arrays_index",
        "_type": "_doc",
        "_id": "5g9o_nwBswMui3RrvZ8X",
        "_score": 0.5908618,
        "fields": { <-------------------------------------
          "tag": [
            "test",
            "a",
            "b"
          ]
        }
      }
    ]
 In certain situations it can make sense to store a field.
 For instance, if you have a document with a title, a date, and a very large content field,
 you may want to retrieve just the title and the date without having to extract those fields from a large _source field:
 **/
class ArraysMappings extends BaseMappingClass {}

module.exports = new ArraysMappings(indexName, mappings, silent);
