const baseInnerWidth = window.innerWidth;
const baseDPR = window.devicePixelRatio;

function fitToScreen() {
    const wrapper = document.getElementById('zoom-wrapper');
    document.body.style.height = '';
    document.body.style.width = '';
    document.documentElement.style.height = '';
    wrapper.style.transform = 'none';
    const naturalHeight = wrapper.offsetHeight;
    const scale = window.innerWidth / 1920;
    wrapper.style.transform = `scale(${scale})`;
    document.body.style.width = (1920 * scale) + 'px';
    const finalHeight = Math.max(naturalHeight * scale, window.innerHeight);
    document.body.style.height = finalHeight + 'px';
}

window.addEventListener('load', fitToScreen);
window.addEventListener('resize', fitToScreen);

const botaoPrecos = document.querySelector('.botao-precos');
const botaoInicio = document.querySelector('.botao-inicio');
const apresentacao = document.querySelector('.apresentacao');
const textoApresentacao = document.querySelector('.textoapresentacao');
const fotoApresentacao = document.querySelector('.fotoapresentacao');
const statusComissoes = document.querySelector('.statuscomissoes');
const postsCriacoes = document.querySelector('.postscriacoes');
const conteudoPrecos = document.querySelector('.conteudoprecos');
const botaoDatapacks = document.querySelector('.botao-datapacks');
const conteudoDatapacks = document.querySelector('.conteudodatapacks');
const botaoMods = document.querySelector('.botao-mods');
const conteudoMods = document.querySelector('.conteudomods');
const cardsMods = document.querySelector('.cardsmods');
const botaoModpacks = document.querySelector('.botao-modpacks');
const conteudoModpacks = document.querySelector('.conteudomodpacks');
const botaoPlugins = document.querySelector('.botao-plugins');
const conteudoPlugins = document.querySelector('.conteudoplugins');
const botaoPorts = document.querySelector('.botao-ports');
const conteudoPorts = document.querySelector('.conteudoports');
const botaoExtras = document.querySelector('.botao-extras');
const conteudoExtras = document.querySelector('.conteudoextras');
const botaoParceiros = document.querySelector('.botao-parceiros');
const cardsParceiros = document.querySelector('.cardsparceiros');
const botaoTermos = document.querySelector('.botao-termos');
const termos = document.querySelector('.termos');
const conteudoTermos = document.querySelector('.conteudotermos');
const botaoCriacoes = document.querySelector('.botao-criacoes');
const criacoes = document.querySelector('.criacoes');
const voltarTopoBotao = document.querySelector('.criacoes-voltartopo');

const modos = {
    inicio: {
        elementos: [textoApresentacao, fotoApresentacao, statusComissoes, postsCriacoes],
        classe: null,
        bg: null
    },
    precos: {
        elementos: [conteudoPrecos],
        classe: 'modo-precos',
        bg: null
    },
    datapacks: {
        elementos: [conteudoDatapacks],
        classe: 'modo-datapacks',
        bg: 'bg-comissoes'
    },
    mods: {
        elementos: [conteudoMods, cardsMods],
        classe: 'modo-mods',
        bg: 'bg-comissoes'
    },
    modpacks: {
        elementos: [conteudoModpacks],
        classe: 'modo-modpacks',
        bg: 'bg-comissoes'
    },
    plugins: {
        elementos: [conteudoPlugins],
        classe: 'modo-plugins',
        bg: 'bg-comissoes'
    },
    ports: {
        elementos: [conteudoPorts],
        classe: 'modo-ports',
        bg: 'bg-comissoes'
    },
    extras: {
        elementos: [conteudoExtras],
        classe: 'modo-extras',
        bg: 'bg-comissoes'
    },
    parceiros: {
        elementos: [cardsParceiros],
        classe: 'modo-parceiros',
        bg: 'bg-parceiros',
        esconderApresentacao: true
    },
    termos: {
        elementos: [conteudoTermos, termos],
        classe: 'modo-termos',
        bg: 'bg-parceiros'
    },
    criacoes: {
        elementos: [criacoes],
        classe: 'modo-criacoes',
        bg: 'bg-parceiros',
        esconderApresentacao: true
    }
};

