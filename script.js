let played = false;
let user = "";

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

const com = document.getElementById("com");
const icons = document.getElementById("com").getElementsByTagName("span");

const play = document.getElementById("play");

play.disabled = true;
play.style.opacity = "0.5";

//const box__shadow = document.getElementById("box__shadow");

let victories = 0,
  draws = 0,
  defeats = 0;

// Puntuación para orientación vertical
const text__victories = document.getElementById("score__victories");
const text__draws = document.getElementById("score__draws");
const text__defeats = document.getElementById("score__defeats");

// Puntuación para orientación horizontal
const text__victoriesMP = document.getElementById("score__victoriesMP");
const text__drawsMP = document.getElementById("score__drawsMP");
const text__defeatsMP = document.getElementById("score__defeatsMP");

const computer = ["r", "p", "s"];

// 1ª función - controlar la elección y lógica de los botones

function choose(btnEle, evt) {
  // btnEle => El botón | evt => evento/acción => 'click'

  if (btnEle === rock) {
    user = "r";
    btnEle.classList.add("btn__active");

    paper.classList.remove("btn__active");
    scissors.classList.remove("btn__active");
  } else if (btnEle === paper) {
    user = "p";

    btnEle.classList.add("btn__active");

    rock.classList.remove("btn__active");
    scissors.classList.remove("btn__active");
  } else if (btnEle === scissors) {
    user = "s";

    btnEle.classList.add("btn__active");

    paper.classList.remove("btn__active");
    rock.classList.remove("btn__active");
  }

  play.disabled = false;
  play.style.opacity = "1";
}

// 2ª Función - Control de flujo del juego (CPU aleatoria, marcador de VDE (victorias, derrotas, empates, etc.))

function play__game() {
  if (!played) {
    // Si todavia no hemos jugado ...
    let random__number = Math.round(Math.random() * (2 - 0) + 0);

    //const computer = ["r", "p", "s"];

    switch (random__number) {
      case 0:
        computer[0];
        com.classList.toggle("flip-horizontal-bottom");
        setTimeout(() => {
          showFigures();
        }, 1000);
        break;
      case 1:
        computer[1];
        com.classList.toggle("flip-horizontal-bottom");
        setTimeout(() => {
          showFigures();
        }, 1000);
        break;
      case 2:
        computer[2];
        com.classList.toggle("flip-horizontal-bottom");
        setTimeout(() => {
          showFigures();
        }, 1000);
        break;
      default:
        alert("Por favor, reinicia el juego");
    }

    if (user === computer[random__number]) {
      draws++;
      setTimeout(() => {
        (text__draws.innerHTML = draws),
          (text__drawsMP.innerHTML = String.fromCodePoint(0x1f611) + draws);
      }, 1000);
      show__drwMessage();
      played = true;
      return; //No continua comprovando
    }

    if (winner(user, computer[random__number])) {
      victories++;
      setTimeout(() => {
        (text__victories.innerHTML = victories),
          (text__victoriesMP.innerHTML =
            String.fromCodePoint(0x1f604) + victories);
      }, 1000);
      show__vMessage();
      played = true;
      return; //No continua comprovando
    }

    defeats++;
    setTimeout(() => {
      (text__defeats.innerHTML = defeats),
        (text__defeatsMP.innerHTML = String.fromCodePoint(0x1f641) + defeats);
    }, 1000);
    show__dftMessage();
    played = true;
  } else {
    // Si ya hemos jugado
    show__message();
  }
}

// 3ª Función - comprovar si hemos ganado, perdido o empatado

function winner(player, opponent) {
  if (
    (player === "r" && opponent === "s") ||
    (player === "s" && opponent === "p") ||
    (player === "p" && opponent === "r")
  ) {
    return true;

    //Si resultas ganador, devuelve un valor true para cumplir el #2 condicional
  }
}

// 4ª Función - Reiniciar el juego

function reboot(activeElements) {
  com.classList.toggle("flip-horizontal-bottom");

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.add("dispNone");
  }

  played = false;
  play.disabled = true;
  play.style.opacity = "0.5";

  rock.classList.remove("btn__active");
  paper.classList.remove("btn__active");
  scissors.classList.remove("btn__active");
}

// 5ª Función - Mostrar mensaje para reiniciar el juego

function show__message() {
  swal({
    title: "Alto!",
    text: "Ya has jugado una partida, por favor reinicia el juego",
    icon: "error",
    button: "Aceptar",
  });
}

function show__vMessage() {
  swal({
    title: "¡Victoria!",
    text: "¡Has ganado!, pulsa el botón para cerrar",
    // icon: "success",
    icon_custom: "<span>&#128577;</span>",
    button: "Aceptar",
  });
}

function show__drwMessage() {
  swal({
    title: "Empate",
    text: "Habéis empatado, pulsa el botón para cerrar",
    icon: "warning",
    button: "Aceptar",
  });
}

function show__dftMessage() {
  swal({
    title: "Derrota...",
    text: "Has perdido, pulsa el botón para cerrar",
    icon: "error",
    button: "Aceptar",
  });
}

// 6ª Función - Mostrar las figuras según las reglas - HAY QUE REVISAR!!!

function showFigures() {
  for (let i = 0; i < icons.length; i++) {
    if (computer[0]) {
      icons[0].classList.toggle("dispNone");
      break;
    } else if (computer[1]) {
      icons[1].classList.toggle("dispNone");
      break;
    } else {
      icons[2].classList.toggle("dispNone");
      break;
    }
  }
}
