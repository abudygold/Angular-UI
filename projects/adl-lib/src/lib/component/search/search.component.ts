import { Component, EventEmitter, Input, Output } from '@angular/core';

interface ISearch {
	placeholder: string;
}

@Component({
	selector: 'adl-ui-search',
	template: `<mat-form-field appearance="outline">
		<mat-icon matPrefix> search </mat-icon>

		<input
			matInput
			autocomplete="off"
			[(ngModel)]="inputValue"
			[placeholder]="options.placeholder"
			(input)="onInput($event)" />

		<button
			*ngIf="inputValue"
			matSuffix
			mat-icon-button
			aria-label="Clear"
			(click)="clearInput()">
			<mat-icon>close</mat-icon>
		</button>
	</mat-form-field>`,
})
export class SearchComponent {
	@Output()
	public searchValue: EventEmitter<string>;

	public inputValue: any = '';

	private debounceTimer: any;
	private debounceTime: number = 600;

	@Input() options!: ISearch;

	constructor() {
		this.searchValue = new EventEmitter();
	}

	public onInput(event: Event): void {
		clearTimeout(this.debounceTimer);

		this.debounceTimer = setTimeout(() => {
			this.searchValue.emit(this.inputValue);
		}, this.debounceTime);
	}

	public clearInput(): void {
		this.inputValue = '';
	}
}
