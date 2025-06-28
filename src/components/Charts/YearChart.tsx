import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { yearDistribution } from '../../data/animeData';

const YearChart: React.FC = () => {
  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Animes por Ano de Lançamento</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year"
            tickFormatter={(value) => value.toString()}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [value, 'Quantidade']}
            labelFormatter={(label) => `Ano: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#8884d8" 
            strokeWidth={3}
            dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearChart;