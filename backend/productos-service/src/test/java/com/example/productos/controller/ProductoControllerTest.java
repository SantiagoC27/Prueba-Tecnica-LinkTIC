package com.example.productos.controller;

import com.example.productos.model.Producto;
import com.example.productos.service.ProductoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductoController.class)
class ProductoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductoService productoService;

    @Test
    void listar_deberiaRetornarLista() throws Exception {
        when(productoService.listar())
                .thenReturn(List.of(new Producto(1L, "Camiseta", "Desc", new BigDecimal("29.99"), null)));

        mockMvc.perform(get("/api/productos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Camiseta"));
    }

    @Test
    void obtenerPorId_deberiaRetornarProducto() throws Exception {
        when(productoService.obtenerPorId(1L))
                .thenReturn(Optional.of(new Producto(1L, "Camiseta", "Desc", new BigDecimal("29.99"), null)));

        mockMvc.perform(get("/api/productos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Camiseta"));
    }

    @Test
    void crear_deberiaRetornarProductoCreado() throws Exception {
        when(productoService.crear(any())).thenReturn(
                new Producto(1L, "Camisa", "Formal", new BigDecimal("39.99"), null)
        );

        mockMvc.perform(post("/api/productos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nombre\":\"Camisa\",\"descripcion\":\"Formal\",\"precio\":39.99}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Camisa"));
    }
}
