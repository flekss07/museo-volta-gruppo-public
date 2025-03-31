const handleButton=document.getElementById("handle");
const reels=document.querySelectorAll(".reel");
const message=document.getElementById("message");
const slotMachine=document.querySelector('.slot_machine')

const images=['./img/elettro.jpeg','./img/pila.jpeg','./img/pistola.jpeg','./img/bilancia.jpeg'];
let confettiInterval;

function initializeReels()
{
    reels.forEach(reel=>{
        reel.innerHTML=`<img src="${images[0]}" alt="default"/>`;
    });
}

function spinReel(reel,duration){
    let index=Math.floor(Math.random()*images.length);

    return new Promise(resolve=>{
        let startTime=Date.now();
        const interval=100;

        const spin=setInterval(()=>{
            index=(index+1)%images.length;
            reel.innerHTML=`<img src="${images[index]}" alt="${images[index]}">`;
            if(Date.now()-startTime>=duration){
                clearInterval(spin);
                resolve(images[index]);
            }
        },interval);

    });
}

function startConfetti(){
    confettiInterval=setInterval(()=>{
        const confetti=document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left=`${Math.random()*100}vw`
        confetti.style.backgroundColor=`hsl(${Math.random()*360},100%,50%)`;

        document.body.appendChild(confetti);

        setTimeout(()=>{
            confetti.remove();
        },1500);
    },200);
}

function stopConfetti(){
    clearInterval(confettiInterval);
}

async function StartGame(){
    message.textContent='';
    handleButton.disabled=true;

    slotMachine.classList.remove('loss','win');
    stopConfetti();
    initializeReels();

    const results= await Promise.all([
        spinReel(reels[0],2000),
        spinReel(reels[1],3000),
        spinReel(reels[2],4000),
    ]);

    handleButton.disabled=false;

    if(results[0]=== results[1]&& results[1]===results[2]){
        message.textContent=`🎉🎉🎉🎉🎉HAI VINTO!🎉🎉🎉🎉🎉`;
        slotMachine.classList.add('win');
        startConfetti();
    }else{
        message.textContent=`🐞🍀🌶️RIPROVA!🌶️🍀🐞`;
        slotMachine.classList.add('loss');
    }
}


initializeReels();
handleButton.addEventListener('click',StartGame);