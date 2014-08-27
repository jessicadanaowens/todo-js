// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
  $('body').append("<ul id='ToDo'><h1>To Dos</h1></ul>");
  $('body').append("<section id='completedList'><h1>Complete</h1><ul id='completedListItems'></ul></section>");
  $('body').append("<h1 id='completed-flash'>" + "To Do Completed" + "<em class='completed-flash-button'> &#x27bf; </em>" + "</h1>");

  var $newItemForm = $('#newItemForm');
  var $textInput = $('input:text');
  var $newItemButton = $('#newItemButton');
  var $flashMessage = $('#flash');
  var $xButton = $('.xButton');
  var $deleteAlert = $('#deleteAlert');
  var $completedFlash = $('h1#completed-flash');


  var $completeList = $('section#completedList');
  var $completeListItems = $('ul#completedListItems').children();
  var $completeListItemsLength = $completeListItems.length;

  if ($completeListItemsLength == 0) {
    $completeList.hide();
  } else {
    $completeList.show();
  };

  $newItemButton.show();
  $newItemForm.hide();
  $flashMessage.hide();
  $deleteAlert.hide();
  $completedFlash.hide();

  $xButton.on('click', function(){
    $flashMessage.hide();
    $deleteAlert.hide();
  });

  $('#showForm').on('click', function(){
    $newItemButton.hide();
    $newItemForm.show();
  });

  var buttonClicker = function () {
    $(this).parent('li').remove();
    $deleteAlert.show().delay(5000).fadeOut(700);
  };

  var checkClicker = function () {
    var $listItem = $(this).parent('li');
    $listItem.appendTo('ul#completedListItems');
    $completedFlash.show().delay(5000).fadeOut(700);
    $listItem.find('em').remove();
    $listItem.append("<em class='undo'> undo <em>");
    $completeList.show();

    var undoButtons = $('.undo');

    undoButtons.on('click', function() {
      var list_item = $(this).parent('li');
      list_item.find('em').remove();
      list_item.append('<em class="toDoCheck"> &#10004; </em>' + '<em class="xButtonClass"> &#x27bf; </em>')
      var $el = list_item.appendTo($('ul#ToDo'));
      toDoButtonClickEvents($el);
    });

      $completeList.show();

    if ($('ul#completedListItems').length == 0) {
      $completeList.hide();
    }

    var $flashButton = $('.completed-flash-button');
    $flashButton.on('click', function() {
      $(this).parent('h1#completed-flash').remove();
    });
  };

  var toDoButtonClickEvents = function($el) {
    var $xButtons = $el.find('.xButtonClass');
    $xButtons.on('click', buttonClicker);

    var $checkButtons = $el.find('.toDoCheck');
    $checkButtons.on('click', checkClicker);
  };

  $newItemForm.on('submit', function(e){
    e.preventDefault();
    var newText = $('input:text').val();
    var $el = $('ul#ToDo').append('<li>' + newText + '<em class="toDoCheck"> &#10004; </em>' + '<em class="xButtonClass"> &#x27bf; </em>' + '</li>');

    toDoButtonClickEvents($el);

    $flashMessage.show().delay(5000).fadeOut(700);

    $newItemForm.hide();
    $newItemButton.show();
    $textInput.val('');
  });



});
