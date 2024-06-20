document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const resetButton = document.getElementById('resetButton');
    const images = [
        'images/a.png', 'images/a.png',
        'images/b.png', 'images/b.png',
        'images/c.png', 'images/c.png',
        'images/d.png', 'images/d.png',
        'images/e.png', 'images/e.png',
        'images/f.png', 'images/f.png',
        'images/g.png', 'images/g.png',
        'images/h.png', 'images/h.png'
    ];
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedCards = [];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.style.backgroundImage = `url('${this.dataset.image}')`;

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.image === secondCard.dataset.image;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedCards.push(firstCard);
        matchedCards.push(secondCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.style.backgroundImage = '';
            secondCard.style.backgroundImage = '';
            resetBoard();
        }, 500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function resetGame() {
        matchedCards = [];
        cards.forEach(card => {
            card.style.backgroundImage = '';
            card.addEventListener('click', flipCard);
            resetBoard();
        });
        initializeCards();
    }

    function initializeCards() {
        const shuffledImages = shuffle(images.slice());
        cards.forEach((card, index) => {
            card.dataset.image = shuffledImages[index];
            card.style.order = index; // Assign the order to cards
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });

    resetButton.addEventListener('click', resetGame);
    initializeCards(); // Initialize cards on load
});
