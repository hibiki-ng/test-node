let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: 'hibiki' }),
    rejectUnauthorized: false
  };

let idShown = [];

function showData() {
    console.log('show data');

    fetch('https://test-node-mauve.vercel.app/getData', requestOptions)
        .then(response => response.json())
        .then(data => {
            let fetchedIds = [];            
            for (let i = 0; i < data.length; i++) {
                let content = '';
                if (!idShown.includes(data[i].id)) {
                    idShown.push(data[i].id);
                    
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
                    $('#'+data[i].id)[0].innerHTML = data[i].value;
                }
                fetchedIds.push(data[i].id);
            }

            let idsToDelete = idShown.filter(id => !fetchedIds.includes(id));
            idsToDelete.forEach(id => {
                $('#' + id).closest('.element').remove();
            });

            console.log('idShown: ');
            console.log(idShown);
            
        })
        .catch(error => console.error(error));

}

function saveMemo() {
    let value = $('#input')[0].value;
    let user = 'hibiki';

    if (value == '') {
        alert('La note est vide');
        return;
    }

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
    $('#main')[0].innerHTML = '';
    showData();

    setInterval(showData, 5000);
});