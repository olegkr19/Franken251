from flask import Flask, send_from_directory, abort
from flask_cors import CORS
import os

# Імпорт необхідних файлів
from Models.tasks_model import initialize_tasks_db
from API.tasks_api import tasks_api as tasks_api

# Ініціалізація app та шляху до статичних даних
app = Flask(__name__, static_folder='../Backend/templates')

# Дозволяє доступ до всіх доменів
CORS(app)

# Ініціалізація бази даних
initialize_tasks_db()

# Реєстрація Blueprints для API та Навігції FrontEnd в браузері
app.register_blueprint(tasks_api, url_prefix='/api')

# Точка входу, index.html
@app.route('/')
def index():
    print(12321)
    return send_from_directory(app.static_folder, 'index.html')

# Запуск сервера в режимі тестування
if __name__ == '__main__':
    app.run(debug=True, port=8080)
