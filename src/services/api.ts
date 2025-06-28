import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface GenreFrequency {
  genre: string;
  frequency: number;
}

export interface GenreScore {
  genre: string;
  average_score: number;
}

export interface StudioScore {
  studio: string;
  average_score: number;
  count: number;
}

export interface YearDistribution {
  year: number;
  count: number;
}

export interface PopularityRating {
  name: string;
  members: number;
  score: number;
}

export interface PredictionRequest {
  genres: string[];
  members: number;
}

export interface PredictionResponse {
  predicted_score: number;
  confidence: number;
  model_info: {
    algorithm: string;
    neighbors: number;
    features_used: number;
  };
}

export interface ModelStats {
  algorithm: string;
  neighbors: number;
  features: number;
  training_samples: number;
  cross_validation_folds: number;
  average_mse: number;
  dataset_source: string;
}

export const animeAPI = {
  // Dados para gráficos
  getGenreFrequency: (): Promise<GenreFrequency[]> =>
    api.get('/genres/frequency').then(res => res.data),
    
  getGenreScores: (): Promise<GenreScore[]> =>
    api.get('/genres/scores').then(res => res.data),
    
  getStudioScores: (): Promise<StudioScore[]> =>
    api.get('/studios/scores').then(res => res.data),
    
  getYearDistribution: (): Promise<YearDistribution[]> =>
    api.get('/years/distribution').then(res => res.data),
    
  getPopularityRating: (): Promise<PopularityRating[]> =>
    api.get('/popularity-rating').then(res => res.data),
    
  // Predição
  getAvailableGenres: (): Promise<string[]> =>
    api.get('/genres/available').then(res => res.data),
    
  predictScore: (data: PredictionRequest): Promise<PredictionResponse> =>
    api.post('/predict', data).then(res => res.data),
    
  getModelStats: (): Promise<ModelStats> =>
    api.get('/model/stats').then(res => res.data),
};