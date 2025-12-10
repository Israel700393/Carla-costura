// Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Slider de Depoimentos
let currentSlide = 0;
const slides = document.querySelectorAll('.depoimento-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    setInterval(nextSlide, 5000);
}

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.servico-card, .stat-item, .impacto-card, .galeria-item, .apoiar-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contador animado para números
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observar seção de impacto para iniciar contadores
const impactoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.impacto-number');
            numbers.forEach(num => {
                const text = num.textContent;
                const value = parseInt(text.replace(/\D/g, ''));
                if (value) {
                    num.textContent = '0';
                    animateCounter(num, value);
                }
            });
            impactoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactoSection = document.querySelector('.impacto');
if (impactoSection) {
    impactoObserver.observe(impactoSection);
}

// Modais
function abrirModalDoacao() {
    const modal = document.getElementById('modalDoacao');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function abrirModalMateriais() {
    const modal = document.getElementById('modalMateriais');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function abrirModalVoluntario() {
    const modal = document.getElementById('modalVoluntario');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Seleção de valor de doação
let valorDoacaoSelecionado = 0;

document.querySelectorAll('.valor-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.valor-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        valorDoacaoSelecionado = parseFloat(this.dataset.valor);
        document.getElementById('valorCustom').value = '';
    });
});

document.getElementById('valorCustom')?.addEventListener('input', function() {
    if (this.value) {
        document.querySelectorAll('.valor-btn').forEach(b => b.classList.remove('active'));
        valorDoacaoSelecionado = parseFloat(this.value);
    }
});

// Função para gerar código PIX
function gerarCodigoPix(valor, chavePix, nome, cidade) {
    // Payload do PIX (EMV)
    const payload = [
        { id: '00', value: '01' }, // Payload Format Indicator
        { id: '26', value: [
            { id: '00', value: 'BR.GOV.BCB.PIX' },
            { id: '01', value: chavePix }
        ]},
        { id: '52', value: '0000' }, // Merchant Category Code
        { id: '53', value: '986' }, // Transaction Currency (BRL)
        { id: '54', value: valor.toFixed(2) }, // Transaction Amount
        { id: '58', value: 'BR' }, // Country Code
        { id: '59', value: nome }, // Merchant Name
        { id: '60', value: cidade }, // Merchant City
        { id: '62', value: [
            { id: '05', value: '***' } // Additional Data Field Template
        ]}
    ];
    
    function formatPayload(obj) {
        if (Array.isArray(obj.value)) {
            const subPayload = obj.value.map(formatPayload).join('');
            return obj.id + String(subPayload.length).padStart(2, '0') + subPayload;
        }
        return obj.id + String(obj.value.length).padStart(2, '0') + obj.value;
    }
    
    let pixString = payload.map(formatPayload).join('');
    pixString += '6304'; // CRC16
    
    // Calcular CRC16
    const crc = calcularCRC16(pixString);
    pixString += crc;
    
    return pixString;
}

