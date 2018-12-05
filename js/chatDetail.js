function getUrlVars() {
  var queries = {};
  $.each(document.location.search.substr(1).split('&'), function(c, q) {
    var i = q.split('=');
    queries[i[0].toString()] = i[1].toString();
  });
  return queries;
}

let Application = {
  init: () => {
    const data = getUrlVars();
    Application.getChat(data.userId);
    $('#button-send').click(event => {
      event.preventDefault();
      const message = $('#input-message').val();
      Application.sendMessage(data.userId, message);
    });
  },

  getChat: id => {
    $.ajax({
      url: 'https://api.ynrk.tk/ppk/getFriendChat.php',
      type: 'post',
      data: { id },
      xhrFields: {
        withCredentials: true
      },
      // async: true,
      // crossDomain: true,
      beforeSend: function(xhr) {
        // xhr.setRequestHeader('Cookie', 'session=login');
        // $('#button-loading').toggleClass('loading');
      },
      success: function(dataObject) {
        if (dataObject instanceof Array) {
          let data = [...dataObject]
            .sort(function(a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .reverse();
          $('.ui.middle.aligned.divided.list').html('');
          data.forEach(item => {
            $('.ui.middle.aligned.divided.list').append(`					
							<div class="item">
								<div class="content" style="margin: 0 8px;">
									<div class="header">${item.displayName}</div>
									${item.content}
									<div class="right floated">${moment(item.createdAt).fromNow()}</div>
								</div>
							</div>
          	`);
          });
        } else if (dataObject['message'] === 'unauthorized') {
          // location.replace('./index.html');
        }
      },
      error: function(dataObject) {
        console.log('failed');
        console.log(dataObject);
      },
      complete: function(dataObject) {
        // $('#button-loading').toggleClass('loading');
      }
    });
  },

  sendMessage: (id, content) => {
    $.ajax({
      url: 'https://api.ynrk.tk/ppk/createMessage.php',
      type: 'post',
      data: { id, content },
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function(xhr) {
        // xhr.setRequestHeader('Cookie', 'session=login');
        // $('#button-loading').toggleClass('loading');
      },
      success: function(dataObject) {
        Application.getChat(id);
        $('#input-message').val('');
      },
      error: function(dataObject) {
        console.log('failed');
        console.log(dataObject);
      },
      complete: function(dataObject) {
        // $('#button-loading').toggleClass('loading');
      }
    });
  }
};
