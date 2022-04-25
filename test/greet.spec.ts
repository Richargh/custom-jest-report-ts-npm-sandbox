import { greet } from 'src/greet';

describe("Greeting", () => {
  describe("Given name foo", () => {
    const name = "foo";
    it("\\nWhen greet is called, \\nthen greeting will be Hello foo", () => {
      const result = greet(name);

      expect(result).toBe("Hello foo");
    });
  });
});