botaoInicio.addEventListener('click', (e) => { e.preventDefault(); trocarModo('inicio'); });
botaoPrecos.addEventListener('click', (e) => { e.preventDefault(); trocarModo('precos'); });
botaoDatapacks.addEventListener('click', (e) => { e.preventDefault(); trocarModo('datapacks'); });
botaoMods.addEventListener('click', (e) => { e.preventDefault(); trocarModo('mods'); });
botaoModpacks.addEventListener('click', (e) => { e.preventDefault(); trocarModo('modpacks'); });
botaoPlugins.addEventListener('click', (e) => { e.preventDefault(); trocarModo('plugins'); });
botaoPorts.addEventListener('click', (e) => { e.preventDefault(); trocarModo('ports'); });
botaoExtras.addEventListener('click', (e) => { e.preventDefault(); trocarModo('extras'); });
botaoParceiros.addEventListener('click', (e) => { e.preventDefault(); trocarModo('parceiros'); });
botaoTermos.addEventListener('click', (e) => { e.preventDefault(); trocarModo('termos'); });
botaoCriacoes.addEventListener('click', (e) => { e.preventDefault(); trocarModo('criacoes'); });

let modoAtual = 'inicio';

function trocarModo(novoModo) {
    if (novoModo === modoAtual) return;

    const atual = modos[modoAtual];
    const proximo = modos[novoModo];

    if (atual.bg) document.body.classList.remove(atual.bg);
    if (proximo.bg) document.body.classList.add(proximo.bg);

    atual.elementos.forEach(el => {
        el.classList.remove('slide-in');
        el.classList.add('pop-out');
    });

    if (modoAtual === 'criacoes' && novoModo !== 'criacoes') {
        voltarTopoBotao.classList.add('escondido');
    }

    setTimeout(() => {
        atual.elementos.forEach(el => {
            el.classList.remove('pop-out');
            el.classList.add('escondido');
        });

        if (atual.classe) apresentacao.classList.remove(atual.classe);
        if (proximo.classe) apresentacao.classList.add(proximo.classe);
        if (atual.esconderApresentacao) apresentacao.classList.remove('escondido');
        if (proximo.esconderApresentacao) apresentacao.classList.add('escondido');

        proximo.elementos.forEach(el => {
            el.classList.remove('escondido');
            el.classList.add('slide-in');
        });

        if (novoModo === 'criacoes') {
            voltarTopoBotao.classList.remove('escondido');
        }

        modoAtual = novoModo;
        fitToScreen();
    }, 500);
}

let postsData = [];
let servidoresData = [];

async function carregarPosts() {
    try {
        const res = await fetch('posts.json');
        const data = await res.json();
        postsData = data.posts;
        renderizarPosts();
        verificarPostNaURL();
    } catch (err) {
        document.getElementById('criacoesFeed').innerHTML = '<div class="criacoes-vazio">Erro ao carregar posts.</div>';
    }
}

async function carregarServidores() {
    try {
        const res = await fetch('servidores.json');
        const data = await res.json();
        servidoresData = data.servidores;
        iniciarSugestoes();
    } catch (err) {
        console.error('Erro ao carregar servidores:', err);
    }
}

function formatarData(iso) {
    const d = new Date(iso);
    const agora = new Date();
    const diff = (agora - d) / 1000;
    if (diff < 60) return 'agora';
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function linkificar(texto) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return texto.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener">$1</a>');
}

function renderizarAnexo(anexo) {
    if (anexo.tipo === 'imagem' || anexo.tipo === 'gif') {
        return `<div class="post-anexo"><img src="${anexo.url}" alt="" data-imagem="${anexo.url}"></div>`;
    }
    if (anexo.tipo === 'video') {
        return `<div class="post-anexo"><video src="${anexo.url}" controls></video></div>`;
    }
    if (anexo.tipo === 'audio') {
        return `<div class="post-anexo tipo-audio"><audio src="${anexo.url}" controls></audio></div>`;
    }
    if (anexo.tipo === 'arquivo') {
        return `<div class="post-anexo tipo-arquivo">📎 <a href="${anexo.url}" download>${anexo.nome || 'Download'}</a></div>`;
    }
    return '';
}

