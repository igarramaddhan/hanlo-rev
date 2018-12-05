let Application = {
  init: () => {
    Application.getFriendList();
    $('#add').click(event => {
      event.preventDefault();
      $('.ui.modal')
        .modal({
          onApprove: function() {
            const content = $('#input-content').val();
            $.ajax({
              url: 'https://api.ynrk.tk/ppk/createPost.php',
              type: 'post',
              data: { content },
              xhrFields: {
                withCredentials: true
              },
              beforeSend: function(xhr) {
                $('.ui.approve.positive.button').toggleClass('loading');
              },
              success: function(dataObject) {
                Application.getPosts();
              },
              error: function(dataObject) {
                console.log('failed');
                console.log(dataObject);
              },
              complete: function(dataObject) {
                $('.ui.approve.positive.button').toggleClass('loading');
                // $('.ui.modal').toggleClass('active');
              }
            });
            return false; //Return false as to not close modal dialog
          }
        })
        .modal('show');
    });
  },

  getFriendList: () => {
    const data = $.ajax({
      url: 'https://api.ynrk.tk/ppk/getAllFriend.php',
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      async: true,
      crossDomain: true,
      beforeSend: function(xhr) {
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader('Cookie', 'session=login');
        $('.ui.dimmer').toggleClass('active');
      },
      success: function(dataObject) {
        if (dataObject instanceof Array) {
          let data = [...dataObject].sort(function(a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          $('.ul.list').html('');
          data.forEach(item => {
            // location.href = `./friendDetail.html?username=${result.username}`;
            $('.ul.list').append(`
            <a class="ui card fluid" href="/chatDetail.html?userId=${item.id}">
              <div class="content">
                <div class="header">${item.displayName}</div>
                <div class="description">
                  ${item.username}
                </div>
              </div>
            </a>
          `);
          });
        } else if (dataObject['message'] === 'unauthorized') {
          location.replace('./index.html');
        }
      },
      error: function(dataObject) {
        console.log('failed');
        console.log(dataObject);
      },
      complete: function(dataObject) {
        $('.ui.dimmer').toggleClass('active');
      }
    });
  }
};
