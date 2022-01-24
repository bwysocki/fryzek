const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "percolate_index";
const mappings = {
  mappings: {
    properties: {
      message: {
        type: "text"
      },
      query: {
        type: "percolator"
      }
    }
  }
};
const silent = true;

/**
What you usually do is index documents and get them back by querying. What the percolator allows you to do in a nutshell is index your queries and percolate documents
against the indexed queries to know which queries they match. It's also called reversed search, as what you do is the opposite to what you are used to.

There are different usecases for the percolator, the first one being any platform that stores users interests in order to send the right content to the right users as soon as it comes in.

For instance a user subscribes to a specific topic, and as soon as a new article for that topic comes in, a notification will be sent to the interested users.
You can express the users interests as an elasticsearch query, using the query DSL, and you can register it in elasticsearch as it was a document.
Every time a new article is issued, without needing to index it, you can percolate it to know which users are interested in it.
At this point in time you know who needs to receive a notification containing the article link (sending the notification is not done by elasticsearch though).
 An additional step would also be to index the content itself but that is not required.

Have a look at this presentation to see other couple of usecases and other features available in combination with the percolator starting from elasticsearch 1.0.
*/
class PercolateMappings extends BaseMappingClass {}

module.exports = new PercolateMappings(indexName, mappings, silent);
