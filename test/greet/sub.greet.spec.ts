import { greet } from 'src/greet';

describe("Greeting", () => {
  describe("Given name bar", () => {
    const name = "bar";
    it("When greet is called, then greeting will be Hello bar", () => {
      const result = greet(name);

      expect(result).toBe("Hello bar");
    });

    it("When greet is called another time, then greeting will still be Hello bar", () => {
        const result = greet(name);
  
        expect(result).toBe("Hello bar");
      });
  });
});
