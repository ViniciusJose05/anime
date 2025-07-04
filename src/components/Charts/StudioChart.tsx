import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { animeAPI, StudioScore } from '../../services/api';

const StudioChart: React.FC = () => {
  const [data, setData] = useState<StudioScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studioData = await animeAPI.getStudioScores();
        setData(studioData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados de estúdios');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Estúdios com Melhores Notas</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Estúdios com Melhores Notas</h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Estúdios com Melhores Notas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[6.5, 8.5]} />
          <YAxis 
            dataKey="studio" 
            type="category"
            width={120}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'average_score') return [Number(value).toFixed(2), 'Nota Média'];
              if (name === 'count') return [value, 'Quantidade'];
              return [value, name];
            }}
            labelFormatter={(label) => `Estúdio: ${label}`}
          />
          <Bar dataKey="average_score" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudioChart;