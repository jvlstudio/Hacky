function parseComments(jsonString) {
  var container = $('#comments');
  
  try {
    var comments = JSON.parse(jsonString);
  }
  catch(error) {
    container.html('<div class="error">' + error + '</div>');
    return;
  }
  
  container.html('');
  
  document.body.scrollTop = 0;
  
  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    var element = $('<div class="commentContainer margin-' + comment.margin + '">' +
                      '<div class="meta">' +
                        '<span class="username">' +
                          comment.user +
                          '<span class="minimizer">-</span>' +
                        '</span>' +
                        '<span class="createdAt">' +
                          comment.created +
                        '</span>' +
                      '</div>' +
                      comment.content +
                    '</div>');
    
    container.append(element);
  }
  
  $('.minimizer').click(didClickMinimizer);
}

function didClickMinimizer(event) {
  var button = $(event.target);
  var commentContainer = button.parents('.commentContainer');

  if (button.html() === '-') {
    commentContainer.find('.meta').addClass('hidden');
    commentContainer.find('.comment').hide();
    minimizeNextComments(commentContainer, null);

    button.html('+');
  }
  else if (button.html() === '+') {
    commentContainer.find('.meta').removeClass('hidden');
    commentContainer.find('.comment').show();
    maximizeNextComments(commentContainer, null);

    button.html('-');
  }
}

function minimizeNextComments(startComment, initialMargin) {
  var startMargin = +startComment.attr('class').split('-')[1];

  if (initialMargin == null)
    initialMargin = startMargin;

  var nextComment = startComment.next();

  if (!nextComment.length)
    return;

  var nextMargin = +nextComment.attr('class').split('-')[1];

  if (nextMargin > initialMargin) {
    nextComment.hide();
    minimizeNextComments(nextComment, initialMargin);
  }
}

function maximizeNextComments(startComment, initialMargin) {
  var startMargin = +startComment.attr('class').split('-')[1];

  if (initialMargin == null)
    initialMargin = startMargin;

  var nextComment = startComment.next();

  if (!nextComment.length)
    return;

  var nextMargin  = +nextComment.attr('class').split('-')[1];

  if (nextMargin > initialMargin) {
    nextComment.show();
    maximizeNextComments(nextComment, initialMargin);
  }
}