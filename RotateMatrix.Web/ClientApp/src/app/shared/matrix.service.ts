import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { element } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/matrix/';
  }

  GenerateMatrix(_rank: number, _minValue: number, _maxValue: number): Observable<number[][]> {
    const params = {
      rank : _rank.toString(),
      minValue: _minValue.toString(),
      maxValue: _maxValue.toString(),
    };
    return this.http.get<number[][]>(this.baseUrl + 'GenerateMatrix',  {params} );
  }

  RotateRight(matrix: number[][]): Observable<number[][]> {
    return this.http.post<number[][]>(this.baseUrl + 'RotateRight', matrix);
  }

  RotateLeft(matrix: number[][]): Observable<number[][]> {
    return this.http.post<number[][]>(this.baseUrl + 'RotateLeft', matrix);
  }
}
