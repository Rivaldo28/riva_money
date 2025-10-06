CREATE TABLE pessoa(
   codigo SERIAL PRIMARY KEY,
   nome VARCHAR(50) NOT NULL,
   ativo BOOLEAN,
   logradouro VARCHAR(50),
   numero VARCHAR(10), 
   complemento VARCHAR(20),
   bairro VARCHAR(50),
   cep VARCHAR(10),
   cidade VARCHAR(20),
   estado VARCHAR(20)		
);

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Rivaldo Souza', true, 'testmom', '155', 'casa', 'Silviania', '06.782-98', 'Osasco', 'São Paulo');

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Emanuella', true, 'testmom2', '325', 'casa', 'Linda', '01.223-38', 'São Paulo', 'São Paulo');

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Gabriella', false, 'testmom3', '255', 'apartamento', 'Silviania', '04.578-21', 'Barueri', 'São Paulo');

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Luciana', true, 'mega', '2955', 'apartamento', 'Avenida Brasil', '04.578-12', 'Barueri', 'Rio de Janeiro');

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Adriana', true, 'ultra', '5255', 'casa', 'Rebousas', '04.521-55', 'Barueri', 'Rio de Janeiro');

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Ludimila', true, 'megamente', '2545', 'apartamento', 'Olinda', '04.578-55', 'Recife', 'Ceará');

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Marcelo', false, 'louco', '2535', 'casa', 'Motanha', '40.121-98', 'Liberdade', 'Minas Gerais');

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) 
VALUES ('Antonio', false, 'teste', '1255', 'casa', 'Gelo', '14.582-18', 'Salvador', 'Bahia');
