let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updatescore();

isautoplay = false;
let intervalId;

/*const autoplay = () =>
{

}*/
function autoplay()
{
  if(!isautoplay)
  {
    intervalId=setInterval(() =>
    {
      const playerMove = pickcomputerchoice();
      play_game(playerMove);
    },1000);
    isautoplay= true;
  }
  else {
    clearInterval(intervalId);
    isautoplay= false;
  }
}


//insted of onclick in html 

document.querySelector('.js-rock-button')
  .addEventListener('click',() => {
    play_game('Rock');
  });

  document.querySelector('.js-paper-button')
  .addEventListener('click',() => {
    play_game('Paper');
  });

  document.querySelector('.js-scissors-button')
  .addEventListener('click',() => {
    play_game('scissors');
  });

  document.querySelector('.js-auto-play')
  .addEventListener('click',() => {
    autoplay();
  });


document.body.addEventListener('keydown', (event) => {
  if(event.key ==='r')
  {
    play_game('Rock');
  }
  else if(event.key === 'p')
  {
  play_game('Paper');
  } else if(event.key === 's')
  {
    play_game('scissors');
  }
})

function play_game(playermove)
{
  const computer_choice = pickcomputerchoice();
  let result ='';
  if(playermove==='scissors')
  {
    if (computer_choice ==='Rock')
    {
      result = 'You lose.'
    }
    else if(computer_choice ==='Paper')
    {
      result = 'You win.';
    }
    else if(computer_choice === 'scissors')
    {
        result='Tie.'
    }
  }

  else if(playermove==='Paper')
  {
    if (computer_choice ==='Rock')
    {
      result = 'You win.'
    }
      else if(computer_choice ==='Paper')
      {
      result = 'Tie.';
      }
    else if(computer_choice === 'scissors')
    {
      result='You lose.'
    }
  }

    else if(playermove==='Rock')
    {
      if (computer_choice ==='Rock')
      {
        result = 'Tie.'
      }
      else if(computer_choice ==='Paper')
        {
        result = 'You lose.';
        }
      else if(computer_choice === 'scissors')
      {
        result='You win.'
      }
    }

    if(result==='You win.')
    {
      score.wins+=1;
    }
    else if(result==='You lose.')
    {
      score.losses+=1;
    }
    else if(result ==='Tie.')
    {
      score.ties+=1;
    }

    updatescore();
    document.querySelector('.js-result')
      .innerHTML= result;

    document.querySelector('.js-moves')
      .innerHTML =`You
      <img src="images/${playermove}-emoji.png" class="images">
      <img src="images/${computer_choice}-emoji.png" class="images">
      computer`;
    localStorage.setItem('score', JSON.stringify(score));
}


function updatescore()
{
  document.querySelector('.js-scoreElement')
  .innerHTML= `Wins: ${score.wins} ,Losses: ${score.losses} ,Ties: ${score.ties}`;
}

function pickcomputerchoice()
{

  const randomNumber = Math.random();
  let computer_choice='';
  if (randomNumber>=0 && randomNumber<1/3)
  {
    computer_choice='Rock';
  } else if(randomNumber>=1/3 && randomNumber<2/3)
  {
    computer_choice= 'Paper'
  }
    else if(randomNumber>=2/3 && randomNumber<1)
  {
    computer_choice = 'scissors';
  }
  return computer_choice;
}
