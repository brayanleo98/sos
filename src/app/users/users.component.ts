import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../services/request.service';
import { ModalMainComponent } from './modal-main/modal-main.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  public usersList: any[] = [];
  public rol: string = '';
  constructor(private modalService: NgbModal,
    private request: RequestService) {

  }

  ngOnInit(): void {
    this.getAllUsers()
    this.rol = localStorage.getItem('rol') || '';
  }

  getAllUsers() {
    this.request.getAllUsers().subscribe((res: any) => {
      console.log(res);
      this.usersList = res.users
    }, (err) => {
      console.log(err);

    })
  }

  openModal(user?: any) {
    console.log(user);

    const modalRef = this.modalService.open(ModalMainComponent);
    modalRef.componentInstance.user = user;

    modalRef.result.then((res) => {
      console.log(res)
      res.id ? this.chageInfoUser(res) : this.createUser(res)

    }).catch((err) => {
      console.log(err);

    })
  }

  chageInfoUser(user: any) {
    const filesChange = Object.keys(user);
    const pos = this.usersList.findIndex((v) => v.id === user.id)
    filesChange.forEach((element: any) => {

      this.usersList[pos][element] = this.validateField(this.usersList[pos][element], user[element]);
    });
  }

  validateField(arg: any, cam: any) {
    return arg !== cam ? cam : arg;
  }

  createUser(user: any) {
    user.id = 0
    console.log(user);
    this.usersList = [user].concat(this.usersList);
    console.log(this.usersList);

  }

  returnColor(user: any) {
    return user.id === 0 ? '#ff0000' : '';
  }
}
