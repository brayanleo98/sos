import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'console';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-modal-main',
  templateUrl: './modal-main.component.html',
  styleUrls: ['./modal-main.component.sass'],
})
export class ModalMainComponent implements OnInit {

  @Input() user: any;
  public formGroup: FormGroup = new FormGroup({});
  public rol: string = '';

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private request: RequestService) {
  }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || '';
    this.user ? this.buildForm() : this.buildFormNew();

  }

  buildFormNew() {
    this.formGroup = this.formBuilder.group({
      firstName: '',
      lastName: '',
      maidenName: '',
      age: '',
      gender: '',
      email: '',
    });

    this.validateRol()
  }

  buildForm() {

    this.formGroup = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      maidenName: this.user.maidenName,
      age: this.user.age,
      gender: this.user.gender,
      email: this.user.email,
    });
    this.validateRol()
  }

  saveUser() {
    if (this.user) {
      this.request.editNewUsers({ ...this.formGroup.value, id: this.user.id }).subscribe((result) => {
        console.log(result);
        this.activeModal.close({ ...this.formGroup.value, id: this.user.id })
      }, (err) => {
        console.log(err);

      })

    } else {
      this.request.setNewUsers(JSON.stringify(this.formGroup.value)).subscribe((result) => {
        console.log(result);
        this.activeModal.close({ ...this.formGroup.value })
      }, (err) => {
        console.log(err);

      })
    }
  }

  validateRol() {
    if (this.rol === 'user') {
      this.formGroup.get('maidenName')?.disable()
      this.formGroup.get('age')?.disable()
      this.formGroup.get('gender')?.disable()
      this.formGroup.get('email')?.disable()
    }
  }
}
