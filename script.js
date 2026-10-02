// script.js — tema, menu, destaque do link ativo, entrada ao rolar e formulário

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

    // 4b. LUZ QUE SEGUE O CURSOR nos tiles e cards (só com mouse)
    document.querySelectorAll('.tile, .projeto').forEach((el) => {
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
});
