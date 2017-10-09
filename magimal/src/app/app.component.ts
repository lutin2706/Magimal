import { Component, OnInit } from '@angular/core';

import{ Animal } from './animal' ;

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { Observable } from 'rxjs/Observable';

//import{ AnimalService } from './animal.service' ;

/*
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) */



const ANIMALS: Animal[] = [
  { id: 1, type:'Dragon', nom:'DRAGON', description:'Desc', cout:10.0, url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-nOb2RojxKzEvN25CSDXYxIz75HUYLUDXU1CJfMi9rBi24A4rSA', dateNaissance:'1/1/1000'},
  { id: 2, type:'Licorne', nom:'LICORNE', description:'Desc', cout:10.0, url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-nOb2RojxKzEvN25CSDXYxIz75HUYLUDXU1CJfMi9rBi24A4rSA', dateNaissance:'1/1/1000' },
  { id: 3, type:'Souris', nom:'SOURIS MAGIQUE',description:'Desc', cout:10.0, url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-nOb2RojxKzEvN25CSDXYxIz75HUYLUDXU1CJfMi9rBi24A4rSA', dateNaissance:'1/1/1000' }
];


@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <h2>Mes animaux</h2>

    <div style="float-left">
      <app-form></app-form>
    </div>

    <div style="float:left">

      <div *ngFor="let animal of animals" style="">
        
          <div style="margin-top:30px; margin-left:30px; float:left; background-color:#EEE; border:2px solid #555; padding:10px">

              <div style="width:550px; float:left;clear:left;  ">
                <span class="badge">{{animal.id}}</span> {{animal.nom}} ({{animal.type}}), {{animal.dateNaissance}},  <span style="font-weight:bold;">{{animal.cout}} pièces d'or / heure </span><br/><br/> {{animal.description}} <br/>
              </div>
              <div  style="float:left; "> <img alt="{{animal.nom}}" style="border:2px solid #333" width="200" height="200" src="{{animal.url}}"></div>

              <div style="float:left;clear:both">
                <button (click)="doDeleteTheAnimal(animal.id)" type="submit" class="btn btn-success">Delete</button>
                <button (click)="doUpdateTheAnimal(animal.id)" type="submit" class="btn btn-success">Update</button>
              </div>

              </div>

          </div>

      <div style="float:left; clear:right;"></div>

    </div>

    
    

  <div style="float:left; clear:both; margin-bottom:30px;"></div>

  <!--
    <ul class="animals">
      <li *ngFor="let animal of animals">
        <span class="badge">{{animal.id}}</span> {{animal.nom}}, {{animal.dateNaissance}},  {{animal.description}}
        <img  src="{{animal.url}}">
      </li>
    </ul>

    

    -->

   
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .animals {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .animals li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .animals li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .animals li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .animals .text {
      position: relative;
      top: -3px;
    }
    .animals .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})

export class AppComponent implements OnInit {
  /*
  constructor(private heroService: AnimalService ) {

  }*/

  //constructor(private http: Http){}
  
  http ;

  ngOnInit(){}
  

  title = 'Les animaux magiques';

 
  //url = 'http://10.10.9.122:8080/animals' ;// severine
  //url = 'http://10.10.9.117:8080/animals' ; // philippe
  url = 'http://10.10.9.118:8080/animals' ; // christopher
  //url = 'http://10.10.9.118:8080/animals' ; // christopher
  //url = 'http://10.10.9.121:8080/api/animals' ; //eric
  
  constructor(http: Http) {

    this.http = http ;

    //const body = {"type" : "souris", "nom": "La souris", "description": "La description", "cout":"10.5", "url":"https://thumbs.dreamstime.com/b/illustration-de-vecteur-d-une-souris-magique-d-ordinateur-20860435.jpg", "dateNaissance":"1865-04-14"};
    //const body = {"type" : "souris", "nom": "La grosse souris", "description": "La description", "cout":"10.5", "url":"http://www.roseandmilk.com/img/198/212333/m/p/maileg-souris-ange-avec-baguette-magique.jpg", "dateNaissance":"1865-04-14"};
    const body = {"type" : "souris", "nom": "La très grosse souris", "description": "Miam miam la grosse souris", "cout":"1500", "url":"http://static.skynetblogs.be/media/48361/dyn010_original_176_161_gif_2573108_0237772c6ebb49c6451af87ebb35d7f1.gif", "dateNaissance":"1865-04-14"};
    
    

    //{"type":"Mouton rose", "nom":"Mouton du pays imaginaire", "description":"Joli mouton pas très intelligent ni beau", "cout":5, "url":"https://www.gbnews.ch/wp-content/gbnews-uploads/2016/05/mouton_rose.jpg","dateNaissance":"1993-04-13"}

   // let headers = new Headers({ 'Content-Type': 'application/json' });
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    //let options = new RequestOptions({ headers: headers });
    //let url = 'http://10.10.9.118:8080/animals'; 
    
    let bodyString = JSON.stringify(body); // Stringify payload
    //let headers      = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT', 'Access-Control-Allow-Headers' : 'Content-Type' }); // ... Set content type to JSON
    let headers      = new Headers({ 'Content-Type': 'application/json', 'charset':'utf-8' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    // https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome


    /*
    http.post('http://10.10.9.118:8080/animals', bodyString, options) // ...using post request
                     .map(res => res.json()) // ...and calling .json() on the response to return data
                     //.catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
                     .subscribe(animals => this.animals = [animals]); */

    //http.post(url, body, options) ;//.map((res: Response) => res.json());

    

    //const body = ANIMALS[0] ;

    /*
    http
      .post(this.url, body)
      // See below - subscribe() is still necessary when using post().
      .subscribe(); */
    
    
    http.get(this.url)
      .map(res => res.json())
      .subscribe(animals => this.animals = animals);
     
  } 







  animals = ANIMALS ; 

  //theAnimal = null ;

  //console.log('TEST');
  
  doDeleteTheAnimal(index : Number){
  
    console.log("DO THE DELETE "+index+' '+'http://10.10.9.118:8080/animals/'+index) ;
    
console.log(this.http);

    //this.http.delete('http://10.10.9.122:8080/animals/'+index) // ...using post request
    this.http.delete('http://10.10.9.118:8080/animals/'+index) // ...using post request
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
    
    //.map(res => res.json()) // ...and calling .json() on the response to return data
    
    .subscribe(animal => console.log(animal)); 

  }


  doUpdateTheAnimal(index : Number){

    console.log("DO THE UPDATE "+index) ;

  }


}




/*


public addNewRecord(){
        let bodyString = JSON.stringify(this.model); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        this.http.post("http://localhost:3000/posts", this.model, options) // ...using post request
                         .map(res => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
                         .subscribe();
    }



*/



/*


var headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded');

let options = new RequestOptions({ headers: headers });

var body = "firstname=" + user.firstname + "&lastname=" + user.lastname + "&username=" + user.username + "&email=" + user.email + "&password=" + user.password;

return new Promise((resolve) => {
                this.http.post("http://XXXXXXXXXXX/users/create", body, options).subscribe((data) => {
                if (data.json()) {
                    resolve(data.json());
                } else {
                    console.log("Error");
                }
            }
        )
    });


*/



/*

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [RemoteService]
})

export class DashboardComponent implements OnInit {
    allData = [];
    resu: string;
    errData: string;
    name: string = "Deepak";

    constructor(private http: Http){}

    ngOnInit(){}

    onSubmit(value: any) {
    //console.log(value.message);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(value);
    this.http.post('127.0.0.1/myProject/insertData.php', body, headers)
                .subscribe(
                    () => {alert("Success")}, //For Success Response
                    err => {console.error(err)} //For Error Response
                );                
    }    
}

*/