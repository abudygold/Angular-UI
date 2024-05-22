import { Component } from '@angular/core';
import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-radio',
	styles: [
		`
			.adl-ui-radio {
				.mat-mdc-radio-button ~ .mat-mdc-radio-button {
					margin-left: 16px;
				}
				.radio-group {
					display: flex;
					flex-direction: column;
					margin: 15px 0;
					align-items: flex-start;
				}
				.radio-button {
					margin: 5px !important;
				}
				.adl-ui-input-invalid {
					color: #f44336;
					font-size: 12px;
				}
			}
		`,
	],
	template: `<section class="adl-ui-radio">
		<mat-label>
			{{ options.label }}
		</mat-label>

		<mat-radio-group
			[formControl]="form"
			[labelPosition]="options.checkbox?.labelPosition || 'after'"
			[ngClass]="{ 'radio-group': options.checkbox?.isVertical }"
			(change)="getValue.emit($event.value)">
			<mat-radio-button
				[ngClass]="{ 'radio-button': options.checkbox?.isVertical }"
				[id]="options.id + '_' + i || ''"
				[value]="item.value"
				[disabled]="item.disabled"
				*ngFor="let item of options.checkbox?.data; let i = index">
				{{ item.label }}
			</mat-radio-button>
		</mat-radio-group>

		<mat-error
			align="end"
			*ngFor="let validation of options.field?.validation?.message">
			<p
				*ngIf="form.touched && form.hasError(validation.type)"
				class="adl-ui-input-invalid">
				{{ validation.message }}
			</p>
		</mat-error>
	</section>`,
})
export class RadioComponent extends FormComponent {}
