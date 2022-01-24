const { Client } = require("@elastic/elasticsearch");

const elasticUrl = "http://localhost:9401";
const esclient = new Client({ node: elasticUrl });

module.exports = esclient;
