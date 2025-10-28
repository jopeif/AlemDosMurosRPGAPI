export type SaberProps = {
    nome: string,
    nivel: number,
    atributoRelacionado: string,
    descricao?: string
}

export class Saber {
    private constructor(private props: SaberProps) {}
    
}