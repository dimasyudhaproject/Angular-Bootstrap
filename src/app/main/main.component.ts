import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../data/api.service';
import { ExpenseModel } from './main.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formValue !: FormGroup;
  expenseModel : ExpenseModel = new ExpenseModel();
  expenseData !: any;
  showAdd !: boolean;
  showModify !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      procNo : [''],
      div : [''],
      procNm : [''],
      mthd : [''],
      stg : [''],
      sts : ['']
    })
    this.getExpenses();
  }
  clickAddExpense(){
    this.formValue.reset();
    this.showAdd = true;
    this.showModify = false;
  }
  postExpenses(){
    this.expenseModel.procNo = this.formValue.value.procNo;
    this.expenseModel.div = this.formValue.value.div;
    this.expenseModel.procNm = this.formValue.value.procNm;
    this.expenseModel.mthd = this.formValue.value.mthd;
    this.expenseModel.stg = this.formValue.value.stg;
    this.expenseModel.sts = this.formValue.value.sts;

    this.api.postExpense(this.expenseModel)
    .subscribe(res=>{
      console.log(res);
      alert("New expense is successfully added :)")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getExpenses();
    },
    err=>{
      alert("Something went wrong!")
    })
  }
  getExpenses(){
    this.api.getExpense()
     .subscribe(res=>{
       this.expenseData = res
     })
  }
  deleteExpenses(row : any){
    this.api.deleteExpense(row.procNo)
    .subscribe(res=>{
      alert("Existing expense is succesfully deleted!");
      this.getExpenses();
    })
  }
  updateExpenses(row : any){
    this.showAdd = false;
    this.showModify = true;
    this.expenseModel.procNo = row.procNo;
    this.formValue.controls['procNo'].setValue(row.procNo);
    this.formValue.controls['div'].setValue(row.div);
    this.formValue.controls['procNm'].setValue(row.procNm);
    this.formValue.controls['mthd'].setValue(row.mthd);
    this.formValue.controls['stg'].setValue(row.stg);
    this.formValue.controls['sts'].setValue(row.sts);
  }
  updateBtnExpenses(){
    this.expenseModel.procNo = this.formValue.value.procNo;
    this.expenseModel.div = this.formValue.value.div;
    this.expenseModel.procNm = this.formValue.value.procNm;
    this.expenseModel.mthd = this.formValue.value.mthd;
    this.expenseModel.stg = this.formValue.value.stg;
    this.expenseModel.sts = this.formValue.value.sts;
    this.api.updateExpense(this.expenseModel, this.expenseModel.procNo)
    .subscribe(res=>{
      alert("Data are succesfully updated!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getExpenses();
    })
  }
}
