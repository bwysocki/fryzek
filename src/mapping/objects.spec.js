const logger = require("../config/logger");
const utils = require("../utils");

const objects = require("./objects");
const objectsInArrays = require("./objects_in_arrays");
const objectsNested = require("./objects_nested");
const objectsJoins = require("./objects_joins");

describe("objects", () => {
  it("should map simple object correctly ", async () => {
    await objects.createIndex();

    const body = await objects.insertData([
      {
        id: 1,
        child: { name: "Bartosz", lastName: "Wysocki", street: "Poldesława 5" }
      },
      { id: 2, child: { name: "Stefan", lastName: "Białas" } }
    ]);

    const searchBody = await objects.search({
      query: {
        bool: {
          must: [
            {
              match: {
                "child.name": "Bartosz"
              }
            },
            {
              match: {
                "child.lastName": "Wysocki"
              }
            }
          ]
        }
      }
    }); // if `simple object` is not in the array => we can perform above quries.

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await objects.deleteIndex();
  });
  it("should show problem during search simple object in array ", async () => {
    await objectsInArrays.createIndex();

    const body = await objectsInArrays.insertData([
      {
        id: 1,
        childs: [
          { name: "Bartosz", lastName: "Wysocki", street: "Poldesława 5" },
          { name: "Stefan", lastName: "Białas" }
        ]
      }
    ]);

    const searchBody = await objectsInArrays.search({
      query: {
        bool: {
          must: [
            {
              match: {
                "childs.name": "Bartosz"
              }
            },
            {
              match: {
                "childs.lastName": "Białas"
              }
            }
          ]
        }
      }
    });

    /**
     *
     Even if there is no such kid as Bartosz Białas it is shown in search results
     Search results = {
          "hits": [
            {
              "_index": "objects_in_arrays_index",
              "_type": "_doc",
              "_id": "Xg9gA30BeplZ2e2MdOEg",
              "_score": 0.5753642,
              "_source": {
                "id": 1,
                "childs": [
                  {
                    "name": "Bartosz",
                    "lastName": "Wysocki",
                    "street": "Poldesława 5"
                  },
                  {
                    "id": 2,
                    "child": {
                      "name": "Stefan",
                      "lastName": "Białas"
                    }
                  }
                ]
              }
            }
          ]
        }
     */
    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await objectsInArrays.deleteIndex();
  });
  it("should show how nested objects work ", async () => {
    await objectsNested.createIndex();

    const body = await objectsNested.insertData([
      {
        id: 1,
        kids: [
          { name: "Bartosz", lastName: "Wysocki", street: "Poldesława 5" },
          { name: "Stefan", lastName: "Białas" }
        ]
      }
    ]);

    const searchBody = await objectsNested.search({
      query: {
        nested: {
          path: "kids",
          query: {
            bool: {
              must: [
                {
                  match: {
                    "kids.name": "Bartosz"
                  }
                },
                {
                  match: {
                    "kids.lastName": "Białas"
                  }
                }
              ]
            }
          }
        }
      }
    });
    // no results - as there is no Bartosz Białas
    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await objectsNested.deleteIndex();
  });
  it("should show how join objects work ", async () => {
    await objectsJoins.createIndex();

    const p1 = await objectsJoins.put({ id: 1, kids_join: "theParent" }, 1); //parent 1
    const p2 = await objectsJoins.put({ id: 2, kids_join: "theParent" }, 2); //parent 2

    const c1 = await objectsJoins.putWithRouting(
      {
        name: "kid one",
        lastName: "Adams",
        kids_join: { name: "kid", parent: 1 }
      },
      3,
      1 //routing
    ); //kid 1
    const c2 = await objectsJoins.putWithRouting(
      {
        name: "kid two",
        lastName: "Adams",
        kids_join: { name: "kid", parent: 1 }
      },
      4,
      1 //routing
    ); //kid 2

    const searchBody = await objectsJoins.search({
      query: {
        match_all: {}
      }
    });
    //logger.info(`Search parent results = ${utils.pretty(searchBody)}`);
    /*
    "hits": [
      {
        "_index": "objects_joins",
        "_type": "_doc",
        "_id": "1",
        "_score": 1,
        "_source": {
          "id": 1,
          "kids_join": "theParent"
        }
      },
      {
        "_index": "objects_joins",
        "_type": "_doc",
        "_id": "2",
        "_score": 1,
        "_source": {
          "id": 2,
          "kids_join": "theParent"
        }
      },
      {
        "_index": "objects_joins",
        "_type": "_doc",
        "_id": "3",
        "_score": 1,
        "_routing": "1",
        "_source": {
          "name": "kid one",
          "lastName": "Adams",
          "kids_join": {
            "name": "kid",
            "parent": 1
          }
        }
      },
      {
        "_index": "objects_joins",
        "_type": "_doc",
        "_id": "4",
        "_score": 1,
        "_routing": "1",
        "_source": {
          "name": "kid two",
          "lastName": "Adams",
          "kids_join": {
            "name": "kid",
            "parent": 1
          }
        }
      }
    ]
    */

    await objectsJoins.deleteIndex();
  });
});
