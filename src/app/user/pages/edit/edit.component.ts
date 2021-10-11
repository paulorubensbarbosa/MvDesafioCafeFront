import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from '../../food';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() userEdit: User = new User;
  @Input() indexEdit: number;
  @Input() userId: number;
  @Output() backEdit: EventEmitter<boolean> = new EventEmitter();

  foods: Food[] = [];
  editFood: Food[] = [];
  form: FormGroup;
  formError: boolean = false;
  selectedFood: string;
  idFood: number;
  indexFood: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService
    ) { }

  ngOnInit(): void {
    console.log(this.userEdit);
    console.log(this.indexEdit);

    this.form = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)] ],
      cpf: ['', [Validators.required]],
      food: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    })

    this.setDataInput();
  }

  validatorForm() {
    if(this.form.valid){
      this.onSubmit();
    }else {
      this.formError = true;
    }
  }

  setDataInput() {
    this.editFood = this.userEdit.food;
    this.form.controls.name.setValue(this.userEdit.nome);
    this.form.controls.cpf.setValue(this.userEdit.cpf);
    this.form.controls.food.setValue(this.selectedFood);
  }

  arrayFood() {
    this.foods.push({food: this.form.controls.food.value});
    this.form.controls.food.reset();
  }

  onSubmit() {
    this.userEdit.id = this.userId;
    this.userEdit.nome = this.form.controls['name'].value;
    this.userEdit.cpf = this.form.controls['cpf'].value;
    console.log(this.userEdit);
    this.service.setEdit(this.userEdit).subscribe((data: User) => {
      console.log("Deu");
      location.reload();
      this.back();
    });
  }



  back() {
    this.backEdit.emit();
  }

  selected(idFood, i) {
    console.log(this.selectedFood);
    this.form.controls.food.setValue(this.selectedFood);

    this.idFood = idFood;
    this.indexFood = i;
    console.log(this.indexFood);
  }

  editComida() {
    console.log(this.idFood);
    this.userEdit.food[this.indexFood].idFood = this.idFood;
    this.userEdit.food[this.indexFood].food = this.form.controls.food.value;
    console.log(this.userEdit);
  }

  isTouched(campo) {
    return !this.form.get(campo).valid && this.form.get(campo).touched;
  }

  classError(campo) {
    return{
      'is-invalid': this.isTouched(campo) && !this.form.valid
    }
  }

}
