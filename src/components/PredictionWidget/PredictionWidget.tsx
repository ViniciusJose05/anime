import React, { useState, useEffect } from 'react';
import { Brain, Star, Database, TrendingUp } from 'lucide-react';
import { animeAPI, PredictionRequest, PredictionResponse, ModelStats } from '../../services/api';

const PredictionWidget: React.FC = () => {
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [members, setMembers] = useState<number>(100000);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [modelStats, setModelStats] = useState<ModelStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [genres, stats] = await Promise.all([
          animeAPI.getAvailableGenres(),
          animeAPI.getModelStats()
        ]);
        setAvailableGenres(genres);
        setModelStats(stats);
      } catch (err) {
        setError('Erro ao carregar dados iniciais');
      }
    };

    fetchInitialData();
  }, []);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handlePredict = async () => {
    if (selectedGenres.length === 0) {
      setError('Selecione pelo menos um gênero');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: PredictionRequest = {
        genres: selectedGenres,
        members: members
      };

      const result = await animeAPI.predictScore(request);
      setPrediction(result);
    } catch (err) {
      setError('Erro ao fazer predição. Verifique se o backend está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 8.5) return 'text-green-400';
    if (rating >= 7.5) return 'text-blue-400';
    if (rating >= 6.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRatingLabel = (rating: number): string => {
    if (rating >= 8.5) return 'Excelente';
    if (rating >= 7.5) return 'Muito Bom';
    if (rating >= 6.5) return 'Bom';
    return 'Regular';
  };

  return (
    <div className="prediction-card">
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 mr-3" />
        <div>
          <h2 className="text-2xl font-bold">Preditor de Nota - Modelo KNN</h2>
          <p className="text-sm opacity-90">Baseado no dataset Kaggle Anime Recommendation Database 2020</p>
        </div>
      </div>

      {modelStats && (
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Informações do Modelo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="opacity-75">Algoritmo:</span>
              <div className="font-semibold">{modelStats.algorithm}</div>
            </div>
            <div>
              <span className="opacity-75">K-Vizinhos:</span>
              <div className="font-semibold">{modelStats.neighbors}</div>
            </div>
            <div>
              <span className="opacity-75">Features:</span>
              <div className="font-semibold">{modelStats.features}</div>
            </div>
            <div>
              <span className="opacity-75">MSE Médio:</span>
              <div className="font-semibold">{modelStats.average_mse}</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="input-group">
            <label className="input-label text-white">Gêneros</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto bg-white/10 rounded-lg p-3">
              {availableGenres.map(genre => (
                <label key={genre} className="flex items-center text-white cursor-pointer hover:bg-white/10 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className="mr-2"
                  />
                  <span className="text-sm">{genre}</span>
                </label>
              ))}
            </div>
            <div className="mt-2 text-sm opacity-75">
              Selecionados: {selectedGenres.length} gênero(s)
            </div>
          </div>

          <div className="input-group">
            <label className="input-label text-white">Popularidade (Membros)</label>
            <input
              type="number"
              value={members}
              onChange={(e) => setMembers(parseInt(e.target.value) || 0)}
              className="input-field"
              placeholder="Ex: 1000000"
              min="0"
            />
            <div className="mt-1 text-sm opacity-75">
              {(members / 1000000).toFixed(1)}M membros
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Gêneros Selecionados:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map(genre => (
                <span 
                  key={genre}
                  className="bg-white/20 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30"
                  onClick={() => handleGenreChange(genre)}
                >
                  {genre} ×
                </span>
              ))}
              {selectedGenres.length === 0 && (
                <span className="text-white/50 italic">Nenhum gênero selecionado</span>
              )}
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={isLoading || selectedGenres.length === 0}
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

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>
      </div>

      {prediction && (
        <div className="result-display">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-12 h-12 mr-3 text-yellow-300" />
            <div>
              <div className={`score-display ${getRatingColor(prediction.predicted_score)}`}>
                {prediction.predicted_score.toFixed(1)}
              </div>
              <div className="score-label">
                {getRatingLabel(prediction.predicted_score)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-90">
            <div>
              <p className="mb-2">
                <strong>Gêneros:</strong> {selectedGenres.join(', ')}
              </p>
              <p className="mb-2">
                <strong>Popularidade:</strong> {(members / 1000000).toFixed(1)}M membros
              </p>
            </div>
            <div>
              <p className="mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                <strong>Confiança:</strong> {(prediction.confidence * 100).toFixed(1)}%
              </p>
              <p className="mb-2">
                <strong>Features usadas:</strong> {prediction.model_info.features_used}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionWidget;