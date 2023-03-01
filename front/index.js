let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: 'hibiki' }),
    rejectUnauthorized: false
  };

function showData() {
    fetch('https://test-node-mauve.vercel.app/getData', requestOptions)
  .then(response => response.json())
  .then(data => {
      console.log(data);
      let content = '';
    
      for (let i = 0; i < data.length; i++) {
          content += '<div class="element"><span>' + data[i].value + '</span><i class="fa-regular fa-trash-can" style="color: white;" onclick="deleteMemo(\'' + data[i].id +'\')"></i></div>';
      }
    
      console.log(content);
    
      $('#main')[0].innerHTML = content;
  })
  .catch(error => console.error(error));

}

function saveMemo() {
    let value = $('#input')[0].value;
    let user = 'hibiki';

    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user, value: value }),
        rejectUnauthorized: false
    };

    fetch('https://test-node-mauve.vercel.app/insert', requestOptions);

    setTimeout(() => {
        showData();
        $('#input')[0].value = '';
      }, 300); 
}

function deleteMemo(value) {
    console.log(value);
    let user = 'hibiki';

    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user, id: value }),
        rejectUnauthorized: false
    };

    fetch('https://test-node-mauve.vercel.app/delete', requestOptions);

    setTimeout(() => {
        showData();
        $('#input')[0].value = '';
      }, 300); 
}

$(document).ready(function() {
    showData();

    setInterval(showData, 5000);
});