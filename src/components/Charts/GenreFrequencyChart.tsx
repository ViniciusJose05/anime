import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { animeAPI, GenreFrequency } from '../../services/api';

const GenreFrequencyChart: React.FC = () => {
  const [data, setData] = useState<GenreFrequency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreData = await animeAPI.getGenreFrequency();
        setData(genreData.slice(0, 10)); // Top 10
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados de frequência de gêneros');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Gêneros Mais Frequentes</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Gêneros Mais Frequentes</h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Gêneros Mais Frequentes</h3>
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
          <YAxis />
          <Tooltip 
            formatter={(value) => [value, 'Frequência']}
            labelFormatter={(label) => `Gênero: ${label}`}
          />
          <Bar dataKey="frequency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenreFrequencyChart;