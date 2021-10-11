import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[];
  indexEdit: number;
  openWindowEdit: boolean = false;
  userEdit: User = new User();
  userId: number;

  constructor(
    private service: UserService,
    ) { }

  ngOnInit(): void {
    this.listUser()
  }

  listUser() {
    this.service.list().subscribe(( data: User[]) => {
      this.users = data;
    })
  }


  openEdit(index: number) {
    this.indexEdit = index;

    this.userEdit.nome = this.users[index].nome;
    this.userEdit.cpf = this.users[index].cpf;
    this.userEdit.food = this.users[index].food;
    this.userId = this.users[index].id;

    console.log(this.userEdit)
    this.openWindowEdit = true;
  }

  excluir(id) {
    this.service.delete(id).subscribe((data: User) => {
      location.reload();
      console.log("Excluido");
    })
  }

}
