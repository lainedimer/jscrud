//Load of selects
var beers = [];
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


//event submit of form
document.querySelector('#form-beer').addEventListener("submit", function(event){
 
    
/*
    document.querySelector('#table-beer').addEventListener("click", function(event){
        const remove = document.querySelector("#remove");
        if(event.currentTarget.contains(remove)){    
            var td = document.getElementsByClassName('td_name');
        //console.log(event.target.rowIndex);
            //var nametd = td[0].textContent;
            console.log(td[0].cellIndex());
            //var nametd2 = td[1].textContent;
            console.log(nametd);
            //console.log(nametd2);
            
            for(var i=0;i<beers.length;i++) {   
                if(nametd===beers[i].name) {
                   // console.log(beers[i].name);
                    beers.splice(i,i+1);
                }
            }
            
        }
        //listBeer();
    });
    */   
    
    
    addBeer();
});
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

function deleteBeer(name){
    console.log(name);
    for(var i=0;i<beers.length;i++) {   
        if(name===beers[i].name) {
           // console.log(beers[i].name);
            beers.splice(i,i+1);

        }
    }
    listBeer();
}

var addBeer = function(){
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

        beers.push(beer);
        listBeer();
        clear();
    }  
}
function listBeer(){
    console.log("entrou na listbeer");
    var table = document.getElementById('table-beer');
    if(!document.getElementsByTagName('th').length){
        createTable();
    }
    //if(!document.getElementsByTagName('tbody').length){
        var tbody = document.createElement('tbody');
    //}

    table.appendChild(tbody);
    if(beers.length==0){
        console.log("remover os tr");
    }
    for(var i=0; i<beers.length; i++){
        console.log("entrei no for");
        var tr = document.createElement('tr');
        var td_name = document.createElement('td');
        td_name.className="td_name";
        var td_brand = document.createElement('td');
        var name = document.createTextNode(beers[i].name);
        var brand = document.createTextNode(beers[i].brand);
        td_name.appendChild(name);
        td_brand.appendChild(brand); 
            
        var td_remove = document.createElement('td');
        td_remove.innerHTML = td_remove.innerHTML+ '<button type="button" id="remove" class="btn btn-outline-danger" onclick="deleteBeer(\'' +beers[i].name+ '\')">Remove</button>';
        var td_edit = document.createElement('td');
        td_edit.innerHTML = td_edit.innerHTML+ '<button type="button" class="btn btn-outline-secondary" onclick="editBeer();">Edit</button>';
         
        tr.appendChild(td_name);
        tr.appendChild(td_brand);
        tr.appendChild(td_edit);
        tr.appendChild(td_remove);
        tbody.appendChild(tr);  
    }

    
}



