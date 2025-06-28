import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { popularityVsRating } from '../../data/animeData';

const PopularityChart: React.FC = () => {
  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Popularidade vs Nota</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart data={popularityVsRating}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="members" 
            name="Membros"
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <YAxis 
            type="number" 
            dataKey="rating" 
            name="Nota"
            domain={[8, 9.2]}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name) => {
              if (name === 'members') return [`${(value as number / 1000000).toFixed(1)}M`, 'Membros'];
              if (name === 'rating') return [value, 'Nota'];
              return [value, name];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.name;
              }
              return label;
            }}
          />
          <Scatter dataKey="rating" fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopularityChart;