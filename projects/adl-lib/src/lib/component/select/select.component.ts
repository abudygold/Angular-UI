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
			.additional-selection {
				opacity: 0.75;
				font-size: 0.75em;
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
			*ngIf="!options.selectOptions?.isMultiple"
			[formControl]="form"
			[multiple]="options.selectOptions?.isMultiple ? true : false"
			(selectionChange)="onSelectionChange($event.value)">
			<mat-option value="">
				{{ '-- Select ' + options.label }}
			</mat-option>

			<mat-option
				*ngFor="let option of options.selectOptions?.data"
				[value]="option[options.selectOptions?.value || '']">
				{{ option[options.selectOptions?.label || ''] }}
			</mat-option>
		</mat-select>

		<mat-select
			*ngIf="options.selectOptions?.isMultiple"
			multiple
			[formControl]="form">
			<mat-select-trigger>
				{{ form.value?.[0] || '' }}

				<span
					*ngIf="(form.value?.length || 0) > 1"
					class="additional-selection">
					(+{{ (form.value?.length || 0) - 1 }}
					{{ form.value?.length === 2 ? 'other' : 'others' }})
				</span>
			</mat-select-trigger>

			<mat-option
				value="select-all"
				selectAll
				[allValues]="enabledOptions"
				(click)="onSelectionChange(form.value)">
				Select All
			</mat-option>

			<mat-option
				*ngFor="let option of options.selectOptions?.data"
				[value]="option[options.selectOptions?.value || '']"
				(click)="onSelectionChange(form.value)">
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
	isSelectedAll: boolean = false;

	constructor() {
		super();
	}

	onSelectionChange(_value: any): void {
		this.getValue.emit(_value);
	}

	get enabledOptions() {
		return (this.options.selectOptions?.data || []).map(
			(option) => option.value
		);
	}
}
