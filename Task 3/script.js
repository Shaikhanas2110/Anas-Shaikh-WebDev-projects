document.addEventListener("DOMContentLoaded", (e) => {
  let display = document.getElementById("displayBox");
  let buttons = document.querySelectorAll("button");
  let btnArray = Array.from(buttons);
  let str = "";
  const maxNum = 11;

  function updateDisplay() {
    display.placeholder = str;
  }

  btnArray.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let btnText = e.target.innerHTML;

      if (btnText == "DLT") {
        str = str.substring(0, str.length - 1);
        updateDisplay();
      } else if (btnText == "AC") {
        str = '';
        updateDisplay();
      } else if (btnText == "=") {
        str = eval(str).toString();
        updateDisplay();
      } else {
        if (str.length < maxNum) {
          str += btnText;
          updateDisplay();
        }
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key >= "0" && key <= "9") {
      if (str.length < maxNum) {
        str += key;
        updateDisplay();
      }
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      str += key;
      updateDisplay();
    } else if (key === "Enter") {
      str = eval(str).toString();
      updateDisplay();
    } else if (key === "Backspace") {
      str = str.substring(0, str.length - 1);
      updateDisplay();
    } else if (key === "Escape") {
      str = '';
      updateDisplay();
    } else if (key === ".") {
      str += key;
      updateDisplay();
    }
  });
});
