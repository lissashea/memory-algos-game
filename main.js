const codeLines = [
  "function mergeArrays(leftSubArray, rightSubArray) {",
  "  let array = [];",
  "  while (leftSubArray.length && rightSubArray.length) {",
  "    if (leftSubArray[0] < rightSubArray[0]) {",
  "      array.push(leftSubArray.shift());",
  "    } else {",
  "      array.push(rightSubArray.shift());",
  "    }",
  "  }",
  "  return [ ...array, ...leftSubArray, ...rightSubArray ];",
  "}",
  "",
  "function mergeSort(unsortedArray) {",
  "  const middleIndex = unsortedArray.length / 2;",
  "  if(unsortedArray.length < 2) {",
  "    return unsortedArray;",
  "  }",
  "  const leftSubArray = unsortedArray.splice(0, middleIndex);",
  "  return mergeArrays(mergeSort(leftSubArray), mergeSort(unsortedArray));",
  "}",
  "",
  "const unsortedArray = [39, 28, 44, 4, 10, 83, 11];",
];

// Rest of the code remains the same...

const form = document.querySelector("form");
const codeInput = document.querySelector("#code-input");
const submitButton = document.querySelector("#submit-button");
const codeBlock = document.querySelector(".code-block");
const startButton = document.querySelector("#start-button");
const enteredCode = document.querySelector(".entered-code pre");


let currentLine = 0;
let answerLines = [];
let currentAnswerLine = 0;
let isEnteringAnswer = false;

function showLine() {
  if (currentLine < codeLines.length) {
    codeBlock.innerHTML += codeLines[currentLine] + "<br />";
    currentLine++;
    setTimeout(() => {
      codeBlock.innerHTML = "";
      showLine();
    }, 2000);
  }
}

// function showLine() {
//   if (currentLine < codeLines.length) {
//     codeBlock.innerHTML += codeLines[currentLine] + "<br />";
//     currentLine++;
//     setTimeout(() => {
//       codeBlock.innerHTML = "";
//       showLine();
//     }, 2000);
//   } else {
//     codeBlock.innerHTML = "<pre>" + codeLines.join("\n") + "</pre>";
//   }
// }

// function showAnswer() {
//   if (currentAnswerLine < answerLines.length) {
//     codeBlock.innerHTML += answerLines[currentAnswerLine] + "<br />";
//     currentAnswerLine++;
//     setTimeout(() => {
//       codeBlock.innerHTML = "";
//       showAnswer();
//     }, 2000);
//   } else {
//     currentLine = 0;
//     currentAnswerLine = 0;
//     answerLines = [];
//     let completedCode = "";
//     for (let i = 0; i < codeLines.length; i++) {
//       if (i <= currentLine) {
//         completedCode += codeLines[i] + "<br />";
//       } else {
//         completedCode += "<span style='color: red;'>[missing code]</span><br />";
//       }
//     }
//     codeBlock.innerHTML = completedCode;
//     setTimeout(() => {
//       codeBlock.innerHTML = "";
//     }, 5000);
//   }
// }

function showAnswer() {
  if (currentAnswerLine < answerLines.length) {
    codeBlock.innerHTML += answerLines[currentAnswerLine] + "<br />";
    currentAnswerLine++;
    setTimeout(() => {
      codeBlock.innerHTML = "";
      showAnswer();
    }, 5000);
  } else {
    currentLine = 0;
    currentAnswerLine = 0;
    answerLines = [];
    let completedCode = "";
    for (let i = 0; i < codeLines.length; i++) {
      if (i <= currentLine) {
        completedCode += codeLines[i] + "<br />";
      } else {
        completedCode += "<span style='color: red;'>[missing code]</span><br />";
      }
    }
    codeBlock.innerHTML = completedCode;
    setTimeout(() => {
      codeBlock.innerHTML = "";
      showLine();
    }, 10000);
  }
}

startButton.addEventListener("click", (e) => {
  e.preventDefault();
  startButton.style.display = "none";
  showLine();
});

codeInput.addEventListener("input", () => {
  enteredCode.innerText = codeInput.value;
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isEnteringAnswer) {
    answerLines.push(codeInput.value.trim());
    codeInput.value = "";
    if (codeLines.join("").startsWith(answerLines.join("").trim())) {
      if (answerLines.join("").toLowerCase().trim() === codeLines.join("").toLowerCase().trim()) {
        showAnswer();
    } else {
        codeBlock.innerHTML = "<pre>" + answerLines.join("\n") + "</pre>";
        setTimeout(() => {
          codeBlock.innerHTML = "";
          showLine();
        }, 2000);
      }
    } else {
      codeBlock.innerHTML = "<pre>" + answerLines.join("\n") + "</pre>";
      setTimeout(() => {
        codeBlock.innerHTML = "";
      }, 2000);
    }
    isEnteringAnswer = false;
  } else {
    isEnteringAnswer = true;
  }
});

codeInput.addEventListener("blur", () => {
  codeBlock.innerHTML = "";
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.dispatchEvent(new Event("submit"));
});

const resetButton = document.querySelector("#reset-button");

resetButton.addEventListener("click", () => {
  currentLine = 0;
  answerLines = [];
  currentAnswerLine = 0;
  isEnteringAnswer = false;
  enteredCode.innerText = "";
  codeInput.value = "";
  codeBlock.innerHTML = "";
  startButton.style.display = "block";
});
