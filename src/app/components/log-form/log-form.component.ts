import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  // log attributes retrieved or listened for - from list of logs
  id : string;
  title : string;
  date : Date;

  isNew : boolean = true;

  constructor(private logService : LogService) { }

  ngOnInit() {
    // must subscribe because is receiving or listening!
    this.logService.selectedLog.subscribe(retrievedLog => {
      if (retrievedLog.id !== null) { // exists already
        this.isNew = false; // so is not a new Log
        this.id = retrievedLog.id,
        this.title = retrievedLog.title,
        this.date = retrievedLog.date
      }
    });
  }

  onSubmit () {
    if (this.isNew) {
      // create a new log then add it!
      const newLog = {
        id : this.generateID(),
        title : this.title,
        date : new Date ()
      };
      this.logService.addLog(newLog);
    } else {
      const existingLog = {
        id : this.id,
        title : this.title,
        date : new Date () // because we want the updated date and time
      }

      this.logService.updateLog(existingLog);
    }

    this.clearFormAndState();
  }

  generateID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // clear form after adding/updating a log
  clearFormAndState ()
  {
    this.id = '';
    this.title = '';
    this.date = null;
    this.isNew = true; // reset back to true
    this.logService.clearServiceState(); 
      // to clear the Service's state as well!
  }

}
