var num1 = "";
var num2 = "";
var Oper = "";
const MAX = 10;
var mini = "";
var screen = "";

//KeyBoard Input
document.getElementById("body").onkeyup = function (e) {
  var key = e.key;

  // digits
  if (key < 10 && key >= 0) {
    Click(Number(key));
  }

  //operations
  if (key == "/" || key == "*" || key == "+" || key == "-") {
    Operations(key);
  }

  //equals
  if (key == "=" || key == "Enter") {
    Equal(key);
  }

  //dot
  if (key == ".") {
    Dot(key);
  }

  //Delete
  if (key == "Delete" && e.location == "0") {
    Delete(key);
  }

  //AC
  if (key == "Backspace") {
    AC(key);
  }
};

function Screen() {
  if (Oper == "" || Oper == "=") {
    screen = "" + num1;
  } else {
    screen = "" + num2;
  }
  if (screen == "NaN" || screen == "Infinity") screen = "";

  ShowScreen();
  MiniScreen();
}

function ShowScreen() {
  document.getElementById("screen").innerHTML = screen;
}

function MiniScreen(txt) {
  if (Oper == "" || Oper == "=") {
    mini = "" + num1;
  } else {
    mini = "" + num1 + Oper + num2;
  }
  if (mini == "NaN" || mini == "Infinity") mini = "ERR";

  ShowMiniScreen();
}

function ShowMiniScreen() {
  document.getElementById("mini").innerHTML = mini;
}

function Click(x) {
  if (Oper == "=") {
    num1 = "";
    Oper = "";
  }
  if (Oper == "") {
    if (num1 == "") {
      num1 = AddDigit("", x);
    } else {
      num1 = AddDigit(num1, x);
    }
  } else {
    if (num2 == "") {
      num2 = AddDigit("", x);
    } else {
      num2 = AddDigit(num2, x);
    }
  }
  Screen();
}

function Delete() {
  num1 = "";
  num2 = "";
  Oper = "";
  Screen();
}

function AC() {
  if (num2 == null || num2 == "") {
    if (Oper != "") Oper = "";
    else num1 = ClearLastDigit(num1);
  } else num2 = ClearLastDigit(num2);
  Screen();
}

function SignChange() {
  if (Oper == "" || Oper == "=") {
    switch (num1) {
      case "":
        num1 = "-";
        break;
      case "-":
        num1 = "";
        break;
      case "0.":
        num1 = "-0.";
        break;
      case "-0.":
        num1 = "0.";
        break;
      default:
        num1 = "" + -Number(num1);
    }
  } else {
    if (num2 == "") {
      switch (Oper) {
        case "+":
          Oper = "-";
          break;
        case "-":
          Oper = "+";
          break;
        case "/":
          num2 = "-";
          break;
        case "*":
          num2 = "-";
          break;
      }
    } else {
      num2 == "-" ? (num2 = "") : (num2 = "" + -Number(num2));
    }
  }
  if (Oper == "=") Oper = "";
  Screen();
}
//?
function ClearLastDigit(num) {
  return num.substring(0, num.length - 1);
}

function Operations(op) {
  if (num1 == "") num1 = "0";
  if (num2 != "") Equal();
  Oper = op;
  MiniScreen();
}

function Dot() {
  if (!ContainsDot(num1)) {
    if (Oper == "") {
      num1 = "" + num1 + ".";
    }
  }
  if (!ContainsDot(num2)) {
    if (Oper != "") {
      num2 = "" + num2 + ".";
    }
  }
  Screen();
}

function ContainsDot(num) {
  num = "" + num;
  if (num.includes(".")) return true;
  return false;
}

function AddDigit(num, x) {
  if (num.length < MAX) {
    if (ContainsDot(num)) {
      return "" + num + x;
    } else {
      return "" + Number("" + num + x);
    }
  } else return num;
}

function Equal() {
  var res = "";
  if (Oper != "") {
    switch (Oper) {
      case "+":
        res = Number(num1) + Number(num2);
        break;
      case "-":
        res = Number(num1) - Number(num2);
        break;
      case "/":
        res = Number(num1) / Number(num2);
        break;
      case "*":
        res = Number(num1) * Number(num2);
        break;
    }
  }
  res = "" + res;
  Oper = "=";
  num2 = "";

  if (!(res === "")) {
    if (res.length > MAX) {
      SetError("ERR");
      ShowScreen();
      ShowMiniScreen();
    } else {
      num1 = "" + res;
      Screen();
      MiniScreen();
    }
  }
}

function SetError(txt) {
  mini = txt;
  screen = "";
  num1 = "";
  num2 = "";
  Oper = Oper == "=" ? "=" : "";
}
