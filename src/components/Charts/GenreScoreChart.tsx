import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { animeAPI, GenreScore } from '../../services/api';

const GenreScoreChart: React.FC = () => {
  const [data, setData] = useState<GenreScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoreData = await animeAPI.getGenreScores();
        setData(scoreData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados de notas por gênero');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Nota Média por Gênero</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Nota Média por Gênero</h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Nota Média por Gênero</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="genre" 
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          <YAxis domain={[6, 8]} />
          <Tooltip 
            formatter={(value) => [Number(value).toFixed(2), 'Nota Média']}
            labelFormatter={(label) => `Gênero: ${label}`}
          />
          <Bar dataKey="average_score" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenreScoreChart;