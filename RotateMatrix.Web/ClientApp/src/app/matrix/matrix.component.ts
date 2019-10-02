import { Component, OnInit } from '@angular/core';
import { MatrixService } from '../shared/matrix.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatrixDefaultParameters } from '../shared/MatrixDefaultParameters';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styles: []
})
export class MatrixComponent implements OnInit {
  matrixParameters: FormGroup;
  matrix: number[][];

  constructor(private matrixService: MatrixService, private fb: FormBuilder, private matrixDefaultParameters: MatrixDefaultParameters) {
  }

  ngOnInit() {
    this.matrixParameters = this.fb.group({
      rank: [this.matrixDefaultParameters.rankValueDefault],
      minValue: [this.matrixDefaultParameters.minValue],
      maxValue: [this.matrixDefaultParameters.maxValue]
    }, {validator: [this.compareMinAndMaxValues]});

    this.onChange(['minValue', 'maxValue']);
  }

  get rank(): number {
    return this.matrixParameters.get('rank').value;
  }

  get minVal(): number {
    return this.matrixParameters.get('minValue').value;
  }

  get maxVal(): number {
    return this.matrixParameters.get('maxValue').value;
  }

  GenerateMatrix(rank: number, minVal: number, maxValue: number) {
    this.matrixService.GenerateMatrix(rank, minVal, maxValue).subscribe(
      res => {
        this.matrix = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  RotateRight() {
    this.matrixService.RotateRight(this.matrix).subscribe(
      res => this.matrix = res,
      err => console.error(err)
    );
  }

  RotateLeft() {
    this.matrixService.RotateLeft(this.matrix).subscribe(
      res => this.matrix = res,
      err => console.error(err)
    );
  }

  onSubmit() {
    this.GenerateMatrix(this.rank, this.minVal, this.maxVal);
  }

  onChange(array: string[]) {
    const changeIfNaN = (val, name: string): number => {
      val = String(val).replace('e', '');
      val = String(val).replace(' ', '');

      if (isNaN(val)) {
        return Number(String(val).replace(/\D/g, ''));
      } else {
        return val;
      }
    };

    const changeIfEmpty = (val, name: string): number => {
      if (String(val).search('[0-9]') === -1) {
        return 0;
      } else {
        return val;
      }
    };

    const setToDefaultValue = (name: string): number => {
      return this.matrixDefaultParameters[name];
    };

    array.forEach(element => {
      this.matrixParameters.get(element).valueChanges.subscribe(val => {
        let newValue = val;
        newValue = changeIfNaN(newValue, element);
        newValue = changeIfEmpty(newValue, element);
        if (!this.matrixDefaultParameters.isParameterOk(element, newValue)) {
          newValue = setToDefaultValue(element);
        }
        if (val !== newValue) {
          this.matrixParameters.get(element).setValue(newValue);
        }
      });
    });

  }

  compareMinAndMaxValues(fg: FormGroup) {
    console.log(fg.get('minValue').value);
    const minValue: number = Number(fg.get('minValue').value);
    const maxValue: number = Number(fg.get('maxValue').value);
    if (minValue > maxValue) {
      fg.get('minValue').setValue(fg.get('maxValue').value);
    }
  }
}
