import { Filme } from './filme';

export interface FilmeDetalle extends Filme {
  sinopsis: string,
  country: string,
  generos: [],
  duracion: number,
  puntuacion: number,
  director: string
}