// Função para calcular CRC16
function calcularCRC16(str) {
    let crc = 0xFFFF;
    
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
        }
    }
    
    crc = crc & 0xFFFF;
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Função para gerar PIX
function gerarPix() {
    // Validar valor
    if (valorDoacaoSelecionado <= 0) {
        mostrarNotificacao('Por favor, selecione ou digite um valor para doar.', 'error');
        return;
    }
    
    // Dados do PIX
    const chavePix = '65992808795';
    const nomeBeneficiario = 'Projeto Social Costura';
    const cidade = 'Cuiaba';
    
    // Gerar código PIX
    const codigoPix = gerarCodigoPix(valorDoacaoSelecionado, chavePix, nomeBeneficiario, cidade);
    
    // Atualizar interface
    document.getElementById('valorSelecionado').textContent = `R$ ${valorDoacaoSelecionado.toFixed(2).replace('.', ',')}`;
    document.getElementById('codigoPix').value = codigoPix;
    
    // Limpar QR Code anterior
    const qrcodeDisplay = document.getElementById('qrcodeDisplay');
    qrcodeDisplay.innerHTML = '';
    
    // Gerar QR Code
    new QRCode(qrcodeDisplay, {
        text: codigoPix,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Mudar para etapa de pagamento
    document.getElementById('etapaValor').style.display = 'none';
    document.getElementById('etapaPagamento').style.display = 'block';
    
    // Salvar doação no localStorage
    salvarDoacaoIniciada(valorDoacaoSelecionado, codigoPix);
}

// Função para voltar à etapa de valor
function voltarEtapaValor() {
    document.getElementById('etapaPagamento').style.display = 'none';
    document.getElementById('etapaValor').style.display = 'block';
}

// Função para copiar código PIX
function copiarCodigoPix() {
    const codigoPix = document.getElementById('codigoPix');
    codigoPix.select();
    codigoPix.setSelectionRange(0, 99999); // Para mobile
    
    try {
        document.execCommand('copy');
        mostrarNotificacao('Código PIX copiado! Cole no seu app de pagamento.', 'success');
        
        // Mudar texto do botão temporariamente
        const btnCopiar = event.target.closest('.btn-copiar');
        const textoOriginal = btnCopiar.innerHTML;
        btnCopiar.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        btnCopiar.style.background = '#4CAF50';
        
        setTimeout(() => {
            btnCopiar.innerHTML = textoOriginal;
            btnCopiar.style.background = '';
        }, 2000);
    } catch (err) {
        // Fallback para navegadores modernos
        navigator.clipboard.writeText(codigoPix.value).then(() => {
            mostrarNotificacao('Código PIX copiado!', 'success');
        }).catch(() => {
            mostrarNotificacao('Erro ao copiar. Tente selecionar e copiar manualmente.', 'error');
        });
    }
}

// Função para confirmar pagamento
function confirmarPagamento() {
    document.getElementById('etapaPagamento').style.display = 'none';
    document.getElementById('etapaConfirmacao').style.display = 'block';
    document.getElementById('valorConfirmado').textContent = `R$ ${valorDoacaoSelecionado.toFixed(2).replace('.', ',')}`;
    
    // Salvar doação confirmada
    salvarDoacaoConfirmada(valorDoacaoSelecionado);
    
    // Enviar notificação via WhatsApp (opcional)
    enviarNotificacaoDoacao(valorDoacaoSelecionado);
}

// Função para salvar doação iniciada
function salvarDoacaoIniciada(valor, codigo) {
    const doacoes = JSON.parse(localStorage.getItem('doacoesIniciadas') || '[]');
    doacoes.push({
        id: Date.now(),
        valor: valor,
        codigo: codigo,
        data: new Date().toLocaleString('pt-BR'),
        status: 'iniciada'
    });
    localStorage.setItem('doacoesIniciadas', JSON.stringify(doacoes));
}

// Função para salvar doação confirmada
function salvarDoacaoConfirmada(valor) {
    const doacoes = JSON.parse(localStorage.getItem('doacoesConfirmadas') || '[]');
    doacoes.push({
        id: Date.now(),
        valor: valor,
        data: new Date().toLocaleString('pt-BR'),
        status: 'confirmada'
    });
    localStorage.setItem('doacoesConfirmadas', JSON.stringify(doacoes));
}

// Função para enviar notificação de doação via WhatsApp
function enviarNotificacaoDoacao(valor) {
    const mensagem = `🎉 *Nova Doação Confirmada!*\n\n` +
        `💰 Valor: R$ ${valor.toFixed(2).replace('.', ',')}\n` +
        `📅 Data: ${new Date().toLocaleString('pt-BR')}\n\n` +
        `Obrigado por apoiar o Projeto Social de Costura! ❤️`;
    
    const numeroWhatsApp = '5565992808795';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Opcional: abrir WhatsApp automaticamente
    // window.open(urlWhatsApp, '_blank');
}

// Resetar modal ao fechar
const modalDoacao = document.getElementById('modalDoacao');
if (modalDoacao) {
    modalDoacao.addEventListener('click', (e) => {
        if (e.target === modalDoacao) {
            resetarModalDoacao();
        }
    });
}

function resetarModalDoacao() {
    setTimeout(() => {
        document.getElementById('etapaValor').style.display = 'block';
        document.getElementById('etapaPagamento').style.display = 'none';
        document.getElementById('etapaConfirmacao').style.display = 'none';
        document.querySelectorAll('.valor-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('valorCustom').value = '';
        valorDoacaoSelecionado = 0;
    }, 300);
}

// Formulário de Contato - Enviar para WhatsApp e Salvar
const contatoForm = document.getElementById('contatoForm');

contatoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Salvar mensagem no localStorage para o admin
    salvarMensagemContato({
        nome,
        email,
        telefone,
        assunto,
        mensagem
    });
    
    // Montar mensagem para WhatsApp
    const assuntoTexto = {
        'inscricao': 'Inscrição no Curso',
        'doacao': 'Doação',
        'voluntario': 'Voluntariado',
        'parceria': 'Parceria',
        'outro': 'Outro Assunto'
    };
    
    const mensagemWhatsApp = `*Nova Mensagem do Site - Costura Social*\n\n` +
        `*Nome:* ${nome}\n` +
        `*E-mail:* ${email}\n` +
        `*Telefone:* ${telefone}\n` +
        `*Assunto:* ${assuntoTexto[assunto] || assunto}\n\n` +
        `*Mensagem:*\n${mensagem}`;
    
    // Enviar para WhatsApp
    const numeroWhatsApp = '5565992808795'; // Seu número com DDI
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Limpar formulário
    contatoForm.reset();
    
    // Mostrar mensagem de sucesso
    mostrarNotificacao('Mensagem enviada! Redirecionando para o WhatsApp...', 'success');
});

// Função para salvar mensagem no localStorage
function salvarMensagemContato(dados) {
    let mensagens = JSON.parse(localStorage.getItem('mensagensContato') || '[]');
    
    const assuntoTexto = {
        'inscricao': 'Inscrição no Curso',
        'doacao': 'Doação',
        'voluntario': 'Voluntariado',
        'parceria': 'Parceria',
        'outro': 'Outro Assunto'
    };
    
    const novaMensagem = {
        id: Date.now(),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        assunto: assuntoTexto[dados.assunto] || dados.assunto,
        mensagem: dados.mensagem,
        data: new Date().toLocaleString('pt-BR'),
        lida: false
    };
    
    mensagens.unshift(novaMensagem);
    localStorage.setItem('mensagensContato', JSON.stringify(mensagens));
}

// Formulário de Voluntário
document.querySelectorAll('.voluntario-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Inscrição enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    });
});

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Galeria - Efeito de hover e lightbox
document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
    
    // Lightbox ao clicar
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            abrirLightbox(img.src, img.alt);
        }
    });
});

