const API_BASE_URL = 'https://acai098-backend.vercel.app/api';

// Funções para criar os itens, incluindo "Adicionais"
async function criarCopo(ml, preco) {
    const response = await fetch(`${API_BASE_URL}/copos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ml, preco }),
    });
    return await response.json();
}

async function criarFruta(nome) {
    const response = await fetch(`${API_BASE_URL}/frutas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
    });
    return await response.json();
}

async function criarCobertura(nome) {
    const response = await fetch(`${API_BASE_URL}/coberturas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
    });
    return await response.json();
}

async function criarAcompanhamento(nome) {
    const response = await fetch(`${API_BASE_URL}/acompanhamentos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
    });
    return await response.json();
}

async function criarAdicional(nome) {
    const response = await fetch(`${API_BASE_URL}/adicionais`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
    });
    return await response.json();
}

// Funções para listar os itens, incluindo "Adicionais"
async function listarCopos() {
    const response = await fetch(`${API_BASE_URL}/copos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

async function listarFrutas() {
    const response = await fetch(`${API_BASE_URL}/frutas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

async function listarCoberturas() {
    const response = await fetch(`${API_BASE_URL}/coberturas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

async function listarAcompanhamentos() {
    const response = await fetch(`${API_BASE_URL}/acompanhamentos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

async function listarAdicionais() {
    const response = await fetch(`${API_BASE_URL}/adicionais`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}


async function excluirItem(tipo, id) {
    console.log("Tentando excluir item:", tipo, id);
    const confirmar = window.confirm("Tem certeza de que deseja excluir este item?");
    if (!confirmar) return;

    try {
        const response = await fetch(`https://acai098-backend.vercel.app/api/${tipo}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        console.log("Resposta do servidor:", result);

        if (result.success) {
            alert('Item excluído com sucesso!');
            // Aqui você pode atualizar a lista de itens, se necessário.
        } else {
            alert('Erro ao excluir o item.');
        }
    } catch (error) {
        console.error("Erro ao excluir item:", error);
        alert('Erro ao excluir o item. Veja o console para mais detalhes.');
    }
}


// Função para renderizar os itens na tabela
async function renderizarItens() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    // Renderizar Copos
    const copos = await listarCopos();
    itemList.innerHTML += '<tr><td colspan="5"><strong>Copos</strong></td></tr>';
    copos.forEach((copo, index) => {
        itemList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${copo.ml}</td>
                <td>Copo</td>
                <td>R$${copo.preco}</td>
                <td><button class="btn btn-danger" onclick="excluirItem('copos', '${copo.id}')">Excluir</button></td>
            </tr>
        `;
    });

    // Renderizar Frutas
    const frutas = await listarFrutas();
    itemList.innerHTML += '<tr><td colspan="5"><strong>Frutas</strong></td></tr>';
    frutas.forEach((fruta, index) => {
        itemList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${fruta.nome}</td>
                <td>Fruta</td>
                <td></td>
                <td><button class="btn btn-danger" onclick="excluirItem('frutas', '${fruta.id}')">Excluir</button></td>
            </tr>
        `;
    });

    // Renderizar Coberturas
    const coberturas = await listarCoberturas();
    itemList.innerHTML += '<tr><td colspan="5"><strong>Coberturas</strong></td></tr>';
    coberturas.forEach((cobertura, index) => {
        itemList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${cobertura.nome}</td>
                <td>Cobertura</td>
                <td></td>
                <td><button class="btn btn-danger" onclick="excluirItem('coberturas', '${cobertura.id}')">Excluir</button></td>
            </tr>
        `;
    });

    // Renderizar Acompanhamentos
    const acompanhamentos = await listarAcompanhamentos();
    itemList.innerHTML += '<tr><td colspan="5"><strong>Acompanhamentos</strong></td></tr>';
    acompanhamentos.forEach((acompanhamento, index) => {
        itemList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${acompanhamento.nome}</td>
                <td>Acompanhamento</td>
                <td></td>
                <td><button class="btn btn-danger" onclick="excluirItem('acompanhamentos', '${acompanhamento.id}')">Excluir</button></td>
            </tr>
        `;
    });

    // Renderizar Adicionais
    const adicionais = await listarAdicionais();
    itemList.innerHTML += '<tr><td colspan="5"><strong>Adicionais</strong></td></tr>';
    adicionais.forEach((adicional, index) => {
        itemList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${adicional.nome}</td>
                <td>Adicional</td>
                <td></td>
                <td><button class="btn btn-danger" onclick="excluirItem('adicionais', '${adicional.id}')">Excluir</button></td>
            </tr>
        `;
    });
}

// Adicionar evento ao formulário para enviar dados para a API
document.getElementById('form-item-create').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('itemName').value;
    const type = document.getElementById('itemType').value;
    const details = document.getElementById('itemDetails').value;
    const price = document.getElementById('itemPrice').value;

    if (type === 'copo') {
        await criarCopo(details, price);
    } else if (type === 'fruta') {
        await criarFruta(name);
    } else if (type === 'cobertura') {
        await criarCobertura(name);
    } else if (type === 'acompanhamento') {
        await criarAcompanhamento(name);
    } else if (type === 'adicional') {
        await criarAdicional(name);
    }
    
    alert('Item criado com sucesso!');
    await renderizarItens();  // Recarrega a lista de itens após criar um novo
});

// Renderizar os itens na tabela ao carregar a página
window.onload = async () => {
    await renderizarItens();
};
