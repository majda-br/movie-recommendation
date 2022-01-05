import add2Numbers from "../someRandomFileToTest";

it("should correctly add 2 numbers", () => {
  const result = add2Numbers(2, 3);
  expect(result).toBe(5);
});
