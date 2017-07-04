(function($) {
  var screen = $("#screen"),
      output = $("#output"),
      full = $("#fullOutput"),
      warning = $("#warning"),
      input = $("a");
  
  var outputString = '';
  var calculatedResult = 0;
  var fullOutput = [];
  var curOp = "";



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
      cachedOperations = [];
    }
    else if (option === "CE" && outputString === ""){
      fullOutput.pop();
    }
    outputString = "";
    showOutput();
  }

  function evaluate() {

  }

  input.on("click", function(e){
    var target = $(e.target);
    if (target.hasClass('num')){
      var val = target.html();
      outputString += val;
      showOutput();
    }
    else if (outputString !== "") {
      fullOutput.push(outputString);
      var operation = target.attr('id');
      if (fullOutput.length < 2){
        calculatedResult = parseFloat(outputString);
      }
      if (target.hasClass('ops')){
        fullOutput.push(operation);
        showOutput();
        outputString = "";
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