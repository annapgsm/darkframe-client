export type Movie = {
  _id: string;
  Title: string;
  Genre?: {
    Name?: string;
  };
  Director?: {
    Name?: string;
  };
  ReleaseYear?: number;
  ImagePath: string;
  Featured?: boolean;
};
