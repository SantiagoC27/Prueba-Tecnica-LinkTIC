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
    return this.http.get<Inventario>(`${this.baseUrl}/producto/${idProducto}`);
  }

  // Obtener todo el inventario
  obtenerInventarios(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.baseUrl);
  }

  // Actualizar inventario
  actualizarInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(`${this.baseUrl}/${inventario.id}`, inventario);
  }

  // Crear inventario (opcional)
  crearInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.baseUrl, inventario);
  }

  // Eliminar inventario (opcional)
  eliminarInventario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
