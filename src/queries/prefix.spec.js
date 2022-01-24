const logger = require("../config/logger");
const utils = require("../utils");

const prefix = require("./prefix");

describe("prefix", () => {
  it("should search by prefix ", async () => {
    await prefix.createIndex();

    const body = await prefix.insertData([
      {
        id: 1,
        tag: "test",
        tekst: "Ala ma kota",
        fileName: "aaa.txt",
        fileNameSuffix: ".txt"
      },
      {
        id: 2,
        tag: ["test", "a", "b"],
        tekst: "Kotek ma psa",
        fileName: "bbb.jpg",
        fileNameSuffix: ".jpg"
      },
      {
        id: 3,
        tag: ["b", "c"],
        tekst: "Pies i kot to fajne zwierzeta",
        fileName: "ccc.pdf",
        fileNameSuffix: ".pdf"
      }
    ]);

    let searchBody = await prefix.search({
      //profile: true,
      query: {
        prefix: {
          fileNameSuffix: ".pdf"
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await prefix.deleteIndex();
  });
});
