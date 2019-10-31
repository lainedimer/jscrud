const RESULTS_TABLE = document.getElementById('table-results');
//const FORM_BEER = document.querySelector('#form-beer');
const BUTTON_SAVE = document.getElementById('btn-save');
const BUTTON_CANCEL = document.getElementById('btn-cancel');

const STYLES_BEER = [
    'Choose a style',
    'APA',
    'Pilsen',
    'Pale Ale',
    'Ipa',
];

const BRANDS_BEER = [
    'Choose a brand',
    'Saint Bier',
    'Barco',
    'Schornstein',
    'Colorado',
];

const TASTES_BEER = [
    'Choose a taste',
    'Bitter',
    'Sweet',
    'Sour',
    'Salty',
];

const COLUMN_TABLE = [
    'Name',
    'Brand',,
    'Edit',
    'Remove'
];

let beers = [];
let selectStyle = document.getElementById('style');
let selectBrand = document.getElementById('brand');
let selectTaste = document.getElementById('taste');

const optionsOfSelect = function(select, options){
    options.forEach(function(valueOfOptions){
        let option = document.createElement('option');
        option.text = valueOfOptions;
        option.value = valueOfOptions;
        select.add(option);
    });
}

optionsOfSelect(selectStyle, STYLES_BEER);
optionsOfSelect(selectTaste, TASTES_BEER);
optionsOfSelect(selectBrand, BRANDS_BEER);

const clearFormBeer = function(){
    event.preventDefault();  
    document.getElementById('name').value="";
    document.getElementById('brand').value=BRANDS_BEER[0];
    document.getElementById('style').value=STYLES_BEER[0];
    document.getElementById('ibv').value="";
    document.getElementById('ibu').value="";
    document.getElementById('vol').value="";
    document.getElementById('family').value="";
    document.getElementById('color').value="";
    document.getElementById('taste').value=TASTES_BEER[0];
    document.getElementById('description').value="";
}

const elementExists = function(element){
    if(element != null) return true;
    else return false;
}

//improve code, there are similarities between the function idBeer()
const beerExists = function(name){
    for(var i=0;i<beers.length;i++) {  
        if(name===beers[i].name) return true;        
    } return false;
}

//improve code, there are similarities between the function beerExists()
const idBeer = function(name){
    for(var i=0;i<beers.length;i++) {   
        if(name===beers[i].name) return i;
    }
}

const deleteBeerOfObj = function(id){
    beers.splice(id,id+1);
}

const deleteBeer = function(name){
    let tableBodyElement = document.getElementById('tbody-beer');
    if(elementExists(tableBodyElement) && beerExists(name)){
        deleteBeerOfObj(idBeer(name));
        listBeer();
    }
}

const editBeer = function(name){
    for(var i=0;i<beers.length;i++) {
        if(name===beers[i].name){
            newBeer = beers[i];
            document.getElementById('name').value=newBeer.name;
            document.getElementById('brand').value=newBeer.brand;
            document.getElementById('style').value=newBeer.style;
            document.getElementById('ibv').value=newBeer.ibv;
            document.getElementById('ibu').value=newBeer.ibu;
            document.getElementById('vol').value=newBeer.vol;
            document.getElementById('family').value=newBeer.family;
            document.getElementById('color').value=newBeer.color;
            document.getElementById('taste').value=newBeer.taste;
            document.getElementById('description').value=newBeer.description;
            return newBeer;            
        }            
    }
}

const validateFormBeer = function(){
    if(brand==BRANDS_BEER[0]){
        window.alert('[ERROR] Choose a brand to continue.'); return false;
    } else if(style==STYLES_BEER[0]){
        window.alert('[ERROR] Choose a style to continue.'); return false;
    }else if(taste==TASTES_BEER[0]){
        window.alert('[ERROR] Choose a taste to continue.'); return false;
    }else return true;
}

const addBeer = function(){
    event.preventDefault(); 

    let name = document.getElementById('name').value;
    let brand = document.getElementById('brand').value;
    let style = document.getElementById('style').value;
    let ibv = document.getElementById('ibv').value;
    let ibu = document.getElementById('ibu').value;
    let vol = document.getElementById('vol').value;
    let family = document.getElementById('family').value;
    let color = document.getElementById('color').value;
    let taste = document.getElementById('taste').value;
    let description =  document.getElementById('description').value;
      
    if(validateFormBeer() && !beerExists(name)){
        let beer = {
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
        clearFormBeer();
    }else{
        console.log(editBeer(name));
    }
}

const createTableHeader = function(table){
    let tr = document.createElement('tr');
    RESULTS_TABLE.appendChild(table);  
    table.appendChild(tr);
    COLUMN_TABLE.forEach(function(columnTable){
        let th = document.createElement('th');
        let columnText = document.createTextNode(columnTable);
        th.appendChild(columnText);
        tr.appendChild(th);
    });
}

const createTableBody = function(table){
    let tbody = document.createElement('tbody');
    tbody.id='tbody-beer';
    table.appendChild(tbody);
}

const createTable = function(){
    let table = document.createElement('table');
    table.className ='table';
    createTableHeader(table);
    createTableBody(table);
};

const clearResultsTable = function(){
    RESULTS_TABLE.innerHTML='';  
}

const createTableBodyContent = function(){
    let tableBodyElement = document.getElementById('tbody-beer');
      

    for(var i=0; i<beers.length; i++){

        let tr = document.createElement('tr'); 
        let tdName = document.createElement('td');
        let tdBrand = document.createElement('td');
        let tdEdit = document.createElement('td');
        let tdRemove = document.createElement('td');

        let name = document.createTextNode(beers[i].name);
        let brand = document.createTextNode(beers[i].brand);   
        
        tdName.appendChild(name);
        tdBrand.appendChild(brand); 
        tdEdit.innerHTML = tdEdit.innerHTML+ '<button type="button" id="remove" class="btn btn-outline-danger" onclick="deleteBeer(\'' +beers[i].name+ '\')">Remove</button>';
        tdRemove.innerHTML = tdRemove.innerHTML+ '<button type="button" class="btn btn-outline-secondary" onclick="editBeer(\'' +beers[i].name+ '\')">Edit</button>';
        
        tr.appendChild(tdName);
        tr.appendChild(tdBrand);
        tr.appendChild(tdEdit);
        tr.appendChild(tdRemove);

        tableBodyElement.appendChild(tr); 
    } 
}

const listBeer = function(){

    if(elementExists(document.getElementsByTagName('th'))){
        clearResultsTable();
    }
    createTable();
    createTableBodyContent();   
}

BUTTON_SAVE.addEventListener("click", function (event) {
    addBeer();
});

BUTTON_CANCEL.addEventListener("click", function (event) {
    clearFormBeer();
});

