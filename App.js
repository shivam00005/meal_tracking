//local storage controloler
const StorageCtrl = (function (){
  
  //public method
return {
  
  storeItem: function (item){
    
    let items;
    
    if (localStorage.getItem('items') === null) {
      
      items=[];
      
      items.push(item);
      
      localStorage.setItem('items', JSON.stringify(items))
      
      
    }
    else{
      items = JSON.parse(localStorage.getItem('items'));
      
      items.push(item);
      
      localStorage.setItem('items', JSON.stringify(items))
      
    }
    
  },
  getItemLs : function(){
  
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  }else{
    items=JSON.parse(localStorage.getItem('items'));
  }
  return items
},
updateItemStorage: function (updateditem){
  
  let items =JSON.parse(localStorage.getItem('items'));
  
  items.forEach(function(item, index){
    
    if (updateditem.id === item.id) {
      
      items.splice(index,1,updateditem)
    }
  })
  localStorage.setItem('items', JSON.stringify(items))
  
},
deleteItemLs:function(id){
  let items =JSON.parse(localStorage.getItem('items'));
  
  items.forEach(function(item, index){
    
    if (id === item.id) {
      
      items.splice(index,1)
    }
  })
  localStorage.setItem('items', JSON.stringify(items))
  
},
localStorageRemoveItem: function (){
  localStorage.removeItem('items');
}
}
})();

//Item controloler

const ItemCtrl = (function(){
  
  // item constructer
  const item = function(id,name,calory){
    
    this.id = id;
    this.name = name;
    this.calory = calory;
  };
  // dtat sturcture
  
  const data = {
   /* item:[//{id:0, name:'steak dinner', calory:100},
   // {id:1, name:'lunch', calory:400},{id:2, name:'breakfast', calory:500}
   ],*/
   
   item : StorageCtrl.getItemLs(),
   
    currentItem:null,
    totalcalories:0
  };
//public acess  
  return{
    getItem:function(){
      return data.item},
      
    addItem: function (name,calories){
  //    createing id for new enterise
      let ID;
      if (data.item.length > 0) {
        ID = data.item[data.item.length -1].id +1;
      }else{
        ID = 0;
      }
      
      calories = parseInt(calories);
      
      //createing new enterise
      newItem = new item(ID, name, calories);
      
      //pushing to data
      data.item.push(newItem);
      
     // returning new enterise
      return newItem;
      
    },
    
    getItemToEdit: function (id){
      let found = null;
      
      data.item.forEach(function (item){
        if (item.id === id) {
          
          found = item;
        }
      });
      
      return  found;
    },
    updateItem: function (name,calory){
      calory = parseInt(calory);
      
      let found = null;
      
      data.item.forEach(function (item){
        if (item.id === data.currentItem.id) {
          
          item.name = name;
          item.calory = calory;
          found = item;
        }
        
      });
      
      return found;
      
    },
    
    deleteListItem: function(id){
      const ids = data.item.map(function(item){
        return item.id
      })
      
      const index = ids.indexOf(id)
      
      data.item.splice(index,1)
    },
    clearList:function (){
      data.item =[];
    },
    setItem: function (item){
      data.currentItem = item;
    },
    getcurrItem: function (){
      return data.currentItem;
    },
    TotalCalories: function (){
      let total = 0;
      
      data.item.forEach(function (item){
        
        total += item.calory;
      });
      data.totalcalories = total;
      
      return data.totalcalories;
    },
    logdata:function(){
    return data;
    
    }
    
  };
  
})();



