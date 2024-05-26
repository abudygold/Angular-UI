import { Component } from '@angular/core';
import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-select',
	styles: [
		`
			.adl-ui-select {
				width: 100%;
				mat-error {
					line-height: 0;
				}
				mat-error p {
					margin-bottom: 0;
					font-size: 12px;
					color: #f44336;
				}
			}
			.mat-mdc-form-field-error-wrapper {
				padding: 0;
			}
		`,
	],
	template: `<mat-form-field
		class="adl-ui-select"
		[appearance]="options.appearance || 'fill'"
		[floatLabel]="options.floatLabel || 'auto'"
		[id]="options.id || ''">
		<mat-label>
			{{ options.label }}
		</mat-label>
		<mat-select
			[formControl]="form"
			(selectionChange)="onSelectionChange($event.value)">
			<mat-option value=""> -- Select {{ options.label || '' }} -- </mat-option>
			<mat-option
				*ngFor="let option of options.selectOptions?.data"
				[value]="option[options.selectOptions?.value || '']">
				{{ option[options.selectOptions?.label || ''] }}
			</mat-option>
		</mat-select>
		<mat-hint *ngIf="options.hint">
			{{ options.hint }}
		</mat-hint>
		<mat-error
			align="end"
			*ngFor="let validation of options.field?.validation?.message">
			<p *ngIf="form.touched && form.hasError(validation.type)">
				{{ validation.message }}
			</p>
		</mat-error>
	</mat-form-field>`,
})
export class SelectComponent extends FormComponent {
	constructor() {
		super();
	}

	public onSelectionChange(_value: any): void {
		this.getValue.emit(_value);
	}
}
