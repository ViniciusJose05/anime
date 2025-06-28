// Mock API service to replace the Python backend
export interface AnimeData {
  title: string;
  year: number;
  genre: string[];
  rating: number;
  studio: string;
  popularity: number;
  score: number;
}

// Mock anime dataset
const mockAnimeData: AnimeData[] = [
  {
    title: "Attack on Titan",
    year: 2013,
    genre: ["Action", "Drama", "Fantasy"],
    rating: 9.0,
    studio: "Mappa",
    popularity: 95,
    score: 9.0
  },
  {
    title: "Death Note",
    year: 2006,
    genre: ["Supernatural", "Thriller"],
    rating: 9.0,
    studio: "Madhouse",
    popularity: 92,
    score: 9.0
  },
  {
    title: "One Piece",
    year: 1999,
    genre: ["Action", "Adventure", "Comedy"],
    rating: 8.9,
    studio: "Toei Animation",
    popularity: 98,
    score: 8.9
  },
  {
    title: "Naruto",
    year: 2002,
    genre: ["Action", "Adventure"],
    rating: 8.4,
    studio: "Pierrot",
    popularity: 94,
    score: 8.4
  },
  {
    title: "Dragon Ball Z",
    year: 1989,
    genre: ["Action", "Adventure"],
    rating: 8.7,
    studio: "Toei Animation",
    popularity: 96,
    score: 8.7
  },
  {
    title: "My Hero Academia",
    year: 2016,
    genre: ["Action", "School", "Superhero"],
    rating: 8.5,
    studio: "Bones",
    popularity: 89,
    score: 8.5
  },
  {
    title: "Demon Slayer",
    year: 2019,
    genre: ["Action", "Historical", "Supernatural"],
    rating: 8.7,
    studio: "Ufotable",
    popularity: 93,
    score: 8.7
  },
  {
    title: "Spirited Away",
    year: 2001,
    genre: ["Adventure", "Family", "Fantasy"],
    rating: 9.3,
    studio: "Studio Ghibli",
    popularity: 91,
    score: 9.3
  },
  {
    title: "Your Name",
    year: 2016,
    genre: ["Romance", "Drama", "Fantasy"],
    rating: 8.4,
    studio: "CoMix Wave Films",
    popularity: 88,
    score: 8.4
  },
  {
    title: "Princess Mononoke",
    year: 1997,
    genre: ["Adventure", "Drama", "Fantasy"],
    rating: 8.4,
    studio: "Studio Ghibli",
    popularity: 85,
    score: 8.4
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    year: 2009,
    genre: ["Action", "Adventure", "Drama"],
    rating: 9.1,
    studio: "Bones",
    popularity: 90,
    score: 9.1
  },
  {
    title: "Hunter x Hunter",
    year: 2011,
    genre: ["Action", "Adventure"],
    rating: 9.0,
    studio: "Madhouse",
    popularity: 87,
    score: 9.0
  }
];

export const mockApiService = {
  // Get all anime data
  getAnimeData: async (): Promise<AnimeData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAnimeData;
  },

  // Predict anime rating based on features
  predictRating: async (features: {
    year: number;
    genre: string[];
    studio: string;
    popularity: number;
  }): Promise<{ predicted_rating: number; confidence: number }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple mock prediction logic
    let baseRating = 7.0;
    
    // Year factor (newer anime tend to have slightly higher ratings)
    if (features.year > 2015) baseRating += 0.3;
    else if (features.year > 2010) baseRating += 0.2;
    else if (features.year > 2000) baseRating += 0.1;
    
    // Studio factor
    const topStudios = ['Studio Ghibli', 'Madhouse', 'Bones', 'Mappa', 'Ufotable'];
    if (topStudios.includes(features.studio)) {
      baseRating += 0.5;
    }
    
    // Genre factor
    const popularGenres = ['Action', 'Adventure', 'Drama', 'Fantasy'];
    const genreBonus = features.genre.filter(g => popularGenres.includes(g)).length * 0.1;
    baseRating += genreBonus;
    
    // Popularity factor
    baseRating += (features.popularity / 100) * 1.5;
    
    // Add some randomness
    const randomFactor = (Math.random() - 0.5) * 0.4;
    const predictedRating = Math.max(1.0, Math.min(10.0, baseRating + randomFactor));
    
    // Calculate confidence (higher for more popular anime)
    const confidence = Math.min(95, 70 + (features.popularity / 100) * 25);
    
    return {
      predicted_rating: Math.round(predictedRating * 10) / 10,
      confidence: Math.round(confidence)
    };
  }
};