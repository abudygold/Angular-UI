import { Component } from '@angular/core';
import { FormComponent } from '../../core/common';

@Component({
	selector: 'adl-ui-checkbox',
	styles: [
		`
			.adl-ui-checkbox {
				margin: 12px 0;
				.checkbox-margin {
					margin: 0 12px;
				}
				ul {
					list-style-type: none;
					margin-top: 4px;
					&.padding-left {
						padding-left: 0 !important;
					}
				}
				.adl-ui-input-invalid {
					color: #f44336;
					font-size: 12px;
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
				[id]="options.id + '_' + i || ''"
				[value]="item.value"
				[disabled]="item.disabled"
				[labelPosition]="options.checkbox?.labelPosition || 'after'"
				*ngFor="let item of options.checkbox?.data; let i = index">
				{{ item.label }}
			</mat-checkbox>

			<mat-error
				align="end"
				*ngFor="let validation of options.field?.validation?.message">
				<p
					*ngIf="form.touched && form.hasError(validation.type)"
					class="adl-ui-input-invalid">
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
					[checked]="allCheck"
					[indeterminate]="someComplete()"
					(change)="setAll($event.checked)">
					{{ options.checkbox?.selectAll?.label }}
				</mat-checkbox>
			</span>
			<span>
				<ul [ngClass]="{ 'padding-left': !options.checkbox?.selectAll }">
					<li *ngFor="let item of options.checkbox?.data; let i = index">
						<mat-checkbox
							[(ngModel)]="item.isCheck"
							(ngModelChange)="updateAll()">
							{{ item.label }}
						</mat-checkbox>
					</li>
				</ul>
			</span>

			<mat-error
				align="end"
				*ngFor="let validation of options.field?.validation?.message">
				<p
					*ngIf="form.touched && form.hasError(validation.type)"
					class="adl-ui-input-invalid">
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
			this.options.checkbox?.data.every(t => t.isCheck);

		this.getValue.emit(this.options.checkbox?.data);

		if (!this.options.checkbox?.data) return;

		this.form.setValue(
			this.options.checkbox.data.filter(t => t.isCheck).length > 0 ?? null
		);
	}

	public someComplete(): boolean {
		if (!this.options.checkbox?.data) return false;

		return (
			this.options.checkbox.data.filter(t => t.isCheck).length > 0 &&
			!this.allCheck
		);
	}

	public setAll(isCheck: boolean) {
		this.allCheck = isCheck;

		if (!this.options.checkbox?.data) return;

		this.options.checkbox.data.forEach(t => (t.isCheck = isCheck));
		this.getValue.emit(this.options.checkbox.data);
		this.form.setValue(
			this.options.checkbox.data.filter(t => t.isCheck).length > 0 ?? null
		);
	}
}
