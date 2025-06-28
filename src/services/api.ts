import { mockApiService, AnimeData } from './mockApi';

// Use mock API service instead of real backend
export const apiService = {
  getAnimeData: mockApiService.getAnimeData,
  predictRating: mockApiService.predictRating
};

export type { AnimeData };