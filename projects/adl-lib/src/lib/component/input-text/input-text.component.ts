import { Component } from '@angular/core';

import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-input-text',
	styles: [
		`
			.adl-ui-input {
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
		class="adl-ui-input"
		[appearance]="options.appearance || 'fill'"
		[floatLabel]="options.floatLabel || 'auto'"
		[id]="options.id || ''">
		<mat-label>
			{{ options.label }}
		</mat-label>
		<!-- Input Field -->
		<input
			*ngIf="!options.field?.directive"
			matInput
			appEmptySpace
			[formControl]="form"
			[placeholder]="options.placeholder || ''"
			(input)="onInput($event)" />
		<input
			*ngIf="
				options.field?.directive?.onlyNumber &&
				!options.field?.directive?.inputCurrency
			"
			matInput
			appEmptySpace
			appOnlyNumber
			[formControl]="form"
			[placeholder]="options.placeholder || ''"
			(input)="onInput($event)" />
		<input
			*ngIf="
				(options.field?.directive?.onlyNumber &&
					options.field?.directive?.inputCurrency) ||
				(options.field?.directive?.inputCurrency &&
					!options.field?.directive?.onlyNumber)
			"
			matInput
			appEmptySpace
			appOnlyNumber
			appInputCurrency
			[formControl]="form"
			[placeholder]="options.placeholder || ''"
			(input)="onInput($event)" />
		<!-- ./ Input Field -->
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
				[ngStyle]="{
					display:
						form.touched && form.hasError(validation.type) ? 'inherit' : 'none'
				}">
				{{ validation.message }}
			</p>
		</mat-error>
	</mat-form-field>`,
})
export class InputTextComponent extends FormComponent {
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
