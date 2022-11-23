// ************************************************
//  Data API
// ************************************************

var DataData = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  data_info = [];
  
  // Constructor
  function Item(name, price,days=1, mrg, noon,eve,night, count) {
    this.name = name;
    this.price = price;
	this.days = days;
    this.mrg = mrg;
	this.noon = noon;
	this.eve = eve;
	this.night = night;
	this.count = days*(mrg+noon+eve+night);
  }
  
  // Save data_info
  function saveData() {
    sessionStorage.setItem('DataData', JSON.stringify(data_info));
  }
  
    // Load data_info
  function loadData() {
    data_info = JSON.parse(sessionStorage.getItem('DataData'));
  }
  if (sessionStorage.getItem("DataData") != null) {
    loadData();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to data_info
  obj.addItemToData = function(name, price, days ,mrg, noon,eve, night) {
    for(var item in data_info) {
      if(data_info[item].name === name) {
        //data_info[item].count=days*(mrg+noon+eve+night);
        saveData();
        return;
      }
    }
    var item = new Item(name, price, days, mrg, noon,eve, night);
	//item.count = days*(mrg+noon+eve+night);
    data_info.push(item);
    saveData();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in data_info) {
      if (data_info[i].name === name) {
        data_info[i].count = count; saveData();
        break;
      }
    }
  };
  
  // Set days from item
  obj.setCountForItemdays = function(name, days) {
    for(var i in data_info) {
      if (data_info[i].name === name) {
        data_info[i].days = days; 
		data_info[i].count = data_info[i].days*(data_info[i].mrg+data_info[i].noon+data_info[i].eve+data_info[i].night); 
		saveData();
        break;
      }
    }
  };  
  
  // Set timing from item
  obj.setCountForItemtime = function(name, time, count) {
    for(var i in data_info) {
      if (data_info[i].name === name) {
        data_info[i][time] = count; 
		data_info[i].count = data_info[i].days*(data_info[i].mrg+data_info[i].noon+data_info[i].eve+data_info[i].night); 
		saveData();
        break;
      }
    }
  };  
  // Remove item from data_info
  obj.removeItemFromData = function(name) {
      for(var item in data_info) {
        if(data_info[item].name === name) {
          data_info[item].count --;
          if(data_info[item].count === 0) {
            data_info.splice(item, 1);
          } 
          break;
        }
    }
    saveData();
  }

  // Remove all items from data_info
  obj.removeItemFromDataAll = function(name) {
    for(var item in data_info) {
      if(data_info[item].name === name) {
        data_info.splice(item, 1);
        break;
      }
    }
    saveData();
  }

  // Clear data_info
  obj.clearData = function() {
    data_info = [];
    saveData();
  }

  // Count data_info 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in data_info) {
      totalCount += data_info[item].count;
    }
    return totalCount;
  }

  // Total data_info
  obj.totalData = function() {
    var totalData = 0;
    for(var item in data_info) {
      totalData += data_info[item].price * data_info[item].count;
    }
    return Number(totalData.toFixed(2));
  }

  // List data_info
  obj.listData = function() {
    var data_infoCopy = [];
    for(i in data_info) {
      item = data_info[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      data_infoCopy.push(itemCopy)
    }
    return data_infoCopy;
  }

  // data_info : Array
  // Item : Object/Class
  // addItemToData : Function
  // removeItemFromData : Function
  // removeItemFromDataAll : Function
  // clearData : Function
  // countData : Function
  // totalData : Function
  // listData : Function
  // saveData : Function
  // loadData : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 



// Clear items
$('.clear-data_info').click(function() {
  DataData.clearData();
  displayData();
});


function displayData() {
  var data_infoArray = DataData.listData();
  let output = "<table class = 'table table-hover table-striped' >";
	output += "<thead>";
	output += "<th class = 'w-30 bg-secondary text-light'>Medicine</th>";
	output += "<th class = 'w-20 bg-secondary text-light'>Amount</th>";
	output += "<th class = 'w-20 bg-secondary text-light' >Days</th>"
	output += "<th class = 'w-20 bg-secondary text-light' >Mrg</th>"
	output += "<th class = 'w-20 bg-secondary text-light' >Noon</th>"
	output += "<th class = 'w-20 bg-secondary text-light' >Eve</th>"
	output += "<th class = 'w-20 bg-secondary text-light' >Night</th>"
	output += "<th class = 'w-20 bg-secondary text-light' >Count</th>"
	output += "<th class = 'w-20 bg-secondary text-light' >Total</th>";
	output += "<th class = 'w-10 bg-secondary text-light' ></th>";
	output += "</thead>";
  for(var i in data_infoArray) {
    output += "<tr>"
      + "<td>" + data_infoArray[i].name + "</td>" 
      + "<td>(" + data_infoArray[i].price + ")</td>"
      + `<td><input type='number' class='item-days form-control' data-name= "` + data_infoArray[i].name + `" value= "` + data_infoArray[i].days + `"></td> `	  
      + `<td style = "padding: 1.25rem 0.5rem;"><input type='number' data-time = "mrg" class='item-time form-control' data-name= "` + data_infoArray[i].name + `" value= "` + data_infoArray[i].mrg + `"> </td>`
	  + `<td style = "padding: 1.25rem 0.5rem;"><input type='number' data-time = "noon" class='item-time form-control' data-name= "` + data_infoArray[i].name + `" value= "` + data_infoArray[i].noon + `"> </td>`
	  + `<td style = "padding: 1.25rem 0.5rem;"><input type='number' data-time = "eve" class='item-time form-control' data-name= "` + data_infoArray[i].name + `" value= "` + data_infoArray[i].eve + `"> </td>`
	  + `<td style = "padding: 1.25rem 0.5rem;"><input type='number' data-time = "night" class='item-time form-control' data-name= "` + data_infoArray[i].name + `" value= "` + data_infoArray[i].night + `"> </td>`
	  //+ `<td><input type='number' class='item-count form-control' data-name= "` + data_infoArray[i].name + `" value= "` + data_infoArray[i].count + `"> </td>`
	  + "<td>" + data_infoArray[i].count + "</td>" 	  
      + "<td>" + data_infoArray[i].total + "</td>" 
	  + `<td><button class='delete-item btn btn-sm btn-outline-danger rounded-circle' data-name= "` + data_infoArray[i].name + `"><i class='mdi menu-icon mdi-delete'></i></button></td>`
      +  "</tr>";
  }
  output += "</table>";
  $('.show-data_info').html(output);
  $('.total-data_info').html(DataData.totalData());
  $('.total-count').html(DataData.totalCount());
}


// Delete item button

$('.show-data_info').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  DataData.removeItemFromDataAll(name);
  displayData();
})

// Item count input
$('.show-data_info').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  DataData.setCountForItem(name, count);
  displayData();
});

// Item days input
$('.show-data_info').on("change", ".item-days", function(event) {
   var name = $(this).data('name');
   var days = Number($(this).val());
  DataData.setCountForItemdays(name, days);
  displayData();
});

// Item timing input
$('.show-data_info').on("change", ".item-time", function(event) {
   var name = $(this).data('name');
   var time = $(this).data('time');
   var count = Number($(this).val());
  DataData.setCountForItemtime(name,time,count);
  displayData();
});



