import { Component } from '@angular/core';

import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-radio',
	styles: [
		`
			.adl-ui-radio {
				width: fit-content;
				.mat-mdc-radio-button ~ .mat-mdc-radio-button {
					margin-left: 16px;
				}
				.radio-group {
					margin: 15px 0;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
				}
				.radio-button {
					margin: 5px !important;
				}
				mat-error {
					line-height: 0;
				}
				mat-error p {
					margin-bottom: 0;
					font-size: 12px;
					color: #f44336;
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
			color="primary"
			[labelPosition]="options.checkbox?.labelPosition || 'after'"
			[ngClass]="{ 'radio-group': options.checkbox?.isVertical }"
			(change)="getValue.emit($event.value)">
			<mat-radio-button
				[ngClass]="{ 'radio-button': options.checkbox?.isVertical }"
				[id]="options.id + '_' + i || ''"
				[value]="item.value"
				[disabled]="options.disabled || item.disabled || false"
				*ngFor="let item of options.checkbox?.data; let i = index">
				{{ item.label }}
			</mat-radio-button>
		</mat-radio-group>

		<mat-error
			align="end"
			*ngFor="let validation of options.field?.validation?.message">
			<p *ngIf="form.touched && form.hasError(validation.type)">
				{{ validation.message }}
			</p>
		</mat-error>
	</section>`,
})
export class RadioComponent extends FormComponent {}