function renderizarLinkPreview(url) {
    if (!url) return '';
    let hostname = '';
    try { hostname = new URL(url).hostname; } catch (e) { hostname = url; }
    return `
        <a class="post-link-preview" href="${url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
            <div class="post-link-titulo">${hostname}</div>
            <div class="post-link-url">${url}</div>
        </a>
    `;
}

function gerarPostHTML(post, dentroModal = false) {
    const curtidas = parseInt(localStorage.getItem(`curtidas_${post.id}`) || '0');
    const curtido = localStorage.getItem(`curtido_${post.id}`) === '1';
    const anexos = (post.anexos || []).slice(0, 4);
    const tagsHTML = (post.tags || []).map(t => `<span class="post-tag ${t}">${t}</span>`).join('');
    const origemHTML = post.origem
        ? `<span class="post-tag ${post.origem}">${post.origem === 'comissao' ? 'feito para comissão' : 'feito por mim'}</span>`
        : '';
    const conteudoFormatado = post.conteudo ? linkificar(post.conteudo.replace(/\n/g, '<br>')) : '';

    return `
        <article class="post-card" data-post-id="${post.id}">
            <div class="post-cabecalho">
                <img class="post-avatar" src="img/shune.png" alt="Shune">
                <span class="post-autor">Shune</span>
                <span class="post-data">· ${formatarData(post.data)}</span>
            </div>
            <div class="post-conteudo">
                <div class="post-titulo">${post.titulo}</div>
                ${conteudoFormatado ? `<div class="post-texto">${conteudoFormatado}</div>` : ''}
                ${renderizarLinkPreview(post.link)}
                ${anexos.length ? `<div class="post-anexos qtd-${anexos.length}">${anexos.map(renderizarAnexo).join('')}</div>` : ''}
                ${(tagsHTML || origemHTML) ? `
                    <div class="post-tags-container">
                        <div class="post-tags">${tagsHTML}</div>
                        <div class="post-tags-origem">${origemHTML}</div>
                    </div>
                ` : ''}
                <div class="post-acoes">
                    <button class="post-acao ${curtido ? 'curtido' : ''}" data-curtir="${post.id}" onclick="event.stopPropagation()">
                        ♥ <span>${curtidas}</span>
                    </button>
                    <button class="post-acao" data-copiar="${post.id}" onclick="event.stopPropagation()">🔗 Copiar link</button>
                </div>
            </div>
        </article>
    `;
}

function renderizarPosts() {
    const feed = document.getElementById('criacoesFeed');
    const busca = document.getElementById('criacoesBusca').value.toLowerCase();
    const filtroTag = document.getElementById('criacoesFiltro').value;
    const filtroOrigem = document.getElementById('criacoesFiltroOrigem').value;
    const ordem = document.getElementById('criacoesOrdem').value;

    let filtrados = postsData.filter(p => {
        const matchBusca = !busca || p.titulo.toLowerCase().includes(busca) || (p.conteudo || '').toLowerCase().includes(busca);
        const matchTag = filtroTag === 'todos' || (p.tags || []).includes(filtroTag);
        const matchOrigem = filtroOrigem === 'todos' || p.origem === filtroOrigem;
        return matchBusca && matchTag && matchOrigem;
    });

    filtrados.sort((a, b) => {
        const dataA = new Date(a.data).getTime();
        const dataB = new Date(b.data).getTime();
        return ordem === 'recente' ? dataB - dataA : dataA - dataB;
    });

    if (filtrados.length === 0) {
        feed.innerHTML = '<div class="criacoes-vazio">Nenhum post encontrado.</div>';
        requestAnimationFrame(fitToScreen);
        return;
    }

    feed.innerHTML = filtrados.map(p => gerarPostHTML(p)).join('');

    feed.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => abrirModalPost(card.dataset.postId));
    });

    feed.querySelectorAll('[data-curtir]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            curtir(btn.dataset.curtir);
        });
    });

    feed.querySelectorAll('[data-copiar]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            copiarLink(btn.dataset.copiar);
        });
    });

    feed.querySelectorAll('[data-imagem]').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            abrirImagem(img.dataset.imagem);
        });
    });

    requestAnimationFrame(fitToScreen);
}

