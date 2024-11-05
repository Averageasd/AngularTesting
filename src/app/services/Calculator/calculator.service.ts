import { LoggerService } from './../Logger/logger.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private loggerService: LoggerService) {}
  add(n1: number, n2: number) {
    let result = n1 + n2;
    this.loggerService.log('Add operation called');
    return result;
  }
  subtract(n1: number, n2: number) {
    let result = n1 - n2;
    this.loggerService.log('Subtract operation called');
    return result;
  }
}
