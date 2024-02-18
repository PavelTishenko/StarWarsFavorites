type Film = string;
type Vehicle = string;
type Starship = string;

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Film[];
  species: any[]; // Assuming this can be of any type
  vehicles: Vehicle[];
  starships: Starship[];
  created: string;
  edited: string;
  url: string;
} & { favorite?: boolean };

export type Response = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};
