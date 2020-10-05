
  var sky = document.getElementById("sky");
  var stars = [];
  var trail = [];
  var scramble = document.getElementById("scramble");
  
  function CreateStar(x, y, w, h){
      var width = w;
      var height = h;
      var star = document.createElement("div");
      star.innerHTML = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484.27 462.8"><defs><style>.cls-1{fill:#ffd400;}.cls-2{fill:#6f6f6e;}</style></defs><title>Super_Mario_-_Art_-_Super_Star</title><path class="cls-1" d="M494.12,193.51c-2.76-7.95-12-16.51-88.9-25.46-30.6-3.6-61-5.8-72.79-6.65-4.34-11-15.6-39.16-28.27-67.13C272.26,23.85,260.72,18,252.41,18s-19.92,5.88-52.06,76.4c-12.82,28-24.19,56.2-28.6,67.17-11.7.76-41.77,2.86-72.05,6.29C23.41,176.45,14.14,185.41,11.41,193a13.26,13.26,0,0,0-.81,4.46c0,8.73,9.15,24.58,57.17,68.69C90.53,287,113.91,306.7,123,314.32c-2.88,11.46-10.27,41-16.41,71.25-7.36,36-10,57.57-10,70.82,0,14.56,3.18,19,6.61,21.6,6.86,5.19,19.26,7.07,87.22-31.27,27-15.25,53.09-31.45,63.15-37.8,9.93,6.29,35.7,22.29,62.44,37.4,67.08,37.89,79.92,36.5,86.68,32.17,3.93-2.53,7.49-6.9,7.49-22.31,0-13.39-2.64-35-9.89-70.78-6.24-30.72-13.68-60.89-16.62-72.48,9-7.5,32.12-26.77,54.55-47.29,47.58-43.43,56.6-59,56.6-67.73a13.93,13.93,0,0,0-.74-4.41" transform="translate(-10.6 -17.97)"/><path class="cls-2" d="M212.54,294.41c-13-.15-14.73-22.16-14.73-48.26s2.81-45.28,15.13-46.35c14.14-1.32,14.12,21.24,14.12,47.36s-2.1,47.36-14.53,47.25" transform="translate(-10.6 -17.97)"/><path class="cls-2" d="M294.33,294.41c-12.43.12-14.56-21.16-14.56-47.25s0-48.69,14.19-47.36c12.27,1.07,15.08,20.31,15.08,46.35s-1.71,48.12-14.71,48.26" transform="translate(-10.6 -17.97)"/></svg>';
      sky.appendChild(star);
      
      star.style.position = "absolute";
      star.style.top = (y-height/2)+"px";
      star.style.left = (x-width/2)+"px";
      star.style.width = width+"px";
      star.style.height = height+"px";
      star.style.transition = "width 1s, height 1s, left 2s, top 2s";
      
      return star;
  }
  
  setInterval(function(){
    for(var i=0;i<stars.length;i++){
          stars[i].style.top = Math.round(Math.random()*window.innerHeight) +"px";
      }
  }, 1000);
  
  setInterval(function(){
      var size = Math.round(Math.random()*50);
      
      var trailStar = CreateStar(Math.round(Math.random()*window.innerWidth), Math.round(Math.random()*window.innerHeight), size, size);
      var deg = Math.round(Math.random()*360);
      trailStar.style.webkitFilter = "hue-rotate("+deg+"deg)";
      trailStar.style.opacity = Math.random();
      setTimeout(function(){
          trailStar.style.left = Math.round(Math.random()*window.innerWidth) +"px";
          trailStar.style.top = Math.round(Math.random()*window.innerHeight) +"px";
      }, 100);
      
      stars.push(trailStar);
    
      if(stars.length > 100){
          sky.removeChild(stars[0]);
          stars.splice(0,1);
      }
      
      document.body.style.background = "rgb(0,0,"+Math.round(Math.random()*100)+")";
  }, 100)
  
  document.body.onmousemove = function(ev){
      //make a trail of stars
      var size = Math.round(Math.random()*50);
      var trailStar = CreateStar(ev.pageX, ev.pageY, size, size);
      trailStar.style.opacity = Math.random();
      trailStar.style.pointerEvents = "none";
      var deg = Math.round(Math.random()*360);
      trailStar.style.webkitFilter = "hue-rotate("+deg+"deg)";
      trail.push(trailStar);
      if(trail.length > 50){
          /*for(var i = 0; i<trail.length; i++){
              sky.removeChild(trail[i]);
          }
          trail = [];*/
          sky.removeChild(trail[0]);
          trail.splice(0,1);
      }
      
      setTimeout(function(){
          trailStar.style.left = Math.round(Math.random()*window.innerWidth) +"px";
          trailStar.style.top = Math.round(Math.random()*window.innerHeight) +"px";
      }, 100)
  }
  
  scramble.onclick =function(){
      //scramble the stars!
      for(var i = 0; i<stars.length; i++){
          var left = Math.round(Math.random()*window.innerWidth);
          var top = Math.round(Math.random()*window.innerHeight);
          
          stars[i].style.left = left+"px";
          stars[i].style.top = top+"px";
      }
  }
  
  document.body.onclick = function(ev){
      if(ev.altKey == false){
          return false;
      }
      //nothing below will execute after return
      
      console.log(ev);
      //CreateStar(x, y)
      var star = CreateStar(ev.pageX, ev.pageY, 25, 25);
      
      stars.push(star);
      star.onclick = function(ev2){
          var input1 = document.createElement("input");
          input1.style.position = "absolute";
          input1.style.left = ev2.pageX + "px";
          input1.style.top = ev2.pageY + "px";
          
          sky.appendChild(input1);
          
          var thisStar = this;
          input1.onkeyup = function(key){
              if(key.keyCode == 13){
                  thisStar.style.width = this.value+"px";
                  thisStar.style.height = this.value+"px";
                  sky.removeChild(this);
              }
          }
      }
  }
  