// Lightbox para galeria
function abrirLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
            <p>${alt}</p>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => lightbox.classList.add('active'), 10);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.className === 'lightbox-close') {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
}

// Adicionar estilos do lightbox
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .lightbox.active {
        background: rgba(0, 0, 0, 0.95);
    }
    
    .lightbox-content {
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        transform: scale(0.8);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .lightbox.active .lightbox-content {
        transform: scale(1);
        opacity: 1;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-content p {
        color: white;
        margin-top: 20px;
        font-size: 18px;
    }
    
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 40px;
        font-size: 50px;
        color: white;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .lightbox-close:hover {
        color: #FF6B9D;
        transform: rotate(90deg);
    }
`;
document.head.appendChild(lightboxStyle);

// Validação de formulário em tempo real
const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '#4CAF50';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#4CAF50';
        }
    });
});

// Máscara de telefone
const telefoneInputs = document.querySelectorAll('input[type="tel"]');

telefoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll reveal para estatísticas
const statItems = document.querySelectorAll('.stat-item');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

statItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    statObserver.observe(item);
});

// Botão de voltar ao topo
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

backToTop.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// WhatsApp Float
const whatsappButton = document.getElementById('whatsappButton');
const whatsappMenu = document.getElementById('whatsappMenu');
const whatsappClose = document.getElementById('whatsappClose');
const whatsappOverlay = document.getElementById('whatsappOverlay');
const whatsappOptions = document.querySelectorAll('.whatsapp-option');

// Abrir menu WhatsApp
whatsappButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = whatsappMenu.classList.contains('active');
    
    if (isActive) {
        fecharMenuWhatsApp();
    } else {
        abrirMenuWhatsApp();
    }
});

// Fechar menu WhatsApp
whatsappClose.addEventListener('click', (e) => {
    e.stopPropagation();
    fecharMenuWhatsApp();
});

// Fechar ao clicar no overlay
whatsappOverlay.addEventListener('click', () => {
    fecharMenuWhatsApp();
});

function abrirMenuWhatsApp() {
    whatsappMenu.classList.add('active');
    whatsappOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharMenuWhatsApp() {
    whatsappMenu.classList.remove('active');
    whatsappOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Opções do WhatsApp
whatsappOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const tipo = option.dataset.message;
        enviarWhatsApp(tipo);
        fecharMenuWhatsApp();
    });
});

// Função para enviar mensagem WhatsApp
function enviarWhatsApp(tipo) {
    const numeroWhatsApp = '5565992808795'; // Seu número com DDI (55 + DDD + número)
    
    const mensagens = {
        'inscricao-costura': 'Olá! Gostaria de me inscrever no curso de costura da Casa Vó Terezinha AMAR-É. Poderia me informar sobre as próximas turmas e requisitos?',
        'inscricao-artesanato': 'Olá! Tenho interesse em participar das oficinas de artesanato da Casa Vó Terezinha AMAR-É. Como posso me inscrever?',
        'grupo-idosos': 'Olá! Gostaria de informações sobre o grupo da terceira idade da Casa Vó Terezinha AMAR-É. Como funciona e como posso participar?',
        'evento-bazar': 'Olá! Vi o aviso sobre o bazar solidário da Casa Vó Terezinha AMAR-É. Gostaria de mais informações sobre o evento.',
        'doacao': 'Olá! Tenho interesse em fazer uma doação para a Casa Vó Terezinha AMAR-É. Como posso contribuir?',
        'voluntario': 'Olá! Gostaria de ser voluntário(a) na Casa Vó Terezinha AMAR-É. Quais são os requisitos e como posso me candidatar?',
        'materiais': 'Olá! Tenho materiais (costura, artesanato, etc) para doar à Casa Vó Terezinha AMAR-É. Como posso fazer a doação?',
        'informacoes': 'Olá! Gostaria de obter mais informações sobre os projetos da Casa Vó Terezinha AMAR-É.'
    };
    
    const mensagem = mensagens[tipo] || mensagens['informacoes'];
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    // Mostrar notificação
    mostrarNotificacao('Abrindo WhatsApp...', 'success');
}

// Sistema de Notificações
function mostrarNotificacao(mensagem, tipo = 'success') {
    // Remover notificação anterior se existir
    const notificacaoExistente = document.querySelector('.notificacao-toast');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }
    
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao-toast';
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${tipo === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #f44336, #da190b)'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    
    const icone = tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    notificacao.innerHTML = `
        <i class="fas ${icone}" style="font-size: 24px;"></i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notificacao.remove(), 500);
    }, 3000);
}

