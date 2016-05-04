let
  randnum,
  guess,
  guesscount = 0,
  btn_guess = $('#guessButton'),
  in_guess = $('#userGuess'),
  a_restart = $('a.new'),
  h2_feedback = $('#feedback'),
  span_count = $('#count'),
  ul_guesslist = $('#guessList')

$(function () {
  newGame()

  /*--- Display information modal box ---*/
  $('.what').click(function () {
    $('.overlay').fadeIn(1000)
  })

  /*--- Hide information modal box ---*/
  $('a.close').click(function () {
    $('.overlay').fadeOut(1000)
  })

  a_restart.on('click', function () {
    resetValues()
    newGame()
  })

  btn_guess.on('click', function (e) {
    e.preventDefault()
    guess = parseInt(in_guess.val())
    if (isNaN(guess) || !guessInRange(guess)) { return }
    guesscount++
    span_count.text(guesscount)
    ul_guesslist.prepend(`<li>${guess}</li>`)
    h2_feedback.text(proximity(guess, randnum))
  })

})

function newGame() {
  randnum = newRandomNumber()
  console.log(`This games number is: ${randnum}`)

}

function newRandomNumber() {
  return Math.floor((Math.random() * 100) + 1)
}

function resetValues() {
  removeFlashing()
  h2_feedback.text('Make your Guess!')
  in_guess.val('')
  guesscount = 0
  span_count.text('0')
  ul_guesslist.empty()
  enableInput()
}

function proximity(guess, randnum) {
  var message = void 0
  var diff = Math.abs(randnum - guess)
  switch (true) {
    case diff >= 50:
      message = 'Ice cold'
      break
    case diff >= 30:
      message = 'Cold'
      break
    case diff >= 20:
      message = 'Warm'
      break
    case diff >= 10:
      message = 'Hot'
      break
    case diff >= 1:
      message = 'Very Hot'
      break

    default:
      message = 'You guessed it!'
      disableInput()
      flashNewGame()
      break
  }
  return message
}

function guessInRange(guess) {
  return guess > 0 && guess <= 100
}

function disableInput() {
  $('#userGuess').prop('disabled', true)
  $('#guessButton').prop('disabled', true)
}

function enableInput() {
  $('#userGuess').prop('disabled', false)
  $('#guessButton').prop('disabled', false)
}

function flashNewGame() {
  $('body').addClass('flashing')
}

function removeFlashing() {
  $('body').removeClass('flashing')

  // a_restart.removeClass('flashing')
}
