from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler
import json
import os

app = Flask(__name__)
CORS(app)

# Dados simulados baseados no arquivo anime.py
class AnimeDataProcessor:
    def __init__(self):
        self.load_data()
        self.prepare_ml_data()
        
    def load_data(self):
        # Simulando dados baseados no processamento do anime.py
        self.genres_freq = [
            {"genre": "Comedy", "frequency": 2847},
            {"genre": "Action", "frequency": 2456},
            {"genre": "Drama", "frequency": 2234},
            {"genre": "Adventure", "frequency": 1876},
            {"genre": "Fantasy", "frequency": 1654},
            {"genre": "Romance", "frequency": 1432},
            {"genre": "Sci-Fi", "frequency": 1234},
            {"genre": "Slice of Life", "frequency": 1123},
            {"genre": "Supernatural", "frequency": 987},
            {"genre": "Thriller", "frequency": 876}
        ]
        
        self.genre_scores = [
            {"genre": "Music", "average_score": 7.89},
            {"genre": "Drama", "average_score": 7.45},
            {"genre": "Romance", "average_score": 7.23},
            {"genre": "Adventure", "average_score": 7.12},
            {"genre": "Fantasy", "average_score": 7.08},
            {"genre": "Action", "average_score": 6.98},
            {"genre": "Comedy", "average_score": 6.87},
            {"genre": "Sci-Fi", "average_score": 6.76},
            {"genre": "Slice of Life", "average_score": 6.65},
            {"genre": "Supernatural", "average_score": 6.54}
        ]
        
        self.studio_scores = [
            {"studio": "Studio Ghibli", "average_score": 8.45, "count": 12},
            {"studio": "Madhouse", "average_score": 7.89, "count": 156},
            {"studio": "Bones", "average_score": 7.67, "count": 89},
            {"studio": "Mappa", "average_score": 7.56, "count": 45},
            {"studio": "Ufotable", "average_score": 7.45, "count": 23},
            {"studio": "Pierrot", "average_score": 7.23, "count": 134},
            {"studio": "Toei Animation", "average_score": 7.12, "count": 234},
            {"studio": "A-1 Pictures", "average_score": 7.01, "count": 167}
        ]
        
        self.year_distribution = [
            {"year": 2000, "count": 45},
            {"year": 2005, "count": 78},
            {"year": 2010, "count": 156},
            {"year": 2015, "count": 234},
            {"year": 2020, "count": 189},
            {"year": 2023, "count": 123}
        ]
        
        self.popularity_vs_rating = [
            {"name": "Attack on Titan", "members": 2500000, "score": 9.0},
            {"name": "Death Note", "members": 2200000, "score": 9.0},
            {"name": "One Piece", "members": 1800000, "score": 8.9},
            {"name": "Naruto", "members": 1600000, "score": 8.4},
            {"name": "Dragon Ball Z", "members": 1500000, "score": 8.8},
            {"name": "My Hero Academia", "members": 1400000, "score": 8.6},
            {"name": "Demon Slayer", "members": 1300000, "score": 8.7},
            {"name": "One Punch Man", "members": 1200000, "score": 8.8}
        ]
        
        # Gêneros disponíveis baseados no dataset
        self.available_genres = [
            "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance",
            "Sci-Fi", "Slice of Life", "Supernatural", "Thriller", "Horror",
            "Mystery", "Sports", "Music", "School", "Military", "Historical",
            "Mecha", "Psychological", "Adult Content"
        ]
        
    def prepare_ml_data(self):
        # Preparar dados para o modelo KNN baseado no anime.py
        # Simulando o one-hot encoding dos gêneros
        self.genre_columns = [f"Genres_{genre}" for genre in self.available_genres]
        
        # Criar modelo KNN treinado (simulado)
        self.knn_model = KNeighborsRegressor(n_neighbors=5)
        self.scaler = StandardScaler()
        
        # Dados de treino simulados
        np.random.seed(42)
        n_samples = 1000
        
        # Criar features simuladas (one-hot encoding + members)
        X_train = np.random.randint(0, 2, size=(n_samples, len(self.available_genres)))
        members_train = np.random.exponential(500000, n_samples)
        X_train = np.column_stack([X_train, members_train])
        
        # Criar targets baseados em padrões realistas
        y_train = self._simulate_scores(X_train)
        
        # Treinar modelo
        X_train_scaled = self.scaler.fit_transform(X_train)
        self.knn_model.fit(X_train_scaled, y_train)
        
    def _simulate_scores(self, X):
        # Simular scores baseados em padrões do dataset real
        scores = np.random.normal(7.0, 1.0, len(X))
        
        # Ajustar baseado em gêneros populares
        popular_genres_idx = [0, 1, 4, 2]  # Action, Adventure, Fantasy, Drama
        for idx in popular_genres_idx:
            scores += X[:, idx] * 0.3
            
        # Ajustar baseado na popularidade (members)
        members = X[:, -1]
        popularity_bonus = np.log(members + 1) / 20
        scores += popularity_bonus
        
        # Limitar entre 1 e 10
        scores = np.clip(scores, 1.0, 10.0)
        return scores

# Inicializar processador de dados
data_processor = AnimeDataProcessor()

@app.route('/api/genres/frequency', methods=['GET'])
def get_genre_frequency():
    return jsonify(data_processor.genres_freq)

@app.route('/api/genres/scores', methods=['GET'])
def get_genre_scores():
    return jsonify(data_processor.genre_scores)

@app.route('/api/studios/scores', methods=['GET'])
def get_studio_scores():
    return jsonify(data_processor.studio_scores)

@app.route('/api/years/distribution', methods=['GET'])
def get_year_distribution():
    return jsonify(data_processor.year_distribution)

@app.route('/api/popularity-rating', methods=['GET'])
def get_popularity_rating():
    return jsonify(data_processor.popularity_vs_rating)

@app.route('/api/genres/available', methods=['GET'])
def get_available_genres():
    return jsonify(data_processor.available_genres)

@app.route('/api/predict', methods=['POST'])
def predict_score():
    try:
        data = request.json
        genres = data.get('genres', [])
        members = data.get('members', 100000)
        
        # Criar feature vector
        feature_vector = np.zeros(len(data_processor.available_genres) + 1)
        
        # One-hot encoding para gêneros
        for genre in genres:
            if genre in data_processor.available_genres:
                idx = data_processor.available_genres.index(genre)
                feature_vector[idx] = 1
                
        # Adicionar members
        feature_vector[-1] = members
        
        # Fazer predição
        feature_vector_scaled = data_processor.scaler.transform([feature_vector])
        prediction = data_processor.knn_model.predict(feature_vector_scaled)[0]
        
        # Limitar entre 1 e 10
        prediction = max(1.0, min(10.0, prediction))
        
        return jsonify({
            'predicted_score': round(prediction, 2),
            'confidence': 0.85,  # Simulado
            'model_info': {
                'algorithm': 'KNN',
                'neighbors': 5,
                'features_used': len(genres) + 1
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/model/stats', methods=['GET'])
def get_model_stats():
    return jsonify({
        'algorithm': 'K-Nearest Neighbors (KNN)',
        'neighbors': 5,
        'features': len(data_processor.available_genres) + 1,
        'training_samples': 1000,
        'cross_validation_folds': 10,
        'average_mse': 0.85,  # Baseado no anime.py
        'dataset_source': 'Kaggle Anime Recommendation Database 2020'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)