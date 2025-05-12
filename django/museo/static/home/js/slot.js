//ricavo gli elementi dal DOM
const reels = document.querySelectorAll(".reel");
const message = document.getElementById("message");
const slotMachine = document.querySelector('.slot_machine');

//crea un messaggio di avvio
const startMessage = document.createElement('div');
startMessage.id = 'startMessage';
startMessage.innerHTML = '🕹️ PREMI<span style="color: #ff0000">[SPAZIO]</span>O<span style="color: #00ff00">[INVIO]</span> 🕹️';
document.querySelector('.contenitore_slot').prepend(startMessage);

//configurazione dimensioni
const REEL_WIDTH = 150; 
const IMG_HEIGHT = 120; 
const IMG_SPACING = 30; 
const SLOT_HEIGHT = IMG_HEIGHT + IMG_SPACING;

//immagini
const ALL_IMAGES = [...BASE_IMAGES, ...BASE_IMAGES, ...EXTRA_IMAGES];

//frasi motivazionali
const MOTIVATIONAL_PHRASES = [
    "Sento la vittoria vicina!",
    "Non mollare ora!",
    "Il prossimo colpo è quello buono!",
    "La fortuna sta per bussare!",
    "Rimani concentrato!",
    "Questo è il momento giusto!",
    "Il jackpot è dietro l'angolo!"
];

//variabili di stato
let confettiInterval;
let isSpinning = false;
let attemptCount = 0;
let blinkInterval;

//inizializza i rulli con le immagini
function initializeReels() 
{
    //cicla ogni rullo e crea gli slot
    reels.forEach(reel => 
    {
        //sbianca l'HTML 
        reel.innerHTML = '';

        //imposta le dimensioni del rullo
        reel.style.width = `${REEL_WIDTH}px`;

        //cicla per 8 volte per creare gli slot
        for (let i = 0; i < 8; i++) 
        {
            //crea un div per lo slot
            ALL_IMAGES.forEach(img => 
            {
                const slot = document.createElement('div');
                slot.className = 'slot';
                slot.style.height = `${SLOT_HEIGHT}px`;
                slot.style.padding = `${IMG_SPACING/2}px 0`;

                //crea un div per l'immagine
                const imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';
                imgContainer.style.height = `${IMG_HEIGHT}px`;

                //crea l'immagine
                const imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.alt = img;
                imgElement.style.maxHeight = '100%';
                imgElement.style.maxWidth = '100%';
                imgElement.style.objectFit = 'contain';

                //fa l'appendChild dei vari elementi
                imgContainer.appendChild(imgElement);
                slot.appendChild(imgContainer);
                reel.appendChild(slot);
            });
        }

        //imposta la posizione iniziale del rullo
        reel.style.top = `-${4 * SLOT_HEIGHT}px`;
        reel.classList.remove('spinning', 'stopping');
    });
}

//funzione per far girare il rullo
function spinReel(reel, duration, forcedIndex = null) 
{   
    //controlla se il rullo è già in movimento
    return new Promise(resolve => 
    {
        //inizializza le variabili per il movimento
        const startTime = Date.now();
        const totalHeight = reel.children.length * SLOT_HEIGHT;
        const targetIndex = forcedIndex !== null ? forcedIndex : Math.floor(Math.random() * ALL_IMAGES.length);
        const targetPosition = -((4 + targetIndex) * SLOT_HEIGHT);
        
        //aggiunge la classe per il movimento
        reel.classList.add('spinning');

        //animazione del rullo
        const animate = () => 
        {
            //calcola il tempo trascorso e la progressione dell'animazione
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            //calcola la posizione corrente del rullo
            if (progress < 1) 
            {
                //inizializza la posizione corrente
                let currentTop;

                //calcola la posizione corrente in base alla progressione
                if (progress < 0.8) 
                {
                    //
                    currentTop = -progress * totalHeight * 2;
                } 
                else 
                {
                    const remaining = targetPosition - parseFloat(reel.style.top);
                    currentTop = parseFloat(reel.style.top) + remaining * 0.2;
                }
                
                //controlla se il rullo ha superato la posizione finale
                if (currentTop < -totalHeight + 4 * SLOT_HEIGHT) 
                {
                    currentTop += totalHeight - 8 * SLOT_HEIGHT;
                }
                
                //imposta la posizione corrente del rullo
                reel.style.top = `${currentTop}px`;

                //richiama la funzione di animazione alla prossima animazione
                requestAnimationFrame(animate);
            } 
            else 
            {
                //imposta la posizione finale del rullo e rimuove le classi di animazione
                reel.style.top = `${targetPosition}px`;
                reel.classList.remove('spinning');
                reel.classList.add('stopping');
                
                //risolve la promessa dopo un breve ritardo per l'animazione di arresto
                setTimeout(() => 
                {
                    reel.classList.remove('stopping');
                    resolve(ALL_IMAGES[targetIndex]);
                }, 500);
            }
        };
        
        //inizia l'animazione
        animate();
    });
}

