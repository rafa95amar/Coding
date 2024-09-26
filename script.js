// Função para carregar o cronograma do localStorage
function loadSchedule() {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    renderSchedule(schedule);
    populateDeleteTaskDropdown(schedule); // Popula o dropdown de tarefas
    return schedule;
}

// Função para salvar o cronograma no localStorage
function saveSchedule(schedule) {
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

// Função para renderizar a tabela do cronograma
// Função para renderizar a tabela do cronograma
function renderSchedule(schedule) {
    const tableBody = document.querySelector('#scheduleTable tbody');
    tableBody.innerHTML = '';  // Limpa a tabela antes de renderizar

    schedule.forEach((entry, dayIndex) => {
        const rowCount = entry.times.length;
        const firstRow = document.createElement('tr');
        
        const dayCell = document.createElement('td');
        dayCell.setAttribute('rowspan', rowCount);
        dayCell.textContent = entry.day;
        firstRow.appendChild(dayCell);

        entry.times.forEach((time, timeIndex) => {
            const row = timeIndex === 0 ? firstRow : document.createElement('tr');

            // Cria células para o horário, atividade e tópico
            const timeCell = document.createElement('td');
            timeCell.textContent = time[0];
            row.appendChild(timeCell);

            const activityCell = document.createElement('td');
            activityCell.textContent = time[1];
            row.appendChild(activityCell);

            const topicCell = document.createElement('td');
            topicCell.textContent = time[2];
            row.appendChild(topicCell);

            // Adiciona o botão de editar
            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editTask(dayIndex, timeIndex); // Chama a função de edição
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            // Adiciona a linha à tabela
            tableBody.appendChild(row);
        });
    });
}


// Função para preencher o dropdown de deletar tarefas
// Função para preencher o dropdown de deletar e editar tarefas
function populateDeleteTaskDropdown(schedule) {
    const deleteTaskSelect = document.getElementById('deleteTaskSelect');
    const editTaskSelect = document.getElementById('editTaskSelect'); // Novo dropdown para edição

    deleteTaskSelect.innerHTML = '<option value="">Choose a task</option>';
    editTaskSelect.innerHTML = '<option value="">Choose a task</option>'; // Reseta o dropdown

    schedule.forEach((entry, dayIndex) => {
        entry.times.forEach((time, timeIndex) => {
            const optionDelete = document.createElement('option');
            const optionEdit = document.createElement('option'); // Nova opção para o dropdown de editar

            optionDelete.value = `${dayIndex}-${timeIndex}`;
            optionDelete.textContent = `${entry.day} - ${time[0]} - ${time[1]}`;

            optionEdit.value = `${dayIndex}-${timeIndex}`;
            optionEdit.textContent = `${entry.day} - ${time[0]} - ${time[1]}`;

            deleteTaskSelect.appendChild(optionDelete);
            editTaskSelect.appendChild(optionEdit); // Adiciona ao dropdown de edição
        });
    });
}


// Função para deletar uma tarefa
function deleteTask() {
    const selectedTask = document.getElementById('deleteTaskSelect').value;

    if (!selectedTask) return; // Se nenhuma tarefa for selecionada, não faz nada

    const [dayIndex, timeIndex] = selectedTask.split('-').map(Number);
    const schedule = loadSchedule();

    // Remove a tarefa selecionada
    schedule[dayIndex].times.splice(timeIndex, 1);

    // Se não houver mais tarefas no dia, remove o dia inteiro
    if (schedule[dayIndex].times.length === 0) {
        schedule.splice(dayIndex, 1);
    }

    saveSchedule(schedule);  // Salva o cronograma atualizado no localStorage
    renderSchedule(schedule); // Re-renderiza a tabela
    populateDeleteTaskDropdown(schedule); // Atualiza o dropdown
}

// Função para adicionar uma nova tarefa
function addTask(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;
    const topic = document.getElementById('topic').value;

    const schedule = loadSchedule();
    
    // Verifica se o dia já existe no cronograma
    const dayEntry = schedule.find(entry => entry.day === day);
    
    if (dayEntry) {
        // Se o dia já existe, adiciona o novo horário e atividade
        dayEntry.times.push([time, activity, topic]);
    } else {
        // Se o dia não existe, cria um novo
        schedule.push({
            day: day,
            times: [[time, activity, topic]]
        });
    }

    saveSchedule(schedule);  // Salva o cronograma atualizado no localStorage
    renderSchedule(schedule); // Re-renderiza a tabela
    populateDeleteTaskDropdown(schedule); // Atualiza o dropdown de tarefas
    document.getElementById('taskForm').reset();  // Limpa o formulário
}

// Calcula os dias até o Natal (25 de dezembro)
function calculateDaysUntilChristmas() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const christmasDate = new Date(currentYear, 11, 25);

    if (today > christmasDate) {
        christmasDate.setFullYear(currentYear + 1);
    }

    const differenceInMillis = christmasDate - today;
    const daysLeft = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));
    document.getElementById('daysLeft').textContent = `${daysLeft}`;
}

// Carrega o cronograma e calcula os dias restantes ao carregar a página
window.onload = function() {
    loadSchedule();  // Carrega e renderiza o cronograma
    calculateDaysUntilChristmas();  // Calcula os dias até o Natal
};

// Adiciona o evento de envio do formulário
document.getElementById('taskForm').addEventListener('submit', addTask);

// Adiciona o evento de clique no botão de deletar
document.getElementById('deleteTaskButton').addEventListener('click', deleteTask);
// Função para carregar o cronograma do localStorage
function loadSchedule() {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    renderSchedule(schedule);
    populateDeleteTaskDropdown(schedule); // Popula o dropdown de tarefas para deletar e editar
    return schedule;
}

