export type Movie = {
  _id: string;
  Title: string;
  Description: string;

  Genre?: {
    Name?: string;
    Description?: string;
  };

  Director?: {
    Name?: string;
    Bio?: string;
    BirthYear?: number;
    DeathYear?: number;
  };

  ReleaseYear?: number;
  Rating?: number;
  ImagePath: string;
  Featured?: boolean;
};