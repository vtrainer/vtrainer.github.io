let isWordListEmpty = true;
let words = [];
let loadedWord = 0;
let trainingColorsState = {
    "bgColor": "rgb(255, 255, 255)"
}

let isTrainingButtonClickable = false;

document.getElementById('training').style.display = 'none';
document.getElementsByClassName('navbarButton')[0].style.color = '#9D9D9D';

document.getElementById('selectFileButton').style.cursor = 'pointer';
document.getElementById('wordListUL').style.display = 'none';

document.getElementsByClassName('navbarButton')[0].addEventListener('click', () => {    
    document.body.style.backgroundColor = trainingColorsState.bgColor;

    if (isTrainingButtonClickable) {
        document.getElementById('navbarUnderline').style.marginLeft = '0%';
        document.getElementById('navbarUnderline').style.width = '57px';
        document.getElementById('training').style.display = 'flex';
        document.getElementById('wordListContainer').style.display = 'none';

        setTimeout(() => {
            document.getElementById("checkWordInput").classList.remove("animated");
            document.getElementById("checkWordInput").classList.remove("zoomIn");
            document.getElementById("checkWordInput").classList.remove("shake");
            document.getElementById("checkWordInput").classList.remove("fast");

            document.getElementById("trainingWord").classList.remove("animated");
            document.getElementById("trainingWord").classList.remove("zoomIn");
            document.getElementById("trainingWord").classList.remove("fast");
        }, 1000);
    }
    
    if(window.getComputedStyle(document.body, null).getPropertyValue('background-color') != 'rgb(255, 255, 255)' || trainingColorsState.bgColor != 'rgb(255, 255, 255)') {
        changeTColor('#fff');
    }
});

document.getElementsByClassName('navbarButton')[1].addEventListener('click', () => {
    trainingColorsState.bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

    document.getElementById("trainingWord").classList.remove("animated");
    document.getElementById("trainingWord").classList.remove("zoomIn");
    document.getElementById("trainingWord").classList.remove("fast");
    document.getElementById("checkWordInput").classList.remove("animated");
    document.getElementById("checkWordInput").classList.remove("zoomIn");
    document.getElementById("checkWordInput").classList.remove("shake");
    document.getElementById("checkWordInput").classList.remove("fast");

    document.getElementById('navbarUnderline').style.marginLeft = '210%';
    document.getElementById('navbarUnderline').style.width = '64px';
    document.getElementById('training').style.display = 'none';
    document.getElementById('wordListContainer').style.display = 'flex';
    document.body.style.background = '#fff';
    changeTColor('#000');
});

let element = document.getElementById("checkWordInput");

document.getElementById('checkWordButton').addEventListener('click', () => {
    if(String(document.getElementsByName('wordForCheck')[0].value).trim().toLowerCase() == String(loadedWord[1]).trim().toLowerCase()) {
        document.body.style.backgroundColor = '#5EB244';
        document.getElementsByName('wordForCheck')[0].value = '';
        changeTColor('#fff');

        document.getElementById("trainingWord").classList.remove("animated");
        document.getElementById("trainingWord").classList.remove("zoomIn");
        document.getElementById("trainingWord").classList.remove("fast");

        document.getElementById("trainingWord").style.fontSize = '0px';

        setTimeout(() => {
            document.getElementById("trainingWord").style.fontSize = '48px';
            document.getElementById("trainingWord").classList.add("animated");
            document.getElementById("trainingWord").classList.add("zoomIn");
            document.getElementById("trainingWord").classList.add("fast");
        }, 10);

        wordTrainer();
    } else {
        document.body.style.backgroundColor = '#E12E2E';
        document.getElementsByName('wordForCheck')[0].value = '';
        document.getElementById("checkWordInput").classList.remove("animated");
        document.getElementById("checkWordInput").classList.remove("zoomIn");
        document.getElementById("checkWordInput").classList.remove("shake");
        document.getElementById("checkWordInput").classList.remove("fast");
        setTimeout(() => {
            document.getElementById("checkWordInput").classList.add("animated");
            document.getElementById("checkWordInput").classList.add("shake");
            document.getElementById("checkWordInput").classList.add("fast");
        }, 10);  
        changeTColor('#fff');
    }
});

document.getElementsByName('wordForCheck')[0].addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("checkWordButton").click();
    }
});


document.getElementById('checkWordInput').addEventListener('click', () => {
    document.getElementsByName('wordForCheck')[0].focus();
});

document.getElementById('selectFileButton').addEventListener('click', () => {
    document.getElementsByName('selectFileInput')[0].click();
});

document.getElementsByName('selectFileInput')[0].addEventListener('change', handleFileSelect, false);

function handleFileSelect(event){
    if((event.target.files[0].name).split('.').slice(-1)[0] == 'txt') {
        const reader = new FileReader()
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0])
    } else {
        document.getElementById("messageWL").innerHTML = "You must select a text file";
    }
  }
  
  function handleFileLoad(event){
    let result = event.target.result;

    if(result == "") {
        updateWordList(false);
    } else {
        words = [];

        let processedResult = String(result).split(',');

        for(let i = 0; i < processedResult.length; i++) {
            words.push(processedResult[i].replace(/(\r\n|\n|\r)/gm, "").split('|'));
        }

        if(words[0].length < 2 || words[0].length > 2) {
            updateWordList(false);
        } else {
            updateWordList(true);
        }
    }
  }

function updateWordList(isEmpty) {
    if(isEmpty) {
        isWordListEmpty = true;

        document.getElementsByName('selectFileInput')[0].value = null;

        document.getElementById('wordListUL').style.display = 'block';
        document.getElementById('messageWL').style.color = '#5EB244';
        document.getElementById('messageWL').innerHTML = 'Word list loaded successfully!';
        isTrainingButtonClickable = true;
        document.getElementsByClassName('navbarButton')[0].style.color = '#000';
        trainingColorsState.bgColor = 'rgb(255, 255, 255)';
        wordTrainer();

    } else {
        isWordListEmpty = false;

        document.getElementsByName('selectFileInput')[0].value = null;
        document.getElementById('messageWL').style.color = '#FF3A3A';
        document.getElementById('messageWL').innerHTML = 'The list of words is empty!';
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function wordTrainer() {
    let rand = randomInteger(0, words.length - 1);
    loadedWord =  words[rand];
    document.getElementById('trainingWord').innerHTML = loadedWord[0];
}

function changeTColor(color) {
    document.getElementById('trainingWord').style.color = color;
    document.getElementsByClassName('navbarButton')[0].style.color = color;
    document.getElementsByClassName('navbarButton')[1].style.color = color;
    document.getElementById('navbarUnderline').style.background = color;
}