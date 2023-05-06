import { Injector } from "@angular/core";
import { LayoutService } from "../app/shared/services/layout.service";
console.log("Simple Injector Example");
// src/app/shared/services/layout.service
var injector = Injector.create([
  { provide: LayoutService, deps: [] },
]);

var inject =injector.get(LayoutService)

var lang =inject.language

export const environment = {
  
  production: true,
  firebase: {
    apiKey: "Your Api Key",
    authDomain: "Your Auth Domain",
    databaseURL: "Your Database Url",
    projectId: "Your Project Id",
    storageBucket: "Your StorageBucket url",
    messagingSenderId: "Your Sender Id"
  },

   serverUrl: 'http://falehapi.wecancity.com/api/ar'


 
};
 