function curtir(id) {
    const curtido = localStorage.getItem(`curtido_${id}`) === '1';
    let curtidas = parseInt(localStorage.getItem(`curtidas_${id}`) || '0');
    if (curtido) {
        curtidas = Math.max(0, curtidas - 1);
        localStorage.setItem(`curtido_${id}`, '0');
    } else {
        curtidas++;
        localStorage.setItem(`curtido_${id}`, '1');
    }
    localStorage.setItem(`curtidas_${id}`, curtidas);
    renderizarPosts();
    const modal = document.getElementById('modalPost');
    if (!modal.classList.contains('escondido')) {
        const postAberto = modal.dataset.postId;
        if (postAberto) atualizarModalPost(postAberto);
    }
}

function copiarLink(id) {
    const url = `${location.origin}${location.pathname}#post-${id}`;
    navigator.clipboard.writeText(url).then(() => {
        const toast = document.getElementById('toastCopiado');
        toast.classList.remove('escondido');
        setTimeout(() => toast.classList.add('escondido'), 2000);
    });
}

function abrirModalPost(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;
    const modal = document.getElementById('modalPost');
    const conteudo = document.getElementById('modalPostConteudo');
    modal.dataset.postId = id;
    conteudo.innerHTML = `
        <button class="modal-post-fechar" id="modalPostFechar">✕</button>
        ${gerarPostHTML(post, true)}
    `;
    modal.classList.remove('escondido');
    document.body.classList.add('sem-scroll');

    document.getElementById('modalPostFechar').addEventListener('click', fecharModalPost);

    conteudo.querySelectorAll('[data-curtir]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            curtir(btn.dataset.curtir);
        });
    });
    conteudo.querySelectorAll('[data-copiar]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            copiarLink(btn.dataset.copiar);
        });
    });
    conteudo.querySelectorAll('[data-imagem]').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            abrirImagem(img.dataset.imagem);
        });
    });
}

function atualizarModalPost(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;
    const conteudo = document.getElementById('modalPostConteudo');
    conteudo.innerHTML = `
        <button class="modal-post-fechar" id="modalPostFechar">✕</button>
        ${gerarPostHTML(post, true)}
    `;
    document.getElementById('modalPostFechar').addEventListener('click', fecharModalPost);
    conteudo.querySelectorAll('[data-curtir]').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); curtir(btn.dataset.curtir); });
    });
    conteudo.querySelectorAll('[data-copiar]').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); copiarLink(btn.dataset.copiar); });
    });
    conteudo.querySelectorAll('[data-imagem]').forEach(img => {
        img.addEventListener('click', (e) => { e.stopPropagation(); abrirImagem(img.dataset.imagem); });
    });
}

function fecharModalPost() {
    document.getElementById('modalPost').classList.add('escondido');
    if (document.getElementById('modalImagem').classList.contains('escondido')) {
        document.body.classList.remove('sem-scroll');
    }
    if (location.hash.startsWith('#post-')) {
        history.replaceState(null, '', location.pathname);
    }
}

function abrirImagem(url) {
    document.getElementById('modalImagemSrc').src = url;
    document.getElementById('modalImagem').classList.remove('escondido');
}

function verificarPostNaURL() {
    const hash = location.hash;
    if (hash.startsWith('#post-')) {
        const id = hash.replace('#post-', '');
        if (modoAtual !== 'criacoes') trocarModo('criacoes');
        setTimeout(() => abrirModalPost(id), 600);
    }
}

