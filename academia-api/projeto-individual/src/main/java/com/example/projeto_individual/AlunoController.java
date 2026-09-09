//package com.example.projeto_individual;
//
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.jdbc.core.BeanPropertyRowMapper;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/exercicios")
//public class AlunoController {
//    private final JdbcTemplate jdbcTemplate;
//
//        public AlunoController(JdbcTemplate jdbcTemplate) {
//            this.jdbcTemplate = jdbcTemplate;
//        }
//
//        @PostMapping
//        public ResponseEntity<Void> cadastrar(@RequestBody Aluno aluno) {
//            String sql = "INSERT INTO aluno (nome, email, telefone, plano, mensalidade) VALUES (?, ?, ?, ?, ?)";
//
//            jdbcTemplate.update(
//                    sql,
//                    aluno.getNome(),
//                    aluno.getEmail(),
//                    aluno.getTelefone(),
//                    aluno.getPlano(),
//                    aluno.getMensalidade()
//            );
//
//            return ResponseEntity.status(201).build();
//        }
//
//        @GetMapping
//        public ResponseEntity<List<Aluno>> listar() {
//            String sql = "SELECT * FROM exercicios";
//
//            List<Aluno> alunos = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Aluno.class));
//
//            return ResponseEntity.status(200).body(alunos);
//        }
//    }
//
//
