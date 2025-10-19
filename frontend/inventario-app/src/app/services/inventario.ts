import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Inventario {
  id: number;
  producto_id: number;
  cantidad: number;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseUrl = environment.apiInventario;

  constructor(private http: HttpClient) {}

  // Obtener inventario de un producto
  obtenerInventarioPorProducto(idProducto: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.baseUrl}/${idProducto}`);
  }

  // Obtener todo el inventario
  obtenerInventarios(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.baseUrl);
  }

  // Actualizar inventario
  actualizarInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(`${this.baseUrl}/${inventario.id}`, { cantidad: inventario.cantidad });
  }
}
