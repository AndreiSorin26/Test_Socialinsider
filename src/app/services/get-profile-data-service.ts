import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Response2} from "../models/response2";

@Injectable({
  providedIn: 'root'
})
export class GetProfileDataService {
  private baseUrl = 'http://localhost:5000/get-profiles-data';

  constructor(private http: HttpClient) { }

  get(day: string, month: string, year: string, timezone: string, profile_type: string, id: string): Observable<any>
  {
    const url = `${this.baseUrl}/`;
    const info = {params: { day: day,
                            month: month,
                            year: year,
                            timezone: timezone,
                            profile_type: profile_type,
                            id: id
                          }
                 };
    return this.http.get<Response2>(url, info).pipe(
      map(resp => resp.resp),
    );
  }
}

