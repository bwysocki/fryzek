const indices = require("./indices");

describe("indices", () => {
  it("should return all indices in elasticsearch ", async () => {
    await indices();
  });
});
