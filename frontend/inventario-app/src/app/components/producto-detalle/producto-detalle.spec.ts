import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductoDetalleComponent } from './producto-detalle';
import { ProductoService } from '../../services/producto';
import { InventarioService } from '../../services/inventario';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

describe('ProductoDetalleComponent', () => {
  let component: ProductoDetalleComponent;
  let fixture: ComponentFixture<ProductoDetalleComponent>;
  let mockProductoService: jasmine.SpyObj<ProductoService>;
  let mockInventarioService: jasmine.SpyObj<InventarioService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;
  let mockRoute: any;
  let mockCdr: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    mockProductoService = jasmine.createSpyObj('ProductoService', ['getById']);
    mockInventarioService = jasmine.createSpyObj('InventarioService', [
      'obtenerInventarioPorProducto',
      'actualizarInventario'
    ]);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockCdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockRoute = { snapshot: { paramMap: new Map([['id', '1']]) } };

    await TestBed.configureTestingModule({
      imports: [ProductoDetalleComponent],
      providers: [
        { provide: ProductoService, useValue: mockProductoService },
        { provide: InventarioService, useValue: mockInventarioService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: ChangeDetectorRef, useValue: mockCdr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoDetalleComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar el producto y luego el inventario', () => {
    const mockProducto = {
      id: 1,
      nombre: 'Camisa',
      descripcion: 'Camisa básica de algodón',
      precio: 29.99,
      categoria: 'Ropa'
    };

    const mockInventario = {
      id: 1,
      producto_id: 1,
      cantidad: 10,
      createdAt: '2025-10-18T00:00:00Z',
      updatedAt: '2025-10-18T00:00:00Z'
    };

    mockProductoService.getById.and.returnValue(of(mockProducto));
    mockInventarioService.obtenerInventarioPorProducto.and.returnValue(of(mockInventario));

    component.ngOnInit();

    expect(mockProductoService.getById).toHaveBeenCalledWith(1);
    expect(mockInventarioService.obtenerInventarioPorProducto).toHaveBeenCalledWith(1);
    expect(component.producto).toEqual(mockProducto);
    expect(component.inventario).toEqual(mockInventario);
    expect(component.loading).toBeFalse();
  });

  it('debería manejar error al cargar el producto', () => {
    mockProductoService.getById.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(component.error).toBe('Error al cargar el producto.');
    expect(component.loading).toBeFalse();
  });

  it('debería manejar error al cargar inventario', () => {
    const mockProducto = {
      id: 1,
      nombre: 'Camisa',
      descripcion: 'Camisa básica de algodón',
      precio: 29.99,
      categoria: 'Ropa'
    };

    mockProductoService.getById.and.returnValue(of(mockProducto));
    mockInventarioService.obtenerInventarioPorProducto.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(component.error).toBe('Error al cargar inventario.');
    expect(component.loading).toBeFalse();
  });

  it('debería actualizar inventario correctamente', () => {
    const mockInventario = {
      id: 1,
      producto_id: 1,
      cantidad: 20,
      createdAt: '2025-10-18T00:00:00Z',
      updatedAt: '2025-10-18T00:00:00Z'
    };

    component.inventario = { id: 1, producto_id: 1, cantidad: 20 };
    mockInventarioService.actualizarInventario.and.returnValue(of(mockInventario));

    component.actualizarInventario();

    expect(mockInventarioService.actualizarInventario).toHaveBeenCalledWith(component.inventario);
    expect(mockToastr.success).toHaveBeenCalledWith('Inventario actualizado correctamente');
  });

  it('debería mostrar error al fallar actualización de inventario', () => {
    component.inventario = { id: 1, productoId: 1, cantidad: 20 };
    mockInventarioService.actualizarInventario.and.returnValue(throwError(() => new Error('Error')));

    component.actualizarInventario();

    expect(mockToastr.error).toHaveBeenCalledWith('Error al actualizar el inventario');
  });
});
