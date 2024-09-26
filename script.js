// Função para carregar o cronograma do localStorage
function loadSchedule() {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    renderSchedule(schedule);
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

    schedule.forEach((entry) => {
        const rowCount = entry.times.length;
        const firstRow = document.createElement('tr');
        
        const dayCell = document.createElement('td');
        dayCell.setAttribute('rowspan', rowCount);
        dayCell.textContent = entry.day;
        firstRow.appendChild(dayCell);

        entry.times.forEach((time, index) => {
            if (index === 0) {
                const timeCell = document.createElement('td');
                timeCell.textContent = time[0];
                firstRow.appendChild(timeCell);

                const activityCell = document.createElement('td');
                activityCell.textContent = time[1];
                firstRow.appendChild(activityCell);

                const topicCell = document.createElement('td');
                topicCell.textContent = time[2];
                firstRow.appendChild(topicCell);

                tableBody.appendChild(firstRow);
            } else {
                const additionalRow = document.createElement('tr');
                
                const timeCell = document.createElement('td');
                timeCell.textContent = time[0];
                additionalRow.appendChild(timeCell);

                const activityCell = document.createElement('td');
                activityCell.textContent = time[1];
                additionalRow.appendChild(activityCell);

                const topicCell = document.createElement('td');
                topicCell.textContent = time[2];
                additionalRow.appendChild(topicCell);

                tableBody.appendChild(additionalRow);
            }
        });
    });
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
