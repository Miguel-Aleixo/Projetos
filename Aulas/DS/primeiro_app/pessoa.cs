using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace primeiro_app
{
    public class Pessoa
    {
        public string Nome;
        public int Idade;
        public double Altura;
        public double Peso;

        public void Andar()
        {
            Console.WriteLine("Andando...Andando...");
        }

        public void Comer()
        {
            Console.WriteLine("Fazendo um lanchinho...");
        }
    }
}
