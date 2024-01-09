import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { NoteService } from '../services/note.service';
import { ShareService } from '../services/share.service';
@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.css'],

})
export class UserNoteComponent implements OnInit {

  allNotes: Array<any> | undefined;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private share: ShareService,
    private note: NoteService
  ) {



  }




  public user_id: any;
  ngOnInit() {
    let userId = localStorage.getItem('userId');

    if (userId) {


      this.allNotes = this.share.getNotes();
    }
    else {
      alert("please login");
      this.router.navigate(['login']);
    }

  }
  // create new note
  newNote() {

    this.router.navigate(['note']);


  }
  // redirecting to home
  home() {

    this.router.navigate(['/user_notes'])
  }

  //delete function
  delete(note: any) {
    console.log("note_id", note);
    let userId = localStorage.getItem('userId');
    let note_item =
    {
      user_id: userId,
      note_id: note,
    }
    this.note.deleteNote(note_item).subscribe(res => {
      console.log("server delete-note res", res);
      if (res.status == 200) {
        alert("Note deleted Successfully");

        this.share.setNotes(res.notes);
        this.allNotes = this.share.getNotes();
        console.log("all notes after deletion", this.allNotes);
        this.router.navigate(['user_notes']);

      }
      else
        alert("Unsuccessfull note deletion ");

    })
  }
  // view function
  view(data: any) {
    console.log("view", data);
    this.share.setViewNotes(data);
    this.router.navigate(['note_view']);
  }
  //update function
  update(data: any) {
    console.log("update", data);
    this.share.setViewNotes(data);
    this.router.navigate(['note_update']);
  }
}
