const API_BASE_URL = 'https://acai098-backend.vercel.app/api';

// Funções para buscar os itens da API
async function buscarCopos() {
    const response = await fetch(`${API_BASE_URL}/copos`);
    return await response.json();
}

async function buscarFrutas() {
    const response = await fetch(`${API_BASE_URL}/frutas`);
    return await response.json();
}

async function buscarCoberturas() {
    const response = await fetch(`${API_BASE_URL}/coberturas`);
    return await response.json();
}

async function buscarAcompanhamentos() {
    const response = await fetch(`${API_BASE_URL}/acompanhamentos`);
    return await response.json();
}

async function buscarAdicionais() {
    const response = await fetch(`${API_BASE_URL}/adicionais`);
    return await response.json();
}

// Função para inicializar os selects com os itens do banco
async function inicializarSelects() {
    const copos = await buscarCopos();
    const frutas = await buscarFrutas();
    const coberturas = await buscarCoberturas();
    const acompanhamentos = await buscarAcompanhamentos();
    const adicionais = await buscarAdicionais();

    const copoSelect = document.getElementById('copo');
    const frutaSelect = document.getElementById('fruta');
    const coberturaSelect = document.getElementById('cobertura');
    const acompanhamentoSelect = document.getElementById('acompanhamento');

    // Popular os selects
    copos.forEach(copo => {
        const option = document.createElement('option');
        option.value = copo.id;
        option.textContent = `${copo.ml} - R$${copo.preco}`;
        copoSelect.appendChild(option);
    });

    frutas.forEach(fruta => {
        const option = document.createElement('option');
        option.value = fruta.id;
        option.textContent = fruta.nome;
        frutaSelect.appendChild(option);
    });

    coberturas.forEach(cobertura => {
        const option = document.createElement('option');
        option.value = cobertura.id;
        option.textContent = cobertura.nome;
        coberturaSelect.appendChild(option);
    });

    acompanhamentos.forEach(acompanhamento => {
        const option = document.createElement('option');
        option.value = acompanhamento.id;
        option.textContent = acompanhamento.nome;
        acompanhamentoSelect.appendChild(option);
    });

    // Adicionais são gerados dinamicamente quando o botão é clicado
    document.getElementById('add-adicional').addEventListener('click', () => {
        adicionarAdicional(adicionais);
    });
}

// Função para adicionar um novo select de fruta
function adicionarFruta() {
    const frutasContainer = document.getElementById('frutas-container');
    const novaFruta = document.createElement('div');
    novaFruta.classList.add('form-group');
    novaFruta.innerHTML = `
        <label>Escolha a Fruta</label>
        <select class="form-control fruta-select" required>
            ${document.getElementById('fruta').innerHTML}
        </select>
        <button type="button" class="btn btn-danger btn-remove">Remover</button>
    `;
    frutasContainer.appendChild(novaFruta);
    novaFruta.querySelector('.btn-remove').addEventListener('click', () => novaFruta.remove());
}

// Função para adicionar um novo select de cobertura
function adicionarCobertura() {
    const coberturasContainer = document.getElementById('coberturas-container');
    const novaCobertura = document.createElement('div');
    novaCobertura.classList.add('form-group');
    novaCobertura.innerHTML = `
        <label>Escolha a Cobertura</label>
        <select class="form-control cobertura-select" required>
            ${document.getElementById('cobertura').innerHTML}
        </select>
        <button type="button" class="btn btn-danger btn-remove">Remover</button>
    `;
    coberturasContainer.appendChild(novaCobertura);
    novaCobertura.querySelector('.btn-remove').addEventListener('click', () => novaCobertura.remove());
}

// Função para adicionar um novo select de acompanhamento
function adicionarAcompanhamento() {
    const acompanhamentosContainer = document.getElementById('acompanhamentos-container');
    const novoAcompanhamento = document.createElement('div');
    novoAcompanhamento.classList.add('form-group');
    novoAcompanhamento.innerHTML = `
        <label>Escolha o Acompanhamento</label>
        <select class="form-control acompanhamento-select" required>
            ${document.getElementById('acompanhamento').innerHTML}
        </select>
        <button type="button" class="btn btn-danger btn-remove">Remover</button>
    `;
    acompanhamentosContainer.appendChild(novoAcompanhamento);
    novoAcompanhamento.querySelector('.btn-remove').addEventListener('click', () => novoAcompanhamento.remove());
}

// Função para adicionar um novo select de adicional
function adicionarAdicional(adicionais) {
    const adicionaisContainer = document.getElementById('adicionais-container');
    const novoAdicional = document.createElement('div');
    novoAdicional.classList.add('form-group');
    const adicionalOptions = adicionais.map(adicional => `<option value="${adicional.id}">${adicional.nome}</option>`).join('');
    novoAdicional.innerHTML = `
        <label>Escolha o adicional</label>
        <select class="form-control adicional-select">
            ${adicionalOptions}
        </select>
        <button type="button" class="btn btn-danger btn-remove">Remover</button>
    `;
    adicionaisContainer.appendChild(novoAdicional);
    novoAdicional.querySelector('.btn-remove').addEventListener('click', () => novoAdicional.remove());
}

// Mostrar ou esconder o campo de valor da entrega
function toggleValorEntrega() {
    const tipoEntrega = document.getElementById('tipoEntrega').value;
    const valorEntregaContainer = document.getElementById('valorEntregaContainer');
    valorEntregaContainer.style.display = tipoEntrega === 'entrega' ? 'block' : 'none';
}

