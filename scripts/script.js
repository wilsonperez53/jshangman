var rand = 0;
var word = "";
var contadorEquivocaciones = 0;
var numRight = 0;
var phraseLength = 0;
var numChar = 0;

var bancoDePalabras = ["casa", "gato", "tela", "mono", "pelo",
    "padre", "madre", "hacer", "beber", "comer",
    "corona", "dichos", "carros", "cuadro", "sillas",
    "noticia", "computadora", "javascript", "teclado", "plantas"];

function inicio() {
    rand = Math.floor(Math.random() * bancoDePalabras.length);
    word = bancoDePalabras[rand];

    juego();
}

function countChars(countfrom, displayto) {
    var len = document.getElementById(countfrom).value.length;
    document.getElementById(displayto).innerHTML = len;
}

function readText() {
    word = document.getElementById('input').value;
    juego();
}

function juego() {
    var x = word.length;

    var y = x - 1;
    var spaces = 0;
    var validChar = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "?", "!", ",", ".", "-", "'");
    for (z = 0; z < word.length; z++) {
        var letter = word.substring(y, x);
        if (validChar.indexOf(letter) > -1) {
            x--;
            y--;
        }
        /* else {
             alert("Please remove any special characters.");
             return;
         }*/
    }
    x = word.length;
    y = x - 1;
    while (x > 0) {
        numChar++;
        var letter = word.substring(y, x);
        if (letter === " ") {
            document.getElementById('letter' + x).innerHTML = "&nbsp;";
            document.getElementById('letter' + x).style.visibility = "hidden";
            document.getElementById('letter' + x).style.display = "block";
            document.getElementById('underline' + x).style.display = "block";
            spaces++;
        }
        else if (letter === "?" || letter === "!" || letter === "," || letter === "." || letter === "-" || letter === "'") {
            document.getElementById('letter' + x).innerHTML = letter;
            document.getElementById('letter' + x).style.display = "block";
            document.getElementById('underline' + x).style.display = "block";
            spaces++;
        }
        else {
            document.getElementById('letter' + x).innerHTML = letter;
            document.getElementById('letter' + x).style.visibility = "hidden";
            document.getElementById('underline' + x).style.display = "block";
            document.getElementById('underline' + x).style.borderBottom = "3px solid black";
        }
        x--;
        y--;
    }
    phraseLength = word.length - spaces;
    document.getElementById('gamePage').style.display = "block";
    splitWords();
    draw();
}

function draw() {
    var ctx = document.getElementById("hangman").getContext('2d');
    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.fillRect(0, 0, 300, 300);
    ctx.beginPath(); //vertical bar
    ctx.moveTo(50, 270);
    ctx.lineTo(50, 25);
    ctx.stroke();
    ctx.beginPath(); //vertical bar long piece
    ctx.moveTo(65, 270);
    ctx.lineTo(65, 85);
    ctx.stroke();
    ctx.beginPath(); //vertical bar short piece
    ctx.moveTo(65, 64);
    ctx.lineTo(65, 40);
    ctx.stroke();
    ctx.beginPath(); //horizontal bar
    ctx.moveTo(49, 25);
    ctx.lineTo(175, 25);
    ctx.stroke();
    ctx.beginPath(); //horizontal bar short piece
    ctx.moveTo(49, 40);
    ctx.lineTo(86, 40);
    ctx.stroke();
    ctx.beginPath(); //horizontal bar long piece
    ctx.moveTo(106, 40);
    ctx.lineTo(175, 40);
    ctx.stroke();
    ctx.beginPath(); //small vertical bar
    ctx.moveTo(173, 25);
    ctx.lineTo(173, 40);
    ctx.stroke();
    ctx.beginPath(); //cross bar
    ctx.moveTo(50, 80);
    ctx.lineTo(100, 25);
    ctx.stroke();
    ctx.beginPath(); //cross bar
    ctx.moveTo(60, 90);
    ctx.lineTo(111, 35);
    ctx.stroke();
    ctx.beginPath(); //cross bar
    ctx.moveTo(50, 80);
    ctx.lineTo(60, 90);
    ctx.stroke();
    ctx.beginPath(); //cross bar
    ctx.moveTo(100, 25);
    ctx.lineTo(111, 35);
    ctx.stroke();
    ctx.beginPath(); //ground
    ctx.moveTo(35, 270);
    ctx.lineTo(265, 270);
    ctx.stroke();
    ctx.beginPath(); //noose
    ctx.moveTo(150, 40);
    ctx.lineTo(150, 80);
    ctx.stroke();

}

function splitWords() {
    var placeKeep = 0;
    var countBack = 16;
    if (numChar > 15) {
        while (countBack > 1) {
            if (document.getElementById('letter16').innerHTML == "&nbsp;") {
                document.getElementById('underline16').style.width = "0px";
                document.getElementById('underline16').style.marginRight = "0px";
            }
            if (document.getElementById('letter' + countBack).innerHTML == "&nbsp;") {
                document.getElementById('underline' + countBack).style.width = (document.getElementById('underline1').offsetWidth) * (16 - countBack) + "px";
                placeKeep = countBack;
                countBack = 0;
            }
            countBack--;
        }
    }
    for (x = 0; x < 8; x++) {
        countBack = 15 + placeKeep;
        if (numChar > countBack) {
            while (countBack > 1) {
                if (document.getElementById('letter' + countBack).innerHTML == "&nbsp;") {
                    document.getElementById('underline' + countBack).style.width = (document.getElementById('underline1').offsetWidth * ((16 + placeKeep) - countBack)) + "px";
                    placeKeep = countBack;
                    countBack = 0;
                }
                countBack--;
            }
        }
    }

}

