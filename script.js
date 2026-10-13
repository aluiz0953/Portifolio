// script.js — tema, menu, destaque do link ativo, entrada ao rolar, formulário e efeitos do início

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

    // 3. LINK ATIVO NO MENU conforme a seção visível
    const secoes = document.querySelectorAll('main section[id]');
    const linksMenu = navLinks.querySelectorAll('a');

    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                linksMenu.forEach((a) =>
                    a.classList.toggle('ativo', a.getAttribute('href') === '#' + entrada.target.id));
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

    // 4c. HORA LOCAL (Brasília) no tile do hero
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

    // 6. EFEITOS DO INÍCIO
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 6a. LETRAS QUE SOBEM: o nome e os títulos das seções entram letra a letra, uma vez só.
    //     As letras ficam em spans escondidos de leitores de tela; o título inteiro vai no aria-label.
    const titulos = document.querySelectorAll('.hero h1, .secao-cab h2');
    if (!calmo && 'IntersectionObserver' in window) {
        titulos.forEach((el) => {
            const texto = el.textContent.trim();
            let n = 0;
            el.setAttribute('aria-label', texto);
            el.innerHTML = texto.split(/\s+/).map((palavra) =>
                '<span class="sp-w" aria-hidden="true">' +
                [...palavra].map((c) => `<span class="sp-c" style="--ci:${n++}">${c}</span>`).join('') +
                '</span>').join(' ');
            el.classList.add('split');
        });
        const verLetras = new IntersectionObserver((entradas) => {
            entradas.forEach((e) => {
                if (!e.isIntersecting) return;
                e.target.classList.add('split-ativo');
                verLetras.unobserve(e.target);
            });
        }, { threshold: 0.2 });
        titulos.forEach((el) => verLetras.observe(el));
    }

    // 6b. BLOCOS DO INÍCIO: a borda acende perto do cursor (também nos blocos vizinhos)
    //     e um clique solta uma onda de luz que atravessa a grade.
    const bento = document.querySelector('.bento');
    if (bento) {
        const blocos = [...bento.querySelectorAll('.tile')];
        blocos.forEach((t) => t.insertAdjacentHTML('beforeend',
            '<span class="tile-onda-luz" aria-hidden="true"></span><span class="tile-borda" aria-hidden="true"></span><span class="tile-onda" aria-hidden="true"></span>'));

        let px = -1e5, py = -1e5, onda = null, raf = 0;
        const quadro = (agora) => {
            raf = 0;
            let wr = 0, wa = 0;
            if (onda) {
                const p = Math.min(1, (agora - onda.t0) / 1500);
                wr = onda.alcance * (1 - Math.pow(1 - p, 2.2));
                wa = Math.pow(1 - p, 1.3);
                if (p >= 1) onda = null;
            }
            blocos.forEach((t) => {
                const r = t.getBoundingClientRect();
                t.style.setProperty('--mx', (px - r.left).toFixed(1) + 'px');
                t.style.setProperty('--my', (py - r.top).toFixed(1) + 'px');
                if (onda || wa === 0) {
                    t.style.setProperty('--wx', ((onda ? onda.x : 0) - r.left).toFixed(1) + 'px');
                    t.style.setProperty('--wy', ((onda ? onda.y : 0) - r.top).toFixed(1) + 'px');
                    t.style.setProperty('--wr', wr.toFixed(1) + 'px');
                    t.style.setProperty('--wa', wa.toFixed(3));
                }
            });
            if (onda) raf = requestAnimationFrame(quadro);
        };
        const pedir = () => { if (!raf) raf = requestAnimationFrame(quadro); };

        window.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            px = e.clientX; py = e.clientY;
            const b = bento.getBoundingClientRect(), m = 120;
            const perto = px > b.left - m && px < b.right + m && py > b.top - m && py < b.bottom + m;
            bento.classList.toggle('perto', perto);
            if (perto) pedir();
        }, { passive: true });
        document.documentElement.addEventListener('mouseleave', () => bento.classList.remove('perto'));

        if (!calmo) {
            bento.addEventListener('pointerdown', (e) => {
                const b = bento.getBoundingClientRect();
                const alcance = Math.max(...[[b.left, b.top], [b.right, b.top], [b.left, b.bottom], [b.right, b.bottom]]
                    .map(([x, y]) => Math.hypot(x - e.clientX, y - e.clientY))) + 140;
                onda = { x: e.clientX, y: e.clientY, t0: performance.now(), alcance };
                pedir();
            });
        }
    }

    // 6c. ONDAS ANIMADAS NO FUNDO (WebGL, sem biblioteca): no início e nas seções alternadas.
    //     Reagem ao cursor, param quando a seção sai da tela e viram um quadro parado com
    //     movimento reduzido. Sem WebGL, o ondas.svg estático continua no lugar.
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
            gl.uniform1f(u.uTempo, calmo ? 8 : agora / 1000);
            gl.uniform2f(u.uMouse, mx, my);
            gl.uniform1f(u.uMouseOn, calmo ? 0 : mouseOn);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            raf = rodando && !calmo ? requestAnimationFrame(desenhar) : 0;
        };
        const ligar = (sim) => {
            rodando = sim;
            if (sim && !raf) raf = requestAnimationFrame(desenhar);
        };

        new ResizeObserver(() => { medir(); if (!rodando || calmo) desenhar(performance.now()); }).observe(secao);
        new MutationObserver(() => { lerTema(); if (!rodando || calmo) desenhar(performance.now()); })
            .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
        new IntersectionObserver(([e]) => ligar(e.isIntersecting)).observe(secao);
    };

    // intensidade das linhas: [tema claro, tema escuro]
    document.querySelectorAll('.hero').forEach((s) => ondas(s, [0.34, 0.42]));
    document.querySelectorAll('section.alt').forEach((s) => ondas(s, [0.2, 0.26]));
});
