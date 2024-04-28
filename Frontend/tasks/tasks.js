document.addEventListener('DOMContentLoaded', function() {
    // Функція для завантаження та відображення списку завдань
    function loadTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                const tasksList = document.getElementById('tasks-list');
                // Очищаємо список перед додаванням нових даних
                tasksList.innerHTML = '';
                tasks.forEach(task => {
                    const row = tasksList.insertRow();
                    row.innerHTML = `
                        <td>${task.id}</td>
                        <td>${task.person}</td>
                        <td>${task.title}</td>
                        <td>${task.description}</td>
                        <td>${task.status}</td>
                        <td class="table-button-cell">
                            <button class="table-button delete-task-button" data-id="${task.id}">❌</button>
                            <button class="table-button update-task-button" data-id="${task.id}">✍️</button>
                        </td>
                    `;
                });
            });
    }

    // Викликаємо функцію для ініціалізації списку завдань
    loadTasks();

    // EventHandler для форми додавання нового завдання
    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('id').value;  // Отримуємо ID, якщо воно вказано
        const person = document.getElementById('person').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const status = document.getElementById('status').value;

        const data = {
            id: id,
            person: person,
            title: title,
            description: description,
            status: status
        };

        // Відправляємо дані на сервер для додавання або оновлення студента
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => {
            // Очищаємо форму після додавання студента
            document.getElementById('task-form').reset();
            // Видаляємо значення ID для уникнення непередбачуваної поведінки
            document.getElementById('id').value = '';
            // Оновлюємо список студентів на сторінці
            loadTasks();
        })
        .catch(error => console.error('Error:', error));
    });

    // EventHandler для форми видалення завдання
    document.getElementById('tasks-list').addEventListener('click', function (e) {
        const btn = e.target.closest('.delete-task-button');
        if (!btn) return;
        const {id} = btn.dataset;
        // Відправляємо дані на сервер для додавання або оновлення студента
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    // Оновлюємо список студентів на сторінці
                    loadTasks();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    });

        // EventHandler для форми оновлення завдання
    document.getElementById('tasks-list').addEventListener('click', function (e) {
        const btn = e.target.closest('.update-task-button');
        if (!btn) return;
        const {id} = btn.dataset;
        // Відправляємо дані на сервер для додавання або оновлення студента
        fetch(`/api/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
            if (!response.ok) {
                throw new Error('Task not found');
            }
                return response.json();
            })
            .then(task => {
                document.getElementById('id').value = task.id;
                document.getElementById('person').value = task.person;
                document.getElementById('title').value = task.title;
                document.getElementById('description').value = task.description;
                document.getElementById('status').value = task.status;
            })
            .catch(error => console.error('Error:', error));
    });
});


