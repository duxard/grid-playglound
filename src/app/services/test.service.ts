import { Injectable } from '@angular/core';

@Injectable()
export class TestService {
  logMessage(): void {
    console.log("Hi from TestService");
  }
}
