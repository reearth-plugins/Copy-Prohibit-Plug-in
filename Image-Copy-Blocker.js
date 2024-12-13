reearth.ui.show(`
  <style>
    body {
      margin: 8px;
    }
    #imga{
      pointer-events: none;
      display: none;
      width: 100%;
      height: 100%;
      max-width:100%;
      max-height:200px;
      object-fit: cover;
      object-position: center center;
    }
    
    #blankIcon {
      pointer-events: none;
      display: block;
      pointer-events: none;
      width:auto;
      height:auto;
      max-width:100%;
      max-height:100%;
      margin: auto;
    }


  .relative { 
  position: relative;
  width:auto;
  }


  .description{
    color: rgb(180, 180, 180);
    font-size: 12px;
  }


  </style>
  <div id="wrapper">

    <div class="relative">
      <div class = "description">
      </div>
      <img id="imga" src="">
      <img id="blankIcon" src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22css-1qikrqu%22%20style%3D%22transition-duration%3A%200.3s%3B%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5%202H19C20.6569%202%2022%203.34315%2022%205V14.9971C22%2014.999%2022%2015.001%2022%2015.0029V19C22%2020.6569%2020.6569%2022%2019%2022H5C3.34315%2022%202%2020.6569%202%2019V5C2%203.34315%203.34315%202%205%202ZM20%2012.5858V5C20%204.44772%2019.5523%204%2019%204H5C4.44772%204%204%204.44772%204%205V19C4%2019.4288%204.2699%2019.7946%204.64909%2019.9367L15.2929%209.29289C15.6834%208.90236%2016.3166%208.90236%2016.7071%209.29289L20%2012.5858ZM7.41421%2020L16%2011.4142L20%2015.4142V19C20%2019.5523%2019.5523%2020%2019%2020H7.41421ZM6%208.5C6%209.88071%207.11928%2011%208.5%2011C9.88071%2011%2011%209.88071%2011%208.5C11%207.11928%209.88071%206%208.5%206C7.11928%206%206%207.11928%206%208.5ZM8.5%209C8.77614%209%209%208.77614%209%208.5C9%208.22386%208.77614%208%208.5%208C8.22386%208%208%208.22386%208%208.5C8%208.77614%208.22386%209%208.5%209Z%22%20fill%3D%22%234A4A4A%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" width="10%" heigh="24px">
    </div>
  
  </div>
    


  <script>
  let infoboxProperty, propId;

    window.addEventListener("message", function (e) {
      if (e.source !== parent) return;
      console.log(e);
      prop = e.data.prop.property.default;
      propId = e.data.prop.propertyId;
      reearth = e.source.reearth;
      layers = e.source.reearth.layers.layers;



      //get infobox property
      for (let i = 0; i < layers.length; i++){
        var infobox = layers[i].infobox;
        var found = infobox.blocks.find(e => e.propertyId === propId);
        if (found){
          infoboxProperty = infobox.property;
          break;
        }
      }


      console.log(infoboxProperty);
      if(infoboxProperty.default && infoboxProperty.default.size && infoboxProperty.default.size === "large"){
        infoboxSize = "340px";
      }else{
        infoboxSize = "200px";
      }






      //image url
      if (prop.imageUrl){
        document.getElementById("imga").src = prop.imageUrl;
        document.getElementById("imga").style.display ="block";
        document.getElementById("blankIcon").style.display ="none";
        document.getElementById("imga").style.maxHeight =infoboxSize;
      } else{
        document.getElementById("imga").src = "";
        document.getElementById("imga").style.display ="none";
        if (reearth.scene.inEditor) {
          document.getElementById("blankIcon").style.display ="block";
        }else{
          document.getElementById("blankIcon").style.display ="none";
        }
      }

      // fullsize
      if (prop.fullSize){
        document.body.style.margin = "0px";
      } else{
        document.body.style.margin = "8px";
      }

      // imageSize
      if (prop.imageSize == "cover"){
        document.getElementById("imga").style.objectFit = "cover";
      } else if (prop.imageSize == "contain"){
        document.getElementById("imga").style.objectFit = "contain";
      };


      //object-position
      document.getElementById("imga").style.objectPosition = prop.imagePositionX + " " + prop.imagePositionY;





      //description
      var title = document.getElementsByClassName("description")[0]
      if (prop.title){
        title.innerHTML = prop.title;
      }else{
        title.innerHTML = "";
      }

      if (infoboxProperty.default.typography){
        // font family
        if(infoboxProperty.default.typography.fontFamily === null){
          title.style.fontFamily = null; 
        }else{
          title.style.fontFamily = infoboxProperty.default.typography.fontFamily;
        }

        //size
        if(infoboxProperty.default.typography.fontSize === null){
          title.style.fontSize = "12px"; 
        }else{
          title.style.fontSize = infoboxProperty.default.typography.fontSize + "px";
        }

        // color
        if(infoboxProperty.default.typography.color === null){
          title.style.color = "rgb(180, 180, 180)"; 
        }else{
          title.style.color = infoboxProperty.default.typography.color;
        }

        // text-align
        if(infoboxProperty.default.typography.textAlign === null){
          title.style.textAlign = null; 
        }else{
          title.style.textAlign = infoboxProperty.default.typography.textAlign;
        }

        // bold
        if(infoboxProperty.default.typography.bold === true){
          title.style.fontWeight = "bold"; 
        }else{
          title.style.fontWeight = "normal";
        }

        // italic
        if(infoboxProperty.default.typography.italic === true){
          title.style.fontStyle = "italic"; 
        }else{
          title.style.fontStyle = "normal";
        }

        // underline
        if(infoboxProperty.default.typography.underline === true){
          title.style.textDecoration = "underline"; 
        }else{
          title.style.textDecoration = "none";
        }

      }else{
        title.style.fontFamily = null; 
        title.style.fontSize = "12px"; 
        title.style.color = "rgb(180, 180, 180)";
        title.style.textAlign = null; 
        title.style.fontWeight = "normal";
        title.style.fontStyle = "normal";
        title.style.textDecoration = "none";
      }
      



    });

  </script>


`);


reearth.on("update", send);
send();


function send() {
  if (reearth.block?.property?.default) {
    reearth.ui.postMessage({
      reearth: reearth,
      prop: reearth.block
    });
  }
}