import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormModel } from '../../core/model';

@Component({
	selector: '',
	template: '',
})
export class FormComponent implements OnInit {
	@Output()
	public getValue: EventEmitter<any>;

	public form: FormControl = new FormControl('');

	@Input()
	public options!: FormModel;

	@Input()
	set isSaveClicked(status: boolean) {
		if (!this.form || !status) return;

		this.form.markAllAsTouched();
	}

	constructor() {
		this.getValue = new EventEmitter();
	}

	ngOnInit(): void {
		if (this.options.disabled) {
			/* If the field is disabled, doesn't check next code */
			this.form.disable();
			return;
		}

		if (this.options.field?.value) this.form.setValue(this.options.field.value);

		if (this.options.field?.validation)
			this.form.setValidators(this.options.field.validation?.validators);

		this.form.updateValueAndValidity();
	}
}