function iniciarSugestoes() {
    const container = document.getElementById('sugestoesLista');
    if (!servidoresData.length) {
        container.innerHTML = '<div style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:12px;">Nenhum servidor cadastrado.</div>';
        return;
    }

    const iconeDiscord = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"/></svg>`;

    const iconeTwitter = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;

    const iconeTiktok = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64a2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>`;

    const lista = servidoresData.slice(0, 5);
    container.innerHTML = lista.map(s => {
        const redes = [];
        if (s.discord) redes.push(`<a class="sugestao-rede" href="${s.discord}" target="_blank" rel="noopener" title="Discord">${iconeDiscord}</a>`);
        if (s.twitter) redes.push(`<a class="sugestao-rede" href="${s.twitter}" target="_blank" rel="noopener" title="Twitter">${iconeTwitter}</a>`);
        if (s.tiktok) redes.push(`<a class="sugestao-rede" href="${s.tiktok}" target="_blank" rel="noopener" title="TikTok">${iconeTiktok}</a>`);
        return `
            <div class="sugestao-card">
                <img class="sugestao-icone" src="${s.icone}" alt="${s.nome}">
                <div class="sugestao-info">
                    <div class="sugestao-nome">${s.nome}</div>
                    <div class="sugestao-descricao">${s.descricao}</div>
                    <div class="sugestao-redes">${redes.join('')}</div>
                </div>
            </div>
        `;
    }).join('');
}

function fecharModalImagem() {
    const modal = document.getElementById('modalImagem');
    const img = document.getElementById('modalImagemSrc');
    img.style.animation = 'modalZoomOut 0.2s ease forwards';
    modal.style.animation = 'modalFadeOut 0.2s ease forwards';
    setTimeout(() => {
        modal.classList.add('escondido');
        img.style.animation = '';
        modal.style.animation = '';
        if (document.getElementById('modalPost').classList.contains('escondido')) {
            document.body.classList.remove('sem-scroll');
        }
    }, 200);
}

const stickyEl = document.querySelector('.criacoes-sugestoes-sticky');
const stickyContainer = document.querySelector('.criacoes-sugestoes');
let stickySentinel = null;
let stickyPlaceholder = null;
let stickyIsActive = false;

if (stickyEl && stickyContainer) {
    stickySentinel = document.createElement('div');
    stickySentinel.className = 'criacoes-sugestoes-sentinel';
    stickyContainer.insertBefore(stickySentinel, stickyEl);
}

function aplicarSticky() {
    if (stickyIsActive || !stickyEl) return;
    const scale = window.innerWidth / 1920;
    const rect = stickyEl.getBoundingClientRect();

    stickyPlaceholder = document.createElement('div');
    stickyPlaceholder.className = 'criacoes-sugestoes-placeholder';
    stickyPlaceholder.style.height = (rect.height / scale) + 'px';
    stickyEl.parentNode.insertBefore(stickyPlaceholder, stickyEl);

    document.body.appendChild(stickyEl);

    stickyEl.classList.add('elementor-sticky--active');
    stickyEl.style.top = (20 * scale) + 'px';
    stickyEl.style.left = rect.left + 'px';
    stickyEl.style.width = (rect.width / scale) + 'px';
    stickyEl.style.transform = `scale(${scale})`;
    stickyEl.style.transformOrigin = 'top left';

    stickyIsActive = true;
}

function removerSticky() {
    if (!stickyIsActive || !stickyEl) return;
    stickyEl.classList.remove('elementor-sticky--active');
    stickyEl.style.top = '';
    stickyEl.style.left = '';
    stickyEl.style.width = '';
    stickyEl.style.transform = '';
    stickyEl.style.transformOrigin = '';

    if (stickyPlaceholder && stickyPlaceholder.parentNode) {
        stickyPlaceholder.parentNode.insertBefore(stickyEl, stickyPlaceholder);
        stickyPlaceholder.remove();
        stickyPlaceholder = null;
    }
    stickyIsActive = false;
}

if (stickyEl && stickyContainer && stickySentinel) {
    const stickyObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (modoAtual !== 'criacoes') {
            if (stickyIsActive) removerSticky();
            return;
        }
        if (entry.boundingClientRect.top < 0) {
            aplicarSticky();
        } else {
            removerSticky();
        }
    }, { threshold: 0 });

    stickyObserver.observe(stickySentinel);
}

window.addEventListener('resize', () => {
    if (stickyIsActive) {
        removerSticky();
        requestAnimationFrame(() => {
            if (!stickySentinel) return;
            const r = stickySentinel.getBoundingClientRect();
            if (r.top < 0 && modoAtual === 'criacoes') {
                aplicarSticky();
            }
        });
    }
});

document.getElementById('criacoesBusca').addEventListener('input', renderizarPosts);
document.getElementById('criacoesFiltro').addEventListener('change', renderizarPosts);
document.getElementById('criacoesFiltroOrigem').addEventListener('change', renderizarPosts);
document.getElementById('criacoesOrdem').addEventListener('change', renderizarPosts);
document.getElementById('modalImagemFechar').addEventListener('click', fecharModalImagem);
document.getElementById('modalImagem').addEventListener('click', (e) => {
    if (e.target.id === 'modalImagem') fecharModalImagem();
});
document.querySelectorAll('.fotomods img').forEach(img => {
    img.addEventListener('click', () => abrirImagem(img.src));
});

let listaEsperaData = null;
let tipoAbertoAtual = null;

const nomesTipo = {
    mods: '🧡 Mods',
    modpacks: '💜 Modpacks',
    datapacks: '💛 Datapacks / Plugins'
};

fetch('lista-espera.json')
    .then(r => r.json())
    .then(data => { listaEsperaData = data; });

function renderizarListaEspera(tipo) {
    const dados = listaEsperaData[tipo];
    const painel = document.getElementById('listaEsperaPainel');
    const conteudo = document.getElementById('listaEsperaConteudo');

    function itemHTML(item, classe) {
        const tags = (item.tags || []).map(t => `<span class="lista-espera-tag">${t}</span>`).join('');
        return `
            <div class="lista-espera-item">
                <div class="lista-espera-item-dot ${classe}"></div>
                <div class="lista-espera-item-info">
                    <span class="lista-espera-item-nome">${item.nome}</span>
                    ${tags ? `<div class="lista-espera-item-tags">${tags}</div>` : ''}
                </div>
            </div>`;
    }

    const andamentoHTML = dados.em_andamento.length
        ? dados.em_andamento.map(i => itemHTML(i, 'andamento')).join('')
        : `<div class="lista-espera-vazia">Nenhuma no momento</div>`;

    const aguardandoHTML = dados.aguardando.length
        ? dados.aguardando.map(i => itemHTML(i, 'aguardando')).join('')
        : `<div class="lista-espera-vazia">Nenhuma no momento</div>`;

    conteudo.innerHTML = `
        <div class="lista-espera-cabecalho">
            <span>Lista de espera — ${nomesTipo[tipo]}</span>
        </div>
        <div class="lista-espera-secoes">
            <div class="lista-espera-secao">
                <div class="lista-espera-secao-titulo andamento">▶ Em andamento</div>
                ${andamentoHTML}
            </div>
            <div class="lista-espera-secao">
                <div class="lista-espera-secao-titulo aguardando">⏳ Aguardando</div>
                ${aguardandoHTML}
            </div>
        </div>`;

    painel.classList.add('aberto');
}

document.querySelectorAll('.lista-espera-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!listaEsperaData) return;
        const tipo = btn.dataset.tipo;
        const painel = document.getElementById('listaEsperaPainel');

        document.querySelectorAll('.lista-espera-btn').forEach(b => b.classList.remove('ativo'));

        if (tipoAbertoAtual === tipo) {
            painel.classList.remove('aberto');
            tipoAbertoAtual = null;
        } else {
            btn.classList.add('ativo');
            tipoAbertoAtual = tipo;
            renderizarListaEspera(tipo);
        }
    });
});
document.getElementById('modalPost').addEventListener('click', (e) => {
    if (e.target.id === 'modalPost') fecharModalPost();
});
document.getElementById('voltarTopo').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!document.getElementById('modalImagem').classList.contains('escondido')) {
            fecharModalImagem();
        } else if (!document.getElementById('modalPost').classList.contains('escondido')) {
            fecharModalPost();
        }
    }
});

carregarPosts();
carregarServidores();

const skins = [
    'img/skins/shune1.png',
    'img/skins/shune2.png',
    'img/skins/shune3.png',
    'img/skins/shune4.png',
    'img/skins/shune5.png',
    'img/skins/shune6.png'
];
let skinIndex = 0;
const skinImg = document.getElementById('skinAtual');

function trocarSkin() {
    if (!skinImg) return;
    skinIndex = (skinIndex + 1) % skins.length;
    skinImg.classList.add('glitching');
    setTimeout(() => {
        skinImg.src = skins[skinIndex];
    }, 300);
    setTimeout(() => {
        skinImg.classList.remove('glitching');
    }, 600);
}

setInterval(trocarSkin, 3000);

const resizeObserver = new ResizeObserver(() => {
    fitToScreen();
});
resizeObserver.observe(document.getElementById('zoom-wrapper'));``