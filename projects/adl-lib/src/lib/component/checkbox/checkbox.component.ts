import { Component } from '@angular/core';

import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-checkbox',
	styles: [
		`
			.adl-ui-checkbox {
				margin: 12px 0;
				width: fit-content;
				.checkbox-margin {
					margin: 0 12px;
				}
				ul {
					margin-top: 4px;
					list-style-type: none;
					&.padding-left {
						margin-bottom: 0 !important;
						padding-left: 0 !important;
					}
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
	template: `<section
			*ngIf="!options.checkbox?.isVertical"
			class="adl-ui-checkbox">
			<mat-label>
				{{ options.label }}
			</mat-label>

			<mat-checkbox
				class="checkbox-margin"
				color="primary"
				[id]="options.id + '_' + i || ''"
				[value]="item.value"
				[disabled]="options.disabled || item.disabled || false"
				[labelPosition]="options.checkbox?.labelPosition || 'after'"
				*ngFor="let item of options.checkbox?.data; let i = index">
				{{ item.label }}
			</mat-checkbox>

			<mat-error
				align="end"
				*ngFor="let validation of options.field?.validation?.message">
				<p *ngIf="form.touched && form.hasError(validation.type)">
					{{ validation.message }}
				</p>
			</mat-error>
		</section>

		<section *ngIf="options.checkbox?.isVertical" class="adl-ui-checkbox">
			<mat-label>
				{{ options.label }}
			</mat-label>

			<span *ngIf="options.checkbox?.selectAll">
				<mat-checkbox
					class="example-margin"
					color="primary"
					[checked]="allCheck"
					[indeterminate]="someComplete()"
					[disabled]="options.disabled || false"
					(change)="setAll($event.checked)">
					{{ options.checkbox?.selectAll?.label }}
				</mat-checkbox>
			</span>
			<span>
				<ul [ngClass]="{ 'padding-left': !options.checkbox?.selectAll }">
					<li *ngFor="let item of options.checkbox?.data; let i = index">
						<mat-checkbox
							color="primary"
							[disabled]="options.disabled || item.disabled || false"
							[(ngModel)]="item.checked"
							(ngModelChange)="updateAll()">
							{{ item.label }}
						</mat-checkbox>
					</li>
				</ul>
			</span>

			<mat-error
				align="end"
				*ngFor="let validation of options.field?.validation?.message">
				<p *ngIf="form.touched && form.hasError(validation.type)">
					{{ validation.message }}
				</p>
			</mat-error>
		</section> `,
})
export class CheckboxComponent extends FormComponent {
	public allCheck: boolean = false;

	public updateAll() {
		this.allCheck =
			this.options.checkbox?.data != null &&
			this.options.checkbox?.data.every((t) => t.checked);

		this.getValue.emit(this.options.checkbox?.data);
		this.checkCheckedData();
	}

	public someComplete(): boolean {
		if (!this.options.checkbox?.data) return false;

		return (
			this.options.checkbox.data.filter((t) => t.checked)?.length > 0 &&
			!this.allCheck
		);
	}

	public setAll(_checked: boolean) {
		this.allCheck = _checked;

		if (!this.options.checkbox?.data) return;

		this.options.checkbox.data.forEach((t) => (t.checked = _checked));
		this.getValue.emit(this.options.checkbox.data);
		this.checkCheckedData();
	}

	private checkCheckedData() {
		if (!this.options.checkbox?.data) return;

		const checked = this.options.checkbox.data.filter((t) => t.checked);
		this.form.setValue(checked?.length > 0 ? checked?.length > 0 : null);

		if (this.options.field?.validation && checked?.length === 0)
			this.form.markAllAsTouched();
	}
}
