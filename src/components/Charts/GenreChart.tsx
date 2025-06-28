import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { genreDistribution } from '../../data/animeData';

const GenreChart: React.FC = () => {
  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Distribuição por Gênero</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={genreDistribution}>
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
            formatter={(value, name) => [value, name === 'count' ? 'Quantidade' : 'Porcentagem']}
            labelFormatter={(label) => `Gênero: ${label}`}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenreChart;