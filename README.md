# Snake Game

### Descrizione del Progetto  
Questo progetto è un semplice gioco del serpente (**Snake Game**) sviluppato utilizzando **HTML**, **CSS** e **JavaScript**. Il gioco si svolge in un browser e permette di controllare un serpente che deve raccogliere cibo (mele) all'interno di un'area di gioco. Ogni volta che il serpente mangia una mela, il punteggio aumenta e il serpente cresce di dimensioni.

---

## Funzionalità Principali
- **Movimento del serpente**: L'utente può controllare la direzione del serpente usando i tasti freccia della tastiera.
- **Punteggio**: Il numero di mele raccolte è visualizzato nella parte superiore della finestra di gioco.
- **Crescita del serpente**: Ogni volta che il serpente mangia una mela, cresce di una cella.
- **Collisioni**: Il gioco termina se il serpente colpisce i bordi dell'area di gioco o se stesso.

---

## Struttura del Progetto

### File Principali

1. **index.html**
   - Contiene la struttura base della pagina.
   - Include:
     - Header con il punteggio corrente.
     - L'area di gioco dove si muove il serpente e appare il cibo.

2. **style.css**
   - Definisce lo stile dell'interfaccia, compresi:
     - Area di gioco con un effetto di bordo pulsante.
     - Il serpente e la sua texture visiva.
     - Il cibo rappresentato da un'icona di mela.

3. **game.js**
   - Gestisce la logica del gioco:
     - Movimento del serpente.
     - Generazione casuale del cibo.
     - Rilevamento delle collisioni.
     - Aggiornamento del punteggio.

---

## Come Giocare

1. **Apertura del gioco**:
   - Apri il file `index.html` in un browser compatibile (Chrome, Firefox, Edge).

2. **Controlli**:
   - Usa i **tasti freccia** per muovere il serpente:
     - **Freccia Su**: muove verso l'alto.
     - **Freccia Giù**: muove verso il basso.
     - **Freccia Sinistra**: muove a sinistra.
     - **Freccia Destra**: muove a destra.

3. **Obiettivo**:
   - Mangia le mele per far crescere il serpente.
   - Evita di colpire i bordi o il corpo del serpente.

4. **Fine del gioco**:
   - Il gioco termina se il serpente collide con se stesso o con i bordi.

---

## Personalizzazioni
Puoi modificare il gioco facilmente:
1. **Velocità del serpente**:
   - Modifica l'intervallo di aggiornamento nel file `game.js`.
2. **Dimensioni dell'area di gioco**:
   - Modifica le dimensioni di `#game-area` nel file `style.css`.
3. **Immagini**:
   - Sostituisci le immagini di default nella cartella `IMG` con altre immagini personalizzate.

---

## Requisiti
- Browser moderno (Google Chrome, Firefox, Edge).
- Nessuna dipendenza esterna (il progetto utilizza solo HTML, CSS e JavaScript puri).

---

## Autore
Progetto sviluppato da **[Il tuo Nome]**.

---

## Licenza
Questo progetto è rilasciato sotto la licenza **MIT License**. Sentiti libero di modificarlo, distribuirlo e utilizzarlo.

---
