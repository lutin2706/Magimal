import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { Observable } from 'rxjs/Observable';

import{ Animal } from '../animal' ;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  http ;  

  theAnimal ;

  constructor(http: Http) {
     
      this.http = http ;
     
      this.theAnimal = new Animal() ;
      this.theAnimal.id = 1 ;
      this.theAnimal.type = "souris" ;
      this.theAnimal.nom = "la souris géante" ;
      this.theAnimal.description = "la souris géante description" ;
      this.theAnimal.cout = 50 ;
      this.theAnimal.dateNaissance = "1000-02-02";
  }

 
 
 
  theAnimalCreated ;

  name :string ;

  ngOnInit() {
  }

  onClick(event : Event){
    console.log("ON CLICK!! "+event);

    this.doSendData();

  }

  onClickUpdate(event : Event){
    console.log("ON CLICK UPDATE "+event);

    this.doSendDataForUpdate();

  }

  onClickRefresh(event : Event){
    console.log("ON CLICK UPDATE "+event);

    this.doRefreshTheData();

  }
  


  onRefreshId(event : Event){
    this.theAnimal.id = (<HTMLInputElement>event.target).value ;
  }
  onRefreshType(event : Event){
    this.theAnimal.type = (<HTMLInputElement>event.target).value ;
  }
  onRefreshNom(event : Event){
    this.theAnimal.nom = (<HTMLInputElement>event.target).value ;
  }
  onRefreshDescription(event : Event){
    this.theAnimal.description = (<HTMLInputElement>event.target).value ;
  }
  onRefreshCout(event : Event){
    this.theAnimal.cout = (<HTMLInputElement>event.target).value ;
  }
  onRefreshUrl(event : Event){
    this.theAnimal.url = (<HTMLInputElement>event.target).value ;
  }
  onRefreshDateNaissance(event : Event){
    this.theAnimal.dateNaissance = (<HTMLInputElement>event.target).value ;
  }

doTestADelete(){

console.log("TEST THE DELETE") ;

this.http.delete('http://10.10.9.122:8080/animals/1') // ...using post request

//.map(res => res.json()) // ...and calling .json() on the response to return data
.catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
//.subscribe(animal => this.theAnimalCreated = animal); 

}

  doRefreshTheData(){

    console.log("REFRESH FOR : "+this.theAnimal.id) ;

  }

  doSendData(){


    console.log(this.theAnimal.type);
    console.log(this.theAnimal.nom);
    console.log(this.theAnimal.description);
    console.log(this.theAnimal.cout);
    console.log(this.theAnimal.url);
    console.log(this.theAnimal.dateNaissance);
   
    const body = {"type" : this.theAnimal.type, "nom": this.theAnimal.nom, "description": this.theAnimal.description, "cout":this.theAnimal.cout, "url":this.theAnimal.url, "dateNaissance":this.theAnimal.dateNaissance};
   
    let bodyString = JSON.stringify(body); // Stringify payload
    //let headers      = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT', 'Access-Control-Allow-Headers' : 'Content-Type' }); // ... Set content type to JSON
    let headers      = new Headers({ 'Content-Type': 'application/json', 'charset':'utf-8' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    // https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome


    
    this.http.post('http://10.10.9.122:8080/animals', bodyString, options) // ...using post request
                     .map(res => res.json()) // ...and calling .json() on the response to return data
                     //.catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
                     .subscribe(animal => this.theAnimalCreated = animal); 

    console.log("SENDING ANIMAL : "+body) ;

    

  }

    doSendDataForUpdate(){
    
        console.log(this.theAnimal.id);
        console.log(this.theAnimal.type);
        console.log(this.theAnimal.nom);
        console.log(this.theAnimal.description);
        console.log(this.theAnimal.cout);
        console.log(this.theAnimal.url);
        console.log(this.theAnimal.dateNaissance);
       
        //const body = {"id" : this.theAnimal.id, "type" : this.theAnimal.type, "nom": this.theAnimal.nom, "description": this.theAnimal.description, "cout":this.theAnimal.cout, "url":this.theAnimal.url, "dateNaissance":this.theAnimal.dateNaissance};
        const body = {"type" : this.theAnimal.type, "nom": this.theAnimal.nom, "description": this.theAnimal.description, "cout":this.theAnimal.cout, "url":this.theAnimal.url, "dateNaissance":this.theAnimal.dateNaissance};
        
        let bodyString = JSON.stringify(body); // Stringify payload
        //let headers      = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT', 'Access-Control-Allow-Headers' : 'Content-Type' }); // ... Set content type to JSON
        let headers      = new Headers({ 'Content-Type': 'application/json', 'charset':'utf-8' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
    
        // https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome
    
  
        this.http.put('http://10.10.9.118:8080/animals/'+this.theAnimal.id, bodyString, options) // ...using post request
                         //.map(res => res.json()) // ...and calling .json() on the response to return data
                         //.catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
                         //.subscribe(animal => this.theAnimalCreated = animal); 
                         .subscribe(animal => console.log("gogo")); 
    
        console.log("SENDING ANIMAL : "+body) ;
    
        
    
      }

}
