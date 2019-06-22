import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(
    private readonly http: HttpClient
  ) { }

  createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  getAllShipments(): Observable<any> {
    const url = 'api/v1/shipments';
    return this.http.get<any>(url);
  }

  getSingleShimpent(sscc: string): Observable<any> {
    let params = new HttpParams();
    const url = 'api/v1/shipments/';
    params = params.append(url, sscc);
    return this.http.get<any>(url);
  }

  createShipment(): Observable<any> {
    const url = 'api/v1/populates/shipments';
    return this.http.post<any>(url, null);
  }

  createMilestone(): Observable<any> {
    const url = 'api/v1/pupulates/milestones';
    return this.http.post<any>(url, null);
  }
}