// Ui controloler
const UICtrl = (function(){
  
  const  itemselector = {
    itemlist : '#list-item',
    AddBtn:'#Add',
    itemNameInput:'#item-name',
    itemCaloryInput:'#calory-count',
    total : '.total-calories',
    updateBtn:'.Update-btn',
    deleteBtn:'.Delete-btn',
    backBtn:'.Back-btn',
    clearBtn:'.clear-btn'
  };
  // public acess
  return{
    populateItems: function(items){
      let html ='';
      
      items.forEach(function(item){
        html += `<li id="item-${item.id}" class="collection-item"><strong>${item.name} :</strong> <em>${item.calory} Calories</em> 
          <a class="secondary-content" href="#"><i class="edit-item bi bi-pencil-fill"></i></a></li>
          
          `;
          
      });
      //insert list Item
      document.querySelector(itemselector.itemlist).innerHTML= html;
    },
    getItemInput: function(){
      return{
        name:document.querySelector(itemselector.itemNameInput).value,
        calories:document.querySelector(itemselector.itemCaloryInput).value
      };
    },
    
    addListItem: function (item){
      //verify display
 document.querySelector(itemselector.itemlist). style.display = 'block';     
      
      //create emlement

const li = document.createElement('li');

li.className = 'collection-item';

li.id = `item-${item.id}`;

li.innerHTML = `<strong>${item.name} :</strong> <em>${item.calory} Calories</em> 
          <a class="secondary-content" href="#"><i class="edit-item bi bi-pencil-fill"></i></a>`;
     
   document.querySelector(itemselector.itemlist).insertAdjacentElement('beforeend', li);     

    },
    
    updateListItem: function (item){
      
      let allList = document.querySelectorAll('#list-item li');
      
      
      //convert allList nodes to array

      allList = Array.from(allList);

      allList.forEach(function (items){
        
        const Iditem = items.getAttribute('id')
        
        if (Iditem === `item-${item.id}`) {
         
          document.querySelector(`#item-${item.id}`).innerHTML = `<strong>${item.name} :</strong> <em>${item.calory} Calories</em> 
          <a class="secondary-content" href="#"><i class="edit-item bi bi-pencil-fill"></i></a>`;
          
        }
      });
    },
    deleteListItem : function(id){
      const itemId = `#item-${id}`
      
      const item = document.querySelector(itemId);
      item.remove();
    },
    removeList: function (){
      let list = document.querySelectorAll('#list-item li')
      
      list = Array.from(list)
      
      list.forEach(function (item){
        item.remove();
      })
    },
    clearinput: function(){
      document.querySelector(itemselector.itemNameInput).value = '';
      document.querySelector(itemselector.itemCaloryInput).value = '';
    },
    addToform: function (){
      document.querySelector(itemselector.itemNameInput).value = ItemCtrl.getcurrItem().name;
      document.querySelector(itemselector.itemCaloryInput).value =ItemCtrl.getcurrItem().calory;
      
      UICtrl.showEditState();
    },
    
    hideList: function (){
      document.querySelector(itemselector.itemlist). style.display = 'none';
    },
    showTotalCalories:  function (total){
      
      document.querySelector(itemselector.total).textContent = total;
      
    },
    clearInitBtn:function(){
      UICtrl.clearinput();
      
  document.querySelector(itemselector.AddBtn).style.display='inline';
  document.querySelector(itemselector.updateBtn).style.display='none';
  document.querySelector(itemselector.deleteBtn).style.display='none';
  document.querySelector(itemselector.backBtn).style.display='none';    },
  
    showEditState:function(){
  document.querySelector(itemselector.AddBtn).style.display='none';
  document.querySelector(itemselector.updateBtn).style.display='inline';
  document.querySelector(itemselector.deleteBtn).style.display='inline';
  document.querySelector(itemselector.backBtn).style.display='inline';    },
    getItems: function(){
      return itemselector;
    } 
  };
})();



