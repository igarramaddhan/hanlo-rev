let Application = {
  init: () => {
    Application.getPosts();
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
        console.log('success');
        console.log(dataObject);
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
