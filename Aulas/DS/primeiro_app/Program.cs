using primeiro_app;
using System.Security.Cryptography;

Pessoa p1;
Pessoa p2;
Carro p3;

p1 = new Pessoa();
p1.Nome = "Alexandre";
p1.Idade = 37;
p1.Altura = 1.74;
p1.Peso = 81.20;

p2 = new Pessoa();
p2.Nome = "Miguel";
p2.Idade = 16;
p2.Altura = 1.64;
p2.Peso = 55;

p3 = new Carro();
p3.Nome = "Fiesta";
p3.Marca = "Ford";
p3.Tipo = "Sedan";

p3.Rodar();




