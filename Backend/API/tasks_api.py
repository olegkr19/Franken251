from flask import Blueprint, jsonify, request
from Models.tasks_model import Task

tasks_api = Blueprint('tasks_api', __name__)


@tasks_api.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = [task for task in Task.select()]
    return jsonify([
        {'id': task.id, 'title': task.title, 'description': task.description,
         'status': task.status}
        for task in tasks
    ])


@tasks_api.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    #  Перевіряємо чи переданий ID, це ключове поле яке не може бути пустим
    task_id = int(data.get('id')) if 'id' in data and data['id'] else None

    if task_id:
        # Спроба знайти існуючого
        task = Task.get_or_none(Task.id == task_id)
        if task:
            # Оновлення існуючого
            task.title = data['title']
            task.description = data['description']
            task.status = data['status']
            task.save()
        else:
            # Якщо не знайдений, створюємо нового з вказаним ID
            task = Task.create(id=task_id, **data)
    else:
        # Видалення 'id' з даних, щоб уникнути конфліктів з NULL значеннями
        data.pop('id', None)
        # Створення нового без вказання ID
        task = Task.create(**data)

    # return jsonify({
    #     'id': task.id, 'title': task.title, 'description': task.description,
    #     'task': task.status
    # }), 200 if task_id else 201
    return jsonify({'message': 'Task added successfully'})

# Маршрут для оновлення існуючого завдання
@tasks_api.route('/tasks/<int:id>', methods=['PATCH'])
def update_task(id):
    data = request.get_json()
    query = Task.update(title=data['title'], description=data['description'], status=data['status']).where(Task.id == id)
    query.execute()
    return jsonify({'message': 'Task updated successfully'})

# Маршрут для видалення існуючого завдання
@tasks_api.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    query = Task.delete().where(Task.id == id)
    query.execute()
    return jsonify({'message': 'Task deleted successfully'})
