let Application = {
  init: () => {
    $('#form-login').submit(event => {
      event.preventDefault();
      const form = event.target;
      const username = form['username'].value;
      const password = form['password'].value;
      Application.login(username, password);
    });
    $('#button-register').click(event => {
      event.preventDefault();
      location.href = './register.html';
    });
  },

  login: (username, password) => {
    // $.support.cors = true;
    // $.ajaxSetup({
    //   xhrFields: {
    //     withCredentials: true // Pass session cookie with requests
    //   }
    // });
    const data = $.ajax({
      url: 'https://api.ynrk.tk/ppk/login.php',
      type: 'post',
      data: { username, password },
      xhrFields: {
        withCredentials: true
      },
      // async: true,
      // crossDomain: true,
      beforeSend: function(xhr) {
        // xhr.setRequestHeader('Cookie', 'session=login');
        $('#button-loading').toggleClass('loading');
      },
      success: function(dataObject) {
        console.log('success');
        console.log(dataObject);
        if (!dataObject['message']) {
          location.href = './home.html';
        }
      },
      error: function(dataObject) {
        console.log('failed');
        console.log(dataObject);
      },
      complete: function(dataObject) {
        $('#button-loading').toggleClass('loading');
      }
    });
  }
};
