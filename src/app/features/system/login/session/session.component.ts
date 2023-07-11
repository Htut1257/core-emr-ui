import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Session } from 'src/app/core/model/session.model';
import { SesionService } from 'src/app/core/services/session-service/sesion.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {

  constructor(
    private route: Router,
    private sessionService: SesionService,
    public dialogRef: MatDialogRef<SessionComponent>
  ) {
    // this.dialogRef.disableClose = true
  }
  session: Session
  sessions: Session[] = []
  sessionControl: FormControl = new FormControl(null)

  ngOnInit(): void {
    this.getSession()
  }

  ngOnDestroy(): void {
    this.dialogRef.close(this.session)
  }

  getSession() {
    this.sessionService.getAllSession().subscribe({
      next: sessions => {
        this.sessions = sessions
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //get session data on selection 
  getSelectedSession() {
    if (this.sessionControl.value != null) {
      this.session = this.sessionControl.value
      this.route.navigate(['/main'])
      this.dialogRef.close(this.session)
    }
  }


  //get session data on Enter
  getSessonData(event) {
    if (this.sessionControl.value == null) {
      return
    }
    this.session = this.sessionControl.value
    this.route.navigate(['/main'])
    this.dialogRef.close(this.session)
  }

}
