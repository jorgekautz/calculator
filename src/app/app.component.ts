import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  history: string;
  number1: number;
  number2: number;
  operator: string;
  result = '0';

  press(key: string): void {
    console.log('Press: ' + key);
    // Guardo el historial de la calculadora
    (this.history) ? this.history += ' ' : this.history = '';
    // Evaluo el ingreso del primer número
    if (key === '+' || key === '-' || key === 'x' || key === '÷') {
      this.operator = key;
      this.history += key;
    } else {
      if (key === '0' || key === '1' || key === '2' || key === '3' || key === '4'
        || key === '5' || key === '6' || key === '7' || key === '8' || key === '9') {
        const keyNumber = +key;
        if (this.operator) {
          if (this.number2) {
            this.number2 = (this.number2 * 10) + keyNumber;
          } else {
            if (keyNumber) {
              this.number2 = keyNumber;
            }
          }
        } else {
          if (this.number1) {
            this.number1 = (this.number1 * 10) + keyNumber;
          } else {
            if (keyNumber) {
              this.number1 = keyNumber;
            }
          }
        }
        if (!(!this.operator && !this.number1 && key === '0') && !(this.operator && !this.number2 && key === '0')) {
          this.history += key;
        }
      } else {
        if (key === 'C') {
          this.clear();
        } else {
          if (key === '<') {
            this.back();
          } else {
            if (key === '=') {
              this.history += key;
              let resultNumber: number;
              if (this.number1 && this.operator && this.number2) {
                switch (this.operator) {
                  case '+':
                    resultNumber = this.number1 + this.number2;
                    this.result = resultNumber.toString();
                    break;
                  case '-':
                    resultNumber = this.number1 - this.number2;
                    this.result = resultNumber.toString();
                    break;
                  case 'x':
                    resultNumber = this.number1 * this.number2;
                    this.result = resultNumber.toString();
                    break;
                  case '÷':
                    console.log('2. Number2: ' + this.number2);
                    if (this.number2 === undefined) {
                      this.result = 'ERROR';
                    } else {
                      resultNumber = this.number1 / this.number2;
                      this.result = resultNumber.toString();
                    }
                    break;
                  default:
                }
                if (this.result === 'ERROR') {
                  this.history = '';
                } else {
                  this.history += ' ' + this.result;
                }
              }
            }
          }
        }
      }
    }
  }

  private clear(): void {
    this.history = undefined;
    this.number1 = undefined;
    this.number2 = undefined;
    this.operator = undefined;
    this.result = '0';
  }

  private back(): void {
    let module: number;
    if (this.operator) {
      if (this.number2) {
        module = this.number2 % 10;
        this.number2 = (this.number2 - module) / 10;
        this.history = this.number1.toString() + ' ' + this.operator + this.number2.toString();
      }
    } else {
      if (this.number1) {
        module = this.number1 % 10;
        this.number1 = (this.number1 - module) / 10;
        this.history = this.number1.toString();
      }
    }
  }

}
