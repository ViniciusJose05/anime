import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { studioDistribution } from '../../data/animeData';

const StudioChart: React.FC = () => {
  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Animes por Estúdio</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={studioDistribution} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            dataKey="studio" 
            type="category"
            width={100}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value) => [value, 'Quantidade']}
            labelFormatter={(label) => `Estúdio: ${label}`}
          />
          <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudioChart;