import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';
import { InventarioService } from '../../services/inventario';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-detalle.html',
  styleUrls: ['./producto-detalle.scss']
})
export class ProductoDetalleComponent implements OnInit {
  producto: any = null;
  inventario: any = null;
  loading = true;
  error: string | null = null;
  loadingUpdate = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productoService: ProductoService,
    private inventarioService: InventarioService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarProducto(id);
    } else {
      this.error = 'ID de producto no válido';
      this.loading = false;
    }
  }

  cargarProducto(id: number): void {
    this.productoService
      .getById(id)
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: (producto) => {
          this.producto = producto;
          this.cargarInventario(id);
        },
        error: () => {
          this.error = 'Error al cargar el producto.';
          this.loading = false;
        }
      });
  }

  cargarInventario(id: number): void {
    this.inventarioService
      .obtenerInventarioPorProducto(id)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (inventario) => {
          this.inventario = inventario;
        },
        error: () => {
          this.error = 'Error al cargar inventario.';
        }
      });
  }

  actualizarInventario(): void {
    if (!this.inventario) return;
    this.loadingUpdate = true;
    this.inventarioService
      .actualizarInventario(this.inventario)
      .pipe(
        finalize(() => {
          this.loadingUpdate = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.toastr.success('Inventario actualizado correctamente');
        },
        error: () => {
          this.toastr.error('Error al actualizar el inventario');
        }
      });
  }
}
