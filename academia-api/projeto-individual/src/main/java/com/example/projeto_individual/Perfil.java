package com.example.projeto_individual;

public class Perfil {

        private Integer id;
        private String nome;
        private Double peso;
        private Double altura;
        private String objetivo;
        private String treinoPersonalizado;

        public Perfil() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public Double getAltura() {
        return altura;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public String getTreinoPersonalizado() {
        return treinoPersonalizado;
    }

    public void setTreinoPersonalizado(String treinoPersonalizado) {
        this.treinoPersonalizado = treinoPersonalizado;
    }
}

