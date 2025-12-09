// Dados de login
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// Verificar se está logado
let isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

// Elementos
const loginContainer = document.getElementById('loginContainer');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const btnLogout = document.getElementById('btnLogout');

// Inicialização
if (isLoggedIn) {
    showAdminPanel();
} else {
    showLogin();
}

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

// Logout
btnLogout.addEventListener('click', () => {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('adminLoggedIn');
        showLogin();
    }
});

function showLogin() {
    loginContainer.style.display = 'flex';
    adminPanel.style.display = 'none';
}

function showAdminPanel() {
    loginContainer.style.display = 'none';
    adminPanel.style.display = 'flex';
    loadDashboard();
}

// Navegação entre seções
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        switchSection(section);
    });
});

function switchSection(section) {
    // Atualizar navegação
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Atualizar conteúdo
    contentSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(`section-${section}`).classList.add('active');
    
    // Atualizar título
    const titles = {
        dashboard: 'Dashboard',
        hero: 'Hero Section',
        sobre: 'Sobre o Projeto',
        servicos: 'Serviços',
        impacto: 'Impacto Social',
        galeria: 'Galeria de Fotos',
        depoimentos: 'Depoimentos',
        contato: 'Informações de Contato',
        mensagens: 'Mensagens Recebidas'
    };
    pageTitle.textContent = titles[section];
    
    // Carregar dados da seção
    loadSectionData(section);
}

// Menu toggle mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Fechar sidebar ao clicar em um item no mobile
if (window.innerWidth <= 768) {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    });
}

// Fechar sidebar ao clicar fora (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }
});

// Carregar dados do dashboard
function loadDashboard() {
    // Aqui você pode carregar dados reais de uma API
    console.log('Dashboard carregado');
}

// Carregar dados de cada seção
function loadSectionData(section) {
    switch(section) {
        case 'servicos':
            loadServicos();
            break;
        case 'galeria':
            loadGaleria();
            break;
        case 'depoimentos':
            loadDepoimentos();
            break;
        case 'mensagens':
            loadMensagens();
            break;
        case 'doacoes':
            loadDoacoes();
            break;
    }
}

// Serviços
function loadServicos() {
    const servicos = [
        {
            id: 1,
            titulo: 'Cursos Gratuitos',
            descricao: 'Cursos completos de costura básica, intermediária e avançada.'
        },
        {
            id: 2,
            titulo: 'Equipamentos',
            descricao: 'Fornecemos todos os equipamentos e materiais necessários.'
        },
        {
            id: 3,
            titulo: 'Inserção no Mercado',
            descricao: 'Apoio completo para inserção no mercado de trabalho.'
        },
        {
            id: 4,
            titulo: 'Certificação',
            descricao: 'Certificado reconhecido ao final do curso.'
        }
    ];
    
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = servicos.map(servico => `
        <div class="service-item">
            <div class="item-content">
                <h3>${servico.titulo}</h3>
                <p>${servico.descricao}</p>
            </div>
            <div class="item-actions">
                <button class="btn-sm btn-edit-sm" onclick="editarServico(${servico.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-sm btn-delete-sm" onclick="deletarServico(${servico.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function adicionarServico() {
    const titulo = prompt('Título do serviço:');
    const descricao = prompt('Descrição do serviço:');
    
    if (titulo && descricao) {
        alert('Serviço adicionado com sucesso!');
        loadServicos();
    }
}

function editarServico(id) {
    alert(`Editando serviço ${id}`);
}

function deletarServico(id) {
    if (confirm('Deseja realmente excluir este serviço?')) {
        alert('Serviço excluído!');
        loadServicos();
    }
}

// Galeria
function loadGaleria() {
    const fotos = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
            titulo: 'Aulas Práticas'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=400&fit=crop',
            titulo: 'Formatura'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=400&fit=crop',
            titulo: 'Trabalhos Realizados'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop',
            titulo: 'Oficinas'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
            titulo: 'Eventos'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
            titulo: 'Comunidade'
        }
    ];
    
    const galleryGrid = document.getElementById('adminGalleryGrid');
    galleryGrid.innerHTML = fotos.map(foto => `
        <div class="gallery-item-admin">
            <img src="${foto.url}" alt="${foto.titulo}">
            <div class="gallery-item-actions">
                <button class="btn-icon btn-edit" onclick="editarFoto(${foto.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deletarFoto(${foto.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Upload de fotos
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        alert(`${files.length} foto(s) selecionada(s). Upload simulado com sucesso!`);
        loadGaleria();
    }
});

