import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

displayedColumns: string[] = ['id','name','email','role','benefits','actior'];
dataSource: any;
listusers: User[] = [];



@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService){
    this.dataSource = new MatTableDataSource<any>(this.listusers)
  }

  ngOnInit(){
  this.getListUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

getListUsers(){
this.usersService.getAllUser().subscribe({
  next: (response:any) => {

   
    this.listusers = response

    this.dataSource = new MatTableDataSource<any>(this.listusers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },
  error: (err) => {
    console.error(err);
  }
});
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
