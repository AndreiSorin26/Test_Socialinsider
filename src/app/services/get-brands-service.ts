import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Response} from "../models/response";
import {Brand} from "../models/brand";

@Injectable({
  providedIn: 'root'
})
export class GetBrandsService {
  private baseUrl = 'http://localhost:5000/get-brands';

  constructor(private http: HttpClient) { }

  get(): Observable<Brand[]>
  {
    const url = `${this.baseUrl}`;
    return this.http.get<Response>(url).pipe(
      map(resp => resp.result)
    );
  }
}
