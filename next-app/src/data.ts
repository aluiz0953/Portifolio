// Conteúdo do portfólio. Tudo aqui é real: projetos meus, com links que funcionam.
// Marcas, produtos e números dos sites de demonstração são fictícios, e isso está dito em cada descrição.

export const CONTATO = {
  email: "aluiz0953@gmail.com",
  telefone: "(32) 99142-9442",
  telefoneHref: "tel:+5532991429442",
  github: "https://github.com/aluiz0953",
  linkedin: "https://www.linkedin.com/in/andr%C3%A9-luiz-guilarducci-pereira-925930440/",
} as const

export const TECNOLOGIAS = [
  "Java", "Spring Boot", "React", "React Native", "Next.js", "TypeScript", "JavaScript",
  "HTML", "CSS", "Tailwind CSS", "MySQL", "PostgreSQL", "GSAP", "Three.js", "WebGL",
] as const

export type GrupoId = "sistemas" | "produto" | "imoveis" | "servicos" | "estudos"

export const GRUPOS: { id: GrupoId; nome: string; descricao: string }[] = [
  { id: "sistemas", nome: "Sistemas e apps", descricao: "Painéis, agendas e funis, com dados e regras de negócio." },
  { id: "produto", nome: "Sites de produto", descricao: "Produtos fictícios contados com vídeo preso à rolagem." },
  { id: "imoveis", nome: "Imóveis e turismo", descricao: "Casas, corretores e um voo de drone, do anúncio à visita." },
  { id: "servicos", nome: "Serviços e landing pages", descricao: "Páginas feitas para explicar um serviço e levar ao contato." },
  { id: "estudos", nome: "Estudos", descricao: "Onde eu aprendo a base, incluindo este portfólio." },
]

type Captura = { src: string; escuro?: string; alt: string }

export type Projeto = {
  id: string
  grupo: GrupoId
  nome: string
  rotulo: string
  resumo: string
  fatos: [string, string][]
  contexto: string
  entrega: string
  tech: string[]
  links: { rotulo: string; href: string }[]
  desk: Captura
  cel: Captura
}

const c = (nome: string) => `./capturas/${nome}.webp`

