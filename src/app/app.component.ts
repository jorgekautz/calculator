import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  history = ' ';
  number1: number;
  number2: number;
  operator: string;
  result = '0';

  ngOnInit(): void {
    if (localStorage.getItem('dark-mode') === 'true') {
      this.modeDark();
    }
  }

  press(key: string): void {
    document.querySelector('#firstRow').classList.add('m-top');
    // Evaluo el ingreso del primer número
    if (key === '+' || key === '-' || key === 'x' || key === '÷') {
      this.operator = key;
      this.history += ' ' + key + ' ';
    } else {
      if (key === '0' || key === '1' || key === '2' || key === '3' || key === '4'
        || key === '5' || key === '6' || key === '7' || key === '8' || key === '9') {
          this.history += key;
          if (this.operator) {
          if (this.number2) {
            const separator = ' ' + this.operator + ' ';
            const numbers = this.history.split(separator);
            this.number2 = +numbers[1];
          } else {
            if (+key) {
              this.number2 = +key;
            }
          }
        } else {
          this.number1 = +this.history;
        }
      } else {
        if (key === 'C') {
          this.clear();
        } else {
          if (key === '<') {
            this.back();
          } else {
            if (key === '=') {
              this.history += ' ' + key;
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
            } else {
              if (key === '.') {
                if (this.history) {
                  this.history += '.';
                }
              }
            }
          }
        }
      }
    }
    console.log('number1: ' + this.number1);
    console.log('number2: ' + this.number2);
  }

  private clear(): void {
    this.history = '';
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
        this.history = this.number1.toString() + ' '
          + this.operator + this.number2.toString();
      }
    } else {
      if (this.number1) {
        module = this.number1 % 10;
        this.number1 = (this.number1 - module) / 10;
        this.history = this.number1.toString();
      }
    }
  }

  modeDark(): void {
    document.body.classList.toggle('dark');
    document.querySelector('#switch').classList.toggle('active');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('dark-mode', 'true');
    } else {
      localStorage.setItem('dark-mode', 'false');
    }
  }
}
