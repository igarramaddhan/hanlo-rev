let Application = {
  init: () => {
    $('.ui.form').submit(event => {
      const validate = $('.ui.form').form('is valid');
      event.preventDefault();

      if (validate) {
        const form = event.target;
        const username = form['username'].value;
        const password = form['password'].value;
        const displayName = form['displayName'].value;
        Application.register(username, password, displayName);
      }
    });

    $('#button-login').click(event => {
      event.preventDefault();
      location.href = './';
    });

    Application.semantic();
  },

  register: (username, password, displayName) => {
    const data = $.ajax({
      url: 'https://api.ynrk.tk/ppk/register.php',
      type: 'post',
      data: { username, password, displayName },
      beforeSend: function() {
        $('.ui.dimmer').toggleClass('active');
      },
      success: function(dataObject) {
        console.log('success');
        if (!dataObject['error']) {
          location.href = './';
        } else {
          Application.error(dataObject['error']);
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
  },

  error: message => {
    $('#error-message').html(message);
    $('.ui.message').transition('fade in');
  },

  semantic: () => {
    $('.message .close').on('click', function() {
      $(this)
        .closest('.message')
        .transition('fade');
    });

    $('.ui.form').form({
      on: 'blur',
      inline: true,
      fields: {
        username: {
          identifier: 'username',
          rules: [
            {
              type: 'empty',
              prompt: 'Username cannot be empty'
            }
          ]
        },
        displayName: {
          identifier: 'displayName',
          rules: [
            {
              type: 'empty',
              prompt: 'Display name cannot be empty'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'minLength[3]',
              prompt: 'Password must be at least 6 character'
            }
          ]
        }
      }
    });
  }
};
