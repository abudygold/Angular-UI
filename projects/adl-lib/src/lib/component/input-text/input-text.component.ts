import { Component } from '@angular/core';

import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-input-text',
	styles: [
		`
			.adl-ui-input {
				width: 100%;
			}
		`,
	],
	template: `<mat-form-field
		class="adl-ui-input"
		[appearance]="options.appearance || 'fill'"
		[floatLabel]="options.floatLabel || 'auto'"
		[id]="options.id || options.label.toLowerCase().replace(' ', '-')">
		<mat-label>
			{{ options.label }}
		</mat-label>
		<!-- TextArea Field -->
		<textarea
			*ngIf="options.field?.isTextArea"
			matInput
			[formControl]="form"
			[placeholder]="options.placeholder || ''"
			(input)="onInput($event)"></textarea>
		<!-- ./ TextArea Field -->
		<!-- Input Field -->
		<ng-container *ngIf="!options.field?.isTextArea">
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
		</ng-container>
		<!-- ./ Input Field -->
		<mat-icon
			*ngIf="options.matPrefix"
			matPrefix
			color="primary"
			[svgIcon]="options.matPrefix.svgIcon || ''">
			{{ options.matPrefix.icon || '' }}
		</mat-icon>
		<mat-icon
			*ngIf="options.matSuffix"
			matSuffix
			color="primary"
			[svgIcon]="options.matSuffix.svgIcon || ''">
			{{ options.matSuffix.icon || '' }}
		</mat-icon>
		<mat-hint *ngIf="options.hint" align="start">
			{{ options.hint }}
		</mat-hint>
		<mat-hint *ngIf="options.characterLimit" align="end">
			{{ form.value?.length }} / {{ options.characterLimit }}
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
