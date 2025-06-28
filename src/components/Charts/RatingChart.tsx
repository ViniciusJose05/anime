import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ratingDistribution } from '../../data/animeData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RatingChart: React.FC = () => {
  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Distribuição de Notas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={ratingDistribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ range, count }) => `${range}: ${count}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {ratingDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, 'Quantidade']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;