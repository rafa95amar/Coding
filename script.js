// Definição de um array 'schedule' com o cronograma das atividades da semana. 
// Cada dia tem um conjunto de horários e atividades associadas.
const schedule = [
    { day: 'Segunda-feira', times: [['07:30 - 11:30', 'Inglês', 'Entertainment'], ['14:00 - 18:00', 'Inglês', '']] },
    { day: 'Terça-feira', times: [['07:30 - 11:30', 'Inglês', 'Entertainment'], ['14:00 - 18:00', 'Inglês', '']] },
    { day: 'Quarta-feira', times: [['07:30 - 11:30', 'Inglês', 'News'], ['14:00 - 18:00', 'Inglês', '']] },
    { day: 'Quinta-feira', times: [['07:30 - 11:30', 'Inglês', 'News'], ['14:00 - 18:00', 'Inglês', '']] },
    { day: 'Sexta-feira', times: [['07:30 - 11:30', 'Inglês', 'Chores'], ['14:00 - 18:00', 'Inglês', '']] },
    { day: 'Sábado', times: [['07:30 - 11:30', 'Inglês', 'Economics'], ['14:00 - 18:00', 'Inglês', ]] },
    { day: 'Domingo', times: [['07:30 - 11:30', 'Inglês', 'Lectures'], ['16:30 - 20:30', 'Inglês', ]] }
];

// Obtém a referência ao elemento de tabela com o id 'scheduleTable' no HTML.
const table = document.getElementById('scheduleTable');

// Itera sobre cada entrada do cronograma (cada dia da semana).
schedule.forEach((entry) => {
    // Conta quantos períodos (times) há em cada dia, para determinar o rowspan (mesclagem de linhas).
    const rowCount = entry.times.length;

    // Cria a primeira linha (tr) da tabela para cada dia da semana.
    const firstRow = document.createElement('tr');
    
    // Cria a célula (td) que contém o nome do dia da semana.
    const dayCell = document.createElement('td');
    // Define o atributo rowspan para que o nome do dia ocupe várias linhas se necessário.
    dayCell.setAttribute('rowspan', rowCount);
    // Insere o texto do nome do dia na célula.
    dayCell.textContent = entry.day;
    // Adiciona a célula do dia à primeira linha.
    firstRow.appendChild(dayCell);

    // Itera sobre cada horário e atividade do dia atual.
    entry.times.forEach((time, index) => {
        // Para a primeira atividade, completa a linha que já contém o nome do dia.
        if (index === 0) {
            // Cria a célula para o horário.
            const timeCell = document.createElement('td');
            // Insere o horário na célula.
            timeCell.textContent = time[0];
            // Adiciona a célula de horário à primeira linha.
            firstRow.appendChild(timeCell);
            
            // Cria a célula para a atividade (matéria).
            const activityCell = document.createElement('td');
            // Insere o nome da atividade na célula.
            activityCell.textContent = time[1];
            // Adiciona a célula de atividade à primeira linha.
            firstRow.appendChild(activityCell);

            // Cria a célula para o tópico da atividade.
            const topicCell = document.createElement('td');
            // Insere o tópico da atividade na célula.
            topicCell.textContent = time[2];
            // Adiciona a célula de tópico à primeira linha.
            firstRow.appendChild(topicCell);

            // Finalmente, adiciona a linha completa (primeira linha do dia) à tabela.
            table.appendChild(firstRow);
        } else {
            // Para as atividades seguintes do dia, cria novas linhas (sem o nome do dia).
            const additionalRow = document.createElement('tr');
            
            // Cria e insere a célula do horário para a nova linha.
            const timeCell = document.createElement('td');
            timeCell.textContent = time[0];
            additionalRow.appendChild(timeCell);

            // Cria e insere a célula da atividade (matéria) para a nova linha.
            const activityCell = document.createElement('td');
            activityCell.textContent = time[1];
            additionalRow.appendChild(activityCell);

            // Cria e insere a célula do tópico para a nova linha.
            const topicCell = document.createElement('td');
            topicCell.textContent = time[2];
            additionalRow.appendChild(topicCell);

            // Adiciona a nova linha à tabela.
            table.appendChild(additionalRow);
        }
    });
});
// Função para calcular os dias restantes até o Natal (25 de dezembro)
function calculateDaysUntilChristmas() {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Define a data de 25 de dezembro no ano atual
    const christmasDate = new Date(currentYear, 11, 25); // 11 é dezembro (mês começa de 0)

    // Se já passou o Natal este ano, calcula para o próximo ano
    if (today > christmasDate) {
        christmasDate.setFullYear(currentYear + 1);
    }

    // Calcula a diferença em milissegundos
    const differenceInMillis = christmasDate - today;

    // Converte a diferença para dias
    const daysLeft = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));

    // Atualiza o texto no HTML
    document.getElementById('daysLeft').textContent = daysLeft;
}

// Chama a função assim que a página carrega
window.onload = function() {
    calculateDaysUntilChristmas();
};
