import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { animeAPI, YearDistribution } from '../../services/api';

const YearChart: React.FC = () => {
  const [data, setData] = useState<YearDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearData = await animeAPI.getYearDistribution();
        setData(yearData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados de distribuição por ano');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Distribuição por Ano</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Distribuição por Ano</h3>
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Distribuição por Ano</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearChart;