import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Brain, Database } from 'lucide-react';
import GenreChart from '../Charts/GenreChart';
import RatingChart from '../Charts/RatingChart';
import PopularityChart from '../Charts/PopularityChart';
import StudioChart from '../Charts/StudioChart';
import YearChart from '../Charts/YearChart';
import PredictionWidget from '../PredictionWidget/PredictionWidget';

type TabType = 'overview' | 'prediction';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Análise Exploratória', icon: BarChart3 },
    { id: 'prediction' as TabType, label: 'Predição ML', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Database className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard de Animes</h1>
                <p className="text-gray-600">Análise exploratória e predição com Machine Learning</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Dataset: Kaggle Anime</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Modelo: KNN</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GenreChart />
              <RatingChart />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StudioChart />
              <YearChart />
            </div>
            
            <div className="w-full">
              <PopularityChart />
            </div>
          </div>
        )}

        {activeTab === 'prediction' && (
          <div className="max-w-4xl mx-auto">
            <PredictionWidget />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Dashboard desenvolvido para análise de dados de anime</p>
            <p className="text-sm">
              Dados baseados no dataset do Kaggle • Modelo KNN para predição de notas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;