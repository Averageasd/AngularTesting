import { TestBed } from '@angular/core/testing';
import { LoggerService } from './../Logger/logger.service';
import { CalculatorService } from './calculator.service';

class MockedLoggerService {
  log(message: string) {}

  clear() {}
}
// use pending or xit to mark test in pending state
describe('CalculatorService', function () {
  let mockedLogger: any = null;
  let calculatorService: CalculatorService;
  beforeEach(() => {
    console.log('calling before each');

    // mock the whole instance. it is completely different from original object
    // everything in mockedLogger is mocked.

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useClass: MockedLoggerService,
        },
      ],
    });
    mockedLogger = TestBed.inject(LoggerService) as MockedLoggerService;
    calculatorService = TestBed.inject(CalculatorService);
    spyOn(mockedLogger, 'log').and.callThrough();
    spyOn(mockedLogger, 'clear').and.callThrough();
  });
  it('should add two numbers', () => {
    console.log('calling add');
    let result = calculatorService.add(1, 2);
    // expect
    expect(result).toBe(3);

    expect(mockedLogger.log).toHaveBeenCalledTimes(1);
  });
  it('should subtract two numbers', () => {
    console.log('calling subtract');
    let result = calculatorService.subtract(2, 2);
    expect(result).toBe(0);
    expect(mockedLogger.log).toHaveBeenCalledTimes(1);
  });
});
