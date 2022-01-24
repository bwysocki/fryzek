const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

class SampleIndex extends BaseMappingClass {}

module.exports = (indexName, mappings) =>
  new SampleIndex(indexName, mappings, true);
