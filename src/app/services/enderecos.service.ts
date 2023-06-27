import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  colecaoPets: any[] = [];
  key = 'Pet';

  constructor() {}

  salvarPet(
    nomes: string,
    idades: string,
   
  ) {
    const dados = {
      nome: nomes,
      idade: idades,
      
    };

    const values = localStorage.getItem(this.key);

    if (!values) {
      this.colecaoPets.push(dados);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoPets));
    } else {
      const colecao: any[] = this.listar()!;
      colecao.push(dados);
      localStorage.setItem(this.key, JSON.stringify(colecao));
    }
  }

  listar() {
    const values = localStorage.getItem(this.key);

    if (!values) return;

    const colecao: any[] = JSON.parse(values);
    return colecao;
  }

  deletar(params: any) {
    const values = this.listar();
    const result = values?.filter((endereco) => endereco.Pet !== params);

    localStorage.setItem(this.key, JSON.stringify(result));
  }
}