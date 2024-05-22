import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormModel } from '../../core/model';
import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-select',
	styles: [
		`
			.adl-ui-input {
				width: 100%;
				.adl-ui-input-invalid {
					color: #f44336;
					font-size: 12px;
				}
				.mat-mdc-form-field-error-wrapper {
					display: flex;
					justify-content: flex-end;
				}
				.mat-mdc-form-field-error {
					display: inline-block !important;
					line-height: 0;
				}
			}
		`,
	],
	template: `<mat-form-field
		class="adl-ui-input"
		[appearance]="options.appearance || 'fill'"
		[floatLabel]="options.floatLabel || 'auto'"
		[id]="options.id || ''">
		<mat-label>
			{{ options.label }}
		</mat-label>
		<mat-select
			[formControl]="form"
			(selectionChange)="onSelectionChange($event.value)">
			<mat-option
				*ngFor="let options of options.dataOptions?.data"
				[value]="options[options.dataOptions?.value]">
				{{ options[options.dataOptions?.label] }}
			</mat-option>
		</mat-select>
		<mat-hint *ngIf="options.hint">
			{{ options.hint }}
		</mat-hint>
		<mat-error
			align="end"
			*ngFor="let validation of options.field?.validation?.message">
			<p
				*ngIf="form.touched && form.hasError(validation.type)"
				class="adl-ui-input-invalid">
				{{ validation.message }}
			</p>
		</mat-error>
	</mat-form-field>`,
})
export class SelectComponent extends FormComponent implements OnInit {
	constructor() {
		super();
	}

	public onSelectionChange(_value: any): void {
		this.getValue.emit(_value);
	}
}
