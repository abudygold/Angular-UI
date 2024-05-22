import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormModel } from '../../core/model';
import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-input-text',
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
		<input
			matInput
			[formControl]="form"
			[placeholder]="options.placeholder || ''"
			(input)="onInput($event)" />
		<mat-icon
			*ngIf="options.matPrefix"
			matPrefix
			[svgIcon]="options.matPrefix.svgIcon || ''">
			{{ options.matPrefix.icon || '' }}
		</mat-icon>
		<mat-icon
			*ngIf="options.matSuffix"
			matSuffix
			[svgIcon]="options.matSuffix.svgIcon || ''">
			{{ options.matSuffix.icon || '' }}
		</mat-icon>
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
export class InputTextComponent extends FormComponent implements OnInit {
	private debounceTimer: any;
	private debounceTime: number = 600;

	constructor() {
		super();
	}

	public onInput(event: Event): void {
		clearTimeout(this.debounceTimer);

		this.debounceTimer = setTimeout(() => {
			this.getValue.emit(this.form.value);
		}, this.debounceTime);
	}
}
