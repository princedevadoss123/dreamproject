import { Component, OnInit } from '@angular/core';
//import { MAX_LENGTH_VALIDATOR } from '@angular/forms';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.css']
})
export class MainIndexComponent implements OnInit {

  
  time:String;
  constructor() { }


  ngOnInit() {
    
    setInterval(function(){ this.time = new Date().toLocaleTimeString();
      //console.log("hell yeah "+this.time );
       }.bind(this), 1000);
  }

  Add(){
    console.log("inside addition");
  }

}