// Adicionar estilos de animação para notificações
const styleNotificacao = document.createElement('style');
styleNotificacao.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .notificacao-toast {
            right: 20px !important;
            left: 20px !important;
            top: 80px !important;
        }
    }
`;
document.head.appendChild(styleNotificacao);

console.log('🧵 Site do Projeto Social de Costura carregado com sucesso!');
console.log('📱 WhatsApp: (65) 99280-8795');

// Melhorias para dispositivos touch
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Melhorar feedback visual em touch
    document.querySelectorAll('a, button, .galeria-item, .servico-card, .apoiar-card').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transition = 'opacity 0.1s';
            this.style.opacity = '0.8';
        }, { passive: true });
        
        el.addEventListener('touchend', function() {
            this.style.opacity = '1';
        }, { passive: true });
    });
}

// Detectar mudança de orientação
window.addEventListener('orientationchange', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    whatsappMenu.classList.remove('active');
    
    // Recarregar após mudança de orientação
    setTimeout(() => {
        window.scrollTo(0, window.pageYOffset);
    }, 100);
});

// Suporte a gestos de swipe
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 80;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // Apenas processar swipe horizontal se não for vertical
    if (diffY < 50) {
        // Swipe para esquerda - fechar menu
        if (diffX > swipeThreshold && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
        
        // Swipe para direita - abrir menu
        if (diffX < -swipeThreshold && window.pageXOffset < 10 && !navMenu.classList.contains('active')) {
            navMenu.classList.add('active');
            menuToggle.classList.add('active');
        }
    }
}

// Prevenir zoom duplo em iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Otimizar scroll performance
let scrollTicking = false;
const originalScrollHandler = window.onscroll;

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Ajustar altura do viewport em mobile (fix para barra de endereço)
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// Melhorar performance de animações em mobile
if (window.innerWidth <= 768) {
    // Reduzir animações em dispositivos móveis
    document.querySelectorAll('.servico-card, .stat-item, .impacto-card, .galeria-item, .apoiar-card').forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
}

// Adicionar classe quando página está totalmente carregada
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Fechar menu ao redimensionar janela
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }, 250);
});

console.log('📱 Responsivo: ✅ Mobile, Tablet e Desktop');
console.log('👆 Touch: ✅ Otimizado para dispositivos touch');
console.log('↔️ Swipe: ✅ Gestos habilitados');


// Sistema de Tema Dark/Light
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verificar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

// Toggle tema
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        
        updateThemeIcon();
        
        // Animação suave
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon() {
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Detectar preferência do sistema
if (window.matchMedia && !localStorage.getItem('theme')) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        updateThemeIcon();
    }
}

// Ouvir mudanças na preferência do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        updateThemeIcon();
    }
});

console.log('🌓 Tema Dark/Light ativado!');

// Carrossel de Avisos
let currentCarouselSlide = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.querySelectorAll('.indicator');

function showCarouselSlide(index) {
    // Remove active class from all slides and indicators
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (carouselSlides[index]) {
        carouselSlides[index].classList.add('active');
    }
    if (carouselIndicators[index]) {
        carouselIndicators[index].classList.add('active');
    }
    
    // Move track
    if (carouselTrack) {
        carouselTrack.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextCarouselSlide() {
    currentCarouselSlide = (currentCarouselSlide + 1) % carouselSlides.length;
    showCarouselSlide(currentCarouselSlide);
}

function prevCarouselSlide() {
    currentCarouselSlide = (currentCarouselSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showCarouselSlide(currentCarouselSlide);
}

// Event listeners para controles do carrossel
if (carouselNext) {
    carouselNext.addEventListener('click', nextCarouselSlide);
}

if (carouselPrev) {
    carouselPrev.addEventListener('click', prevCarouselSlide);
}

// Event listeners para indicadores
carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentCarouselSlide = index;
        showCarouselSlide(currentCarouselSlide);
    });
});

// Auto-play do carrossel
let carouselAutoPlay = setInterval(nextCarouselSlide, 5000);

// Pausar auto-play ao hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselAutoPlay);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselAutoPlay = setInterval(nextCarouselSlide, 5000);
    });
}

// Suporte a gestos de swipe no carrossel
let carouselTouchStartX = 0;
let carouselTouchEndX = 0;

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
        carouselTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', (e) => {
        carouselTouchEndX = e.changedTouches[0].screenX;
        handleCarouselSwipe();
    }, { passive: true });
}

function handleCarouselSwipe() {
    const swipeThreshold = 50;
    const diff = carouselTouchStartX - carouselTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextCarouselSlide();
        } else {
            // Swipe right - previous slide
            prevCarouselSlide();
        }
        
        // Reset auto-play
        clearInterval(carouselAutoPlay);
        carouselAutoPlay = setInterval(nextCarouselSlide, 5000);
    }
}

// Inicializar carrossel
if (carouselSlides.length > 0) {
    showCarouselSlide(0);
}

console.log('🎠 Carrossel de avisos ativado!');
console.log('🏠 Casa Vó Terezinha AMAR-É - Site carregado!');
