const logger = require("../config/logger");
const utils = require("../utils");

const hl = require("./highlighting");

describe("sort", () => {
  it("should highlight searched text", async () => {
    //await hl.deleteIndex();
    await hl.createIndex();

    const body = await hl.insertData([
      {
        id: 1,
        title:
          "This is the title of the covid article that is only a small abstract",
        description:
          "This is very long covid article. Covid is a bad. Covid is boring. Some other text. Some other text. Some other text. Some other text. Some other text. Some covid text. Some other text. "
      },
      {
        id: 2,
        title:
          "This is the title of the football article that is only a small abstract",
        description:
          "This is very long football article. Football is a good. Football is funny. Some other text. Some other text. Some other text. Some other text. Some other text. Some football text. Some other text."
      }
    ]);

    const searchBody = await hl.search({
      query: {
        query_string: {
          query: "covid"
        }
      },
      highlight: {
        pre_tags: [""],
        fields: {
          description: {
            order: "score",
            number_of_fragments: 2
          },
          title: {
            order: "score"
          }
        },
        post_tags: [""]
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await hl.deleteIndex();
  });
});
