(function($) {
  var screen = $("#screen"),
      output = $("#output"),
      input = $("a");
  var outputString = "";
  
  function showOutput(){
    checkOutput();
    output.html(outputString);
  }
  
  function checkOutput(){
    if (outputString.length > 12){
      screen.css("font-size", "2.0em");
    }
    if (outputString.length > 24){
      screen.css("font-size", "1.0em");
    }
  }
  
  input.on("click",function(e){
    var val = $(e.target).html();
    outputString += val;
    showOutput();
  });
  
  
})(jQuery);