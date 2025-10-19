import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosListComponent } from './productos-list';
import { ProductoService } from '../../services/producto';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

describe('ProductosListComponent', () => {
  let component: ProductosListComponent;
  let fixture: ComponentFixture<ProductosListComponent>;
  let mockProductoService: jasmine.SpyObj<ProductoService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCdr: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    // ✅ Se crean los mocks correctamente con Jasmine
    mockProductoService = jasmine.createSpyObj('ProductoService', ['getAll', 'delete']);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [ProductosListComponent],
      providers: [
        { provide: ProductoService, useValue: mockProductoService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockCdr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosListComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar los productos correctamente', () => {
    const mockProductos = [
      { id: 1, nombre: 'Camisa', descripcion: 'Camisa básica', precio: 29.99, categoria: 'Ropa' },
      { id: 2, nombre: 'Pantalón', descripcion: 'Jeans azul', precio: 59.99, categoria: 'Ropa' }
    ];

    mockProductoService.getAll.and.returnValue(of(mockProductos));

    component.cargarProductos();

    expect(mockProductoService.getAll).toHaveBeenCalled();
    expect(component.productos).toEqual(mockProductos);
    expect(component.loading).toBeFalse();
  });

  it('debería manejar error al cargar productos', () => {
    mockProductoService.getAll.and.returnValue(throwError(() => new Error('Error en API')));

    component.cargarProductos();

    expect(component.error).toBe('Error al cargar productos');
    expect(mockToastr.error).toHaveBeenCalledWith('No se pudieron cargar los productos', 'Error');
  });

  it('debería eliminar un producto correctamente', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockProductoService.delete.and.returnValue(of(void 0));

    component.eliminarProducto(1);

    expect(mockProductoService.delete).toHaveBeenCalledWith(1);
    expect(mockToastr.success).toHaveBeenCalledWith('Producto eliminado correctamente');
  });

  it('debería navegar al detalle de producto', () => {
    component.verDetalle(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/productos', 2]);
  });
});
