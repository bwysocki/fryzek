const client = require("../config/elastic");
const logger = require("../config/logger");
const utils = require("../utils");

class BaseMappingClass {
  constructor(indexName, mappings, silent) {
    this.indexName = indexName;
    this.mappings = mappings;
    this.silent = silent;
  }

  async createIndex() {
    this.log(
      `Creating index with name = ${
        this.indexName
      }. The mapping: \n ${utils.pretty(this.mappings)}`
    );
    return client.indices.create({
      index: this.indexName,
      body: this.mappings
    });
  }

  async insertData(dataset) {
    const body = dataset.flatMap(doc => [
      { index: { _index: this.indexName } },
      doc
    ]);
    this.log(
      `Inserting data to index = ${this.indexName}. The body: \n ${utils.pretty(
        body
      )}`
    );
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      console.log(`Error : ${utils.pretty(bulkResponse)}`);
      throw new Error("Can not insert", bulkResponse.errors);
    }

    return body;
  }

  async put(body, id) {
    return await client.index({
      index: this.indexName,
      id,
      body
    });
  }

  async putWithRouting(body, id, routing) {
    return await client.index({
      index: this.indexName,
      id,
      body,
      routing
    });
  }

  async get(id) {
    return await client.get({
      index: this.indexName,
      id
    });
  }

  async search(reqBody) {
    const { body } = await client.search({
      index: this.indexName,
      body: reqBody
    });
    return body;
  }

  async deleteIndex() {
    /**
    *TODO - move to remove item operation
    * Lucene stores your data in several segments on disk. These segments are created when you index a new document or record, or when you delete a document.
    * In Elasticsearch, the deleted document is not removed from disk, but is marked as deleted (and referred to as a tombstone). To free up space, you need to forcemerge to purge deleted documents.
    * Due to all these factors, the segment numbers can be large. (For this reason, in the setup, we have increased the file description number for Elasticsearch processes.)
    * The main advantages of this are as follows:
      - Reducing both file descriptors
      - Freeing memory used by the segment readers
      - Improving performance during searches due to less segment management
    * ForceMerge is a very IO-heavy operation. The index can be unresponsive during this optimization.
    * It is generally executed on indices that are rarely modified, such as the logstash for previous days.
    */
    return client.indices.delete({
      index: this.indexName
    });
  }

  async refresh(reqBody) {
    await client.indices.refresh({ index: this.indexName });
  }

  getClient() {
    return client;
  }

  log(msg) {
    if (!this.silent) {
      logger.info(msg);
    }
  }
}

module.exports = BaseMappingClass;
