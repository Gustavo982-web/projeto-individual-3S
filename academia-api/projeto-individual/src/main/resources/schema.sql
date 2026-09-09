CREATE TABLE IF NOT EXISTS exercicio (
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         nome VARCHAR(100),
    categoria VARCHAR(50)
    );

CREATE TABLE IF NOT EXISTS perfil (
                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                      nome VARCHAR(100),
    peso DOUBLE,
    altura DOUBLE,
    objetivo VARCHAR(100),
    treino_personalizado VARCHAR(500)
    );

INSERT INTO exercicio (nome, categoria) VALUES
                                            ('Supino Reto', 'Push'),
                                            ('Supino Inclinado', 'Push'),
                                            ('Desenvolvimento c/ Halteres', 'Push'),
                                            ('Elevação Lateral', 'Push'),
                                            ('Tríceps Pulley', 'Push'),
                                            ('Puxada Alta', 'Pull'),
                                            ('Remada Curvada', 'Pull'),
                                            ('Pulldown', 'Pull'),
                                            ('Rosca Direta', 'Pull'),
                                            ('Rosca Martelo', 'Pull'),
                                            ('Agachamento Livre', 'Legs'),
                                            ('Leg Press 45', 'Legs'),
                                            ('Cadeira Extensora', 'Legs'),
                                            ('Mesa Flexora', 'Legs'),
                                            ('Panturrilha em Pé', 'Legs');