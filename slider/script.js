 
 var hostedDoc = document;
// Refers to the "importee", which is custom_slider.html
 var thisDoc = (hostedDoc._currentScript || hostedDoc.currentScript).ownerDocument;
 var template = thisDoc.querySelector( 'template' ).content;
 
 var sizes={};
 var minRange,maxRange,position,maxSize;
  class CustSlider extends HTMLElement {
	  
	
	  constructor() {
		  super();
		  var newPos = 0, currentPos = 0;
		 
		  this.addEventListener("onmousemove", e => {
			     console.log("onmousemove");
			     this.elementDrag(e)
			    });

	  }
	  connectedCallback(){
		  
	  var shadowRoot = this.attachShadow({mode:'open'});
      var clone = hostedDoc.importNode( template, true );
      shadowRoot.appendChild(clone);
      
      let sliderBar=template.getElementById("sliderBar");
      this.maxSize=sliderBar.style.width;
   
      this.minRange = this.getAttribute("minRange");
      console.log(minRange);
      this.maxRange = this.getAttribute("maxRange");
      console.log(maxRange);
      this.position = this.getAttribute("position");
      console.log(position);
    
	  }

	   elementDrag(e) {
		   let pivot=template.getElementById("pivot");
		    e = e || window.event;
		    e.preventDefault();
		    // calculate the new cursor position:
		    this.newPos = this.currentPos - e.clientX;
		    this.currentPos = e.clientX;
		     set the element's new position:
		    
		    pivot.style.left = e.clientX+ "px";//(pivot.offsetLeft - this.newPos) + "px";
		    let value=(this.maxSize*this.newPos)/(this.maxRange-this.minRange);
		    template.getElementById("value").innerHTML= value;
		    template.getElementById("sliderBar").style.setProperty('--size-left', (value/(maxRange-minRange))*100 + "%");
		  }

	}

  window.customElements.define('cust-slider',CustSlider);
