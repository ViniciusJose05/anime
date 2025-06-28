// Dados simulados baseados em datasets típicos de anime do Kaggle
export interface AnimeData {
  name: string;
  genre: string[];
  type: string;
  episodes: number;
  rating: number;
  members: number;
  year: number;
  studio: string;
  source: string;
  duration: number;
}

export const animeDataset: AnimeData[] = [
  {
    name: "Attack on Titan",
    genre: ["Action", "Drama", "Fantasy"],
    type: "TV",
    episodes: 25,
    rating: 9.0,
    members: 2500000,
    year: 2013,
    studio: "Mappa",
    source: "Manga",
    duration: 24
  },
  {
    name: "Death Note",
    genre: ["Supernatural", "Thriller", "Psychological"],
    type: "TV",
    episodes: 37,
    rating: 9.0,
    members: 2200000,
    year: 2006,
    studio: "Madhouse",
    source: "Manga",
    duration: 23
  },
  {
    name: "One Piece",
    genre: ["Action", "Adventure", "Comedy"],
    type: "TV",
    episodes: 1000,
    rating: 8.9,
    members: 1800000,
    year: 1999,
    studio: "Toei Animation",
    source: "Manga",
    duration: 24
  },
  {
    name: "Naruto",
    genre: ["Action", "Adventure", "Martial Arts"],
    type: "TV",
    episodes: 220,
    rating: 8.4,
    members: 1600000,
    year: 2002,
    studio: "Pierrot",
    source: "Manga",
    duration: 23
  },
  {
    name: "Dragon Ball Z",
    genre: ["Action", "Adventure", "Martial Arts"],
    type: "TV",
    episodes: 291,
    rating: 8.8,
    members: 1500000,
    year: 1989,
    studio: "Toei Animation",
    source: "Manga",
    duration: 24
  },
  {
    name: "My Hero Academia",
    genre: ["Action", "School", "Super Power"],
    type: "TV",
    episodes: 138,
    rating: 8.6,
    members: 1400000,
    year: 2016,
    studio: "Bones",
    source: "Manga",
    duration: 24
  },
  {
    name: "Demon Slayer",
    genre: ["Action", "Historical", "Supernatural"],
    type: "TV",
    episodes: 44,
    rating: 8.7,
    members: 1300000,
    year: 2019,
    studio: "Ufotable",
    source: "Manga",
    duration: 23
  },
  {
    name: "One Punch Man",
    genre: ["Action", "Comedy", "Superhero"],
    type: "TV",
    episodes: 24,
    rating: 8.8,
    members: 1200000,
    year: 2015,
    studio: "Madhouse",
    source: "Manga",
    duration: 24
  },
  {
    name: "Fullmetal Alchemist: Brotherhood",
    genre: ["Action", "Adventure", "Dark Fantasy"],
    type: "TV",
    episodes: 64,
    rating: 9.1,
    members: 2000000,
    year: 2009,
    studio: "Bones",
    source: "Manga",
    duration: 24
  },
  {
    name: "Hunter x Hunter",
    genre: ["Action", "Adventure", "Fantasy"],
    type: "TV",
    episodes: 148,
    rating: 9.0,
    members: 1700000,
    year: 2011,
    studio: "Madhouse",
    source: "Manga",
    duration: 23
  }
];

// Dados agregados para gráficos
export const genreDistribution = [
  { genre: "Action", count: 8, percentage: 80 },
  { genre: "Adventure", count: 6, percentage: 60 },
  { genre: "Comedy", count: 3, percentage: 30 },
  { genre: "Drama", count: 2, percentage: 20 },
  { genre: "Fantasy", count: 4, percentage: 40 },
  { genre: "Supernatural", count: 3, percentage: 30 },
  { genre: "Martial Arts", count: 3, percentage: 30 },
  { genre: "School", count: 1, percentage: 10 }
];

export const ratingDistribution = [
  { range: "8.0-8.4", count: 1 },
  { range: "8.5-8.8", count: 4 },
  { range: "8.9-9.0", count: 4 },
  { range: "9.1+", count: 1 }
];

export const yearDistribution = [
  { year: 1989, count: 1 },
  { year: 1999, count: 1 },
  { year: 2002, count: 1 },
  { year: 2006, count: 1 },
  { year: 2009, count: 1 },
  { year: 2011, count: 1 },
  { year: 2013, count: 1 },
  { year: 2015, count: 1 },
  { year: 2016, count: 1 },
  { year: 2019, count: 1 }
];

export const studioDistribution = [
  { studio: "Madhouse", count: 3 },
  { studio: "Toei Animation", count: 2 },
  { studio: "Bones", count: 2 },
  { studio: "Mappa", count: 1 },
  { studio: "Pierrot", count: 1 },
  { studio: "Ufotable", count: 1 }
];

export const popularityVsRating = animeDataset.map(anime => ({
  name: anime.name,
  members: anime.members,
  rating: anime.rating,
  episodes: anime.episodes
}));