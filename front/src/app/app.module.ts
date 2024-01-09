import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { UserNoteComponent } from './user-note/user-note.component';
import { NoteService } from './services/note.service';
import {  ToolbarService,  LinkService,  ImageService,  HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { NoteComponent } from './note/note.component';
import { CustomFormsModule } from 'ng2-validation';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatButtonModule} from '@angular/material/button'
import { ShareService } from './services/share.service';
import { ViewnoteComponent } from './viewnote/viewnote.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserNoteComponent,
    NoteComponent,
    ViewnoteComponent,
    UpdateNoteComponent,
    NavbarComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    CKEditorModule,
   AngularEditorModule,
   MatButtonModule,
   NgbModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      {path:'register',component: RegisterComponent },
      {path:'user_notes',component:UserNoteComponent},
       
      {path:'note',component:NoteComponent},
      {path:'users/name',component:UserNoteComponent},
      {path:'note_view',component:ViewnoteComponent},
      {path:'note_update',component:UpdateNoteComponent},
      

  ])
  ],
  providers: [AuthService,NoteService,ShareService,ToolbarService,LinkService,ImageService,HtmlEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
