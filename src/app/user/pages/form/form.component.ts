import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from '../../food';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  user: User = new User();
  foods: Food[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)] ],
      cpf: ['', [Validators.required]],
      food: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    })
  }

  onSubmit() {
    console.log(this.form.controls.food.value);

    if(this.form.valid){
      this.setData();
      this.form.reset();
    }else {
      Object.keys(this.form.controls).forEach(campo => {
        const controle = this.form.get(campo);
        controle.markAsTouched();
      })
    }
  }

  setData() {
    this.user.nome = this.form.controls.name.value;
    this.user.cpf = this.form.controls.cpf.value;
    this.user.food = this.foods;

    this.add();
  }

  arrayFood() {
    if (this.form.controls.food.value.length >= 3){
      this.foods.push({food: this.form.controls.food.value});

      alert("Comida cadastrada com sucesso! Adicione quantas comidas desejar.")
    } else {
      alert ("Mínimo 3 caracteres.")
    }
  }

  add() {
    console.log(this.user)
    this.service.add(this.user).subscribe( (data: User) => {
      console.log('Sucesso')
    })
  }

  checkTouched(input) {
    return !this.form.get(input).valid && this.form.get(input).touched;
  }

  classError(input) {
    return{
      'is-invalid': this.checkTouched(input) && !this.form.valid
    }
  }

}
