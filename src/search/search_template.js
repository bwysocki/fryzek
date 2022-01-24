const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "search_template_index";
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      tag: { type: "keyword", store: true }
    }
  }
};
const silent = true;

class STMappings extends BaseMappingClass {
  async createSearchTemplate(name) {
    return client.putScript({
      id: name,
      body: {
        script: {
          lang: "mustache",
          source: {
            query: {
              match: {
                tag: "{{tag}}"
              }
            }
          }
        }
      }
    });
  }
  async deleteSearchTemplate(name) {
    return client.deleteScript({
      id: name
    });
  }

  async searchTemplate(reqBody) {
    const { body } = await client.searchTemplate({
      index: this.indexName,
      body: reqBody
    });
    return body;
  }
}

module.exports = new STMappings(indexName, mappings, silent);
