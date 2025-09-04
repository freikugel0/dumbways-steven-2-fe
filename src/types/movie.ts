export type MovieDetailResponse = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: "True" | "False";
};

export type MovieListItem = Pick<
  MovieDetailResponse,
  "Title" | "Year" | "imdbID" | "Type" | "Poster"
>;

export type MovieListResponse = {
  Search: MovieListItem[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};
