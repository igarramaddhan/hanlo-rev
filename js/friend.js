let content = [];

let Application = {
  init: () => {
    Application.getFriend();
    // Application.search();
    $('.ui.search').search({
      source: content,
      fullTextSearch: true,
      searchFields: ['username'],
      fields: {
        description: 'displayName',
        title: 'username'
      },
      onResults: response => {
        // console.log(content);
        console.log(response);
      },
      onSearchQuery: query => {
        // console.log('query', query);
      },
      onSelect: result => {
        console.log(result);
        location.href = `./friendDetail.html?username=${result.username}`;
      }
    });
  },

  getFriend: () => {
    $.ajax({
      url: 'https://api.ynrk.tk/ppk/getAllFriend.php',
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      async: false,
      success: function(dataObject) {
        content = dataObject;
        console.log(content);
      }
    });
  },

  search: () => {
    $('.ui.search').search({
      source: content,
      searchFields: ['username'],
      fullTextSearch: false
    });
  }
};
