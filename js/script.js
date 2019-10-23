//Load of selects
var styles = [
    'Choose a style',
    'APA',
    'Pilsen',
    'Pale Ale',
    'Ipa',
];

var selectStyle = document.getElementById('style');

styles.forEach(function(item){
    var option = document.createElement('option');
    option.text = item;
    option.value = item;
    selectStyle.add(option);
});

var brands = [
    'Choose a brand',
    'Saint Bier',
    'Barco',
    'Schornstein',
    'Colorado',
];
var selectBrand = document.getElementById('brand');
brands.forEach(function(item){
    var option = document.createElement('option');
    option.text = item;
    option.value = item;
    selectBrand.add(option);
});

var tastes = [
    'Choose a taste',
    'Amargo',
    'Doce',
    'Azedo',
    'Salgado',
];   

var selectTaste = document.getElementById('taste');

tastes.forEach(function(item){
    var option = document.createElement('option');
    option.text = item;
    option.value = item;
    selectTaste.add(option);
});

var clear = function(){
    document.getElementById('name').value="";
    document.getElementById('brand').value=brands[0];
    document.getElementById('style').value=styles[0];
    document.getElementById('ibv').value="";
    document.getElementById('ibu').value="";
    document.getElementById('vol').value="";
    document.getElementById('family').value="";
    document.getElementById('color').value="";
    document.getElementById('taste').value=tastes[0];
    document.getElementById('description').value="";
}

var createTable = function(){
    colTable = [
        'Name',
        'Brand',,
        'Edit',
        'Remove'
    ];
    var table = document.getElementById('table-beer');
    var tr = document.createElement('tr');
    colTable.forEach(function(item){
        var th = document.createElement('th');
        var cellText = document.createTextNode(item);
        th.appendChild(cellText);
        tr.appendChild(th);
    });

    table.appendChild(tr);
    
};

var addBeer = function(beer){
    
    if(!document.getElementsByTagName('th').length){
        createTable();
    }

        var table = document.getElementById('table-beer');
        var tbody = document.createElement('tbody');

        var edit = document.createElement('button');
        edit.type='submit';
        edit.className='btn btn-outline-secondary';
        //edit.innerHTML='onclick="editBeer(\''+beer.name+'\')';
        var remove = document.createElement('button');
        remove.type='submit';
        remove.id="remove";
        //remove.onclick=removeBeer(beer.name);
        remove.className='btn btn-outline-danger';
    
        var editText = document.createTextNode('edit');
        var removeText = document.createTextNode('remove');

        edit.appendChild(editText);
        remove.appendChild(removeText);
        
        table.appendChild(tbody);

        var tr = document.createElement('tr');
        var td_name = document.createElement('td');
        var td_brand = document.createElement('td');
        var name = document.createTextNode(beer.name);
        td_name.appendChild(name);
        var brand = document.createTextNode(beer.brand);
        td_brand.appendChild(brand);
        
        var td_remove = document.createElement('td');
        td_remove.appendChild(remove);
        var td_edit = document.createElement('td');
        td_edit.appendChild(edit);
     
        tr.appendChild(td_name);
        tr.appendChild(td_brand);
        tr.appendChild(td_edit);
        tr.appendChild(td_remove);
        tbody.appendChild(tr);    
}


//event submit of form
document.querySelector('#form-beer').addEventListener("submit", function(event){
    //form not refresh
    event.preventDefault();

    var name = document.getElementById('name').value;
    var brand = document.getElementById('brand').value;
    var style = document.getElementById('style').value;
    var ibv = document.getElementById('ibv').value;
    var ibu = document.getElementById('ibu').value;
    var vol = document.getElementById('vol').value;
    var family = document.getElementById('family').value;
    var color = document.getElementById('color').value;
    var taste = document.getElementById('taste').value;
    var description =  document.getElementById('description').value;
      
    if(brand==brands[0]){
        window.alert('[ERROR] Choose a brand to continue.');
    }else if(style==styles[0]){
        window.alert('[ERROR] Choose a style to continue.');
    }else if(taste==tastes[0]){
        window.alert('[ERROR] Choose a taste to continue.');
    }else if(isNaN(ibv) || isNaN(ibu) || isNaN(vol) ){
        window.alert('[ERROR] Check input! IBV, IBU and volume accept only numbers.');
    }else{
    var beer = {
        name: name,
        brand : brand,
        style: style,
        ibv: ibv,
        ibu: ibu,
        vol: vol,
        family: family,
        color: color,
        taste: taste,
        description: description
    };
    addBeer(beer);
    clear();
    }   
});

var editBeer = function(name){
    console.log("edit "+name);
}

var removeBeer = function(name){
    console.log("remove "+name);
}





