// script.js — tema, menu, destaque do link ativo, entrada ao rolar, formulário e animações (GSAP)

document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    // 1. TEMA (claro/escuro). A classe inicial já foi aplicada no <head>.
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', () => {
        const escuro = root.dataset.theme !== 'dark';
        root.dataset.theme = escuro ? 'dark' : 'light';
        try { localStorage.setItem('tema', escuro ? 'escuro' : 'claro'); } catch (e) { }
    });

    // 2. MENU MOBILE
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    const setMenu = (aberto) => {
        navLinks.classList.toggle('aberto', aberto);
        menuBtn.setAttribute('aria-expanded', String(aberto));
        menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    };

    menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('aberto')));
    navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

    // 2b. PAINEL DE PROJETOS: abre no hover e no foco do teclado, fecha com Esc, clique fora ou escolha.
    //     O link "Projetos" continua sendo um link normal (leva a #projetos). Só em telas largas.
    const navbar = document.querySelector('.navbar');
    const gatilho = document.querySelector('[data-mega]');
    const mega = document.getElementById('mega-projetos');
    if (navbar && gatilho && mega) {
        const larga = window.matchMedia('(min-width: 681px)');
        let timer;
        const abrir = () => {
            if (!larga.matches) return;
            clearTimeout(timer);
            navbar.dataset.mega = 'aberto';
            gatilho.setAttribute('aria-expanded', 'true');
        };
        const fechar = () => {
            clearTimeout(timer);
            delete navbar.dataset.mega;
            gatilho.setAttribute('aria-expanded', 'false');
        };
        const fecharComAtraso = () => { clearTimeout(timer); timer = setTimeout(fechar, 140); };

        [gatilho.parentElement, mega].forEach((el) => {
            el.addEventListener('mouseenter', abrir);
            el.addEventListener('mouseleave', fecharComAtraso);
        });
        gatilho.addEventListener('focus', abrir);
        gatilho.addEventListener('click', fechar);
        mega.addEventListener('click', (e) => { if (e.target.closest('a')) fechar(); });
        navbar.addEventListener('focusout', (e) => { if (!navbar.contains(e.relatedTarget)) fechar(); });
        document.querySelectorAll('.nav-links a:not([data-mega])').forEach((a) => a.addEventListener('focus', fechar));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
        document.addEventListener('pointerdown', (e) => { if (!navbar.contains(e.target)) fechar(); });
    }

    // 3. LINK ATIVO NO MENU conforme a seção visível, com um destaque que desliza até ele
    const secoes = document.querySelectorAll('main section[id]');
    const linksMenu = navLinks.querySelectorAll('a');
    const indicador = document.createElement('span');
    indicador.className = 'nav-indicador';
    indicador.setAttribute('aria-hidden', 'true');
    navLinks.prepend(indicador);
    const menuLargo = window.matchMedia('(min-width: 681px)');

    const moverIndicador = (instantaneo) => {
        const ativo = navLinks.querySelector('a.ativo');
        const anima = window.gsap && !instantaneo;
        if (!ativo || !menuLargo.matches) {
            if (anima) gsap.to(indicador, { opacity: 0, duration: .25 });
            else indicador.style.opacity = 0;
            return;
        }
        const r = ativo.getBoundingClientRect();
        const base = navLinks.getBoundingClientRect();
        const alvo = { x: r.left - base.left, width: r.width };
        if (!anima) {
            indicador.style.transform = `translateX(${alvo.x}px)`;
            indicador.style.width = alvo.width + 'px';
            indicador.style.opacity = 1;
        } else if (Number(gsap.getProperty(indicador, 'opacity')) < .05) {
            // aparecendo agora: vai direto para o link e só então surge
            gsap.set(indicador, alvo);
            gsap.to(indicador, { opacity: 1, duration: .3 });
        } else {
            gsap.to(indicador, { ...alvo, opacity: 1, duration: .5, ease: 'power3.out' });
        }
    };
    window.addEventListener('resize', () => moverIndicador(true));

    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                linksMenu.forEach((a) =>
                    a.classList.toggle('ativo', a.getAttribute('href') === '#' + entrada.target.id));
                moverIndicador();
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        secoes.forEach((s) => spy.observe(s));

        // 4. ENTRADA SUAVE AO ROLAR
        const reveal = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                entrada.target.classList.add('visivel');
                reveal.unobserve(entrada.target);
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visivel'));
    }

    // 4b. LUZ QUE SEGUE O CURSOR nos cartões de projeto (nos blocos do início, ver 6b)
    document.querySelectorAll('.projeto').forEach((el) => {
        el.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            el.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
    });

    // 4b2. ACORDEÃO DO SOBRE: a fatia sob o cursor, em foco ou tocada se abre; as outras fecham
    const fatias = [...document.querySelectorAll('.fatia')];
    const abrirFatia = (f) => fatias.forEach((x) => x.classList.toggle('aberta', x === f));
    fatias.forEach((f) => ['mouseenter', 'focus', 'click'].forEach((ev) => f.addEventListener(ev, () => abrirFatia(f))));

    // cartões de projeto: ordem na pilha (--k) e um véu que o GSAP escurece quando o próximo cobre
    const cartoes = [...document.querySelectorAll('.projeto')];
    cartoes.forEach((c, i) => {
        c.style.setProperty('--k', i);
        c.insertAdjacentHTML('beforeend', '<span class="projeto-veu" aria-hidden="true"></span>');
    });

    // 4c. HORA LOCAL (Brasília) no rodapé do início
    const hora = document.getElementById('hora-local');
    if (hora) {
        const fmt = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
        const atualizar = () => { hora.textContent = fmt.format(new Date()); };
        atualizar();
        setInterval(atualizar, 15000);
    }

    // 4d. CAPTURAS EM TAMANHO GRANDE: o diálogo é preenchido com as imagens do cartão clicado
    const dlg = document.getElementById('dlg-capturas');
    if (dlg) {
        document.querySelectorAll('.js-capturas').forEach((btn) => {
            btn.addEventListener('click', () => {
                // só as imagens visíveis, ou seja, as do tema atual
                const visiveis = [...btn.closest('.projeto').querySelectorAll('.capa img')].filter((i) => i.offsetParent !== null);
                const desk = visiveis.find((i) => !i.classList.contains('capa-celular'));
                const cel = visiveis.find((i) => i.classList.contains('capa-celular'));
                document.getElementById('cap-titulo').textContent = btn.dataset.titulo;
                [['cap-desk', desk, 'cap-leg-desk', btn.dataset.legDesk], ['cap-cel', cel, 'cap-leg-cel', btn.dataset.legCel]]
                    .forEach(([imgId, origem, legId, legenda]) => {
                        const img = document.getElementById(imgId);
                        img.src = origem.currentSrc || origem.src;
                        img.alt = origem.alt;
                        document.getElementById(legId).textContent = legenda;
                    });
                dlg.showModal();
            });
        });
        // clique fora do conteúdo (no fundo escurecido) fecha
        dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    }

    // 5. FORMULÁRIO DE CONTATO
    // Não há servidor: depois de validar, abre o app de e-mail do visitante com a mensagem pronta.
    const form = document.getElementById('form-contato');
    const aviso = document.getElementById('form-aviso');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mostrarErro = (campo, msg) => {
        campo.closest('.campo').classList.toggle('invalido', Boolean(msg));
        document.getElementById('erro-' + campo.id).textContent = msg;
        campo.setAttribute('aria-invalid', msg ? 'true' : 'false');
        return !msg;
    };

    const validar = {
        nome: (c) => mostrarErro(c, c.value.trim() ? '' : 'Informe seu nome.'),
        email: (c) => mostrarErro(c, !c.value.trim() ? 'Informe seu e-mail.'
            : regexEmail.test(c.value.trim()) ? '' : 'Digite um e-mail válido, como voce@exemplo.com.'),
        mensagem: (c) => mostrarErro(c, c.value.trim() ? '' : 'Escreva uma mensagem.'),
    };

    // Revalida ao sair do campo e limpa o erro enquanto o usuário corrige
    form.querySelectorAll('input, textarea').forEach((campo) => {
        campo.addEventListener('blur', () => validar[campo.id](campo));
        campo.addEventListener('input', () => {
            if (campo.closest('.campo').classList.contains('invalido')) validar[campo.id](campo);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        aviso.textContent = '';

        const campos = ['nome', 'email', 'mensagem'].map((id) => document.getElementById(id));
        const resultados = campos.map((c) => validar[c.id](c));
        const primeiroInvalido = campos[resultados.indexOf(false)];
        if (primeiroInvalido) { primeiroInvalido.focus(); return; }

        const [nome, email, mensagem] = campos.map((c) => c.value.trim());
        const assunto = 'Contato pelo portfólio — ' + nome;
        const corpo = mensagem + '\n\n' + nome + '\n' + email;

        window.location.href = 'mailto:aluiz0953@gmail.com?subject=' + encodeURIComponent(assunto) +
            '&body=' + encodeURIComponent(corpo);

        aviso.textContent = 'Abrindo seu app de e-mail. Se nada abrir, escreva para aluiz0953@gmail.com.';
        form.reset();
    });

    // 6. ANIMAÇÕES COM GSAP: entrada do início, saída ao rolar e títulos letra a letra.
    //    As animações rodam sempre, mesmo com "reduzir movimento" ativo no sistema. Se o GSAP não carregar, o conteúdo
    //    aparece mesmo assim (e o CSS ainda revela o início depois de 2,5 s).
    const hero = document.querySelector('.hero');
    const entram = hero ? [...hero.querySelectorAll('[data-in]')] : [];
    const mostrar = () => entram.forEach((el) => { el.style.visibility = 'visible'; });

    // vídeo do início: só toca com a seção na tela
    const video = hero && hero.querySelector('.hero-video');
    if (video && 'IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) video.play().catch(() => { });
            else video.pause();
        }, { threshold: 0.05 }).observe(hero);
    }

    if (hero && window.gsap && window.ScrollTrigger && window.SplitText) {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        const mm = gsap.matchMedia();

        mm.add('all', () => {
            mostrar();
            const conteudo = hero.querySelector('.hero-conteudo');
            const rodape = hero.querySelector('.hero-rodape');
            const nome = SplitText.create(hero.querySelector('h1'), { type: 'words, chars' });

            gsap.timeline({ defaults: { ease: 'power3.out' } })
                .from('.hero-marca', { opacity: 0, y: 14, duration: .7 }, .1)
                .from(nome.chars, { opacity: 0, yPercent: 55, duration: .9, stagger: .028 }, .25)
                .from('.hero-sub', { opacity: 0, y: 18, duration: .8 }, .62)
                .from('.btn-oval', { opacity: 0, y: 18, duration: .8 }, .76)
                .from(rodape, { opacity: 0, duration: .8 }, .95);

            // ao rolar, o conteúdo sobe e some e o vídeo se aproxima devagar
            const saida = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
            gsap.to(conteudo, { yPercent: -16, opacity: 0, ease: 'none', scrollTrigger: saida });
            gsap.to(rodape.children, { opacity: 0, ease: 'none', scrollTrigger: { ...saida, end: '25% top' } });
            if (video) gsap.to(video, { scale: 1.12, ease: 'none', scrollTrigger: saida });

            // capas dos projetos: começam menores e crescem até o tamanho real ao entrar na tela
            cartoes.forEach((c) => {
                gsap.fromTo(c, { '--entra': .8 }, {
                    '--entra': 1, ease: 'none',
                    scrollTrigger: { trigger: c, start: 'top bottom', end: 'top 30%', scrub: true },
                });
            });

            // títulos das seções entram letra a letra, uma vez só
            document.querySelectorAll('.secao-cab h2').forEach((h2) => {
                const letras = SplitText.create(h2, { type: 'words, chars' });
                gsap.from(letras.chars, {
                    opacity: 0, yPercent: 60, duration: .7, stagger: .03, ease: 'power3.out',
                    scrollTrigger: { trigger: h2, start: 'top 88%', once: true },
                });
            });
        }, hero);

        // desktop: os projetos se empilham; o cartão de trás diminui e escurece quando o próximo sobe
        mm.add('(min-width: 861px)', () => {
            cartoes.slice(0, -1).forEach((c, i) => {
                const proximo = cartoes[i + 1];
                const cobre = {
                    trigger: proximo, start: 'top bottom',
                    end: () => `top ${92 + Math.min(i + 1, 4) * 16}px`, scrub: true, invalidateOnRefresh: true,
                };
                gsap.to(c, { scale: .93, ease: 'none', scrollTrigger: cobre });
                gsap.to(c.querySelector('.projeto-veu'), { opacity: .55, ease: 'none', scrollTrigger: cobre });
            });
        });

        // celular: sem pilha; a capa escurece e some aos poucos quando sai pelo topo
        mm.add('(max-width: 860px)', () => {
            cartoes.forEach((c) => {
                gsap.to(c.querySelector('.capa'), {
                    opacity: .2, ease: 'none',
                    scrollTrigger: { trigger: c, start: 'top 15%', end: 'top -40%', scrub: true },
                });
            });
        });

    } else {
        mostrar();
    }

    // 7. ONDAS ANIMADAS NO FUNDO DAS SEÇÕES ALTERNADAS (WebGL, sem biblioteca).
    //    Reagem ao cursor, param quando a seção sai da tela e viram um quadro parado com
    //    Sem WebGL, o ondas.svg estático continua no lugar.
    const FRAG = `
        #extension GL_OES_standard_derivatives : enable
        precision highp float;
        uniform vec2 uRes, uMouse;
        uniform float uTempo, uMouseOn, uAlpha;
        uniform vec3 uCor;
        void main() {
            vec2 p = gl_FragCoord.xy / uRes.y;
            float x = p.x * uRes.y / uRes.x;
            float t = uTempo;
            // faixas de linhas que se juntam e se afastam, como no ondas.svg
            float env = .55 + .45 * sin(6.2832 * x * .55 + p.y * 1.4 + t * .15);
            float w = .23 * sin(6.2832 * x * .85 + p.y * 1.6 + t * .35) * env
                    + .06 * sin(6.2832 * x * 2.2 - p.y * 3. - t * .6)
                    + .16 * x;
            vec2 d = p - uMouse;
            w += uMouseOn * .09 * exp(-dot(d, d) * 16.);
            float v = (p.y + w) * 34.;
            float f = fract(v), dist = min(f, 1. - f), fw = fwidth(v);
            float linha = 1. - smoothstep(0., fw * 1.2, dist - fw * .3);
            float faixa = .3 + .7 * smoothstep(0., 1., .5 + .5 * sin(v * .09 + t * .1));
            float a = linha * faixa * uAlpha;
            gl_FragColor = vec4(uCor * a, a);
        }`;

    const ondas = (secao, intensidade) => {
        const tela = document.createElement('canvas');
        const gl = tela.getContext('webgl', { premultipliedAlpha: true, antialias: false });
        if (!gl || !gl.getExtension('OES_standard_derivatives')) return;
        const compilar = (tipo, fonte) => {
            const s = gl.createShader(tipo);
            gl.shaderSource(s, fonte);
            gl.compileShader(s);
            return s;
        };
        const prog = gl.createProgram();
        gl.attachShader(prog, compilar(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
        gl.attachShader(prog, compilar(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

        gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        const u = {};
        ['uRes', 'uMouse', 'uTempo', 'uMouseOn', 'uAlpha', 'uCor'].forEach((k) => { u[k] = gl.getUniformLocation(prog, k); });

        tela.className = 'ondas-vivas';
        tela.setAttribute('aria-hidden', 'true');
        secao.prepend(tela);
        secao.classList.add('tem-ondas');

        // cor e intensidade vêm do tema (o token --accent já resolvido pelo CSS)
        const lerTema = () => {
            const hex = getComputedStyle(root).getPropertyValue('--accent').trim().replace('#', '');
            const c = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
            gl.uniform3fv(u.uCor, c.every((n) => n >= 0) ? c : [0.12, 0.17, 0.59]);
            gl.uniform1f(u.uAlpha, intensidade[root.dataset.theme === 'dark' ? 1 : 0]);
        };
        lerTema();

        const escala = Math.min(window.devicePixelRatio || 1, 1.25);
        const medir = () => {
            tela.width = Math.max(1, Math.round(secao.clientWidth * escala));
            tela.height = Math.max(1, Math.round(secao.clientHeight * escala));
            gl.viewport(0, 0, tela.width, tela.height);
            gl.uniform2f(u.uRes, tela.width, tela.height);
        };
        medir();

        let mx = 0.5, my = 0.5, alvoX = 0.5, alvoY = 0.5, mouseOn = 0, alvoOn = 0;
        window.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            const r = secao.getBoundingClientRect();
            alvoX = (e.clientX - r.left) / r.height;
            alvoY = (r.bottom - e.clientY) / r.height;
            alvoOn = e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;
        }, { passive: true });

        let rodando = false, raf = 0;
        const desenhar = (agora) => {
            mx += (alvoX - mx) * 0.06;
            my += (alvoY - my) * 0.06;
            mouseOn += (alvoOn - mouseOn) * 0.05;
            gl.uniform1f(u.uTempo, agora / 1000);
            gl.uniform2f(u.uMouse, mx, my);
            gl.uniform1f(u.uMouseOn, mouseOn);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            raf = rodando ? requestAnimationFrame(desenhar) : 0;
        };
        const ligar = (sim) => {
            rodando = sim;
            if (sim && !raf) raf = requestAnimationFrame(desenhar);
        };

        new ResizeObserver(() => { medir(); if (!rodando) desenhar(performance.now()); }).observe(secao);
        new MutationObserver(() => { lerTema(); if (!rodando) desenhar(performance.now()); })
            .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
        new IntersectionObserver(([e]) => ligar(e.isIntersecting)).observe(secao);
    };

    // intensidade das linhas: [tema claro, tema escuro]
    document.querySelectorAll('section.alt').forEach((s) => ondas(s, [0.2, 0.26]));
});
