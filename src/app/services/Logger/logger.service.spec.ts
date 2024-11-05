import { LoggerService } from './logger.service';

describe('LoggerService', function () {
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
  });

  it('messages should be empty when instance is intantiated', () => {
    const messages: string[] = loggerService.messages;
    expect(messages.length).toBe(0);
  });

  it('messages should not be empty when some items are added ', () => {
    loggerService.log('item 1');
    loggerService.log('item 2');
    expect(loggerService.messages.length).not.toBe(0);
    expect(loggerService.messages).toContain('item 1');
    expect(loggerService.messages).toContain('item 2');
  });

  it('messages should be empty after clear is called ', () => {
    loggerService.log('item 1');
    loggerService.log('item 2');
    loggerService.log('item 3');
    loggerService.log('item 4');
    loggerService.clear();
    expect(loggerService.messages.length).toBe(0);
    expect(loggerService.messages).toEqual([]);
  });
});
