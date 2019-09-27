import { Component, OnInit } from '@angular/core';

import { Log } from '../../models/Log';

import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs : Log []; 

  selectedLog : Log; // the log we select in the list of logs
  loaded : boolean = false; // the logs have not been loaded yet, so false

  constructor(private logService : LogService) { }

  ngOnInit() {
    

    // clearing the state ... 
    this.logService.stateToClear.subscribe(clear => { // the clear gives us boolean!
      if (clear) {
        // then we clear the state - means nothing is selected 
        // and any held values of a log are no longer kept?
        this.selectedLog = {
          id : '',
          title : '',
          date : null
        }
      }
    });


    // this.logs = this.logService.getLogs();

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true; // once logs have been loaded .. even cleared after selecting and what not, checking for log existance is now complete
        // all logs have been looked for and laoded
    });
    
  }

  onSelectLog(logSelected : Log) {
    this.logService.setFormLog(logSelected);
    this.selectedLog = logSelected;
  }

  onDeleteLog (existing : Log) {
    if (confirm('Are you Sure?')) {
      this.logService.deleteLog(existing);
    }
  }

}
