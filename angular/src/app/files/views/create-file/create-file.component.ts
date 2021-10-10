import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilesService } from '../../files.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss'],
})
export class CreateFileComponent {
  public form: FormGroup;
  public options: FormGroup;

  constructor(private filesService: FilesService, fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    this.form = new FormGroup({
      field1: new FormControl(null, [Validators.required]),
      field2: new FormControl(null, [Validators.required]),
    });
  }

  public save() {
    console.log('data', this.form.value);
  }

  public cancel() {
    console.log('formed cancelled');
  }
}
