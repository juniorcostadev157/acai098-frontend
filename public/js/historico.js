const API_BASE_URL = 'https://acai098-backend.vercel.app/api';

async function buscarHistorico(query = '', data = '') {
    const response = await fetch(`${API_BASE_URL}/historico?query=${query}&data=${data}`);
    
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

function renderizarHistorico(vendas) {
    const tabela = document.getElementById('tabela-historico');
    tabela.innerHTML = '';

    let totalVendas = 0;
    let valorTotal = 0;

    vendas.forEach(venda => {
        let dataVenda;
        
        if (venda.data && typeof venda.data.toDate === 'function') {
            dataVenda = venda.data.toDate();
        } else if (venda.data instanceof Date) {
            dataVenda = venda.data;
        } else if (typeof venda.data === 'string' || typeof venda.data === 'number') {
            dataVenda = new Date(venda.data);
        } else {
            dataVenda = new Date(); 
        }

        const totalVenda = parseFloat(venda.total) || 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venda.cliente}</td>
            <td>${venda.copo}</td>
            <td>${venda.frutas?.join(', ') || ''}, ${venda.coberturas?.join(', ') || ''}, ${venda.acompanhamentos?.join(', ') || ''}, ${venda.adicionais?.join(', ') || ''}</td>
            <td>R$${totalVenda.toFixed(2)}</td>
            <td>${dataVenda.toLocaleString()}</td>
        `;
        
        // Adiciona um evento de clique na linha da tabela
        tr.addEventListener('click', () => {
            const detalheCliente = document.getElementById('detalheCliente');
            const detalheCopo = document.getElementById('detalheCopo');
            const detalheFrutas = document.getElementById('detalheFrutas');
            const detalheCoberturas = document.getElementById('detalheCoberturas');
            const detalheAdicionais = document.getElementById('detalheAdicionais');
            const detalheAcompanhamentos = document.getElementById('detalheAcompanhamentos');
            const detalheTipoEntrega = document.getElementById('detalheTipoEntrega');
            const detalheValorEntrega = document.getElementById('detalheValorEntrega');
            const detalheTotal = document.getElementById('detalheTotal');
            const detalheData = document.getElementById('detalheData');

            // Verifica se os elementos existem antes de definir o textContent
            if (detalheCliente) detalheCliente.textContent = venda.cliente;
            if (detalheCopo) detalheCopo.textContent = venda.copo;
            if (detalheFrutas) detalheFrutas.textContent = venda.frutas ? venda.frutas.join(', ') : 'Nenhuma';
            if (detalheCoberturas) detalheCoberturas.textContent = venda.coberturas ? venda.coberturas.join(', ') : 'Nenhuma';
            if (detalheAdicionais) detalheAdicionais.textContent = venda.adicionais ? venda.adicionais.join(', ') : 'Nenhum';
            if (detalheAcompanhamentos) detalheAcompanhamentos.textContent = venda.acompanhamentos ? venda.acompanhamentos.join(', ') : 'Nenhum';
            if (detalheTipoEntrega) detalheTipoEntrega.textContent = venda.tipoEntrega || 'N/A';
            if (detalheValorEntrega) detalheValorEntrega.textContent = venda.valorEntrega ? `R$${parseFloat(venda.valorEntrega).toFixed(2)}` : 'N/A';
            if (detalheTotal) detalheTotal.textContent = totalVenda.toFixed(2);
            if (detalheData) detalheData.textContent = dataVenda.toLocaleString();

            // Abrir o modal
            $('#detalhesVendaModal').modal('show');
        });

        tabela.appendChild(tr);

        totalVendas++;
        valorTotal += totalVenda;
    });

    document.getElementById('quantidade-vendas').textContent = `Quant.: ${totalVendas}`;
    document.getElementById('valor-total').textContent = `Valor total: R$${valorTotal.toFixed(2)}`;
}



// Função para inicializar o histórico
async function inicializarHistorico() {
    const dataHoje = new Date().toISOString().split('T')[0]; // Data de hoje no formato YYYY-MM-DD
    const vendas = await buscarHistorico('', dataHoje);
    renderizarHistorico(vendas);
}

// Evento de busca
document.getElementById('busca').addEventListener('input', async () => {
    const query = document.getElementById('busca').value;
    const data = document.getElementById('data').value;
    const vendas = await buscarHistorico(query, data);
    renderizarHistorico(vendas);
});

// Evento de filtragem por data
document.getElementById('data').addEventListener('change', async () => {
    const query = document.getElementById('busca').value;
    const data = document.getElementById('data').value;
    const vendas = await buscarHistorico(query, data);
    renderizarHistorico(vendas);
});

// Inicializa a página de histórico
window.onload = async () => {
    await inicializarHistorico();
};

// Função para inicializar o histórico
async function inicializarHistorico() {
    const dataHoje = new Date().toISOString().split('T')[0]; // Data de hoje no formato YYYY-MM-DD
    const vendas = await buscarHistorico('', dataHoje);
    renderizarHistorico(vendas);
}

// Evento de busca
document.getElementById('busca').addEventListener('input', async () => {
    const query = document.getElementById('busca').value;
    const data = document.getElementById('data').value;
    const vendas = await buscarHistorico(query, data);
    renderizarHistorico(vendas);
});

// Evento de filtragem por data
document.getElementById('data').addEventListener('change', async () => {
    const query = document.getElementById('busca').value;
    const data = document.getElementById('data').value;
    const vendas = await buscarHistorico(query, data);
    renderizarHistorico(vendas);
});

// Inicializa a página de histórico
window.onload = async () => {
    await inicializarHistorico();
};


// Função para inicializar o histórico
async function inicializarHistorico() {
    const dataHoje = new Date().toISOString().split('T')[0]; // Data de hoje no formato YYYY-MM-DD
    const vendas = await buscarHistorico('', dataHoje);
    renderizarHistorico(vendas);
}





// Evento de busca
document.getElementById('busca').addEventListener('input', async () => {
    const query = document.getElementById('busca').value;
    const data = document.getElementById('data').value;
    const vendas = await buscarHistorico(query, data);
    renderizarHistorico(vendas);
});

// Evento de filtragem por data
document.getElementById('data').addEventListener('change', async () => {
    const query = document.getElementById('busca').value;
    const data = document.getElementById('data').value;
    const vendas = await buscarHistorico(query, data);
    renderizarHistorico(vendas);
});

// Inicializa a página de histórico
window.onload = async () => {
    await inicializarHistorico();
};
