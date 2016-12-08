'use strict';
$(function(){
  // cache all of the selectors
  var screen = $("#screen"),
    inputs = $(".inputs"),
    clear = $("#clear");
  var operation = '';
  var stringNum = '';
  var calculatedResult = 0;
  var operand2 = 0;
  var flag = false;
  inputs.on('click', function(e){
    var target = $(e.target);
    console.log(target);
    if (target.attr("class") !== "ops" && target.attr("class") !== "other"){
      if (flag){
        flag = false;
        stringNum = '';
      }
      clear.html('C');
      stringNum += target.html();
      screen.html(stringNum);
    }

    else{
        var op = target.html();
        calculate(op);
    }
  });

  function calculate(op){
    if (op === '+' || op === "-" || op === "X" || op === '/'){
      if (calculatedResult === 0){
        operation = op;
        calculatedResult = parseFloat(stringNum);
      }
      else {
        evaluate();
        operation = op;
      }
    }
    else {
      switch(op){
        case 'AC':
          clearScreen('AC');
          break;
        case 'C':
          clearScreen('C');
          clear.html('AC');
          break;
        case '+/-':
          toggleNegative();
          break;
        case '%':
          percentage();
          break;
        case '=':
          evaluate();
          break;
      }
    }
    flag = true;
  }
  function evaluate(){
    operand2 = parseFloat(stringNum);
    switch(operation){
      case '+':
        calculatedResult += operand2;
        break;
      case '-':
        calculatedResult -= operand2;
        break;
      case 'X':
        calculatedResult *= operand2;
        break;
      case '/':
        calculatedResult /= operand2;
        break;
    }
    operation = '';
    screen.html(calculatedResult);
  }
  function toggleNegative(){
    calculatedResult = calculatedResult * -1;
    screen.html(calculatedResult);
  }

  function percentage(){
    calculatedResult = calculatedResult * 0.01;
    screen.html(calculatedResult);
  }

  function clearScreen(option){
    if(option === 'AC'){
      stringNum = '';
      operation = '';
      calculatedResult = 0;
    }
    else {
      stringNum = '';
      operation = '';
    }
    screen.html(0);
  }

});
