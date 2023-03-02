let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: 'hibiki' }),
    rejectUnauthorized: false
  };

function showData() {
    $('#main')[0].innerHTML = '';

    fetch('https://test-node-mauve.vercel.app/getData', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            for (let i = 0; i < data.length; i++) {
                let content = '';

                let date = '';
                let datefr = '';
                let time = '';
                if (data[i].datetime != null) {
                    date = data[i].datetime.split('T')[0];
                    time = data[i].datetime.split('T')[1].split('.')[0];
                    datefr = date.split('-')[2] + '/' + date.split('-')[1] + '/' + date.split('-')[0] + ' ' + time;
                } else {
                    date = 'No date';
                }

                content += '<div class="element">' +
                                '<div class="element-date">' + datefr + '</div>' +
                                '<div class="element-main">' +
                                    '<span id="'+ data[i].id +'"></span>' +
                                    '<i class="fa-regular fa-trash-can" style="color: white;" onclick="deleteMemo(\'' + data[i].id +'\')"></i>' +
                                '</div>' +
                            '</div>';

                $('#main')[0].innerHTML += content;
                $('#'+data[i].id)[0].innerText = data[i].value;
            }
            
            console.log(content);
            
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

    //setInterval(showData, 5000);
});