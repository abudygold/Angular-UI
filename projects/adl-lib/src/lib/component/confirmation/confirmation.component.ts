import { Component } from '@angular/core';
import { IConfirmation } from '../../core/model/confirmation.model';

@Component({
	selector: 'adl-ui-confirmation',
	styles: [
		`
			.pointer {
				cursor: pointer;
			}
			.adl-ui-confirmatin-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.mdc-dialog__title::before {
				display: none;
			}
		`,
	],
	template: `
		<h2 mat-dialog-title class="adl-ui-confirmatin-title">
			{{ options.title }}
			<mat-icon mat-dialog-close class="pointer">close</mat-icon>
		</h2>

		<mat-dialog-content>
			<p [innerHTML]="options.content"></p>
		</mat-dialog-content>

		<mat-dialog-actions>
			<button
				*ngIf="options.cancelBtn"
				mat-stroked-button
				color="primary"
				mat-dialog-close>
				{{ options.cancelBtn }}
			</button>

			<button
				*ngIf="options.submitBtn"
				mat-flat-button
				color="primary"
				[mat-dialog-close]="true">
				{{ options.submitBtn }}
			</button>
		</mat-dialog-actions>
	`,
})
export class ConfirmationComponent {
	public options!: IConfirmation;
}
