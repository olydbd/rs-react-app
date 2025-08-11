export interface Character extends Record<string, unknown> {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
}

export interface CharactersResponse {
  info: {
    pages: number;
  };
  results: Character[];
}
