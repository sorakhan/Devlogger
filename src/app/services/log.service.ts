import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs : Log [];

  // need this BehaviourSubject for log-form to be listening to clicks from Logs
  private logSource = new BehaviorSubject<Log>({ // takes an initial value
    id : null,  // so if Log is the type, need to initialise to null!
    title : null,
    date : null
  });

  selectedLog = this.logSource.asObservable();  // need to be taking the logSourse (BehaviourSubject) as Observable


  // another behaviour to constantly monitor: clear state
  private stateSource = new BehaviorSubject<boolean>(true);
  stateToClear = this.stateSource.asObservable();


  constructor() {
    this.logs = [
      // {id : '1', title : 'Created test log', date : new Date ('08/17/2019 12:22:10')},
      // {id : '2', title : 'Converted code to Bootstrap', date : new Date ('08/19/2019 13:30:00')},
      // {id : '3', title : 'Added comments', date : new Date ('08/19/2019 18:00:53')}
    ];
   }

   getLogs () : Observable<Log[]> {
     if (localStorage.getItem('logs') === null) {
       this.logs = []; 
     } else {
       this.logs = JSON.parse(localStorage.getItem('logs'));
     }
    return of(this.logs.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })); 
   }

   // we subscribe to this.
   setFormLog (log : Log) {
     this.logSource.next(log); // everytime we click a diff log, we will be subscribed to it within the form
   }

   addLog (log : Log) {
     this.logs.unshift(log);

     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   updateLog (existing : Log) {
     this.logs.forEach((currentLog,index) => {
      if (existing.id === currentLog.id) {
        this.logs.splice(index, 1); // removes it
      }
     });

     this.logs.unshift(existing);

     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   deleteLog (existing : Log) {
    this.logs.forEach((currentLog,index) => {
      if (existing.id === currentLog.id) {
        this.logs.splice(index, 1); // removes it
      }
     });

     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   // clearing of state within a Service
   clearServiceState () {
     this.stateSource.next(true);
   }

   
}
