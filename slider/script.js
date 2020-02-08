 
 var hostedDoc = document;
// Refers to the "importee", which is custom_slider.html
 var thisDoc = (hostedDoc._currentScript || hostedDoc.currentScript).ownerDocument;
 var template = thisDoc.querySelector( 'template' ).content;
 var sizeObj={};
 var bar = template.getElementById("bar");
 var pivot = template.getElementById("pivot");
 var root = template.documentElement;
 var minRange,maxRange,position,maxSize;
  class CustSlider extends HTMLElement {
	 
	  constructor() {
		  super();
		  this.addEventListener("click", e => {
			
			  	this.calculateValueFromBarClick(e);
			});
		  this.addEventListener("mousemove", e => {
			  if("pivot".localeCompare(e.target.id)){
					this.setStyles(e.clientX);
					this.calculateValueFromPivot(e);
				}
			});

	  }
	  connectedCallback(){
		  
	  var shadowRoot = this.attachShadow({mode:'open'});
      var clone = hostedDoc.importNode( template, true );
      shadowRoot.appendChild(clone);

      this.populateSizeObj(bar);
      if(sizeObj.position>0)
      {
        let providedPos=((sizeObj.position*sizeObj.barSize)/sizeObj.range)+sizeObj.baroOffSetX;
        this.setStyles(providedPos);
        
        this.sizeObj.clickedPosition=providedPos;
        this.calculate();
      }
   
      sizeObj.min = this.getAttribute("minRange");
      console.log(sizeObj.min);
      sizeObj.max = this.getAttribute("maxRange");
      console.log(sizeObj.max);
      sizeObj.position  = this.getAttribute("position");
      console.log(sizeObj.position);
    
	  }

	   setStyles(postion)
	  {
	  	bar.style.width=bar.clientWidth;
	  	pivot.style.setProperty('--mouse-x', postion + "px");
	  	bar.style.setProperty('--mouse-x', postion + "px");
	  }
	   populateSizeObj(bar)
	  {
	  	sizeObj.barSize=bar.clientWidth;
	  	sizeObj.baroOffSetX=bar.offsetLeft;
	  	sizeObj.max=parseInt(this.maxRange);
	  	sizeObj.min=parseInt(this.minRange);
	  	sizeObj.position=parseInt(this.position);
	  	sizeObj.range=sizeObj.max-sizeObj.min;
	  	console.log(sizeObj);
	  }
	   calculateValueFromPivot(e){
	  	
	  	let clickedPosition=e.clientX-sizeObj.baroOffSetX;
	  	sizeObj.clickedPosition=clickedPosition;
	  	this.calculate();
	  }
	   calculateValueFromBarClick(e){
	  	
	  	let clickedPosition=e.offsetX;
	  	sizeObj.clickedPosition=clickedPosition;
	  	this.calculate();
	  }
	   calculate(){
	  	
	  	let clickedPosition=sizeObj.clickedPosition;
	  	let value=(sizeObj.range*clickedPosition)/sizeObj.barSize;
	  	sizeObj.value=parseInt(value);
	  	this.populateValue();
	  }
	   populateValue()
	  {
		   template.getElementById("num").innerHTML=sizeObj.value;
	  }
	}

  window.customElements.define('cust-slider',CustSlider);