function editarFoto(id) {
    const novoTitulo = prompt('Novo título da foto:');
    if (novoTitulo) {
        alert('Foto atualizada!');
        loadGaleria();
    }
}

function deletarFoto(id) {
    if (confirm('Deseja realmente excluir esta foto?')) {
        alert('Foto excluída!');
        loadGaleria();
    }
}

// Depoimentos
function loadDepoimentos() {
    const depoimentos = [
        {
            id: 1,
            nome: 'Maria Silva',
            cargo: 'Costureira Autônoma',
            texto: 'O projeto mudou minha vida! Hoje tenho meu próprio ateliê e consigo sustentar minha família com dignidade.'
        },
        {
            id: 2,
            nome: 'Ana Paula',
            cargo: 'Costureira em Confecção',
            texto: 'Aprendi uma profissão que me deu independência financeira. Os professores são excelentes!'
        },
        {
            id: 3,
            nome: 'Joana Santos',
            cargo: 'Costureira Sob Medida',
            texto: 'Estava desempregada há 2 anos. Fiz o curso e em 3 meses já estava trabalhando.'
        }
    ];
    
    const testimonialsList = document.getElementById('testimonialsList');
    testimonialsList.innerHTML = depoimentos.map(dep => `
        <div class="testimonial-item">
            <div class="item-content">
                <h3>${dep.nome} - ${dep.cargo}</h3>
                <p>${dep.texto}</p>
            </div>
            <div class="item-actions">
                <button class="btn-sm btn-edit-sm" onclick="editarDepoimento(${dep.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-sm btn-delete-sm" onclick="deletarDepoimento(${dep.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function adicionarDepoimento() {
    const nome = prompt('Nome:');
    const cargo = prompt('Cargo/Profissão:');
    const texto = prompt('Depoimento:');
    
    if (nome && cargo && texto) {
        alert('Depoimento adicionado com sucesso!');
        loadDepoimentos();
    }
}

function editarDepoimento(id) {
    alert(`Editando depoimento ${id}`);
}

function deletarDepoimento(id) {
    if (confirm('Deseja realmente excluir este depoimento?')) {
        alert('Depoimento excluído!');
        loadDepoimentos();
    }
}

// Mensagens
function loadMensagens() {
    // Carregar mensagens do localStorage
    let mensagens = JSON.parse(localStorage.getItem('mensagensContato') || '[]');
    
    // Se não houver mensagens, usar exemplos
    if (mensagens.length === 0) {
        mensagens = [
            {
                id: 1,
                nome: 'Maria Silva',
                email: 'maria@email.com',
                telefone: '(65) 99999-9999',
                assunto: 'Inscrição no Curso',
                mensagem: 'Gostaria de saber como faço para me inscrever no próximo curso de costura.',
                data: new Date().toLocaleString('pt-BR'),
                lida: false
            },
            {
                id: 2,
                nome: 'João Santos',
                email: 'joao@email.com',
                telefone: '(65) 98888-8888',
                assunto: 'Doação',
                mensagem: 'Tenho interesse em fazer uma doação de máquinas de costura. Como proceder?',
                data: new Date(Date.now() - 86400000).toLocaleString('pt-BR'),
                lida: false
            },
            {
                id: 3,
                nome: 'Ana Paula',
                email: 'ana@email.com',
                telefone: '(65) 97777-7777',
                assunto: 'Voluntariado',
                mensagem: 'Sou professora de costura e gostaria de ser voluntária no projeto.',
                data: new Date(Date.now() - 172800000).toLocaleString('pt-BR'),
                lida: true
            }
        ];
    }
    
    const messagesList = document.getElementById('messagesList');
    
    if (mensagens.length === 0) {
        messagesList.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #666;">
                <i class="fas fa-inbox" style="font-size: 60px; margin-bottom: 20px; opacity: 0.3;"></i>
                <p>Nenhuma mensagem recebida ainda.</p>
            </div>
        `;
        return;
    }
    
    messagesList.innerHTML = mensagens.map(msg => `
        <div class="message-item ${!msg.lida ? 'unread' : ''}" data-id="${msg.id}">
            <div class="message-header">
                <h4>${msg.nome} - ${msg.assunto}</h4>
                <small>${msg.data}</small>
            </div>
            <div class="message-body">
                <p><strong>Email:</strong> ${msg.email}</p>
                <p><strong>Telefone:</strong> ${msg.telefone || 'Não informado'}</p>
                <p style="margin-top: 10px;">${msg.mensagem}</p>
            </div>
            <div class="message-footer">
                <button class="btn-sm btn-edit-sm" onclick="responderMensagem(${msg.id}, '${msg.telefone}', '${msg.nome}')">
                    <i class="fab fa-whatsapp"></i> Responder WhatsApp
                </button>
                ${!msg.lida ? `
                <button class="btn-sm" style="background: #2196F3;" onclick="marcarComoLida(${msg.id})">
                    <i class="fas fa-check"></i> Marcar como Lida
                </button>
                ` : ''}
                <button class="btn-sm btn-delete-sm" onclick="deletarMensagem(${msg.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
    
    // Atualizar contador de mensagens não lidas
    const naoLidas = mensagens.filter(m => !m.lida).length;
    const badge = document.querySelector('[data-section="mensagens"] .badge');
    if (badge) {
        badge.textContent = naoLidas;
        badge.style.display = naoLidas > 0 ? 'block' : 'none';
    }
}

function responderMensagem(id, telefone, nome) {
    // Limpar telefone (remover caracteres especiais)
    const telefoneLimpo = telefone.replace(/\D/g, '');
    
    // Adicionar DDI se não tiver
    const numeroCompleto = telefoneLimpo.startsWith('55') ? telefoneLimpo : '55' + telefoneLimpo;
    
    // Mensagem padrão
    const mensagem = `Olá ${nome}! Obrigado por entrar em contato com o Projeto Social de Costura. Como posso ajudá-lo(a)?`;
    
    // Abrir WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
    
    // Marcar como lida
    marcarComoLida(id);
}

function marcarComoLida(id) {
    let mensagens = JSON.parse(localStorage.getItem('mensagensContato') || '[]');
    const index = mensagens.findIndex(m => m.id === id);
    
    if (index !== -1) {
        mensagens[index].lida = true;
        localStorage.setItem('mensagensContato', JSON.stringify(mensagens));
        loadMensagens();
        showNotification('Mensagem marcada como lida!', 'success');
    }
}

function deletarMensagem(id) {
    if (confirm('Deseja realmente excluir esta mensagem?')) {
        let mensagens = JSON.parse(localStorage.getItem('mensagensContato') || '[]');
        mensagens = mensagens.filter(m => m.id !== id);
        localStorage.setItem('mensagensContato', JSON.stringify(mensagens));
        loadMensagens();
        showNotification('Mensagem excluída!', 'success');
    }
}

// Função para adicionar nova mensagem (chamada do site principal)
function adicionarMensagem(dados) {
    let mensagens = JSON.parse(localStorage.getItem('mensagensContato') || '[]');
    
    const novaMensagem = {
        id: Date.now(),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        assunto: dados.assunto,
        mensagem: dados.mensagem,
        data: new Date().toLocaleString('pt-BR'),
        lida: false
    };
    
    mensagens.unshift(novaMensagem);
    localStorage.setItem('mensagensContato', JSON.stringify(mensagens));
}

// Formulários
document.getElementById('formHero')?.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarDados('Hero Section');
});

document.getElementById('formSobre')?.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarDados('Sobre');
});

document.getElementById('formImpacto')?.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarDados('Impacto');
});

document.getElementById('formContato')?.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarDados('Contato');
});

function salvarDados(secao) {
    // Aqui você salvaria os dados em um banco de dados ou localStorage
    alert(`Dados de ${secao} salvos com sucesso!`);
    
    // Simular salvamento no localStorage
    const formData = {};
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });
    
    localStorage.setItem(`admin_${secao}`, JSON.stringify(formData));
    
    // Mostrar notificação
    showNotification('Alterações salvas com sucesso!', 'success');
}

// Notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Carregar dados salvos ao abrir formulários
function carregarDadosSalvos(secao) {
    const dados = localStorage.getItem(`admin_${secao}`);
    if (dados) {
        const formData = JSON.parse(dados);
        Object.keys(formData).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = formData[key];
            }
        });
    }
}

// Prevenir perda de dados não salvos
window.addEventListener('beforeunload', (e) => {
    const forms = document.querySelectorAll('.admin-form');
    let hasUnsavedChanges = false;
    
    forms.forEach(form => {
        if (form.classList.contains('modified')) {
            hasUnsavedChanges = true;
        }
    });
    
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Marcar formulários como modificados
document.querySelectorAll('.admin-form input, .admin-form textarea, .admin-form select').forEach(input => {
    input.addEventListener('input', () => {
        input.closest('.admin-form').classList.add('modified');
    });
});

console.log('🔐 Painel Administrativo carregado!');
console.log('👤 Usuário: admin | 🔑 Senha: admin123');


// Doações
let filtroAtual = 'todas';

function loadDoacoes() {
    const doacoesConfirmadas = JSON.parse(localStorage.getItem('doacoesConfirmadas') || '[]');
    const doacoesIniciadas = JSON.parse(localStorage.getItem('doacoesIniciadas') || '[]');
    
    // Combinar todas as doações
    const todasDoacoes = [
        ...doacoesConfirmadas.map(d => ({...d, status: 'confirmada'})),
        ...doacoesIniciadas.map(d => ({...d, status: 'iniciada'}))
    ].sort((a, b) => b.id - a.id);
    
    // Calcular estatísticas
    const totalConfirmadas = doacoesConfirmadas.reduce((sum, d) => sum + d.valor, 0);
    const totalDoadores = doacoesConfirmadas.length;
    const mediaDoacao = totalDoadores > 0 ? totalConfirmadas / totalDoadores : 0;
    
    // Atualizar stats
    document.getElementById('totalDoacoes').textContent = `R$ ${totalConfirmadas.toFixed(2).replace('.', ',')}`;
    document.getElementById('totalDoadores').textContent = totalDoadores;
    document.getElementById('mediaDoacoes').textContent = `R$ ${mediaDoacao.toFixed(2).replace('.', ',')}`;
    
    // Renderizar lista
    renderizarDoacoes(todasDoacoes);
    
    // Configurar filtros
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroAtual = this.dataset.filtro;
            renderizarDoacoes(todasDoacoes);
        });
    });
}

function renderizarDoacoes(doacoes) {
    const doacoesList = document.getElementById('doacoesList');
    
    // Filtrar doações
    let doacoesFiltradas = doacoes;
    if (filtroAtual === 'confirmadas') {
        doacoesFiltradas = doacoes.filter(d => d.status === 'confirmada');
    } else if (filtroAtual === 'iniciadas') {
        doacoesFiltradas = doacoes.filter(d => d.status === 'iniciada');
    }
    
    if (doacoesFiltradas.length === 0) {
        doacoesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-hand-holding-heart"></i>
                <p>Nenhuma doação ${filtroAtual === 'todas' ? '' : filtroAtual} encontrada.</p>
            </div>
        `;
        return;
    }
    
    doacoesList.innerHTML = doacoesFiltradas.map(doacao => `
        <div class="doacao-item ${doacao.status}">
            <div class="doacao-info">
                <div class="doacao-valor">R$ ${doacao.valor.toFixed(2).replace('.', ',')}</div>
                <div class="doacao-data">
                    <i class="fas fa-calendar"></i> ${doacao.data}
                </div>
                <span class="doacao-status ${doacao.status}">
                    ${doacao.status === 'confirmada' ? '✓ Confirmada' : '⏳ Aguardando'}
                </span>
            </div>
            <div class="doacao-actions">
                ${doacao.status === 'iniciada' ? `
                    <button class="btn-sm btn-edit-sm" onclick="confirmarDoacaoAdmin(${doacao.id})">
                        <i class="fas fa-check"></i> Confirmar
                    </button>
                ` : ''}
                <button class="btn-sm btn-delete-sm" onclick="deletarDoacao(${doacao.id}, '${doacao.status}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function confirmarDoacaoAdmin(id) {
    const doacoesIniciadas = JSON.parse(localStorage.getItem('doacoesIniciadas') || '[]');
    const doacao = doacoesIniciadas.find(d => d.id === id);
    
    if (doacao) {
        // Remover de iniciadas
        const novasDoacoesIniciadas = doacoesIniciadas.filter(d => d.id !== id);
        localStorage.setItem('doacoesIniciadas', JSON.stringify(novasDoacoesIniciadas));
        
        // Adicionar em confirmadas
        const doacoesConfirmadas = JSON.parse(localStorage.getItem('doacoesConfirmadas') || '[]');
        doacoesConfirmadas.push({
            id: doacao.id,
            valor: doacao.valor,
            data: doacao.data,
            status: 'confirmada'
        });
        localStorage.setItem('doacoesConfirmadas', JSON.stringify(doacoesConfirmadas));
        
        showNotification('Doação confirmada com sucesso!', 'success');
        loadDoacoes();
    }
}

function deletarDoacao(id, status) {
    if (confirm('Deseja realmente excluir esta doação?')) {
        const chave = status === 'confirmada' ? 'doacoesConfirmadas' : 'doacoesIniciadas';
        let doacoes = JSON.parse(localStorage.getItem(chave) || '[]');
        doacoes = doacoes.filter(d => d.id !== id);
        localStorage.setItem(chave, JSON.stringify(doacoes));
        
        showNotification('Doação excluída!', 'success');
        loadDoacoes();
    }
}

// Atualizar dashboard com doações
function atualizarDashboardDoacoes() {
    const doacoesConfirmadas = JSON.parse(localStorage.getItem('doacoesConfirmadas') || '[]');
    const totalDoacoes = doacoesConfirmadas.reduce((sum, d) => sum + d.valor, 0);
    
    // Você pode adicionar um card no dashboard para mostrar o total
    console.log('Total de doações:', totalDoacoes);
}


// Sistema de Tema Dark/Light Admin
const themeToggleAdmin = document.getElementById('themeToggleAdmin');

// Verificar tema salvo
const savedThemeAdmin = localStorage.getItem('theme') || 'light';
if (savedThemeAdmin === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIconAdmin();
}

// Toggle tema
if (themeToggleAdmin) {
    themeToggleAdmin.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        
        updateThemeIconAdmin();
        
        // Animação suave
        themeToggleAdmin.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggleAdmin.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIconAdmin() {
    if (themeToggleAdmin) {
        const icon = themeToggleAdmin.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Detectar preferência do sistema
if (window.matchMedia && !localStorage.getItem('theme')) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        updateThemeIconAdmin();
    }
}

console.log('🌓 Tema Dark/Light Admin ativado!');
