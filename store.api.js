'use strict';

(function(module) {

    let stores;

    let json = window.localStorage.getItem('stores');

    if(json && json !== 'undefined') {
        stores = JSON.parse(json);
    }
    else {
        createStores();
    }

    function createStores() {

        stores = [{

            name:'Pike Place Market',
            min: 23,
            max: 65,
            avg: 6,
            key:'pike',
            total: 0
        }, {
    
            name:'SeaTac',
            min: 3,
            max: 24,
            avg: 1.2,
            key:'seatac',
            total: 0
        }, {
    
            name:'Pike Place Market',
            min: 11,
            max: 38,
            avg: 3.7,
            key:'seattlecenter',
            total: 0
        }, {
    
            name: 'Capitol Hill',
            min: 20,
            max: 38,
            avg: 2,
            key:'caphill',
            total: 0
        }, 
    
        {
            name: 'Alki',
            min: 2,
            max: 16,
            avg: 6,
            key:'alki',
            total: 0
        
        }];

    }

    for(let i = 0; i < stores.length; i++){
        stores[i].cookiesPerHour = [];
        for(let j = 0; j < 14; j++) {
            let tempCookiesPerHour = getCustomerPerHour(stores[i].min, stores[i].max) * stores[i].avg;
            stores[i].cookiesPerHour.push(Math.round(tempCookiesPerHour)); 
        }
    }

    for(let i = 0; i < stores.length; i++){
        console.log ('before', stores[i].total); 
        for(let j = 0; j < 14; j++) {
            stores[i].total += stores[i].cookiesPerHour[j];
        }  
 
    }  

    //total by hour
    let hourlyStoreTotals = [];
    for(let i = 0; i < 14; i++){
        let total = 0;

        for(let j = 0; j < stores.length; j++) {
            total += stores[j].cookiesPerHour[i];
        } 
        
        hourlyStoreTotals.push(total);
        
    }

    function getRandomNum(min, max) {
        return Math.random() * (max - min) + min;       
    }

    function getCustomerPerHour(custMin, custMax){
        var customerPerHour = getRandomNum(custMin, custMax);
        return customerPerHour;
    }

    module.hourlyStoreTotals = hourlyStoreTotals;

    window.resetStores = createStores;


    let storesApi = {
        get: function() {
            console.log(stores);
            return stores;
            
        },         
      
        
    };

    module.storesApi = storesApi;

})(window.module = window.module || {});