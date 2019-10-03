import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Endpoint } from '../config/api';
import { viaje } from '../models/viaje';
import { respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor(private http: HttpClient) { }

  //Llamado a la web api por medio de HttpClient
  CalculateJourney(Elements: viaje){
    return this
      .http.post<respuesta>(`${environment.apiURL}${Endpoint.Calculate}`,Elements)
      .pipe(map(data => data));
  }
}
