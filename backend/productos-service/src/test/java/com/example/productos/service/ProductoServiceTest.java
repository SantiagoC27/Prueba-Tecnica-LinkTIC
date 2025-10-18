package com.example.productos.service;

import com.example.productos.model.Producto;
import com.example.productos.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    private Producto producto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        producto = new Producto(1L, "Camiseta", "Camiseta algodón", new BigDecimal("29.99"), null);
    }

    @Test
    void listar_deberiaRetornarListaDeProductos() {
        when(productoRepository.findAll()).thenReturn(List.of(producto));

        List<Producto> resultado = productoService.listar();

        assertThat(resultado).hasSize(1);
        verify(productoRepository, times(1)).findAll();
    }

    @Test
    void obtenerPorId_deberiaRetornarProducto() {
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));

        Optional<Producto> resultado = productoService.obtenerPorId(1L);

        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNombre()).isEqualTo("Camiseta");
    }

    @Test
    void crear_deberiaGuardarProducto() {
        when(productoRepository.save(any())).thenReturn(producto);

        Producto resultado = productoService.crear(producto);

        assertThat(resultado.getId()).isEqualTo(1L);
        verify(productoRepository, times(1)).save(producto);
    }

    @Test
    void actualizar_deberiaActualizarProductoExistente() {
        Producto actualizado = new Producto(1L, "Camisa", "Camisa formal", new BigDecimal("39.99"), null);
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(productoRepository.save(any())).thenReturn(actualizado);

        Producto resultado = productoService.actualizar(1L, actualizado);

        assertThat(resultado.getNombre()).isEqualTo("Camisa");
        verify(productoRepository, times(1)).save(any());
    }

    @Test
    void eliminar_deberiaLlamarDeletePorId() {
        doNothing().when(productoRepository).deleteById(1L);

        productoService.eliminar(1L);

        verify(productoRepository, times(1)).deleteById(1L);
    }
}
