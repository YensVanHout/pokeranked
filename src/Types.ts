export interface IPullRequest {
  tier: string;
  pokemon: string;
  rank: string;
  usage: string;
  raw: string;
  abilities: Abilities[];
  items: Items[];
  spreads: string;
  moves: Moves[];
  teammates: string;
  checks: string;
}

export interface Abilities {
  ability: string;
}

export interface Items {
  item: string;
}

export interface Moves {
  move: string;
}

export interface BuildPokemonProps {
  pokemon: IPullRequest | undefined;
  setPokemon: React.Dispatch<React.SetStateAction<IPullRequest | undefined>>;
}

export interface IPokeDex {
  dex: number;
  pokemon: string;
}

export interface themeCreatorState {
  themeCreator: string;
  setThemeCreator: React.Dispatch<React.SetStateAction<string>>;
}

export interface pokedex {
  count: number;
  next: string;
  previous: string;
  results: pokedexentry[];
}

export interface pokedexentry {
  name: string;
  url: string;
}

export interface entryProps {
  dexstyle: string | null;
  spritestyle: string | null;
  pokemon: string;
}