// Função para calcular o total do pedido
function calcularTotal() {
    let total = 0;
    const copo = document.getElementById('copo');
    total += parseFloat(copo.options[copo.selectedIndex].textContent.split(' - R$')[1]);

    const adicionais = document.querySelectorAll('.adicional-select');
    total += adicionais.length * 2;

    const tipoEntrega = document.getElementById('tipoEntrega').value;
    if (tipoEntrega === 'entrega') {
        const valorEntrega = document.getElementById('valorEntrega').value;
        total += parseFloat(valorEntrega || 0);
    }

    return total.toFixed(2);
}

// Função para gerar o resumo do pedido
// Função para gerar o resumo do pedido
function gerarResumo() {
    const resumo = document.getElementById('resumo-pedido');
    resumo.innerHTML = '';

    const nomeCliente = document.getElementById('nomeCliente').value;
    const copo = document.getElementById('copo').selectedOptions[0].textContent;

    resumo.innerHTML += `<li><strong>Cliente:</strong> ${nomeCliente}</li>`;
    resumo.innerHTML += `<li><strong>Copo:</strong> ${copo}</li>`;

    const frutas = document.querySelectorAll('.fruta-select');
    frutas.forEach(fruta => {
        resumo.innerHTML += `<li><strong>Fruta:</strong> ${fruta.selectedOptions[0].textContent}</li>`;
    });

    const coberturas = document.querySelectorAll('.cobertura-select');
    coberturas.forEach(cobertura => {
        resumo.innerHTML += `<li><strong>Cobertura:</strong> ${cobertura.selectedOptions[0].textContent}</li>`;
    });

    const acompanhamentos = document.querySelectorAll('.acompanhamento-select');
    acompanhamentos.forEach(acompanhamento => {
        resumo.innerHTML += `<li><strong>Acompanhamento:</strong> ${acompanhamento.selectedOptions[0].textContent}</li>`;
    });

    const adicionais = document.querySelectorAll('.adicional-select');
    adicionais.forEach(adicional => {
        const selectedOption = adicional.selectedOptions[0];
        if (selectedOption) {
            resumo.innerHTML += `<li><strong>Adicional:</strong> ${selectedOption.textContent} (R$2,00)</li>`;
        }
    });

    let tipoEntrega = document.getElementById('tipoEntrega').value;
    if (tipoEntrega === 'entrega') {
        tipoEntrega = 'Delivery';
    } else {
        tipoEntrega = 'Retirada';
    }

    if (tipoEntrega === 'Delivery') {
        const valorEntrega = document.getElementById('valorEntrega').value;
        resumo.innerHTML += `<li><strong>Valor da Entrega:</strong> R$${valorEntrega || 0}</li>`;
    }

    resumo.innerHTML += `<li><strong>Tipo de Entrega:</strong> ${tipoEntrega}</li>`;
    resumo.innerHTML += `<li><strong>Total:</strong> R$${calcularTotal()}</li>`;

    // Mostrar o botão "Imprimir" e "Finalizar Venda"
    document.getElementById('btn-imprimir').style.display = 'inline-block';
    document.getElementById('btn-finalizar-venda').style.display = 'inline-block';
}


// Função para imprimir o resumo
function imprimirResumo() {
    const resumo = document.getElementById('resumo-pedido').innerHTML;

    const printWindow = window.open('', '', 'height=600,width=400');
    printWindow.document.write('<html><head><title>Imprimir Resumo</title></head><body>');
    printWindow.document.write('<div style="text-align: center; font-size: 14px;">');
    printWindow.document.write('<p><strong>AÇAI 098</strong></p>');
    printWindow.document.write(resumo.replace(/<\/li>/g, '</li><br>'));
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}


// Função para finalizar a venda e salvar no backend
async function finalizarVenda() {
    const resumoPedido = {
        cliente: document.getElementById('nomeCliente').value,
        copo: document.getElementById('copo').selectedOptions[0].textContent,
        frutas: Array.from(document.querySelectorAll('.fruta-select')).map(select => select.selectedOptions[0].textContent),
        coberturas: Array.from(document.querySelectorAll('.cobertura-select')).map(select => select.selectedOptions[0].textContent),
        acompanhamentos: Array.from(document.querySelectorAll('.acompanhamento-select')).map(select => select.selectedOptions[0].textContent),
        adicionais: Array.from(document.querySelectorAll('.adicional-select')).map(select => select.selectedOptions[0]?.textContent || ''),
        tipoEntrega: document.getElementById('tipoEntrega').value,
        valorEntrega: document.getElementById('valorEntrega').value || 0,
        total: calcularTotal(),
    };

    try {
        // Fazer a requisição POST para salvar no backend
        const response = await fetch(`${API_BASE_URL}/historico`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resumoPedido)
        });

        if (response.ok) {
            alert('Venda finalizada e salva no histórico com sucesso!');
            location.reload(); // Reinicia o formulário
        } else {
            throw new Error('Erro ao salvar no histórico');
        }
    } catch (error) {
        console.error('Erro ao salvar no Firestore:', error);
        alert('Erro ao salvar o histórico da venda.');
    }
}


// Inicializar a página de venda
window.onload = async () => {
    await inicializarSelects();

    document.getElementById('add-fruta').addEventListener('click', adicionarFruta);
    document.getElementById('add-cobertura').addEventListener('click', adicionarCobertura);
    document.getElementById('add-acompanhamento').addEventListener('click', adicionarAcompanhamento);
    document.getElementById('tipoEntrega').addEventListener('change', toggleValorEntrega);
    document.getElementById('btn-mostrar-resumo').addEventListener('click', gerarResumo);
    document.getElementById('btn-imprimir').addEventListener('click', imprimirResumo);
    document.getElementById('btn-finalizar-venda').addEventListener('click', finalizarVenda);
};