export const PROJETOS: Projeto[] = [
  // Sistemas e apps
  {
    id: "estoque",
    grupo: "sistemas",
    nome: "App de Estoque",
    rotulo: "Web e mobile",
    resumo: "Estoque por lote de uma perfumaria, do celular ao painel.",
    fatos: [["2", "plataformas, web e mobile"], ["FIFO/FEFO", "regra de saída por lote"], ["Diário", "alertas de estoque e validade"]],
    contexto: "Uma perfumaria precisa saber o que entrou, o que saiu e o que está perto de vencer.",
    entrega: "O app mobile registra entradas e saídas em lote; o painel web cuida de cadastro, relatórios e finanças. O servidor em Java calcula a margem de lucro e envia os alertas.",
    tech: ["Java", "Spring Boot", "React", "React Native", "MySQL"],
    links: [{ rotulo: "Ver no GitHub", href: "https://github.com/aluiz0953/App-de-Estoque" }, { rotulo: "Abrir demonstração", href: "https://site-fast.pages.dev/demos/estoque/" }],
    desk: { src: c("captura-estoque"), escuro: c("captura-estoque-escuro"), alt: "Painel do App de Estoque com quatro cartões de resumo, lista de produtos recentes e gráfico de entradas e saídas" },
    cel: { src: c("captura-estoque-mobile"), escuro: c("captura-estoque-mobile-escuro"), alt: "Painel do App de Estoque no celular, com saudação e cartões de resumo empilhados" },
  },
  {
    id: "mediconsulta",
    grupo: "sistemas",
    nome: "MediConsulta",
    rotulo: "Web, em desenvolvimento",
    resumo: "Uma agenda médica com quatro perfis de acesso.",
    fatos: [["4", "perfis de acesso"], ["Web", "responsiva, do celular ao PC"], ["MVP", "em desenvolvimento"]],
    contexto: "Consultas, aprovação de médicos e receitas passam por pessoas com permissões muito diferentes.",
    entrega: "Administrador, secretário, médico e paciente enxergam só o que lhes cabe. O médico registra avaliação, instruções e receita; o paciente vê, pelo próprio acesso, o que o médico liberar.",
    tech: ["TypeScript", "PostgreSQL", "Web responsiva"],
    links: [{ rotulo: "Ver no GitHub", href: "https://github.com/aluiz0953/mediconsultas" }, { rotulo: "Abrir demonstração", href: "https://site-fast.pages.dev/demos/medconsultas/" }],
    desk: { src: c("captura-mediconsulta-agenda"), escuro: c("captura-mediconsulta-agenda-escuro"), alt: "Agenda da clínica no MediConsulta, com formulário de agendamento e lista de consultas do dia com status" },
    cel: { src: c("captura-mediconsulta-mobile"), escuro: c("captura-mediconsulta-mobile-escuro"), alt: "Lista de consultas do dia do MediConsulta no celular, com status e botões de confirmar e cancelar" },
  },
  {
    id: "crm",
    grupo: "sistemas",
    nome: "Exemplo CRM",
    rotulo: "Web, demonstração",
    resumo: "Um funil de vendas de imobiliária que se arrasta com o mouse.",
    fatos: [["5", "etapas no funil"], ["2", "visões, funil e lista"], ["Local", "dados salvos no navegador"]],
    contexto: "CRM de demonstração de uma imobiliária fictícia; nomes, telefones e valores são inventados.",
    entrega: "Contatos mudam de etapa por arrastar e soltar ou pela ficha, que também guarda tarefas e notas. Toda alteração pode ser desfeita, e os dados ficam no navegador de quem usa.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [{ rotulo: "Abrir demonstração", href: "https://site-fast.pages.dev/demos/crm/" }],
    desk: { src: c("captura-crm"), alt: "Funil do Exemplo CRM com cinco colunas de contatos, valores por etapa e o botão Novo contato" },
    cel: { src: c("captura-crm-mobile"), alt: "Exemplo CRM no celular, com a busca, os totais e as colunas Novo e Conversa" },
  },

  // Sites de produto
  {
    id: "lento",
    grupo: "produto",
    nome: "Lento",
    rotulo: "Site de marca, demonstração",
    resumo: "Uma marca de objetos de mesa, com áudio e periféricos da mesma família.",
    fatos: [["2", "famílias, áudio e periféricos"], ["8", "produtos apresentados"], ["Cores", "seletor com galeria por produto"]],
    contexto: "Site de uma marca conceito fictícia. Nada está à venda, e as imagens dos produtos foram geradas por inteligência artificial.",
    entrega: "A home apresenta a linha em duas famílias, com seletor de cor e galeria por produto, e o teclado em quatro tamanhos. O fone e o headset têm página própria.",
    tech: ["Next.js", "Tailwind CSS", "GSAP"],
    links: [{ rotulo: "Abrir site", href: "https://lento-demo.aluiz0953.workers.dev/lento" }],
    desk: { src: c("captura-lento-marca"), alt: "Home da Lento: o título Lento em itálico, a frase Objetos de mesa em metal escovado e cobre e a foto de um fone de ouvido bege" },
    cel: { src: c("captura-lento-marca-mobile"), alt: "Home da Lento no celular, com o título, os botões Ver produtos e Avise-me e o fone de ouvido bege" },
  },
  {
    id: "lento-01",
    grupo: "produto",
    nome: "Lento 01",
    rotulo: "Site de produto, demonstração",
    resumo: "Um fone de ouvido que gira, se abre e mostra o interior conforme você rola.",
    fatos: [["120", "quadros presos à rolagem"], ["8", "cores com fotos de detalhe"], ["78 s", "de filme do produto"]],
    contexto: "Site de demonstração para um produto fictício, o fone Lento 01. A marca, o produto e os textos são inventados, e as imagens foram geradas por inteligência artificial.",
    entrega: "No tile de destaque a rolagem gira o fone, mostra o couro e o friso de cobre e separa almofada, câmara e driver. Depois vêm as oito cores, os clipes em laço, o filme completo e a ficha técnica.",
    tech: ["Next.js", "GSAP", "Canvas"],
    links: [{ rotulo: "Abrir site", href: "https://lento-demo.aluiz0953.workers.dev/fone" }],
    desk: { src: c("captura-lento"), alt: "Site do Lento 01: um fone de ouvido de alumínio escovado e couro bege flutuando em um cartão arredondado" },
    cel: { src: c("captura-lento-mobile"), alt: "Lento 01 no celular, com o fone de ouvido bege em um cartão arredondado" },
  },
  {
    id: "lumo-air",
    grupo: "produto",
    nome: "Lumo Air",
    rotulo: "Site de produto, demonstração",
    resumo: "Um mouse gamer que se desmonta conforme você rola.",
    fatos: [["5", "vídeos encadeados numa rolagem só"], ["7", "camadas do mouse"], ["GSAP", "texto e régua sincronizados"]],
    contexto: "Site de demonstração para um produto fictício, o mouse Lumo Air de 39 g. A marca, o produto e os textos são inventados.",
    entrega: "A rolagem controla o vídeo: o mouse gira, abre em sete camadas e se fecha de novo. Uma régua compara os 39 g com uma bola de tênis de mesa e uma de golfe.",
    tech: ["JavaScript", "GSAP", "Vídeo na rolagem"],
    links: [{ rotulo: "Abrir site", href: "https://lumo-air-demo.aluiz0953.workers.dev/" }],
    desk: { src: c("captura-lumo-air"), alt: "Site do Lumo Air: um mouse gamer branco desmontado em camadas sobre fundo azul-marinho, com linhas numeradas apontando cada peça" },
    cel: { src: c("captura-lumo-air-mobile"), alt: "Lumo Air no celular, com o mouse desmontado no centro da tela" },
  },

  // Imóveis e turismo
  {
    id: "aroeira",
    grupo: "imoveis",
    nome: "Aroeira Imóveis",
    rotulo: "Site, demonstração",
    resumo: "Uma imobiliária de casas na praia, com vídeo que avança pela rolagem.",
    fatos: [["160", "quadros de vídeo na rolagem"], ["6", "casas na galeria horizontal"], ["GSAP", "textos e cartões animados"]],
    contexto: "Site de demonstração de uma imobiliária fictícia no sul da Bahia; casas, equipe, preços e contatos são de exemplo, e algumas fotos foram geradas por IA.",
    entrega: "Um tour de vídeo preso na tela e controlado pela rolagem, galeria horizontal de casas, praias com foto que segue o mouse e contato direto pelo WhatsApp.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP", "Lenis"],
    links: [{ rotulo: "Abrir site", href: "https://previa-aroeira.aluiz0953.workers.dev/" }],
    desk: { src: c("captura-aroeira"), alt: "Página inicial da Aroeira Imóveis: o título A casa se revela antes da viagem sobre a entrada de uma casa de praia" },
    cel: { src: c("captura-aroeira-mobile"), alt: "Aroeira Imóveis no celular, com o título e os botões sobre a fachada da casa" },
  },
  {
    id: "casa-terral",
    grupo: "imoveis",
    nome: "Casa Terral",
    rotulo: "Site, demonstração",
    resumo: "Uma casa à venda contada como um percurso, cômodo por cômodo.",
    fatos: [["6", "capítulos guiados pela rolagem"], ["224", "quadros de vídeo num canvas"], ["Planta", "com o ponto você está aqui"]],
    contexto: "Site de demonstração de uma casa fictícia; a casa, a arquiteta e os números são inventados, e as imagens foram geradas por IA.",
    entrega: "O hero é um passeio fixo: cada trecho da rolagem entra em um cômodo, com legenda, planta do térreo e contador de metros quadrados. Depois vêm a galeria horizontal, os materiais e o agendamento.",
    tech: ["React", "Vite", "GSAP", "Lenis"],
    links: [{ rotulo: "Abrir site", href: "https://casa-terral.aluiz0953.workers.dev/" }],
    desk: { src: c("captura-casa-terral"), alt: "Site da Casa Terral: a entrada de uma casa de concreto e madeira na mata, com o nome Terral em letras grandes" },
    cel: { src: c("captura-casa-terral-mobile"), alt: "Casa Terral no celular, com a porta de madeira da casa e o nome Terral embaixo" },
  },
  {
    id: "meridiano",
    grupo: "imoveis",
    nome: "Meridiano Imóveis",
    rotulo: "Landing page, demonstração",
    resumo: "Um corretor de alto padrão que confere a documentação antes da visita.",
    fatos: [["1", "ação principal, agendar visita"], ["3", "imóveis por visita, no máximo"], ["FAQ", "perguntas antes do contato"]],
    contexto: "Landing page de demonstração de um corretor fictício; o corretor, o registro e os números são de exemplo.",
    entrega: "Uma página só, voltada para agendar visita ou avaliação: imóveis em cartaz, o método do corretor, quem ele é e as perguntas comuns.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [{ rotulo: "Abrir site", href: "https://landing-demo.aluiz0953.workers.dev/landing/corretor-1" }],
    desk: { src: c("captura-meridiano"), alt: "Landing page da Meridiano Imóveis: uma casa iluminada ao entardecer e o título Imóveis de alto padrão, vistos antes de você escolher" },
    cel: { src: c("captura-meridiano-mobile"), alt: "Meridiano Imóveis no celular, com o título e o botão Agendar visita ou avaliação" },
  },
  {
    id: "imoveis",
    grupo: "imoveis",
    nome: "Exemplo Imóveis",
    rotulo: "Site, demonstração",
    resumo: "Um corretor de imóveis, do anúncio à escritura.",
    fatos: [["3", "imóveis em destaque"], ["6", "seções numa página só"], ["Lenis", "rolagem suave"]],
    contexto: "Site de demonstração de um corretor de imóveis fictício; imagens e números são de exemplo.",
    entrega: "Destaques da semana, serviços do corretor, bairros de atuação, depoimentos de exemplo e agendamento de visita.",
    tech: ["HTML", "CSS", "JavaScript", "Lenis"],
    links: [{ rotulo: "Abrir site", href: "https://teste-corretor-imoveis.aluiz0953.workers.dev/" }],
    desk: { src: c("captura-imoveis"), alt: "Página inicial do Exemplo Imóveis: uma casa iluminada ao anoitecer, o título Chave na mão e cartões de imóveis em destaque" },
    cel: { src: c("captura-imoveis-mobile"), alt: "Exemplo Imóveis no celular, com o título sobre a foto da casa" },
  },
  {
    id: "miravale",
    grupo: "imoveis",
    nome: "Mira Vale",
    rotulo: "Estudo de reconstrução",
    resumo: "Um resort nas montanhas, reconstruído a partir de um site de referência.",
    fatos: [["120", "quadros no hero, presos à rolagem"], ["Marca", "nome, logo e textos trocados"], ["Lenis", "rolagem suave"]],
    contexto: "Estudo: reconstruí a estrutura e as interações de um site real de empreendimento e troquei a identidade por uma marca fictícia. O resort, os números e os contatos não existem.",
    entrega: "Tela de carregamento, hero com imagem que gira conforme a rolagem, menu em tela cheia e as seções do empreendimento, todas refeitas em código próprio.",
    tech: ["Next.js", "GSAP", "Lenis"],
    links: [{ rotulo: "Abrir site", href: "https://miravale-demo.aluiz0953.workers.dev/" }],
    desk: { src: c("captura-miravale"), alt: "Site do Mira Vale: um conjunto de prédios de madeira entre montanhas, com o nome Mira Vale em letras largas" },
    cel: { src: c("captura-miravale-mobile"), alt: "Mira Vale no celular, com o nome do resort sobre a foto das montanhas" },
  },
  {
    id: "kemet",
    grupo: "imoveis",
    nome: "Kemet",
    rotulo: "Site com vídeo, demonstração",
    resumo: "O Egito em um só voo de drone, em oito paradas.",
    fatos: [["8", "paradas no mesmo voo"], ["Vídeo", "que avança com a rolagem"], ["Painel", "de voo com rumo e altitude"]],
    contexto: "Site de demonstração de uma experiência de turismo fictícia; o roteiro e os números são inventados, e o vídeo foi gerado por IA.",
    entrega: "A rolagem conduz um voo contínuo do Nilo ao pôr do sol, com legenda por parada e um painel que simula os dados do drone.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP", "Lenis"],
    links: [{ rotulo: "Abrir site", href: "https://kemet-demo.aluiz0953.workers.dev/" }],
    desk: { src: c("captura-kemet"), alt: "Site do Kemet: o rio Nilo ao amanhecer visto de um drone, com o título Acorde sobre o Nilo" },
    cel: { src: c("captura-kemet-mobile"), alt: "Kemet no celular, com o sol nascendo sobre o Nilo e o título Acorde sobre o Nilo" },
  },

  // Serviços e landing pages
  {
    id: "sessao",
    grupo: "servicos",
    nome: "Sessão",
    rotulo: "Landing page, demonstração",
    resumo: "Um streaming de cinema com curadoria semanal.",
    fatos: [["5", "seções numa página só"], ["React", "com Vite"], ["GSAP", "animações da página"]],
    contexto: "Landing page de demonstração para um streaming só de filmes, com curadoria semanal. A plataforma é fictícia.",
    entrega: "Apresenta a plataforma, os planos e o catálogo em uma página só, com destaque para clássicos e cinema brasileiro.",
    tech: ["React", "Vite", "GSAP"],
    links: [{ rotulo: "Abrir site", href: "https://sessao-demo.pages.dev/" }],
    desk: { src: c("captura-sessao"), alt: "Página inicial do Sessão: o título Grandes filmes merecem uma boa sessão sobre um mosaico de cartazes de filmes" },
    cel: { src: c("captura-sessao-mobile"), alt: "Sessão no celular, com o título em amarelo sobre os cartazes" },
  },
  {
    id: "advocacia",
    grupo: "servicos",
    nome: "Exemplo Advogados",
    rotulo: "Site, demonstração",
    resumo: "Um escritório de advocacia que explica cada etapa do atendimento.",
    fatos: [["3D", "balança feita em Three.js"], ["4", "etapas do atendimento"], ["4", "seções numa página só"]],
    contexto: "Site de demonstração de um escritório de advocacia fictício; nomes, endereços e contatos são exemplos.",
    entrega: "Áreas de atuação, o atendimento explicado em quatro etapas e contato, com uma balança em 3D no início.",
    tech: ["HTML", "CSS", "JavaScript", "Three.js"],
    links: [{ rotulo: "Abrir site", href: "https://site-teste.aluiz0953.workers.dev/" }],
    desk: { src: c("captura-advocacia"), alt: "Página inicial do Exemplo Advogados: uma balança da justiça em 3D sobre fundo azul-escuro e o título Direito com clareza" },
    cel: { src: c("captura-advocacia-mobile"), alt: "Exemplo Advogados no celular, com a balança em 3D acima do título" },
  },
  {
    id: "sitefast",
    grupo: "servicos",
    nome: "Site Fast",
    rotulo: "Site de serviço",
    resumo: "Um serviço de criação de sites que mostra a prévia antes de cobrar.",
    fatos: [["2", "temas, claro e escuro"], ["8", "seções numa página só"], ["WhatsApp", "contato direto nos botões"]],
    contexto: "Site de um serviço de criação de sites, lojas virtuais, aplicativos e sistemas sob medida.",
    entrega: "Apresenta os serviços, os trabalhos, os planos e as dúvidas comuns, e leva o visitante a pedir uma prévia grátis pelo WhatsApp.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [{ rotulo: "Abrir site", href: "https://site-fast.pages.dev/" }],
    desk: { src: c("captura-sitefast"), escuro: c("captura-sitefast-escuro"), alt: "Página inicial do Site Fast: o título Veja seu site antes de pagar e o botão Quero minha prévia grátis" },
    cel: { src: c("captura-sitefast-mobile"), escuro: c("captura-sitefast-mobile-escuro"), alt: "Site Fast no celular: o título Veja seu site antes de pagar e o botão Quero minha prévia grátis" },
  },

  // Estudos
  {
    id: "blog",
    grupo: "estudos",
    nome: "Blog TecnoLógica",
    rotulo: "Atividade prática",
    resumo: "Um blog de tecnologia em uma única página.",
    fatos: [["1", "página, no formato SPA"], ["3", "seções de conteúdo"], ["Flexbox", "duas colunas no desktop, uma no celular"]],
    contexto: "Atividade prática para aprender a estruturar um site de conteúdo com HTML e CSS, e deixá-lo responsivo.",
    entrega: "Notícias sobre tecnologia, jogos e smartphones em uma Single Page Application, com navegação suave por âncoras.",
    tech: ["HTML", "CSS"],
    links: [{ rotulo: "Abrir projeto", href: "https://aluiz0953.github.io/teste-blog-tecnologica/" }, { rotulo: "Ver no GitHub", href: "https://github.com/aluiz0953/teste-blog-tecnologica" }],
    desk: { src: c("print-tecnologica"), alt: "Página inicial do Blog TecnoLógica, com cabeçalho azul, lista de postagens e barra lateral de categorias" },
    cel: { src: c("captura-blog-mobile"), alt: "Blog TecnoLógica aberto no celular, com cabeçalho azul e a primeira postagem" },
  },
  {
    id: "portfolio",
    grupo: "estudos",
    nome: "Este portfólio",
    rotulo: "Site pessoal",
    resumo: "Refeito do zero, com um campo de grão animado e rolagem suave.",
    fatos: [["2", "temas, claro e escuro"], ["17", "projetos em cinco grupos"], ["WebGL", "grão animado no hero"]],
    contexto: "A primeira versão foi meu primeiro projeto, em HTML, CSS e JavaScript puros. Esta é a segunda, refeita do zero.",
    entrega: "Fundo de grão em WebGL, tema claro e escuro, projetos filtrados por grupo, navegação por teclado e formulário de contato com validação.",
    tech: ["React", "Vite", "Tailwind CSS", "GSAP", "Lenis"],
    links: [{ rotulo: "Ver no GitHub", href: "https://github.com/aluiz0953/Portifolio" }],
    desk: { src: c("captura-portfolio"), escuro: c("captura-portfolio-escuro"), alt: "Início deste portfólio: o nome André Luiz em letras brancas grandes sobre um palco escuro com grão lavanda e laranja" },
    cel: { src: c("captura-portfolio-mobile"), escuro: c("captura-portfolio-mobile-escuro"), alt: "Início deste portfólio no celular, com o nome em letras brancas grandes sobre o grão lavanda e laranja" },
  },
]

export const HABILIDADES = {
  pratica: [
    ["Redes de computadores", "Trabalho com redes hoje."],
    ["Manutenção e reparo de computadores", "Trabalho com reparo de computadores hoje."],
    ["Programação", "Base para todos os projetos."],
  ],
  aprendendo: [
    ["Desenvolvimento web", "Nos projetos desta página."],
    ["Sistemas de dados", "MySQL no App de Estoque e PostgreSQL no MediConsulta."],
    ["Servidores em nuvem", "A API do App de Estoque roda no Railway."],
  ],
} as const
