$(document).ready(function(){
  
  
  // open a random wikipedia page 
  $("#getRandom").on("click", function() {
    
        window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
    
  })
  
  // use clear variable to check if articles need to be removed from page when new search is made
  var clear = 0;
  
  $(".go").on("click", function() {
    
    // check if articles need to be removed
    if (clear === 1) {
      $("#articles").empty();
      clear = 0;
    }
    
    // store input value and us it to get json from wikipedia's api
    var topic = $("#search").val();
   
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=allpages&gapfrom="+topic+"&gaplimit=10&origin=*", function(a) {
      
    // json's query property has a pages key wich contains an object for each article.       
      var ids = a.query.pages;  
      var pages = Object.keys(ids);
     
    // for each article object, use its numeric key and its title value to render the links for the ul  
      pages.forEach(page => {
        $("#articles").append("<li><a id='listItem' href='https://en.wikipedia.org/?curid="+page+"' target='_blank'>"+ids[page].title+"</a></li>");
      })                 
              
    });
    
    // update clear so that links will be removed on next search
    clear = 1;
    
  })
  
})