package com.example.inventario.service;

import com.example.inventario.model.Inventario;
import com.example.inventario.repository.InventarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class InventarioServiceTest {

    @Mock
    private InventarioRepository inventarioRepository;

    @InjectMocks
    private InventarioService inventarioService;

    private Inventario inventario;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        inventario = new Inventario(1L, 1L, 50, null);
    }

    @Test
    void obtenerPorProductoId_deberiaRetornarInventario() {
        when(inventarioRepository.findByProductoId(1L)).thenReturn(Optional.of(inventario));

        var resultado = inventarioService.obtenerPorProductoId(1L);

        assertThat(resultado).isPresent();
        verify(inventarioRepository, times(1)).findByProductoId(1L);
    }

    @Test
    void actualizarCantidad_deberiaActualizarCantidad() {
        when(inventarioRepository.findByProductoId(1L)).thenReturn(Optional.of(inventario));
        when(inventarioRepository.save(any())).thenReturn(inventario);

        var actualizado = inventarioService.actualizarCantidad(1L, 100);

        assertThat(actualizado.getCantidad()).isEqualTo(100);
        verify(inventarioRepository, times(1)).save(any());
    }
}