function guessLetter() {
    var correct = 0;
    var target = event.target || event.srcElement;
    target.style.visibility = "hidden";
    var lower = target.id;
    var upper = document.getElementById(lower).getAttribute('value');
    var results = document.getElementById('results');
    var ul1 = document.getElementById('underline1').offsetWidth;
    for (a = 1; a < 31; a++) {
        if (document.getElementById('letter' + a).innerHTML === upper || document.getElementById('letter' + a).innerHTML === lower) {
            document.getElementById('letter' + a).style.visibility = "visible";
            correct++;
            numRight++;
        }
    }
    if (correct == 0) {
        contadorEquivocaciones++;
        hang();
    }
    if (contadorEquivocaciones == 6) {
        results.style.visibility = "visible";
        results.style.color = "red";
        results.innerHTML = "Estas a punto de perder!";
        if (ul1 == 50) {
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if (ul1 == 28) {
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if (ul1 == 18) {
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    if (contadorEquivocaciones == 7) {
        results.innerHTML = "Perdiste!";
        if (ul1 == 50) {
            results.style.lineHeight = "40px";
        }
        if (ul1 == 28) {
            results.style.lineHeight = "25px";
        }
        if (ul1 == 18) {
            results.style.lineHeight = "20px";
        }
    }
    if (numRight == phraseLength) {
        ganar();
    }
}

function ganar() {
    var ul1 = document.getElementById('underline1').offsetWidth;
    var again = document.getElementById('again');
    var results = document.getElementById('results');
    results.style.visibility = "visible";
    results.style.color = "#00b100";
    /*if (contadorEquivocaciones > 6) {
        results.innerHTML = "Ya era hora de adivinar";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if (ul1 == 50) {
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if (ul1 == 28) {
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if (ul1 == 18) {
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    else {*/
    results.innerHTML = "Ganaste!";
    document.getElementById('letterBank').style.display = "none";
    again.style.display = "block";
    document.getElementById('home').style.display = "block";
    document.getElementById('vidSent').style.display = "block";
    if (ul1 == 50) {
        again.style.marginTop = "75px";
        results.style.marginTop = "75px";
        results.style.fontSize = "200px";
    }
    if (ul1 == 28) {
        again.style.marginTop = "50px";
        results.style.marginTop = "40px";
        results.style.fontSize = "100px";
    }
    if (ul1 == 18) {
        again.style.marginTop = "40px";
        results.style.marginTop = "15px";
        results.style.fontSize = "75px";
    }
}
//}

function hang() {
    var ctx = document.getElementById("hangman").getContext('2d');
    if (contadorEquivocaciones == 1) {
        var background = new Image();
        background.src = "http://i.imgur.com/yf6d9SX.jpg";
        background.onload = function () {
            ctx.drawImage(background, 50, 100, 20, 0);
        }
    }
    if (contadorEquivocaciones == 2) {
        /* ctx.beginPath(); //body
         ctx.moveTo(150, 120);
         ctx.lineTo(150, 190);
         ctx.stroke();*/
    }
    if (contadorEquivocaciones == 3) {
        /* ctx.fillStyle = "white";
         ctx.fillRect(138, 102, 24, 12); //cover mouth
         ctx.beginPath(); //straight mouth
         ctx.moveTo(140, 108);
         ctx.lineTo(160, 108);
         ctx.stroke();
         ctx.beginPath(); //right arm
         ctx.moveTo(150, 135);
         ctx.lineTo(180, 160);
         ctx.stroke();*/
    }
    if (contadorEquivocaciones == 4) {
        ctx.beginPath(); //left arm
        ctx.moveTo(150, 135);
        ctx.lineTo(120, 160);
        ctx.stroke();
    }
    if (contadorEquivocaciones == 5) {
        ctx.fillRect(138, 102, 24, 12); //cover mouth
        ctx.beginPath(); //sad mouth
        ctx.arc(150, 112, 9, 0, Math.PI, true);
        ctx.stroke();
        ctx.beginPath(); //right leg
        ctx.moveTo(149, 188);
        ctx.lineTo(180, 230);
        ctx.stroke();
    }
    if (contadorEquivocaciones == 6) {
        ctx.beginPath(); //left leg
        ctx.moveTo(151, 188);
        ctx.lineTo(120, 230);
        ctx.stroke();
    }
    if (contadorEquivocaciones == 7) {
        ctx.fillRect(138, 90, 24, 24); //cover face
        ctx.fillRect(118, 121.2, 70, 120); //cover body
        ctx.beginPath(); //straight mouth
        ctx.moveTo(140, 108);
        ctx.lineTo(160, 108);
        ctx.stroke();
        ctx.beginPath(); //body
        ctx.moveTo(150, 135);
        ctx.lineTo(150, 205);
        ctx.stroke();
        ctx.beginPath(); //right arm
        ctx.moveTo(150, 150);
        ctx.lineTo(180, 175);
        ctx.stroke();
        ctx.beginPath(); //left arm
        ctx.moveTo(150, 150);
        ctx.lineTo(120, 175);
        ctx.stroke();
        ctx.beginPath(); //right leg
        ctx.moveTo(149, 203);
        ctx.lineTo(180, 245);
        ctx.stroke();
        ctx.beginPath(); //left leg
        ctx.moveTo(151, 203);
        ctx.lineTo(120, 245);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath(); //left eye
        ctx.moveTo(140, 93);
        ctx.lineTo(146, 98);
        ctx.stroke();
        ctx.moveTo(140, 98);
        ctx.lineTo(146, 93);
        ctx.stroke();
        ctx.beginPath(); //right eye
        ctx.moveTo(154, 98);
        ctx.lineTo(160, 93);
        ctx.stroke();
        ctx.moveTo(154, 93);
        ctx.lineTo(160, 98);
        ctx.stroke();
    }
}
