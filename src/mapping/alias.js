const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "alias_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      ip: { type: "ip" }
    }
  }
};
const silent = true;

class AliasMappings extends BaseMappingClass {
  aliasName = "myIpSuperIndex";

  /*
  The rolling index is a special alias that manages the auto-creation of new indices when one of the conditions is matched.
  This is a very convenient functionality because it is completely managed by Elasticsearch, reducing the need for a lot of custom backend user code.
  The information for creating the new index is taken from the source, but you can also apply custom settings at the creation of the index.
  The naming convention is managed by Elasticsearch, which automatically increments the numeric part of the index name (by default, it uses six ending digits).
  */
  async createAlias() {
    return this.getClient().indices.updateAliases({
      body: {
        actions: {
          add: {
            index: indexName,
            alias: this.aliasName
          }
        }
      }
    });
  }

  async delAlias() {
    return this.getClient().indices.updateAliases({
      body: {
        actions: {
          remove: {
            index: indexName,
            alias: this.aliasName
          }
        }
      }
    });
  }

  async searchInAlias(reqBody) {
    const { body } = await this.getClient().search({
      index: this.aliasName,
      body: reqBody
    });
    return body;
  }
}

/*
 If you use aliases in your application’s Elasticsearch requests, you can reindex data with no downtime or changes to your app’s code.
*/
module.exports = new AliasMappings(indexName, mappings, silent);
