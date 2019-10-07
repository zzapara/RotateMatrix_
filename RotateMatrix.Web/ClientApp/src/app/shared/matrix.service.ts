import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { element } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private baseUrl: string;
  private rotateLeftUrl: string;
  private rotateRightUrl: string;
  private GenerateMatrixUrl: string;
  private UploadFileUrl: string;
  private SaveMatrixToFileUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/matrix/';
    this.rotateLeftUrl = this.baseUrl + 'RotateLeft';
    this.rotateRightUrl = this.baseUrl + 'RotateRight';
    this.GenerateMatrixUrl = this.baseUrl + 'GenerateMatrix';
    this.UploadFileUrl = this.baseUrl + 'UploadFromFile';
    this.SaveMatrixToFileUrl = this.baseUrl + 'SaveToFile';
  }

  GenerateMatrix(_rank: number, _minValue: number, _maxValue: number): Observable<number[][]> {
    const params = {
      rank : _rank.toString(),
      minValue: _minValue.toString(),
      maxValue: _maxValue.toString(),
    };
    return this.http.get<number[][]>(this.GenerateMatrixUrl,  {params} );
  }

  RotateRight(matrix: number[][]): Observable<number[][]> {
    return this.http.post<number[][]>(this.rotateRightUrl, matrix);
  }

  RotateLeft(matrix: number[][]): Observable<number[][]> {
    return this.http.post<number[][]>(this.rotateLeftUrl, matrix);
  }

  UploadFile(fileToUpload: Blob) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    console.log(formData);
    return this.http.post<number[][]>(this.UploadFileUrl, formData);
  }

  SaveMatrixToFile(matrix: number[][]): Observable<Blob> {
     return this.http.post(this.SaveMatrixToFileUrl, matrix, {responseType: 'blob'});
  }

  getTest() {
    return this.http.get<string>(this.baseUrl + 'Test' );
  }
}