//mostra/nascondi scritta lampeggiante
function toggleStartMessage(show) 
{
    //controlla se il messaggio è già visibile
    if (show) 
    {
        //mostra il messaggio
        startMessage.style.display = 'block';
        blinkInterval = setInterval(() => 
        {
            startMessage.style.visibility = startMessage.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
    } 
    else 
    {
        //nasconde il messaggio
        clearInterval(blinkInterval);
        startMessage.style.display = 'none';
    }
}

//effetto coriandoli
function startConfetti() 
{
    //ferma i coriandoli se già in esecuzione
    stopConfetti(); 
    
    //crea un intervallo per i coriandoli
    const colors = [
        '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
        '#ff00ff', '#00ffff', '#ffffff', '#ff9900',
        '#ff66b2', '#4dff4d', '#1ab2ff', '#ffcc00'
    ];
    
    //definisci le forme e le dimensioni dei coriandoli
    const shapes = ['circle', 'rect', 'star'];
    const sizes = [8, 10, 12, 14];
    
    //crea un intervallo per generare i coriandoli
    confettiInterval = setInterval(() => 
    {
        //crea un numero casuale di coriandoli
        for (let i = 0; i < 15; i++) 
        {
            //crea un elemento per il coriandolo
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            //imposta le dimensioni e la posizione casuale del coriandolo
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${-20 - Math.random() * 10}px`;
            
            //imposta le dimensioni, il colore e la forma casuali del coriandolo
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const rotation = Math.random() * 360;
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 2;
            
            //imposta le proprietà CSS del coriandolo
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            confetti.style.opacity = '0.9';
            confetti.style.zIndex = '1000';
            confetti.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            
            //imposta la forma del coriandolo
            if (shape === 'circle') 
            {
                confetti.style.borderRadius = '50%';
            }
            else if (shape === 'star') 
            {
                confetti.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            }
            
            //imposta la rotazione del coriandolo
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            //fa appendChild il coriandolo al body
            document.body.appendChild(confetti);
            
            //imposta un timeout per rimuovere il coriandolo dopo un certo tempo
            setTimeout(() => confetti.remove(), duration * 1000);
        }
    }, 150);
}

//ferma i coriandoli
function stopConfetti() 
{
    //rimuove tutti i coriandoli esistenti
    clearInterval(confettiInterval);
}

//avvia il gioco
async function startGame() 
{
    //controlla se il gioco è già in esecuzione
    if (isSpinning) return;

    //inizializza le variabili di stato
    isSpinning = true;
    attemptCount++;
    toggleStartMessage(false);
    
    //resetta il messaggio e lo stato del gioco
    message.textContent = '';
    slotMachine.classList.remove('loss', 'win');
    stopConfetti();
    let results;

    //controlla se il numero di tentativi è un multiplo di 7
    if (attemptCount % 7 === 0) 
    {
        //gira i rulli con un'immagine di base casuale
        const baseIndex = Math.floor(Math.random() * BASE_IMAGES.length);
        results = await Promise.all([
            spinReel(reels[0], 2000, baseIndex),
            spinReel(reels[1], 2500, baseIndex),
            spinReel(reels[2], 3000, baseIndex)
        ]);

        //resetta il numero di tentativi
        attemptCount = 0;
    } 
    else 
    {
        //gira i rulli con un'immagine casuale
        results = await Promise.all([
            spinReel(reels[0], 2000),
            spinReel(reels[1], 2500),
            spinReel(reels[2], 3000)
        ]);
    }

    isSpinning = false;
    toggleStartMessage(true);
    
    //controlla se i risultati sono uguali
    if (results[0] === results[1] && results[1] === results[2]) 
    {
        //mostra il messaggio di vittoria e avvia i coriandoli
        message.textContent = `🎉🎉🎉 HAI VINTO! 🎉🎉🎉`;
        slotMachine.classList.add('win');
        startConfetti();
    }
    else 
    {
        //mostra il messaggio di sconfitta e una frase motivazionale casuale
        const randomPhrase = MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
        message.innerHTML = `🍀 RIPROVA! 🍀<br> 🍀 ${randomPhrase} 🍀`;
        slotMachine.classList.add('loss');
    }
}

//event listeners
document.addEventListener('keydown', (e) => 
{
    //controlla se il tasto premuto è spazio o invio e se il gioco non è in esecuzione
    if ((e.key === ' ' || e.key === 'Enter') && !isSpinning) 
    {
        //ferma i coriandoli e avvia il gioco
        e.preventDefault();
        startGame();
    }
});

//inizializza i rulli e mostra il messaggio di avvio
initializeReels();
toggleStartMessage(true);