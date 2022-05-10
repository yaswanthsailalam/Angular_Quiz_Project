
let fetchBtn = document.getElementById("start-button");
document.getElementById("loader-view").style.display = "none"
let submitBtn = document.getElementById("submit-button")
submitBtn.setAttribute("disabled", "true")
fetchBtn.addEventListener("click", buttoneventlistener)

function optionEventListerner(e) {
    let submitBtn = document.getElementById("submit-button")
    submitBtn.disabled = false
    let children = document.getElementById("options-container").children
    for (child of children) {
        child.classList.remove('user-answer')
        child.classList.remove('wrong-answer')
        child.classList.remove('correct-answer')
    }
    e.target.classList.add('user-answer')
}
var completeloadGlobal;
var x=0;

async function buttoneventlistener() {

    document.getElementById("start-button").style.display = "none"
    document.getElementById("pre-quiz-instructions").style.display = "none";
    document.getElementById("loader-view").style.display = "block"

    let questionid = document.getElementById('current-question-id').value
    let completeload = await fetch(`./data/db.json`)
    completeload = await completeload.json()


    document.getElementById("loader-view").style.display = "none"
    document.getElementById("quiz").style.display = "block";
    document.getElementById('question').innerText = completeload.data[x].question;
    document.getElementById('current-question-id').value = completeload.data[x].id;


    let optionsContainer = document.getElementById("options-container")
    let options = completeload.data[x].options
    options.map((option) => {
        let optionHtml = document.createElement("div")
        optionHtml.addEventListener("click", optionEventListerner)
        optionHtml.innerText = option
        optionsContainer.appendChild(optionHtml)
    })
    completeloadGlobal = JSON.parse(JSON.stringify(completeload))


}

async function buttoneventlistener2() {
x= x+1;
    document.getElementById("start-button").style.display = "none"
    document.getElementById("pre-quiz-instructions").style.display = "none";
    document.getElementById("loader-view").style.display = "block"

    let questionid = document.getElementById('current-question-id').value
    let completeload = await fetch(`./data/db.json`)
    completeload = await completeload.json()

    if(completeload.data.length == x){
        alert('Questions completed');
        return;

    }
    document.getElementById("loader-view").style.display = "none"
    document.getElementById("quiz").style.display = "block";
    document.getElementById('question').innerText = completeload.data[x].question;
    document.getElementById('current-question-id').value = completeload.data[x].id;


    let optionsContainer = document.getElementById("options-container")
    let options = completeload.data[x].options
    optionsContainer.innerHTML = "";
    options.map((option) => {
        let optionHtml = document.createElement("div")
        optionHtml.addEventListener("click", optionEventListerner)
        optionHtml.innerText = option
        optionsContainer.appendChild(optionHtml)
    })
    completeloadGlobal = JSON.parse(JSON.stringify(completeload))


}


let data, selectedOption;
window.addEventListener('load', onChallengeLoad);
document.getElementById("loader-view").style.display = "none"
document.getElementById('start-button').addEventListener('click', onStartTest);
// document.getElementById('options-container').addEventListener('click', selectAnswer);
document.getElementById('submit-button').addEventListener('click', onSubmit);

function onChallengeLoad() {
    //document.getElementById('loader-view').style.display='none';
    document.getElementById('quiz').style.display = 'none';
}

function onStartTest() {
    document.getElementById('loader-view').style.display = 'block';
    document.getElementById('pre-quiz-instructions').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('submit-button').setAttribute('disabled', true);
    getQuestion();
}

function onSubmit() {
    let id = document.getElementById('current-question-id').value;
    completeloadGlobal;
    for (var k = 0; k < completeloadGlobal.data.length; k++) {
        if (completeloadGlobal.data[k].id == id) {
            let children = document.getElementById("options-container").children
            for (var m = 0; m < children.length; m++) {
                var child = children[m];
                if (child.classList.contains('user-answer') && m == completeloadGlobal.data[k].answer) {
                    child.classList.add('correct-answer')
                } else if (child.classList.contains('user-answer') && m != completeloadGlobal.data[k].answer) {
                    child.classList.add('wrong-answer')
                } else {

                }
            }
        }
    }
   setTimeout(buttoneventlistener2,500);;

}
function getQuestion() {
    let id = document.getElementById('current-question-id').value
}