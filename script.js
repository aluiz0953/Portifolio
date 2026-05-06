// script.js - Arquivo principal de interações

document.addEventListener("DOMContentLoaded", () => {
    // 1. ALTERNÂNCIA DE TEMA (Claro/Escuro)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verifica tema salvo no localStorage
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Tema Claro';
    } else {
        themeToggle.textContent = '🌙 Tema Escuro';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'escuro');
            themeToggle.textContent = '☀️ Tema Claro';
        } else {
            localStorage.setItem('tema', 'claro');
            themeToggle.textContent = '🌙 Tema Escuro';
        }
    });

    // 2. MENU MOBILE RESPONSIVO E DINÂMICO
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('ativo');
        });

        // Fechar o menu ao clicar em um link (mobile)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 680) {
                    navLinks.classList.remove('ativo');
                }
            });
        });
    }

    // 3. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO DE CONTATO
    const formContato = document.getElementById('form-contato');

    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio real do formulário (recarregamento)

            // Captura os valores dos campos
            const nomeStr = document.getElementById('nome').value.trim();
            const emailStr = document.getElementById('email').value.trim();
            const msgStr = document.getElementById('mensagem').value.trim();

            // Validação 1: Campos não podem estar vazios
            if (nomeStr === '' || emailStr === '' || msgStr === '') {
                alert("Por favor, preencha todos os campos obrigatórios (*).");
                return;
            }

            // Validação 2: Formato de E-mail
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(emailStr)) {
                alert("Por favor, insira um endereço de e-mail válido.");
                return;
            }

            // Simulação de Sucesso no Envio
            alert("Sua mensagem foi validada e enviada com sucesso!\nObrigado pelo contato, " + nomeStr + ".");

            // Limpa o formulário após a "simulação de envio"
            formContato.reset();
        });
    }
});
