import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { animeAPI, PopularityRating } from '../../services/api';

const PopularityChart: React.FC = () => {
  const [data, setData] = useState<PopularityRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularityData = await animeAPI.getPopularityRating();
        setData(popularityData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados de popularidade vs rating');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Popularidade vs Nota</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Popularidade vs Nota</h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Popularidade vs Nota</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="members" 
            name="Membros"
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <YAxis 
            type="number" 
            dataKey="score" 
            name="Nota"
            domain={[8, 9.2]}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name) => {
              if (name === 'members') return [`${(value as number / 1000000).toFixed(1)}M`, 'Membros'];
              if (name === 'score') return [value, 'Nota'];
              return [value, name];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.name;
              }
              return label;
            }}
          />
          <Scatter dataKey="score" fill="#ef4444" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopularityChart;