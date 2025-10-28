import Saber = require("./Saber");

export type CharacterProps = { id: string;
  nome: string;
  conceito: string;
  idade: number;
  ocupacao: string; 
  atributos: {
    corpo: number;
    mente: number;
    coragem: number;
    reflexos: number;
    astucia: number;
  };
  pvAtual: number;
  pvMaximo: number;
  saberes: Saber.Saber[];
  poderes: Poder[];
  pontosSaber: number;
  jogador: string;
}



Poder {
  nome: string;
  descricao: string;
  tipo: "passivo" | "ativo";
}
