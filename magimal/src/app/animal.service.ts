import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Animal } from './animal';

@Injectable()
export class AnimalService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private AnimalsUrl = 'http://10.10.9.118:8080/animals';  // URL to web api

  constructor(private http: Http) { }

  getAnimals(): Promise<Animal[]> {
    return this.http.get(this.AnimalsUrl)
               .toPromise()
               .then(response => response.json().data as Animal[])
               .catch(this.handleError);
  }


  getAnimal(id: number): Promise<Animal> {
    const url = `${this.AnimalsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Animal)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.AnimalsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Animal> {
    return this.http
      .post(this.AnimalsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Animal)
      .catch(this.handleError);
  }

  update(Animal: Animal): Promise<Animal> {
    const url = `${this.AnimalsUrl}/${Animal.id}`;
    return this.http
      .put(url, JSON.stringify(Animal), {headers: this.headers})
      .toPromise()
      .then(() => Animal)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/