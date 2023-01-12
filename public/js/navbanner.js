var clickDelay      = 500,
    clickDelayTimer = null;

$('.burger').on('click', function () {
  
  if(clickDelayTimer === null) {
  
    var $burger = $(this);
    $burger.toggleClass('active');
    // $burger.parent().toggleClass('is-open');
    $('.list-flex-cont').toggleClass('active')
    $('.nav-ul').toggleClass('active-nav-ul');

    if(!$burger.hasClass('active')) {
      $burger.addClass('closing');
    }

    clickDelayTimer = setTimeout(function () {
      $burger.removeClass('closing');
      clearTimeout(clickDelayTimer);
      clickDelayTimer = null;
    }, clickDelay);
  }
});