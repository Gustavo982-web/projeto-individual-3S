package com.example.projeto_individual;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercicio")
@CrossOrigin(origins = "*")
public class ExercicioController {

    private final JdbcTemplate jdbcTemplate;

    public ExercicioController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<List<Exercicio>> listar() {
        String sql = "SELECT * FROM exercicio";
        List<Exercicio> exercicios = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Exercicio.class));

        if (exercicios.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(exercicios);
    }
}