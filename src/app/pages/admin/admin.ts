import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Auth } from '../../services/auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [
    MatTableModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

   displayedColumns: string[] = ['id', 'name', 'email', 'company'];
  dataSource: any[] = [];

  private api = environment.apiUrl + '/vendors'
  constructor(private http : HttpClient, public auth: Auth, private cd: ChangeDetectorRef ){

  }

  ngOnInit(): void {
    if(this.auth.isAdmin()){
      this.http.get<any[]>(`${this.api}`).subscribe({
        next:(data)=>{
          this.dataSource= data

          this.cd.detectChanges()
        },
        error:(err)=>{
          console.error(err)
        }
      })
    }
  }

}
