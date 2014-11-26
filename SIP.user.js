// ==UserScript==
// @name        SIP
// @namespace   SIPEcoHelper
// @include     http://steamcommunity.com/id/*/inventory/
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==




jQuery.fn.exists = function(){return this.length>0;};

//Insert any specific guns(in string format) that you do NOT want to sell in the main/gun loop
var itemsToNotSell = [""]

$(window).load(function ( ) {
  $(document).ready(function() {

    setTimeout(function(){

      needToConfirm = false; 
      window.onbeforeunload = askConfirm;
      
      main.htmlEdit.addAllHtmlElements();

      main.htmlEdit.addAllHtmlBindings();

      main.getters.getInvJson(function() {

        main.converters.getCaseJson(function() {
        
        });

        main.converters.getGunJson(function(){

        });

        main.converters.getKeyJson(function() {

        });

          main.htmlEdit.populateKeyElements();
          main.htmlEdit.populateCaseElements();
          
      });




    },0);
      
  });
});

var main = {

  reloadPage : function ( ) {

    main.invJson = {}
    main.caseJson = {}
    main.keyJson = {}
    main.gunJson = {}

    main.htmlEdit.remove.removeAllHtmlElements();

    main.htmlEdit.addAllHtmlElements();
    main.htmlEdit.addAllHtmlBindings();

    main.getters.getInvJson(function() {

      main.converters.getCaseJson(function() {
      
      });

      main.converters.getGunJson(function(){

      });

      main.converters.getKeyJson(function() {

      });

        main.htmlEdit.populateKeyElements();
        main.htmlEdit.populateCaseElements();
        
    });
  
  },

  invJson: {},

  gunJson: {},
  caseJson: {},
  keyJson: {},


  getters: {

    getInvJson : function(callback) {
      

      var params = {};
      var jsonUrl = g_strProfileURL + "/inventory/json/730/2";
      
      RequestFullInventory(
        jsonUrl,
        params,
        null,
        null,
        function( transport ) { 

          main.invJson = transport.responseJSON.rgInventory;
          callback('');        
        }
      );  
    
    },

    gunLowestPrice : function(gunName, callback) {

      $J.ajax( {
        url: 'http://steamcommunity.com/market/priceoverview/',
        type: 'get',
     
        data: {
          country: "US",
          currency: 1,
          appid: 730,
          market_hash_name: gunName
        }
        }).done( function( transport ) {
          
          lowestPrice = transport.lowest_price;
          lowestPrice = lowestPrice.replace( '&#36;', '' );

          callback( lowestPrice );
        
        });

    },

    getCaseTable : function( ) {

      var caseType = $("#caseSelector").val();
  
      main.getters.getValveUrlForCaseTable ( caseType, function( valveUrl ) {

        $.getJSON( valveUrl, function( data ) {
          var items = [];
          $.each( data, function( key, val ) {
            if ( key == "sell_order_table") {

                $( "#caseTable" ).remove();


                
                $( val ).insertAfter(".caseTableHead");

                $('.market_commodity_orders_table:not([id != ""])').attr('id', "caseTable");
            }
          });

        });
      });
  
    },

    getKeyTable : function ( ) {

      var keyType = $("#keySelector").val();
  
      main.getters.getValveUrlForKeyTable ( keyType, function( valveUrl ) {
        
        $.getJSON( valveUrl, function( data ) {
          var items = [];
          $.each( data, function( key, val ) {
            if ( key == "sell_order_table") {
                
                $( "#keyTable" ).remove();

                

                $( val ).insertAfter(".caseTableHead");
                $('.market_commodity_orders_table:not([id != ""])').attr('id', "keyTable");

            }
          });

        });
      });
  
    },

    getValveUrlForCaseTable : function( caseSelected, callback ) {

      var valveUrl = "";

      if ( caseSelected == "Operation Breakout Weapon Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=14962905";
        callback( valveUrl );

      } else if ( caseSelected == "Winter Offensive Weapon Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=3438414";
        callback( valveUrl );

      } else if ( caseSelected == "eSports 2013 Winter Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=15490345";
        callback (valveUrl );

      } else if ( caseSelected == "eSports 2014 Summer Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=15490346";
        callback( valveUrl );

      } else if ( caseSelected == "eSports 2013 Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=1269049";
        callback ( valveUrl );

      } else if ( caseSelected == "Huntsman Weapon Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=8987853";
        callback (valveUrl );

      } else if ( caseSelected == "Operation Phoenix Weapon Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=7177182";
        callback( valveUrl );

      } else if ( caseSelected == "Operation Bravo Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=1546282";
        callback (valveUrl );

      } else if ( caseSelected == "CS:GO Weapon Case" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=1275323";
        callback (valveUrl );

      } else if ( caseSelected == "CS:GO Weapon Case 2" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=1913364";
        callback (valveUrl );

      } else if ( caseSelected == "CS:GO Weapon Case 3" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=6820494";
        callback (valveUrl );

      } else if ( caseSelected == "Operation Vanguard Weapon Case" ) {
        
        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=23853214";
        callback (valveUrl );
      }
    
    },

    getValveUrlForKeyTable : function( keySelected, callback ) {

      var valveUrl = "";

      if ( keySelected == "Operation Breakout Case Key" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=14946477";
        callback( valveUrl );

      } else if ( keySelected == "Operation Phoenix Case Key" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=7177198";
        callback( valveUrl );

      } else if ( keySelected == "Huntsman Case Key " ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=8987880";
        callback( valveUrl );

      } else if ( keySelected == "Winter Offensive Case Key" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=3440102";
        callback( valveUrl );

      } else if ( keySelected == "eSports Key" ) {

        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=3440751";
        callback( valveUrl );

      } else if ( keySelected == "CS:GO Case Key" ) {
        
        valveUrl = "http://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=1274951";
        callback( valveUrl );        
      
      }

    },

    getCasePriceToSell : function ( callback ) {
      
      var priceToSellAt = '';

      main.converters.transformTableToArray(function( tableArray ) {
        //this could break under the sinario that there are lessthan 50 items in the "or more" section
        //but shoulnd't be a problem 99.9% of the time.
        for (var itemNum in tableArray) {

          if ( tableArray[itemNum][1] > 50 ) {

            priceToSellAt = tableArray[itemNum][0];
            

            
            main.valveFuncs.getPriceValueAsInt( priceToSellAt , function( priceAsInt ){
              main.valveFuncs.findPostPriceFromInt( priceAsInt, function( postPrice ) {
                priceToSellAt = postPrice - 1;
              });
            });

            
            break;
          }
        }


        callback( priceToSellAt );
      });
    
    },


    json: {

      numOfItem : function( itemName, callback ) {

        for (var item in main.caseJson) {

         if (item == itemName){

          var x = main.caseJson[item].itemId.length;
          
          callback(x);
         }

        }
      
      }
    },

    inputFields: {

      getCustomSellerPriceInput : function ( callback ) {
        
        var stringPrice = $('#customSellerPriceInput').val()
        
        main.valveFuncs.getPriceValueAsInt(stringPrice, function( priceAsInt ){
          
          callback ( priceAsInt );
        
        });
      
      },
      
      getCustomBuyerPriceInput : function ( callback ) {
        
        var stringPrice = $('#customBuyerPriceInput').val()
        
        main.valveFuncs.getPriceValueAsInt(stringPrice, function( priceAsInt ){
          
          callback ( priceAsInt );
        
        });
      
      },

      getCustomSellerKeyPriceInput : function ( callback ) {
        
        var stringPrice = $('#customSellerKeyPriceInput').val()
        
        main.valveFuncs.getPriceValueAsInt(stringPrice, function( priceAsInt ){
          
          callback ( priceAsInt );
        
        });
      
      },

      getCustomBuyerKeyPriceInput : function ( callback ) {
        
        var stringPrice = $('#customBuyerKeyPriceInput').val()
        
        main.valveFuncs.getPriceValueAsInt(stringPrice, function( priceAsInt ){
          
          callback ( priceAsInt );
        
        });
      
      }

    }

  },

  converters: {

    getCaseJson : function( callback ) {

      for ( var itemid in main.invJson ) {


        var rgItem = main.invJson[itemid];
        if ( rgItem.type == "Base Grade Container") {

          var itemName = rgItem.name;
          var itemId = rgItem.id;

          
          if( main.caseJson.hasOwnProperty(itemName) ){

            main.caseJson[itemName].itemId.push(itemId);

            delete main.invJson[itemid]

          } else {
            var itemIdJson = {itemId: [itemId]};
            main.caseJson[itemName] = itemIdJson;

            delete main.invJson[itemid]

          }
        }

      }

      callback('');

    },

    getGunJson : function( callback ) {

      for ( var itemid in main.invJson ) {

        var rgItem = main.invJson[itemid];//
        if (rgItem.type != "Base Grade Container" && rgItem.type != "Extraordinary Collectible" && rgItem.type != "Base Grade Key"  && rgItem.type != "Base Grade Pass") {
        
          main.converters.checkIfGunIsSafeToSell( rgItem.market_hash_name, function( safe ) {
            if ( safe === true ) { 

              var itemMarketHash = rgItem.market_hash_name;
              var itemId = rgItem.id;

              
              //if gunInvJson exists
              if( main.gunJson.hasOwnProperty("gunAssets") ){

                main.gunJson["gunAssets"].itemId.push([itemMarketHash,itemId]);
                
                delete main.invJson[itemid]
              
              //if gunInvJson doesn't exist
              } else {
                var itemIdJson = {itemId: [[itemMarketHash,itemId]]};
                
                main.gunJson["gunAssets"] = itemIdJson;
                delete main.invJson[itemid]
              }

            } 
          });
        }
      }

      callback('');
    },

    getKeyJson : function( callback ) {

      for ( var itemid in main.invJson ) {


        var rgItem = main.invJson[itemid];
        if ( rgItem.type == "Base Grade Key") {

          var itemName = rgItem.name;
          var itemId = rgItem.id;

          
          if( main.keyJson.hasOwnProperty(itemName) ){

            main.keyJson[itemName].itemId.push(itemId);

            delete main.invJson[itemid]

          } else {
            var itemIdJson = {itemId: [itemId]};
            main.keyJson[itemName] = itemIdJson;

            delete main.invJson[itemid]

          }
        }

      }

      callback('');

    },

    checkIfGunIsSafeToSell : function(gun, callback) {
      var safeStatus = ""
      

      for (var counter in itemsToNotSell) {

        var item = itemsToNotSell[counter];
          
        if ( item == gun ) {
          safeStatus = false
          break
        
        } else {
          safeStatus = true;
          
        }
      }

      callback ( safeStatus );
    },

    transformTableToArray : function ( callback ) {

      var tableArray = [];



      $('#caseTable tbody tr').each(function() {

        var x = $(this).find("td:nth-child(1)").text();
        var y = $(this).find("td:nth-child(2)").text();

        //removes the table titles from array
        if ( x != "" ) {
          y = parseInt( y );

          var tempArr = [x, y];

          tableArray.push( tempArr );
        }
      });

      
      callback( tableArray );
    },

  },


  seller: {

    sellItem : function(assetId, postPrice, callback) {

      this.m_bWaitingOnServer = true;
      
      $J.ajax( {
        url: 'https://steamcommunity.com/market/sellitem/',
        type: 'POST',
        data: {
          sessionid: g_sessionID,
          appid: 730,
          contextid: 2,
          assetid: assetId,
          amount: 1,
          price: postPrice//522
        },
        crossDomain: true,
        xhrFields: { withCredentials: true }
      }).done( function ( data ) {

        this.m_bWaitingForUserToConfirm = false;
        this.m_bWaitingOnServer = false;

        //UserYou.ReloadInventory( 730, 2 );
        callback('done');

      }).fail( function( jqxhr ) {

        var data = $J.parseJSON( jqxhr.responseText );
        SellItemDialog.OnFailure( { responseJSON: data } );
        UserYou.ReloadInventory( 730, 2 );

      });
  
    },


    startGunLoop : function( inMainLoopvar, callback ) {
      
      var gunInvJson = main.gunJson;
      if ( gunInvJson.gunAssets != undefined ) {

        var numToSell = Object.keys(main.gunJson.gunAssets.itemId).length
        var number = 0;

        var inMainLoop = inMainLoopvar;

        if ( numToSell <= 0 && inMainLoop ) {
          callback('');
        }

        main.seller.sellLoopGunMain(gunInvJson,numToSell,number, function( doneStatus ) {
          
          if ( inMainLoop ) {
           
            callback('');
          
          } else {

            UserYou.ReloadInventory( 730, 2 );  
            callback('');
        
          } 
          

        });



      } else {
        callback('');
      }
      
    },

    sellLoopGunMain : function(gunInvJson, numbToSell, number, callback) {

      main.seller.sellLoopGunSub(gunInvJson, numbToSell, number, function(err) {
          
        if (err != 'done') {

          main.seller.sellLoopGunMain(gunInvJson,numbToSell,err, function() {
            callback('done');
          });
        
        } else {

          callback('done');
        
        }
      });
    
    },

    sellLoopGunSub : function (gunInvJson,numbToSell,number, callback) {

      var gunName = gunInvJson.gunAssets.itemId[0][0];
      var gunAsset = gunInvJson.gunAssets.itemId[0][1];

      gunName = gunName.toString();

      main.getters.gunLowestPrice(gunName, function(lowestPrice) {
        
        main.valveFuncs.getPriceValueAsInt(lowestPrice, function( priceAsInt ){

          main.valveFuncs.findPostPriceFromInt( priceAsInt, function( postPrice ) {

            var postPriceMinusOnePenny = postPrice - 1;

            main.seller.sellItem(gunAsset, postPriceMinusOnePenny, function(){
              gunInvJson.gunAssets.itemId.splice(0,1);
                  
              number = number + 1;

              if (number < numbToSell) {
                  callback(number);
              } else {
                  
                  callback('done');
              
              }
            });

          });

        });


      });
    
    },

    startAllCaseLoop : function( inMainLoopvar, callback ) {

      var caseInvJson = main.caseJson;
      var currentCaseType = $("#caseSelector").val();
      var number = 0;

      var inMainLoop = inMainLoopvar;

      main.getters.json.numOfItem( currentCaseType, function( numToSell ) {

        main.getters.getCasePriceToSell(function( priceToSell ){

          main.seller.sellLoopCaseMain(caseInvJson, currentCaseType, priceToSell, numToSell, number, function( doneStatus ){
            
            if ( inMainLoop == true ) {
            
            var numOfItemsInCaseSelector = $('#caseSelector > option').length;
            
            callback(numOfItemsInCaseSelector);
            
            } else if (inMainLoop == false ) {

              UserYou.ReloadInventory( 730, 2 );  
              callback('');
          
            }
          
          });
        
        });

      });

    },

    sellLoopCaseMain : function(caseInvJson, currentCaseType, priceToSell, numToSell, number, callback) {
      
      main.seller.sellLoopCaseSub(caseInvJson, currentCaseType, priceToSell, numToSell, number, function(err) {
          
          if (err != 'done') {

            main.seller.sellLoopCaseMain(caseInvJson, currentCaseType, priceToSell, numToSell, err, function(){
              callback('done');
            });
                 
          } else {

            callback('done');
          
          }
      });
    
    },

    sellLoopCaseSub : function (caseInvJson, currentCaseType, priceToSell, numToSell, number, callback) {

      var firstAsset = caseInvJson[currentCaseType].itemId[0];
      main.seller.sellItem(firstAsset, priceToSell, function() {
        caseInvJson[currentCaseType].itemId.splice(0,1);
        
        main.htmlEdit.bind.handleCaseSelectorSellChange(function() {
          number = number + 1;
        
          if (number < numToSell) {
              callback(number);
          } else {
              
              UserYou.ReloadInventory( 730, 2 );
              callback('done');
          }
        });
      });
    
    },


    sellLoopKeyMain : function ( keyInvJson, currentKeyType, priceToSell, numToSell, number ) {
      
      main.seller.sellLoopKeySub(keyInvJson, currentKeyType, priceToSell, numToSell, number, function(err) {
          
          if (err != 'done') {
            
            main.seller.sellLoopKeyMain( keyInvJson, currentKeyType, priceToSell, numToSell, err);
          
          }
      });

    },

    sellLoopKeySub : function ( keyInvJson, currentKeyType, priceToSell, numToSell, number, callback ) {
      
      var firstAsset = keyInvJson[currentKeyType].itemId[0];
      main.seller.sellItem(firstAsset, priceToSell, function() {
        keyInvJson[currentKeyType].itemId.splice(0,1);
        
        main.htmlEdit.bind.handleKeySelectorSellChange(function() {
          number = number + 1;
        
          if (number < numToSell) {
              callback(number);
          } else {

              UserYou.ReloadInventory( 730, 2 );
              callback('done');
          }
        });
      });
    
    },

    sellAllItemsMain : function () {

      needToConfirm = true;

      main.seller.startGunLoop( true, function() {

          var numOfItemsInCaseSelector = $('#caseSelector > option').length;

          if ( numOfItemsInCaseSelector >= 1 ) {

            main.seller.sellAllItemsSub( function(data) {
              
              main.seller.waitTillNextCheck();
            });

          } else {

            main.seller.waitTillNextCheck();
          
          }


      });
    },

    sellAllItemsSub : function ( callback ) {

        setTimeout(function() {


        main.seller.startAllCaseLoop( true, function( numCaseTypesLeft ) {
          
          if ( numCaseTypesLeft >= 1) {

            main.seller.sellAllItemsSub(function(){
              callback('done')
            });

          } else {

            callback('done');
          }

        });

      },5000);

    },


    waitTillNextCheck : function ( ) {

      console.log('waiting..');

      setTimeout(function() {
        console.log('reloading page..');
        main.reloadPage();

        setTimeout(function() {

          console.log('running main loop..');
          
          main.seller.sellAllItemsMain();

        }, 1000 * 10);

      },1000 * 60 * 30);

    }

  },


  valveFuncs: {

    getPriceValueAsInt : function( strAmount, callback ) {
      
      var nAmount;

      // strip the currency symbol, set commas to periods, set .-- to .00
      strAmount = strAmount.replace(GetCurrencySymbol(GetCurrencyCode(g_rgWalletInfo['wallet_currency'])), '' ).replace( ',', '.' ).replace( '.--', '.00');

      var flAmount = parseFloat( strAmount ) * 100;
      nAmount = Math.round( isNaN(flAmount) ? 0 : flAmount );

      nAmount = Math.max( nAmount, 0 );

      callback (nAmount);
    
    },

    findPostPriceFromInt: function( price, callback ) {

      var inputValue = price;
      var nAmount = inputValue;

      if ( inputValue > 0 && nAmount == parseInt( nAmount ) )
      {

        // Calculate what the seller gets
        var publisherFee = typeof FAKEDATABITCH != 'undefined' ? this.m_item.market_fee : g_rgWalletInfo['wallet_publisher_fee_percent_default'];
        var feeInfo = CalculateFeeAmount( nAmount, publisherFee );
        nAmount = nAmount - feeInfo.fees;
        
        callback (nAmount);

      } 
    
    },

    intPriceToString : function ( price ) {
  
      var priceString = v_currencyformat( price, GetCurrencyCode( g_rgWalletInfo['wallet_currency'] ) );

      return priceString;
    
    }
  
  },

  htmlEdit: {

    bind: {

      sellAllGunsButton : function( ) {
        
        $("#customSellGunButton").bind('click', function() {

          main.seller.startGunLoop( false, function() {

          });
        
        });
      
      },

      sellAllCasesButton : function( ) {
        
        $("#customSellAllCaseButton").bind('click', function() {

          main.seller.startAllCaseLoop( false );

        });
      
      },

      sellAllItemsButton : function ( ) {
        
        $("#customSellAllItemsButton").bind('click', function() {

          main.seller.sellAllItemsMain();
        
        });
      
      },

      customSellButton : function( ) {
       
        $("#customSellButton").bind('click', function() {
          
          var caseInvJson = main.caseJson;
          var currentCaseType = $("#caseSelector").val();
          var numToSell = $("#caseCountSelector").val();

          main.getters.inputFields.getCustomSellerPriceInput(function( priceToSell ) {
          
            var number = 0;
            main.seller.sellLoopCaseMain(caseInvJson, currentCaseType, priceToSell, numToSell, number, function(){});
        
          });
        });
      
      },

      customKeySellButton : function( ) {
       
        $("#customKeySellButton").bind('click', function() {
          

          var keyInvJson = main.keyJson;
          var currentkeyType = $("#keySelector").val();
          var numToSell = $("#keyCountSelector").val();

          main.getters.inputFields.getCustomSellerKeyPriceInput(function( priceToSell ) {
          
            var number = 0;
            main.seller.sellLoopKeyMain(keyInvJson, currentkeyType, priceToSell, numToSell, number);
        
          });
        });
      
      },

      handleCaseSelectorSellChange : function ( callback ) {
        
        main.htmlEdit.populateCaseCountSelector();

        var caseInvJson = main.caseJson;
        var caseType = $("#caseSelector").val();

        if (caseInvJson[caseType].itemId.length <= 0) {

          $("#caseSelector option[value=" + caseType+ "]").remove();

          main.htmlEdit.bind.handleCaseSelectorChange();

        }

        callback('');
      
      },

      handleKeySelectorSellChange : function ( callback ) {
        
        main.htmlEdit.populateKeyCountSelector();

        var keyInvJson = main.keyJson;
        var keyType = $("#keySelector").val();

        if (keyInvJson[keyType].itemId.length <= 0) {

          $("#keySelector option[value=" + keyType+ "]").remove();

          main.htmlEdit.bind.handleKeySelectorChange();

        }

        callback('');
      
      },

      handleCaseSelectorChange : function ( ) {

        //if still items in case selector
        var numOfItemsInCaseSelector = $('#caseSelector > option').length;
        
        if ( numOfItemsInCaseSelector > 0 ) {

          main.htmlEdit.populateCaseCountSelector();

          main.getters.getCaseTable( );
        }
      },

      handleKeySelectorChange : function ( ) {
        
        //if still items in key selector
        var numOfItemsInKeySelector = $('#keySelector > option').length;
        
        if ( numOfItemsInKeySelector > 0 ) {

          main.htmlEdit.populateKeyCountSelector();

          main.getters.getKeyTable( );
        }
      },

      caseSelectorChange : function( ) {
        
        
        $('#caseSelector').bind('change', function(){

          main.htmlEdit.bind.handleCaseSelectorChange();

        });
      
      },

      keySelectorChange : function( ) {
        
        $('#keySelector').bind('change', function(){

          main.htmlEdit.bind.handleKeySelectorChange();
        
        });
      
      },


      customSellerPriceInput : function( ) {

        $('#customSellerPriceInput').bind( 'keyup', function(){
          
          main.getters.inputFields.getCustomSellerPriceInput(function( inputValue ){
            var nAmount = inputValue;

            
            if ( inputValue > 0 && nAmount == parseInt( nAmount ) ) {
              // Calculate what the buyer pays
              var publisherFee = typeof FAKEDATABITCH != 'undefined' ? this.m_item.market_fee : g_rgWalletInfo['wallet_publisher_fee_percent_default'];
              var info = CalculateAmountToSendForDesiredReceivedAmount( nAmount, publisherFee );
              var zz = v_currencyformat( info.amount, GetCurrencyCode( g_rgWalletInfo['wallet_currency'] ) );
              console.log(zz);
            $('#customBuyerPriceInput').val(zz);
            }
          });

      
        });

      },

      customBuyerPriceInput : function( ) {
        $('#customBuyerPriceInput').bind( 'keyup', function(){

          main.getters.inputFields.getCustomBuyerPriceInput(function( inputValue ){
          var nAmount = inputValue;

          if ( inputValue > 0 && nAmount == parseInt( nAmount ) ) {
            // Calculate what the seller gets
            var publisherFee = typeof FAKEDATABITCH != 'undefined' ? this.m_item.market_fee : g_rgWalletInfo['wallet_publisher_fee_percent_default'];
            var feeInfo = CalculateFeeAmount( nAmount, publisherFee );
            nAmount = nAmount - feeInfo.fees;
            var zz = v_currencyformat( nAmount, GetCurrencyCode( g_rgWalletInfo['wallet_currency'] ) );

            $('#customSellerPriceInput').val(zz);// = v_currencyformat( nAmount, GetCurrencyCode( g_rgWalletInfo['wallet_currency'] ) );

          } 
          });

        });
      
      },

      customSellerKeyPriceInput : function( ) {

        $('#customSellerKeyPriceInput').bind( 'keyup', function(){
          
          main.getters.inputFields.getCustomSellerKeyPriceInput(function( inputValue ){
            var nAmount = inputValue;
            
            if ( inputValue > 0 && nAmount == parseInt( nAmount ) ) {
              // Calculate what the buyer pays
              var publisherFee = typeof BLAH != 'undefined' ? this.m_item.market_fee : g_rgWalletInfo['wallet_publisher_fee_percent_default'];
              var info = CalculateAmountToSendForDesiredReceivedAmount( nAmount, publisherFee );
              var buyerPrice = v_currencyformat( info.amount, GetCurrencyCode( g_rgWalletInfo['wallet_currency'] ) );

            $('#customBuyerKeyPriceInput').val(buyerPrice);
            }
          });

      
        });

      },

      customBuyerKeyPriceInput : function( ) {
        $('#customBuyerKeyPriceInput').bind( 'keyup', function(){

          main.getters.inputFields.getCustomBuyerKeyPriceInput(function( inputValue ){
          var nAmount = inputValue;

          if ( inputValue > 0 && nAmount == parseInt( nAmount ) ) {
            // Calculate what the seller gets
            var publisherFee = typeof BLAH != 'undefined' ? this.m_item.market_fee : g_rgWalletInfo['wallet_publisher_fee_percent_default'];
            var feeInfo = CalculateFeeAmount( nAmount, publisherFee );
            nAmount = nAmount - feeInfo.fees;
            var sellerPrice = v_currencyformat( nAmount, GetCurrencyCode( g_rgWalletInfo['wallet_currency'] ) );

            $('#customSellerKeyPriceInput').val(sellerPrice);

          } 
          });

        });
      
      }

    },

    remove: {

      removeAllHtmlElements : function ( ) {

        main.htmlEdit.remove.allGunsButton();
        main.htmlEdit.remove.allCaseButton();
        main.htmlEdit.remove.allItemsButton();
        
        main.htmlEdit.remove.keySellBar();
        main.htmlEdit.remove.caseSellBar();
        
        main.htmlEdit.remove.tableTitles();
        main.htmlEdit.remove.caseTable();
        main.htmlEdit.remove.keyTable();

      },
      
      allGunsButton : function ( ) {

        $("#gunSellDiv").remove();

      },

      allCaseButton : function ( ) {

        $("#allCaseSellDiv").remove();

      },

      allItemsButton: function ( ) {

        $("#allItemsSellDiv").remove();
      
      },

      tableTitles : function ( ) {
        
        $( ".caseTableHead" ).remove();
        
        $( ".keyTableHead" ).remove();
      
      },

      keySellBar : function ( ) {
        
        $( "#keySellDiv" ).remove();

      },

      caseSellBar : function ( ) {
        
        $( "#caseSellDiv" ).remove();

      },

      caseTable : function ( ) {

        $( "#caseTable" ).remove();

      },

      keyTable : function ( ) {

        $( "#keyTable" ).remove();

      }


    },

    addAllHtmlElements : function ( )  {

      main.htmlEdit.addTableStyle();

      main.htmlEdit.addKeySellBar();
      main.htmlEdit.addCaseSellBar();

      main.htmlEdit.addAllItemsButton();
      main.htmlEdit.addAllGunsButton();
      main.htmlEdit.addAllCaseButton();


      main.htmlEdit.addTableTitles();

    },

    addAllHtmlBindings : function ( ) {

      main.htmlEdit.bind.sellAllGunsButton();
      main.htmlEdit.bind.sellAllCasesButton();
      main.htmlEdit.bind.sellAllItemsButton();

      main.htmlEdit.bind.customSellButton();
      main.htmlEdit.bind.customKeySellButton();

      main.htmlEdit.bind.caseSelectorChange();
      main.htmlEdit.bind.keySelectorChange();
      
      main.htmlEdit.bind.customSellerPriceInput();
      main.htmlEdit.bind.customBuyerPriceInput();

      main.htmlEdit.bind.customBuyerKeyPriceInput();
      main.htmlEdit.bind.customSellerKeyPriceInput();
    
    },

    addTableStyle : function ( ) {

      $("<style>.market_commodity_orders_table {} .market_commodity_orders_table th {} \
        .market_commodity_orders_table tr:nth-child(2n) {background-color: #262626;} \
        .market_commodity_orders_table td {min-width: 100px;text-align: center;} \
        .market_commodity_orders_table th {font-size: 16px;font-weight: normal;margin: \
        0;min-width: 100px;text-align: center;} \
        </style>").insertAfter("#inventory_logos");
      
      $("<style>.market_commodity_orders_table {display: inline-block;}</style>").insertAfter("#inventory_logos");
      
      $("<style>#keyTable {float: right; margin-right: 250px;}</style>").insertAfter("#inventory_logos");
      

      $("<style>.caseTableHead { margin-left: 50px; }</style>").insertAfter("#inventory_logos");
      $("<style>.keyTableHead  { float: right; margin-right: 305px; }</style>").insertAfter("#inventory_logos");

    },

    addCaseSellBar : function ( ) {

      $("<div id=\"caseSellDiv\"class=\"filter_ctn inventory_filters\"> \
      <select id=\"caseSelector\" style=\"width: 250px\"> \
      </select><select id=\"caseCountSelector\" style=\"width: 75px\" ></select> \
      <input id=\"customSellerPriceInput\" class=\"market_dialog_input\" placeholder=\"what you receive\" \
       style=\"height: 16px\" type=\"text\" name=\"market_sell_currency_input\"> \
      <input id=\"customBuyerPriceInput\" class=\"market_dialog_input\" placeholder=\"what buyer pays\" \
      style=\"height: 16px\" type=\"text\" name=\"market_sell_currency_input\"> \
      <div id=\"customSellButton\" class=\"btn_green_white_innerfade btn_small_wide\"> \
      <span style=\"font-size: 13px\">Sell</span> \
      </div></div>").insertAfter("#inventory_logos");
  
    },
    
    addKeySellBar : function ( ) {
      
      $("<div id=\"keySellDiv\"class=\"filter_ctn inventory_filters\"> \
      <select id=\"keySelector\" style=\"width: 250px\"> \
      </select><select id=\"keyCountSelector\" style=\"width: 75px\" ></select> \
      <input id=\"customSellerKeyPriceInput\" class=\"market_dialog_input\" placeholder=\"what you receive\" \
       style=\"height: 16px\" type=\"text\" name=\"market_sell_currency_input\"> \
      <input id=\"customBuyerKeyPriceInput\" class=\"market_dialog_input\" placeholder=\"what buyer pays\" \
      style=\"height: 16px\" type=\"text\" name=\"market_sell_currency_input\"> \
      <div id=\"customKeySellButton\" class=\"btn_green_white_innerfade btn_small_wide\"> \
      <span style=\"font-size: 13px\">Sell</span> \
      </div></div>").insertAfter("#inventory_logos");
    },
 
    addAllGunsButton : function ( ) {
      $("<div id=\"gunSellDiv\"class=\"filter_ctn inventory_filters\"> \
      <div id=\"customSellGunButton\" class=\"btn_green_white_innerfade btn_small_wide\"><span \
      style=\"font-size: 13px\">Sell All Current Guns</span> \
      </div></div>").insertAfter("#inventory_logos");

    },

    addAllCaseButton : function ( ) {

      $("<div id=\"allCaseSellDiv\"class=\"filter_ctn inventory_filters\"> \
      <div id=\"customSellAllCaseButton\" class=\"btn_green_white_innerfade \
      btn_small_wide\"><span style=\"font-size: 13px\">Sell All Selected Cases</span> \
      </div></div>").insertAfter("#inventory_logos");

    },
    
    addAllItemsButton : function ( ) {
      $("<div id=\"allItemsSellDiv\"class=\"filter_ctn inventory_filters\"> \
      <div id=\"customSellAllItemsButton\" class=\"btn_green_white_innerfade \
      btn_small_wide\"><span style=\"font-size: 13px\">Start Main Sell Loop</span> \
      </div></div>").insertAfter("#inventory_logos");
    },

    addTableTitles : function ( ) {
      
      $( "<h2 class=\"caseTableHead\">Case Table</h2>").insertAfter("#caseSellDiv");
      $( "<h2 class=\"keyTableHead\">Key Table</h2>").insertAfter("#caseSellDiv");

    },

    populateCaseSelector : function ( ) {
      
      var caseInvJson = main.caseJson;

      for (var itemType in caseInvJson) {
        
        if ( $("#caseSelector").exists() ) {

          $("#caseSelector").append(new Option(itemType, itemType));
          
        } else {
          //something broke!
          alert('case selector not created! (something broke!)');
        }
      }
    
    },

    populateKeySelector : function ( ) {
      
      var keyInvJson = main.keyJson;

      for (var itemType in keyInvJson) {
        if ( $("#keySelector").exists() ) {

          $("#keySelector").append(new Option(itemType, itemType));
          
        } else {
          //something broke!
          alert('key selector not created! (something broke!)');
        }
      }

    },

    populateCaseCountSelector : function ( ) {

      var caseInvJson = main.caseJson;
      var number = 0;
      var itemType = $("#caseSelector").val();

      $("#caseCountSelector").empty();
      
      for (var assetId in caseInvJson[itemType].itemId) {

        number = number + 1;
        var id = caseInvJson[itemType].itemId[assetId];

        $("#caseCountSelector").append(new Option(number, number));
      }
    
    },

    populateKeyCountSelector : function ( ) {
      
      var keyInvJson = main.keyJson;
      var number = 0;
      var itemType = $("#keySelector").val();
      
      $("#keyCountSelector").empty();

      for (var assetId in keyInvJson[itemType].itemId) {

        number = number + 1;
        var id = keyInvJson[itemType].itemId[assetId];

        $("#keyCountSelector").append(new Option(number, number));
      }
    
    },

    populateCaseElements : function ( ) {

      main.htmlEdit.populateCaseSelector();
      
      main.getters.getCaseTable();

      main.htmlEdit.populateCaseCountSelector();
    
    },

    populateKeyElements : function ( ) {

      main.htmlEdit.populateKeySelector();

      main.getters.getKeyTable();

      main.htmlEdit.populateKeyCountSelector();

    }

  }


}

function askConfirm() {
    if (needToConfirm) {
        return "askConfirm"; 
    }
}