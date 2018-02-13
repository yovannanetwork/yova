var curr_index = 0;
var is_playing = false;
var timer;
var speed = 100;

$('body').on('click', '.play', function(e){
  e.preventDefault();
  is_playing = false;
  $(this).addClass('stop').html('play').removeClass('play');
});

$('body').on('click', '.stop', function(e){
  e.preventDefault();
  is_playing = true;
  $(this).addClass('play').html('stop').removeClass('stop');
  
  if(curr_index == 0)
  {
    $('#display').html('');
    $('#content').html('');
    clearInterval(timer);
  
  var temp = $('#story').html();
  var temp2 = temp.split('');
  
  timer = setInterval(function(){
    if(curr_index < temp2.length && is_playing)
    {
      if(temp2[curr_index] == '<')
      {
        if(temp2[curr_index+1] == 'p' && temp2[curr_index+2] == '>')
        {
          var nextp = document.createElement('p');
          nextp.innerHTML = "<p class='sec current'></p>";
          $('#display').append(nextp);
          curr_index += 2;
        }
        else if(temp2[curr_index+1] == '/')
        {
          $('.last').remove();
 $('.current').addClass('last').removeClass('current').animate({left:'650px'}, 750);
          curr_index += 3;
        }
        else
        {
          $('.current').append(temp2[curr_index]);
        }
      }
      else
      {
      $('.current').append(temp2[curr_index]);
      }
      
      curr_index++;
    }
    
    if(curr_index >= temp2.length)
    {
      curr_index = 0;
      is_playing = false;
      $('.play').addClass('stop').removeClass('play');
    }
  }, speed);
  }
});


$('.stop').trigger('click');









