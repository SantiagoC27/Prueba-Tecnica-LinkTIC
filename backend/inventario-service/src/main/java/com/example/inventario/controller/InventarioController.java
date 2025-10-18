package com.example.inventario.controller;

import com.example.inventario.model.Inventario;
import com.example.inventario.service.InventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inventario")
public class InventarioController {

    private final InventarioService inventarioService;

    public InventarioController(InventarioService inventarioService) {
        this.inventarioService = inventarioService;
    }

    @GetMapping("/{productoId}")
    public ResponseEntity<?> obtenerInventario(@PathVariable Long productoId) {
        var inventario = inventarioService.obtenerPorProductoId(productoId);
        return inventario.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{productoId}")
    public ResponseEntity<Inventario> actualizarCantidad(
            @PathVariable Long productoId,
            @RequestBody Map<String, Integer> body) {

        Integer nuevaCantidad = body.get("cantidad");
        Inventario actualizado = inventarioService.actualizarCantidad(productoId, nuevaCantidad);
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping("/{productoId}/producto")
    public ResponseEntity<?> obtenerProducto(@PathVariable Long productoId) {
        Object producto = inventarioService.obtenerProductoDesdeMicroservicio(productoId);
        return ResponseEntity.ok(producto);
    }
}
