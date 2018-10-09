var score;
var bestStreak = 0;
var curStreak = 0;
var corrects = 0;
var rolls = 0;

var throwDice = function() {
    score = 0;
    for (var i = 1; i <= 5; ++i) {
        var face;
        face = Math.ceil(Math.random() * 6);
        document.getElementById("place" + i).src = "./assets/images/dice " + face + ".png";
        document.getElementById("place" + i).alt = face;
        if (face === 3) score += 2;
        if (face === 5) score += 4;
    }
    document.getElementById("result").innerHTML = "";
    document.getElementById("guessbox").value = "";
    document.getElementById("middle").innerHTML = "Roll #" + (++rolls);
    document.getElementById("guess-button").disabled = false;
}

var isNum = function(str) {
    for (var i = 0; i < str.length; i++) {
        var ch = str.substring(i, i + 1)
        if (ch < "0" || "9" < ch)
            return false;
    }
    return true;
}

var checkGuess = function() {
    var guess = document.getElementById("guessbox").value.trim();
    if (isNaN(guess) || guess == "") {
        /* invalid guess */
        document.getElementById("result").innerHTML = "Please enter a numeral.";
    } else if (score == guess) {
        /* correct guess */
        document.getElementById("guess-button").disabled = true;
        bestStreak = Math.max(++curStreak, bestStreak);
        document.getElementById("result").innerHTML = "Correct!";
        document.getElementById("left").innerHTML = "Best Run: " + bestStreak;
        document.getElementById("right").innerHTML = "# Correct: " + (++corrects);
        if (curStreak === 4)
            document.getElementById("result").innerHTML += "<br\/> You're getting the hang of it!";
        if (curStreak === 6)
            document.getElementById("result").innerHTML += "<br\/> Congratulations! We have another <em>Potentate of the Rose<\/em>!<br\/>However, you must solemnly swear not to tell the secret to anyone! Only those who have solved it for themselves can know.";
    } else {
        /* wrong guess */
        document.getElementById("guess-button").disabled = true;
        document.getElementById("result").innerHTML = "Wrong. The answer is " + score + ".";
        if (guess % 2 == 1) document.getElementById("result").innerHTML += "<br\/> The score will always be an <em>even<\/em> number."
        curStreak = 0;
    }
}