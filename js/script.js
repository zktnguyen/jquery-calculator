(function($) {
  var screen = $("#screen"),
      output = $("#output"),
      full = $("#fullOutput"),
      warning = $("#warning"),
      input = $("a");
  
  var outputString = '';
  var calculatedResult = (-Number.MAX_VALUE) * 2;
  var fullOutput = [];
  var curOp = "";
  var operators = ['+', '-', '*', '/'];
  var curIndex = 0;

  function showOutput() {
    if (outputString.length > 12){
      screen.css("font-size", "2.0em");
    }
    if (outputString.length > 24){
      warning.removeClass("hide");
      warning.html("<strong>Warning! </strong> Too many digits.");
      outputString = outputString.substring(0, 24);
    }
    output.html(outputString);
    var str = fullOutput.join(" ");
    full.html(str);
  }

  function clearScreen(option) {
    if (option === "AC"){
      fullOutput = [];
      calculatedResult = (-Number.MAX_VALUE) * 2;
      curOp = '';
      curIndex = 0;
    }
    else if (option === "CE" && outputString === ""){
      fullOutput.pop();
    }
    outputString = "";
    showOutput();
  }

  function evaluate() {
    var operand2 = parseFloat(fullOutput[fullOutput.length - 1]) || parseFloat(fullOutput[fullOutput.length - 2]);
    switch(curOp){
      case '+':
        calculatedResult += operand2;
        break;
      case '-':
        calculatedResult -= operand2;
        break;
      case '*':
        calculatedResult *= operand2;
        break;
      case '/':
        calculatedResult /= operand2;
        break;
    }
    outputString = calculatedResult;
    showOutput();
  }

// [2, +, 3, +, 6, =] = 11
  input.on("click", function(e){
    var target = $(e.target);
    var flag = false;
    if (target.hasClass('num')){
      var val = target.html();
      outputString += val;
      showOutput();
    }
    else if (outputString !== "" || calculatedResult !== Number.NEGATIVE_INFINITY) {
      if (outputString !== ""){
        fullOutput.push(outputString);
        curIndex++;
      }
      var operation = target.attr('id');
      if (fullOutput.length < 2 && calculatedResult === Number.NEGATIVE_INFINITY){
        calculatedResult = parseFloat(outputString);
      }
      if (target.hasClass('ops')){
        if (operators.includes(fullOutput[fullOutput.length - 1])){
          fullOutput.pop();
          curIndex--;
        }
        else if (fullOutput.length >= 3 && curIndex === fullOutput.length){
          evaluate();
        }
        
        fullOutput.push(operation);
        curIndex++;
        showOutput();
        curOp = operation;
      }
      else if (target.hasClass('other')){
        switch(operation){
        case 'AC':
          clearScreen('AC');
          break;
        case 'CE':
          clearScreen('CE');
          break;
        case 'backspace':
          outputString = outputString.substring(0, outputString.length - 1);
          showOutput();
          break;
        case 'toggleNegative':
          toggleNegative();
          break;
        case 'eval':
          if (operators.includes(fullOutput[fullOutput.length - 1]) || outputString === ""){
            var pop = fullOutput.pop();
            outputString = calculatedResult;
            curIndex--;
          }
          else if (fullOutput.length < 2){
            outputString = calculatedResult;
          }
          else if (curIndex === fullOutput.length){
            evaluate();
          }
          fullOutput = [];
          fullOutput.push(calculatedResult.toString());
          curIndex = 1;
          curOp = '';
          break;
        }
        
      }
      showOutput();
      outputString= "";
    }
    else {
      var clear = target.attr('id');
      if (clear === "AC"){
        clearScreen("AC");
      }
      else if (clear === "CE"){
        clearScreen("CE");
      }
    }
  });
  
  
})(jQuery);