//
// Hop Rhizome Tracker v1.0
// Author: Charles Birk
// Year: 2016

var timings = 0
var hoptrack = function ()
{
 $.ajax({
  url: 'api.php',
  data: "",
  dataType: 'json',
  success: function(data)
  {
   // Create an index to iterate through the array
   var i = 0;
   // Empty array declaration
   var outArray = "";
   outArray += "<table>" +
    "<tr><th>ITEM NUMBER</th>" +
     "<th>DESCRIPTION</th>" +
      "<th>PRICE</th>" +
       "<th>AVAILABLE TO SELL</th>" +
        "<th>AVAILABLE TO RESERVE</th>" +
         "<th>QUANTITY ON HAND</th>" +
          "<th>ON ORDER</th>" +
           "<th>ON SPECIAL ORDER</th>" +
            "</tr>";
            // for loop to iterate through the array
            for (i=0; i < data.length; i++) {
             var item_no     = data[i].item_no;
             var desc = data[i].description;
             var description = desc.substring(desc.indexOf(":") + 1,desc.length);
             var price       = parseFloat(data[i].price);
             var qoh	= parseInt(data[i].quantity_on_hand);
             var qoo	= parseInt(data[i].quantity_on_order);
             var so	= parseInt(data[i].specialorder);

             var ats = 0;
             var atr = 0;
             var soString = "0";
             if ( !isNaN(so) ) {
              ats = qoh - so;
              atr = (qoh + qoo) - so;
              soString = so.toString();
             }
             else {
              ats = qoh;
              atr = qoh + qoo;
             }


             var notintheRed = "</td><td>";
             var actualTd	= "";
             if (ats < 0)
              actualTd = "</td><td class=\"negative\" bgcolor=\"#B22222\">";
             else
              actualTd = notintheRed;
             outArray +=  "<tr><td>" + 
              item_no + 
               "</td><td>" + 
                description + 
                 "</td><td>" + 
                  price + 
                   actualTd +
                    ats +
                     "</td><td>" +
                      atr +
                       "</td><td>" +
                        qoh +
                         "</td><td>" +
                          qoo +
                           "</td><td>" +
                            soString +
                             "</td></tr>";
            }
            // Display the contents of the array
            outArray += "</table>";
            $('#output').html(outArray);
            console.log(outArray);
            //console.log("Updated!" + timings++);
  }
 });
};
hoptrack();
setInterval(hoptrack, 3000);
