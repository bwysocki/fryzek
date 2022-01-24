const logger = require("../config/logger");
const client = require("../config/elastic");

module.exports = async () => {
  const { body } = await client.cat.indices();
  //logger.info(`All indices in elastic: \n\n${body}\n`);
};
