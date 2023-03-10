import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, pluck } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  // payload array de acoes
  // pluck extrai o atributo e retorna apenas o valor, neste caso um array de acoes
  // utiliza o operador map para pegar o array e realizar um sort nas acoes
  // fluxo async vai pegar com as acoes ja ordenadas

  getAcoes() {
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes').pipe(
      tap((valor) => console.log(valor)),
      pluck('payload'),
      map((acoes) =>
        acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
      )
    );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}
