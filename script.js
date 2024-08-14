document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        checkCardsFlipped();
    });
});

function checkCardsFlipped() {
    const cards = document.querySelectorAll('.card');
    if (Array.from(cards).every(card => card.classList.contains('flipped'))) {
        activateEffect();
    }
}

function activateEffect() {
    document.body.classList.add('pulsing');
    document.querySelectorAll('.letter, #title, .carousel-word').forEach(element => {
        createBubbles(element.offsetLeft + element.offsetWidth / 2, element.offsetTop + element.offsetHeight / 2);
        element.classList.add('hide-text');
    });
    
    // Mostrar o título "CASAMOS"
    const casamos = document.getElementById('casamos');
    casamos.classList.remove('hidden');
    casamos.classList.add('show');
    
    // Iniciar a criação de patos
    createRandomDucks();
}

const title = document.getElementById('title');

title.innerHTML = title.textContent.split('').map(char => `<span class="letter">${char}</span>`).join('');

document.querySelectorAll('.letter').forEach(letter => {
    letter.addEventListener('click', (e) => {
        createBubbles(e.clientX, e.clientY);
        letter.classList.add('hidden');
        setTimeout(() => {
            letter.classList.remove('hidden');
            letter.classList.add('reappear');
        }, 2000); // Tempo em que a letra volta
    });
});

function createBubbles(x, y) {
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 1000); // Remove a bolha após 1 segundo
    }
}

function createRandomWords() {
    const phrases = [
        'EuTeAmo', 'I Love You', 'Te Amo', 'Ich Liebe Dich', 'Je T\'aime', 'Ti Amo', 'Te Quiero', 'Eu Te Amo'
    ];

    const container = document.getElementById('words-container');
    for (let i = 0; i < 15; i++) {
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        const carouselWord = document.createElement('div');
        carouselWord.className = 'carousel-word';
        carouselWord.textContent = phrase;
        carouselWord.style.left = `${Math.random() * 100}%`;
        carouselWord.style.top = `${Math.random() * 100}%`;
        container.appendChild(carouselWord);

        // Ajusta o tempo de animação para não ser sincronizado
        const animationDuration = Math.random() * 10 + 5; // Entre 5 e 15 segundos
        carouselWord.style.animationDuration = `${animationDuration}s`;

        // Cria bolhas quando a palavra chega no topo
        carouselWord.addEventListener('animationiteration', () => {
            createBubbles(window.innerWidth / 2, window.innerHeight / 2);
        });
    }
}

// Inicia a criação de palavras aleatórias
createRandomWords();

function createRandomDucks() {
    const duckImageUrl = 'https://cdn-icons-png.flaticon.com/512/324/324830.png'; // Substitua pela URL da imagem do pato
    setInterval(() => {
        const duck = document.createElement('div');
        duck.className = 'duck';
        duck.style.backgroundImage = `url(${duckImageUrl})`;
        duck.style.left = `${Math.random() * 100}%`;
        duck.style.top = `${Math.random() * 100}%`;
        document.body.appendChild(duck);

        // Remove o pato após a animação
        duck.addEventListener('animationend', () => {
            duck.remove();
        });

        // Duração da animação do pato
        setTimeout(() => duck.remove(), 3000); // Patos aparecem por 3 segundos
    }, 500); // Intervalo de 500ms para criar novos patos
}
