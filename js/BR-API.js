let request = new XMLHttpRequest();
const KEY='e4440acf1edaa356a6791228dec45b5a';

function request(endpoint, key){
    const URL = 'http://api.brewerydb.com/v2/'+endpoint+'/?key='+key+'';
    let request = new XMLHttpRequest();

    request.open('GET', URL, true)

    return request;
}

var data = JSON.parse(this.response)

if (request.status >= 200 && request.status < 400) {
  data.forEach(movie => {
    console.log(movie.title)
  })
} else {
  console.log('error')
}