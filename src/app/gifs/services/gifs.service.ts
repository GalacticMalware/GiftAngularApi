import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InterfaceGIF } from '../interface/interface'

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  constructor(private http:HttpClient,public ob:Observable<any>){

  }

  private _historial: string[] = [];

  private apiKey: string = 'pkHxv1O5TPvVDA9ZALIaRpasNrqZ53lf';
  private url: string = 'https://api.giphy.com/v1/gifs/search?api_key=';

  public resultados: any [] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get<InterfaceGIF>(this.url+this.apiKey+"&q="+query+"&limit=10").subscribe((res)=>{
      console.log(res)
      this.resultados = res.data;      
    });
  }

  obserbable():void{
    
  }
}
