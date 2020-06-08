const RESULTS_TABLE = document.getElementById('table-results');
const BUTTON_SAVE = document.getElementById('btn-save');
const BUTTON_UPDATE = document.getElementById('btn-update');
const BUTTON_CANCEL = document.getElementById('btn-cancel');
let id=0;

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
    'Id',
    'Name',
    'Brand',,
    'Update',
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
    document.getElementById('id-beer').value="";
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

const beerExists = function(id){
    for(var i=0;i<beers.length;i++) {
        if(id==beers[i].id) return true;        
    } return false;
}

const idBeer = function(id){
    for(var i=0;i<beers.length;i++) {   
        if(id==beers[i].id) return i;
    }
}

const deleteBeerOfObj = function(id){    
    beers.splice(id,id+1);
}

const deleteBeer = function(id){
    let tableBodyElement = document.getElementById('tbody-beer');
    if(elementExists(tableBodyElement) && beerExists(id)){        
        deleteBeerOfObj(idBeer(id));
        listBeer();
        clearFormBeer();
    }
}

const formBeerId = function(id){
    for(var i=0;i<beers.length;i++) {        
        if(id==beers[i].id){
            document.getElementById('id-beer').value=beers[i].id;
            document.getElementById('name').value=beers[i].name;
            document.getElementById('brand').value=beers[i].brand;
            document.getElementById('style').value=beers[i].style;
            document.getElementById('ibv').value=beers[i].ibv;
            document.getElementById('ibu').value=beers[i].ibu;
            document.getElementById('vol').value=beers[i].vol;
            document.getElementById('family').value=beers[i].family;
            document.getElementById('color').value=beers[i].color;
            document.getElementById('taste').value=beers[i].taste;
            document.getElementById('description').value=beers[i].description;
            return beers[i];            
        }      
    }
}

const updateBeer = function(){
    event.preventDefault();
    idCurrentBeer = document.getElementById('id-beer').value;    
    deleteBeer(idCurrentBeer)
    beers.push(getBeerForm(idCurrentBeer));
    listBeer();
    clearFormBeer();     
}

const getBeerForm = function(id){

    // let id = document.getElementById('id-beer');
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

    let beer = {
        id: id,
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

    return beer;
}

const validateFormBeer = function(){
    if(brand==BRANDS_BEER[0]){
        window.alert('[ERROR] Choose a brand to continue.'); return false;
    }else if(style==STYLES_BEER[0]){
        window.alert('[ERROR] Choose a style to continue.'); return false;
    }else if(taste==TASTES_BEER[0]){
        window.alert('[ERROR] Choose a taste to continue.'); return false;
    }else return true;
}

const addBeer = function(){
    event.preventDefault();     
    id +=1;
    if(validateFormBeer() && !beerExists(getBeerForm().id)){ 
        beers.push(getBeerForm(id));
        listBeer();
        clearFormBeer();
    }else{
        window.alert('[ERROR]');
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
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdBrand = document.createElement('td');
        let tdUpdate = document.createElement('td');
        let tdRemove = document.createElement('td');

        let idBeer = document.createTextNode(beers[i].id);
        let name = document.createTextNode(beers[i].name);
        let brand = document.createTextNode(beers[i].brand);   
        
        tdId.appendChild(idBeer);
        tdName.appendChild(name);
        tdBrand.appendChild(brand); 
        tdUpdate.innerHTML = tdUpdate.innerHTML+ '<button type="button" id="update" class="btn btn-outline-danger" onclick="formBeerId(\'' +beers[i].id+ '\')">Update</button>';
        tdRemove.innerHTML = tdRemove.innerHTML+ '<button type="button" id="remove" class="btn btn-outline-secondary" onclick="deleteBeer(\'' +beers[i].id+ '\')">Remove</button>';
        
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdBrand);
        tr.appendChild(tdUpdate);
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

BUTTON_UPDATE.addEventListener("click", function (event) {
    updateBeer();
});

BUTTON_CANCEL.addEventListener("click", function (event) {
    clearFormBeer();
});

