import React, { useState } from 'react';
import { Brain, Star } from 'lucide-react';

interface PredictionInputs {
  genres: string[];
  members: number;
  episodes: number;
  year: number;
  type: string;
}

const PredictionWidget: React.FC = () => {
  const [inputs, setInputs] = useState<PredictionInputs>({
    genres: [],
    members: 100000,
    episodes: 12,
    year: 2023,
    type: 'TV'
  });
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const availableGenres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance',
    'Sci-Fi', 'Slice of Life', 'Supernatural', 'Thriller', 'Horror',
    'Mystery', 'Sports', 'Music', 'School', 'Military', 'Historical'
  ];

  const animeTypes = ['TV', 'Movie', 'OVA', 'ONA', 'Special'];

  // Simulação do modelo KNN
  const predictRating = (inputData: PredictionInputs): number => {
    // Algoritmo KNN simplificado baseado em características
    let baseScore = 7.0;
    
    // Ajuste baseado em gêneros populares
    const popularGenres = ['Action', 'Adventure', 'Fantasy', 'Drama'];
    const genreBonus = inputData.genres.filter(g => popularGenres.includes(g)).length * 0.3;
    
    // Ajuste baseado na popularidade (membros)
    const popularityBonus = Math.min(inputData.members / 1000000, 1.5) * 0.8;
    
    // Ajuste baseado no número de episódios
    const episodeBonus = inputData.episodes > 50 ? 0.2 : inputData.episodes > 20 ? 0.1 : 0;
    
    // Ajuste baseado no ano (animes mais recentes tendem a ter melhor produção)
    const yearBonus = inputData.year > 2015 ? 0.3 : inputData.year > 2010 ? 0.1 : 0;
    
    // Ajuste baseado no tipo
    const typeBonus = inputData.type === 'Movie' ? 0.2 : inputData.type === 'TV' ? 0.1 : 0;
    
    const finalScore = baseScore + genreBonus + popularityBonus + episodeBonus + yearBonus + typeBonus;
    
    // Adiciona um pouco de aleatoriedade para simular variabilidade do modelo
    const randomFactor = (Math.random() - 0.5) * 0.4;
    
    return Math.min(Math.max(finalScore + randomFactor, 5.0), 10.0);
  };

  const handleGenreChange = (genre: string) => {
    setInputs(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simula tempo de processamento do modelo
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const predictedRating = predictRating(inputs);
    setPrediction(Math.round(predictedRating * 10) / 10);
    setIsLoading(false);
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 9.0) return 'text-green-400';
    if (rating >= 8.0) return 'text-blue-400';
    if (rating >= 7.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRatingLabel = (rating: number): string => {
    if (rating >= 9.0) return 'Excelente';
    if (rating >= 8.0) return 'Muito Bom';
    if (rating >= 7.0) return 'Bom';
    return 'Regular';
  };

  return (
    <div className="prediction-card">
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 mr-3" />
        <h2 className="text-2xl font-bold">Preditor de Nota - Modelo KNN</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="input-group">
            <label className="input-label text-white">Gêneros</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {availableGenres.map(genre => (
                <label key={genre} className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className="mr-2"
                  />
                  <span className="text-sm">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label text-white">Popularidade (Membros)</label>
            <input
              type="number"
              value={inputs.members}
              onChange={(e) => setInputs(prev => ({ ...prev, members: parseInt(e.target.value) || 0 }))}
              className="input-field"
              placeholder="Ex: 1000000"
              min="0"
            />
          </div>

          <div className="input-group">
            <label className="input-label text-white">Número de Episódios</label>
            <input
              type="number"
              value={inputs.episodes}
              onChange={(e) => setInputs(prev => ({ ...prev, episodes: parseInt(e.target.value) || 0 }))}
              className="input-field"
              placeholder="Ex: 12"
              min="1"
            />
          </div>
        </div>

        <div>
          <div className="input-group">
            <label className="input-label text-white">Ano de Lançamento</label>
            <input
              type="number"
              value={inputs.year}
              onChange={(e) => setInputs(prev => ({ ...prev, year: parseInt(e.target.value) || 2023 }))}
              className="input-field"
              placeholder="Ex: 2023"
              min="1960"
              max="2024"
            />
          </div>

          <div className="input-group">
            <label className="input-label text-white">Tipo</label>
            <select
              value={inputs.type}
              onChange={(e) => setInputs(prev => ({ ...prev, type: e.target.value }))}
              className="input-field"
            >
              {animeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePredict}
            disabled={isLoading || inputs.genres.length === 0}
            className="predict-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                Processando...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Star className="w-5 h-5 mr-2" />
                Predizer Nota
              </div>
            )}
          </button>
        </div>
      </div>

      {prediction !== null && (
        <div className="result-display">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-12 h-12 mr-3 text-yellow-300" />
            <div>
              <div className={`score-display ${getRatingColor(prediction)}`}>
                {prediction.toFixed(1)}
              </div>
              <div className="score-label">
                {getRatingLabel(prediction)}
              </div>
            </div>
          </div>
          
          <div className="text-sm opacity-90">
            <p className="mb-2">
              <strong>Gêneros selecionados:</strong> {inputs.genres.join(', ')}
            </p>
            <p className="mb-2">
              <strong>Popularidade:</strong> {(inputs.members / 1000000).toFixed(1)}M membros
            </p>
            <p>
              <strong>Características:</strong> {inputs.episodes} episódios, {inputs.type}, {inputs.year}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionWidget;