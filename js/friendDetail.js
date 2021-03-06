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
    Application.getUserDetail(data.username);
  },

  getUserDetail: username => {
    console.log('username', username);
  }
};
