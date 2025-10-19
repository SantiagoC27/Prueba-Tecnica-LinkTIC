package com.example.inventario.service;

import com.example.inventario.model.Inventario;
import com.example.inventario.repository.InventarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Slf4j
@Service
public class InventarioService {

    private final InventarioRepository inventarioRepository;
    private final RestTemplate restTemplate;

    private final String productosServiceUrl = "http://productos-service:8080/api/productos/";

    public InventarioService(InventarioRepository inventarioRepository, RestTemplate restTemplate) {
        this.inventarioRepository = inventarioRepository;
        this.restTemplate = restTemplate;
    }

    public Optional<Inventario> obtenerPorProductoId(Long productoId) {
        return inventarioRepository.findByProductoId(productoId);
    }

    public Inventario actualizarCantidad(Long productoId, Integer cantidadNueva) {
        Inventario inventario = inventarioRepository.findByProductoId(productoId)
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));

        inventario.setCantidad(cantidadNueva);
        inventario.setUpdatedAt(java.time.LocalDateTime.now());
        inventarioRepository.save(inventario);

        log.info("Inventario actualizado para producto {}. Nueva cantidad: {}", productoId, cantidadNueva);

        return inventario;
    }

    public Object obtenerProductoDesdeMicroservicio(Long productoId) {
        try {
            return restTemplate.getForObject(productosServiceUrl + productoId, Object.class);
        } catch (Exception e) {
            log.error("Error consultando producto {}: {}", productoId, e.getMessage());
            throw new RuntimeException("Error al comunicarse con productos-service");
        }
    }
}
