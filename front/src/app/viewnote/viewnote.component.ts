import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from '../services/share.service';
@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.css']
})
export class ViewnoteComponent implements OnInit {
  note_title: any;
  note_cnt: any;

  constructor(private router: Router,
    private share: ShareService) {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      alert("please login");
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    //fetching current data of note from share service 
    let note = this.share.getViewNotes();
    console.log("Note details", note);
    this.note_title = note.note_title;
    this.note_cnt = note.note_content;
  }
  //redirecting to home
  home() {

    this.router.navigate(['/user_notes'])
  }
}
