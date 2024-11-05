import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;
  beforeEach(() => {
    pipe = new StrengthPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display weak if value less than 10 is passed', () => {
    const weakValues = [1, 5, 9];
    weakValues.forEach((val) => {
      expect(pipe.transform(val)).toBe(val + ' (weak)');
    });
    expect(pipe.transform(10)).not.toBe(10 + ' (weak)');
  });

  it('should display strong if value is in range [10,19]', () => {
    const allStrongValues = [10, 15, 19];
    allStrongValues.forEach((val) => {
      expect(pipe.transform(val)).toBe(val + ' (strong)');
    });
    expect(pipe.transform(20)).not.toBe(20 + ' (strong)');
  });

  it('should display strongest when pass values greater than 19', () => {
    const allStrongestValues = [20, 25, 30];
    allStrongestValues.forEach((val) => {
      expect(pipe.transform(val)).toBe(val + ' (strongest)');
    });

    expect(pipe.transform(19)).not.toBe(19 + ' (strongest)');
    expect(pipe.transform(-1)).not.toBe(-1 + ' (strongest)');
  });
});
