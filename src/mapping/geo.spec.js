const logger = require("../config/logger");
const utils = require("../utils");

const geoPoint = require("./geo_point");
const geoShape = require("./geo_shape");

describe("geo", () => {
  it("shows how geo point works", async () => {
    await geoPoint.createIndex();

    const body = await geoPoint.insertData([
      {
        id: 1,
        city: "Borne Sulinowo",
        location: {
          lat: 41.12,
          lon: -71.34
        }
      },
      {
        id: 2,
        city: "Szczecin",
        location: [61.12, -21.45] // lon, lat
      },
      {
        id: 2,
        city: "Warszawa",
        location: "drm3btev3e86" //geocash - encodes a geographic location into a short string of letters and digits
      }
    ]);

    const searchBody = await geoPoint.search({
      query: {
        geo_bounding_box: {
          location: {
            top_left: {
              lat: 42,
              lon: -72
            },
            bottom_right: {
              lat: 40,
              lon: -74
            }
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await geoPoint.deleteIndex();
  });
  it("shows how geo shape works", async () => {
    await geoShape.createIndex();

    const body = await geoShape.insertData([
      {
        id: 1,
        city: "Borne Sulinowo",
        location: {
          type: "polygon",
          coordinates: [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ]
          ]
        }
      },
      {
        id: 2,
        city: "Szczecin",
        location: {
          type: "polygon",
          coordinates: [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ], // The first array represents the outer boundary of the polygon, the other arrays represent the interior shapes ("holes")
            [
              [100.2, 0.2],
              [100.8, 0.2],
              [100.8, 0.8],
              [100.2, 0.8],
              [100.2, 0.2]
            ]
          ]
        }
      },
      {
        id: 2,
        city: "Warszawa",
        location: {
          type: "multipolygon",
          coordinates: [
            [
              [
                [102.0, 2.0],
                [103.0, 2.0],
                [103.0, 3.0],
                [102.0, 3.0],
                [102.0, 2.0]
              ]
            ],
            [
              [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0],
                [100.0, 0.0]
              ],
              [
                [100.2, 0.2],
                [100.8, 0.2],
                [100.8, 0.8],
                [100.2, 0.8],
                [100.2, 0.2]
              ]
            ]
          ]
        }
      }
    ]);

    const searchBody = await geoShape.search({
      query: {
        geo_bounding_box: {
          location: {
            top_left: {
              lat: 90,
              lon: 0
            },
            bottom_right: {
              lat: 0,
              lon: 180
            }
          }
        }
      }
    });

    //logger.info(`Search results = ${utils.pretty(searchBody)}`);

    await geoShape.deleteIndex();
  });
});
