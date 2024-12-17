window.onload = ()=>{
    const gameArea = document.getElementById('game-area');
    let snake = document.querySelectorAll('.snake:not(.head)');
    const food = document.querySelector('.food');
    const snakeHead = document.querySelector('.head');
   
    let snakePoint = {
        dir: {
            X:0,
            Y:1
        },
        headSnake: {
            X: ((getComputedStyle(snakeHead)["top"]).slice(0,-2))*1,
            Y: ((getComputedStyle(snakeHead)["left"]).slice(0,-2))*1
        },
        part:[
            { 
                X: ((getComputedStyle(snake[0])["top"]).slice(0,-2))*1,
                Y: ((getComputedStyle(snake[0])["left"]).slice(0,-2))*1,
                dir: {
                    X:0,
                    Y: 1
                }
            }
        ]
    }
    
    let foodPoint = {
        X: ((getComputedStyle(food)["top"]).slice(0,-2))*1,
        Y: ((getComputedStyle(food)["left"]).slice(0,-2))*1
    }
    //console.log(snakePoint.X);
      const gameOver = ()=>{
        clearInterval(move);
        snakeHead.style.backgroundImage = 'url("./IMG/snake_dead.png")';
        console.log("Game Over!");
      };

    //Recupero il valore della proprietà top/left della div .snake dalle regole CSS e le converto in intero eliminando l'unità di misura (px)
    const moveSnake = (value)=>{
        //Aggiorno la listNode dei segmenti 
        snake = document.querySelectorAll('.snake:not(.head)');

        let prevX = snakePoint.headSnake.X;
        let prevY = snakePoint.headSnake.Y;
        let prevDir = {...snakePoint.dir};
        //Operatore '...' Crei una shallow copy (copia superficiale) di snakePoint.dir
        // prevDiv è un nuovo oggetto che contiene gli stessi valori di snakePoint.dir, ma è indipendente.
        //Qualsiasi modifica a prevDir non influenzerà snakePoint.dir (e viceversa).
        // Muove la testa nella nuova direzione
        snakePoint.headSnake.Y += value*snakePoint.dir.Y;
        snakePoint.headSnake.X += value*snakePoint.dir.X;
         // Aggiorna lo stile della testa
        snakeHead.style.top = `${snakePoint.headSnake.Y}px`;
        snakeHead.style.left = `${snakePoint.headSnake.X}px`;

        // Propaga il movimento al resto del corpo
        for (let i = 0; i < snakePoint.part.length; i++) {
            // Salva la posizione attuale del segmento
            const currentX = snakePoint.part[i].X;
            const currentY = snakePoint.part[i].Y;
            const currentDir = {...snakePoint.part[i].dir};

            // Aggiorna la posizione del segmento al valore precedente
            snakePoint.part[i].X = prevX;
            snakePoint.part[i].Y = prevY;
            snakePoint.part[i].dir = { ...prevDir };
            // Aggiorna lo stile del segmento
            snake[i].style.left = `${snakePoint.part[i].X}px`;
            snake[i].style.top = `${snakePoint.part[i].Y}px`;
            

            //TODO: creare l'animazione per ruotare correttamente le parti del corpo
             // Aggiorna la rotazione del segmento
            if (snakePoint.part[i].dir.X === 0 && snakePoint.part[i].dir.Y === 1) {
                snake[i].style.transform = "rotate(90deg)";
            } else if (snakePoint.part[i].dir.X === 1 && snakePoint.part[i].dir.Y === 0) {
                snake[i].style.transform = "rotate(0deg)";
            } else if (snakePoint.part[i].dir.X === 0 && snakePoint.part[i].dir.Y === -1) {
                snake[i].style.transform = "rotate(90deg)";
            } else if (snakePoint.part[i].dir.X === -1 && snakePoint.part[i].dir.Y === 0) {
                snake[i].style.transform = "rotate(0deg)";
            }

            // Aggiorna le variabili prevX,prevY e prevDir per il prossimo segmento
            prevX = currentX;
            prevY = currentY;
            prevDir = { ...currentDir };
        }

        const matchHead = (segment) =>{
            return segment.X === snakePoint.headSnake.X && segment.Y === snakePoint.headSnake.Y;
        }
    
        //Controllo se sono arrivato sul bordo della game-area 
        //Oppure se la testa tocca una parte del corpo per il Game Over
        if(snakePoint.part.some(matchHead)||
        snakePoint.headSnake.Y === 600 || snakePoint.headSnake.Y === -30 || 
        snakePoint.headSnake.X === 600 || snakePoint.headSnake.X === -30) 
        {
           gameOver();
        }
               
        //Controllo se ho raggiunto la mela
        if(snakePoint.headSnake.X === foodPoint.X && snakePoint.headSnake.Y === foodPoint.Y){
            console.log("Mela mangiata");
            newPart();
            placeFood();
        }
    };

    const newPart = () => {
        // Crea un nuovo elemento div per la parte del serpente
        const part = document.createElement('div');
        part.classList.add("snake");
    
        // Ottieni l'ultima parte del corpo e, se esiste, la penultima
        const lastIndex = snakePoint.part.length - 1;
        const lastPart = snakePoint.part[lastIndex];
        
        const secondLastPart = snakePoint.part[lastIndex - 1] || lastPart;
    
        // Calcola la direzione della nuova parte in base alla posizione delle ultime due
        const offsetX = lastPart.X - secondLastPart.X;
        const offsetY = lastPart.Y - secondLastPart.Y;
    
        // Posiziona la nuova parte dietro l'ultima
        const newPoint = {
            X: lastPart.X + offsetX,
            Y: lastPart.Y + offsetY,
            dir: {
                X: lastPart.dir.X,
                Y: lastPart.dir.Y
            }
        };
    
        // Aggiorna lo stile della nuova parte
        part.style.top = `${newPoint.Y}px`;
        part.style.left = `${newPoint.X}px`;
    
        // Aggiungi la nuova parte al corpo del serpente
        snakePoint.part.push(newPoint);
        gameArea.appendChild(part);
    
        console.log('Nuova parte aggiunta:', newPoint);
    
    };
    
    const matchFoodPart = (segment)=> {return segment.X === foodPoint.X && segment.Y === foodPoint.Y;}
    
    const placeFood = ()=>{
        foodPoint.X = Math.floor(Math.random()*570/30)*30;
        foodPoint.Y = Math.floor( Math.random()*570/30)*30;

        console.log(`Food X: ${foodPoint.X} -- Food Y: ${foodPoint.Y}`);
        console.log("Food match Part? ",snakePoint.part.some(matchFoodPart));
        if(snakePoint.part.some(matchFoodPart)) placeFood();
        else{
            food.style.top = `${foodPoint.Y}px`;
            food.style.left = `${foodPoint.X}px`;
    
        }
    }

    placeFood();

    const move = setInterval(moveSnake,200,-30);
    
    document.addEventListener('keydown', (e)=>{
       //Definisco il movimento della div .snake in base al tasto direzionale premuto
        switch(e.key){
            case 'ArrowUp':{
                    snakePoint.dir.Y = 1;
                    snakePoint.dir.X = 0;
                    snakeHead.style.transform = "rotate(180deg)";
                    break;
            }
            case 'ArrowLeft':
                    snakePoint.dir.Y = 0;
                    snakePoint.dir.X = 1;
                    snakeHead.style.transform = "rotate(90deg)";
                    break;

            case 'ArrowDown':
                    snakePoint.dir.Y = -1;
                    snakePoint.dir.X = 0;
                    snakeHead.style.transform = "rotate(0deg)";
                    break;

            case 'ArrowRight':
                    snakePoint.dir.Y = 0;
                    snakePoint.dir.X = -1;
                    snakeHead.style.transform = "rotate(270deg)";
                    break;  

            default: 
                console.log("Nope!!");
                break;
        }
    });
}