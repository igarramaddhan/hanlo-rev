let Application = {
  init: () => {
    Application.getPosts();
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

  getPosts: () => {
    const data = $.ajax({
      url: 'https://api.ynrk.tk/ppk/getAllPost.php',
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
        let data = [...dataObject].reverse();
        $('.ul.list').html('');
        data.forEach(item => {
          $('.ul.list').append(`
            <div class="ui card fluid">
              <div class="content">
                <div class="header">${item.displayName}</div>
                <div class="meta">${item.createdAt}</div>
                <div class="description">
                  ${item.content}
                </div>
              </div>
            </div>
          `);
        });
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
