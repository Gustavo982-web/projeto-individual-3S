package com.example.projeto_individual;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfil")
@CrossOrigin(origins = "*")
public class PerfilController {

    private final JdbcTemplate jdbcTemplate;

    public PerfilController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar(@RequestBody Perfil perfil) {
        if (perfil.getNome() == null || perfil.getNome().trim().isEmpty() ||
                perfil.getPeso() == null || perfil.getPeso() <= 0 ||
                perfil.getAltura() == null || perfil.getAltura() <= 0 ||
                perfil.getObjetivo() == null || perfil.getObjetivo().trim().isEmpty()) {
            return ResponseEntity.status(400).build();
        }
        String sql = "INSERT INTO perfil (nome, peso, altura, objetivo, treino_personalizado) VALUES (?, ?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                perfil.getNome(),
                perfil.getPeso(),
                perfil.getAltura(),
                perfil.getObjetivo(),
                perfil.getTreinoPersonalizado()
        );

        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity<List<Perfil>> listar() {
        String sql = "SELECT * FROM perfil";
        List<Perfil> perfis = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Perfil.class));

        if (perfis.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(perfis);
    }
}