// App controloler
const App = (function(ItemCtrl,StorageCtrl,UICtrl){
  //  load event listenres
  const loadeventlistener = function(){
    //get ui itemselector
    const classidselc = UICtrl.getItems();
    // add event list
  document.querySelector('#Add').addEventListener('click', addMEAL);
  
  //disable enter key
 
 document.addEventListener('keypress', function (e){
   
   if(e.keycode === 13 || e.which === 13){
     e.preventDefault();
   }
   return false;
 });
 
  //taget li
  document.querySelector(classidselc.itemlist).addEventListener('click', EditBtn);
  
  document.querySelector(classidselc.updateBtn).addEventListener('click', updatesubmit);
  
  document.querySelector(classidselc.deleteBtn).addEventListener('click', deletelist);
  
  document.querySelector(classidselc.backBtn).addEventListener('click',  function(e){
    
    UICtrl.clearInitBtn();
    e.preventDefault();
  });
  
  document.querySelector(classidselc.clearBtn).addEventListener('click', clearlist);
  
  };
  
  // taget edit pancil of li
  
  function EditBtn(e){
    
    if (e.target.classList.contains('edit-item')) {
      const listid = e.target.parentNode.parentNode.id;
      // spilt list into two arry
      const itemArr= listid.split('-');
      
      //obtain id
      const id = parseInt(itemArr[1]);
      
    //pass itme to be edit   
   const itemToEdit = ItemCtrl.getItemToEdit(id);
    
  //     set  edit item
    const setItem = ItemCtrl.setItem(itemToEdit);
      
      //add item to form
    const addToform = UICtrl.addToform();
   }
    
    e.preventDefault();
  }
  
  // Add addMEAL
  
  const addMEAL = function(e){
    

    const input = UICtrl.getItemInput();
    
    if (input.name !==''&&input.calories !== '') {
      //get  item to ItemCtrl
    const getItem = ItemCtrl.addItem(input.name,input.calories);
    
    //add item to ui
     UICtrl.addListItem(getItem);
     
     //get total calories
   const getTotalCalories =  ItemCtrl.TotalCalories();
   
   //show total calories

   UICtrl.showTotalCalories(getTotalCalories);
   
   // storedata to local storage

   StorageCtrl.storeItem(getItem);

     UICtrl.clearinput();
    }
    
   e.preventDefault();
  };
  
  function updatesubmit(e) {
    
    const input = UICtrl.getItemInput();
    
    const updateItem = ItemCtrl.updateItem(input.name, input.calories);
    
    UICtrl.updateListItem(updateItem);
    
    const getTotalCalories =  ItemCtrl.TotalCalories();
   
    UICtrl.showTotalCalories(getTotalCalories);
   
   StorageCtrl.updateItemStorage(updateItem);
   
     UICtrl.clearinput();
     
     UICtrl.clearInitBtn();
     
    e.preventDefault();
  }
  
  //delete list

const deletelist = function (e){
  
  const currItem = ItemCtrl.getcurrItem();
  
  // delete item
 
 ItemCtrl.deleteListItem(currItem.id);
 
 UICtrl.deleteListItem(currItem.id);

const getTotalCalories =  ItemCtrl.TotalCalories();
   
    UICtrl.showTotalCalories(getTotalCalories);
   
   StorageCtrl.deleteItemLs(currItem.id);
   
     UICtrl.clearinput();
     
     UICtrl.clearInitBtn();
     
e.preventDefault();
};

const clearlist = function (e){
  
  ItemCtrl.clearList();
  
  const getTotalCalories =  ItemCtrl.TotalCalories();
   
    UICtrl.showTotalCalories(getTotalCalories);
    
   StorageCtrl.localStorageRemoveItem();
    
  UICtrl.removeList();
  
  UICtrl.hideList();
  e.preventDefault();
}
  
//  public method
return{
  init: function(){
    
    //clearinput
  UICtrl.clearInitBtn();
    //fatch from item controler data sturcture
    const items=ItemCtrl.getItem();
    
    if (items.length === 0) {
      UICtrl.hideList();
    }else{
      
          //popullate items using UICtrl
    UICtrl.populateItems(items);
    
    }
    
       //get total calories
   const getTotalCalories =  ItemCtrl.TotalCalories();
   
   //show total calories

   UICtrl.showTotalCalories(getTotalCalories);
   
  loadeventlistener();
  }
};
})(ItemCtrl,StorageCtrl,UICtrl);

App.init();