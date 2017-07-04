(function($) {
  var screen = $("#screen"),
      output = $("#output"),
      full = $("#fullOutput"),
      input = $("a");
  var fullOutput = [];
  var outputString = "";
  
  function showFullOutput() {
    var str = fullOutput.join(" ");
    full.html(str);
  }
  
  function showOutput() {
    checkOutput();
    output.html(outputString);
  }
  
  function checkOutput() {
    if (outputString.length > 12){
      screen.css("font-size", "2.0em");
    }
    if (outputString.length > 24){
      screen.css("font-size", "1.3em");
    }
  }
  
  function clearScreen(option) {
    outputString = "";
    if (option === "AC"){
      fullOutput = [];
    }
    else {
      fullOutput.pop();
    }
    
  }

  function toggleNegative() {

  }

  function evaluate() {

  }

  function calculate() {
    
  }

  input.on("click",function(e){
    var target = $(e.target);
    if (target.hasClass('num')){
      var val = target.html();
      outputString += val;
    }
    else if (target.hasClass('ops')) {
      var op = target.html();
      fullOutput.push(output.html());
      calculate(op);
    }

    else if (target.hasClass('other')) {
      var op = target.attr('id');
      switch(op){
        case 'AC':
          clearScreen('AC');
          break;
        case 'CE':
          clearScreen('CE');
          break;
        case 'backspace':
          outputString = outputString.substring(0,  outputString.length - 1);
          break;
        case '+/-':
          toggleNegative();
          break;
        case '=':
          evaluate();
          break;
      }
    }
    showOutput();
    showFullOutput();
  });
  
  
})(jQuery);