// Função para salvar o cronograma no localStorage
function saveSchedule(schedule) {
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

// Função para renderizar a tabela do cronograma
function renderSchedule(schedule) {
    const tableBody = document.querySelector('#scheduleTable tbody');
    tableBody.innerHTML = '';  // Limpa a tabela antes de renderizar

    schedule.forEach((entry, dayIndex) => {
        const rowCount = entry.times.length;
        const firstRow = document.createElement('tr');
        
        const dayCell = document.createElement('td');
        dayCell.setAttribute('rowspan', rowCount);
        dayCell.textContent = entry.day;
        firstRow.appendChild(dayCell);

        entry.times.forEach((time, timeIndex) => {
            const row = timeIndex === 0 ? firstRow : document.createElement('tr');

            // Cria células para o horário, atividade e tópico
            const timeCell = document.createElement('td');
            timeCell.textContent = time[0];
            row.appendChild(timeCell);

            const activityCell = document.createElement('td');
            activityCell.textContent = time[1];
            row.appendChild(activityCell);

            const topicCell = document.createElement('td');
            topicCell.textContent = time[2];
            row.appendChild(topicCell);

            // Adiciona a linha à tabela
            tableBody.appendChild(row);
        });
    });
}

// Função para preencher o dropdown de deletar e editar tarefas
function populateDeleteTaskDropdown(schedule) {
    const deleteTaskSelect = document.getElementById('deleteTaskSelect');
    const editTaskSelect = document.getElementById('editTaskSelect'); // Dropdown para editar

    deleteTaskSelect.innerHTML = '<option value="">Escolha uma tarefa</option>';
    editTaskSelect.innerHTML = '<option value="">Escolha uma tarefa</option>';

    schedule.forEach((entry, dayIndex) => {
        entry.times.forEach((time, timeIndex) => {
            const optionDelete = document.createElement('option');
            const optionEdit = document.createElement('option'); // Nova opção para o dropdown de editar

            optionDelete.value = `${dayIndex}-${timeIndex}`;
            optionDelete.textContent = `${entry.day} - ${time[0]} - ${time[1]}`;

            optionEdit.value = `${dayIndex}-${timeIndex}`;
            optionEdit.textContent = `${entry.day} - ${time[0]} - ${time[1]}`;

            deleteTaskSelect.appendChild(optionDelete);
            editTaskSelect.appendChild(optionEdit); // Adiciona ao dropdown de edição
        });
    });
}

// Função para editar uma tarefa
function editTask() {
    const selectedTask = document.getElementById('editTaskSelect').value;

    if (!selectedTask) return; // Se nenhuma tarefa for selecionada, não faz nada

    const [dayIndex, timeIndex] = selectedTask.split('-').map(Number);
    const schedule = loadSchedule();
    const task = schedule[dayIndex].times[timeIndex];

    // Preenche os campos do formulário com os dados da tarefa
    document.getElementById('day').value = schedule[dayIndex].day;
    document.getElementById('time').value = task[0];
    document.getElementById('activity').value = task[1];
    document.getElementById('topic').value = task[2];

    // Muda o comportamento do botão de adicionar para "Salvar Edição"
    const addButton = document.querySelector('#taskForm button');
    addButton.textContent = 'Save Changes';
    addButton.onclick = function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        saveEditedTask(dayIndex, timeIndex); // Salva a tarefa editada
    };
}

// Função para salvar a tarefa editada
function saveEditedTask(dayIndex, timeIndex) {
    const schedule = loadSchedule();

    // Atualiza os dados da tarefa
    schedule[dayIndex].times[timeIndex] = [
        document.getElementById('time').value,
        document.getElementById('activity').value,
        document.getElementById('topic').value
    ];

    saveSchedule(schedule);  // Salva o cronograma atualizado no localStorage
    renderSchedule(schedule); // Re-renderiza a tabela
    populateDeleteTaskDropdown(schedule); // Atualiza o dropdown de tarefas

    // Restaura o botão de adicionar
    const addButton = document.querySelector('#taskForm button');
    addButton.textContent = 'Add Task';
    addButton.onclick = addTask; // Restaura a função original
    document.getElementById('taskForm').reset();  // Limpa o formulário
}

// Função para deletar uma tarefa (caso você precise dela)
function deleteTask() {
    const selectedTask = document.getElementById('deleteTaskSelect').value;

    if (!selectedTask) return; // Se nenhuma tarefa for selecionada, não faz nada

    const [dayIndex, timeIndex] = selectedTask.split('-').map(Number);
    const schedule = loadSchedule();

    // Remove a tarefa selecionada
    schedule[dayIndex].times.splice(timeIndex, 1);

    // Se não houver mais tarefas no dia, remove o dia inteiro
    if (schedule[dayIndex].times.length === 0) {
        schedule.splice(dayIndex, 1);
    }

    saveSchedule(schedule);  // Salva o cronograma atualizado no localStorage
    renderSchedule(schedule); // Re-renderiza a tabela
    populateDeleteTaskDropdown(schedule); // Atualiza o dropdown
}

// Carrega o cronograma e calcula os dias restantes ao carregar a página
window.onload = function() {
    loadSchedule();  // Carrega e renderiza o cronograma
    calculateDaysUntilChristmas();  // Calcula os dias até o Natal
};

// Adiciona o evento de clique no botão de editar
document.getElementById('editTaskButton').addEventListener('click', editTask);

// Adiciona o evento de clique no botão de deletar
document.getElementById('deleteTaskButton').addEventListener('click', deleteTask);


