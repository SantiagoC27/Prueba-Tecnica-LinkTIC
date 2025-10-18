import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos-list.html',
  styleUrls: ['./productos-list.scss']
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];
  loading = true;
  error = '';

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productoService
      .getAll()
      .pipe(
        finalize(() => {
          this.loading = false;
          // Zoneless CD: asegurar que la vista se actualiza
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.productos = data;
        },
        error: () => {
          this.error = 'Error al cargar productos';
          try {
            this.toastr.error('No se pudieron cargar los productos', 'Error');
          } catch {}
        }
      });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.delete(id).subscribe({
        next: () => {
          this.toastr.success('Producto eliminado correctamente');
          this.cargarProductos();
        },
        error: () => {
          this.toastr.error('No se pudo eliminar el producto', 'Error');
        }
      });
    }
  }
}
