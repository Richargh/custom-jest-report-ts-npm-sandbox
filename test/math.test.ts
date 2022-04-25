import { sum } from 'src/sum';
import { mul } from 'src/mul';

describe("Math", () => {

  it("can sum", () => {
    const a = 5;
    const b = 10;
    
    const result = sum(a, b);

    expect(result).toBe(15);
  });

  it("can mul", () => {
    const a = 3;
    const b = 4;
    
    const result = mul(a, b);

    expect(result).toBe(12);
  });
});
