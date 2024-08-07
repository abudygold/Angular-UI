import { Component, Input } from '@angular/core';

interface IButton {
	variant:
		| 'basic'
		| 'raised'
		| 'stroked'
		| 'flat'
		| 'icon'
		| 'fab'
		| 'mini-fab';
	color?: 'primary' | 'accent' | 'warn';
	name: string;
	icon?: string;
	svgIcon?: string;
	disabled?: boolean;
}

@Component({
	selector: 'adl-ui-button',
	template: `<button
			*ngIf="options.variant === 'basic'"
			mat-button
			[color]="options.color || ''"
			[disabled]="options.disabled">
			<mat-icon
				*ngIf="options.icon || options.svgIcon"
				[svgIcon]="options.svgIcon || ''">
				{{ options.icon || '' }}
			</mat-icon>

			{{ options.name }}
		</button>

		<button
			*ngIf="options.variant === 'raised'"
			mat-raised-button
			[color]="options.color || ''"
			[disabled]="options.disabled">
			<mat-icon
				*ngIf="options.icon || options.svgIcon"
				[svgIcon]="options.svgIcon || ''">
				{{ options.icon || '' }}
			</mat-icon>

			{{ options.name }}
		</button>

		<button
			*ngIf="options.variant === 'stroked'"
			mat-stroked-button
			[color]="options.color || ''"
			[disabled]="options.disabled">
			<mat-icon
				*ngIf="options.icon || options.svgIcon"
				[svgIcon]="options.svgIcon || ''">
				{{ options.icon || '' }}
			</mat-icon>

			{{ options.name }}
		</button>

		<button
			*ngIf="options.variant === 'flat'"
			mat-flat-button
			[color]="options.color || ''"
			[disabled]="options.disabled">
			<mat-icon
				*ngIf="options.icon || options.svgIcon"
				[svgIcon]="options.svgIcon || ''">
				{{ options.icon || '' }}
			</mat-icon>

			{{ options.name }}
		</button>

		<button
			*ngIf="options.variant === 'icon'"
			mat-icon-button
			[color]="options.color || ''"
			[disabled]="options.disabled">
			{{ options.name }}
		</button>

		<button
			*ngIf="options.variant === 'fab'"
			mat-fab
			[color]="options.color || 'primary'"
			[disabled]="options.disabled">
			<mat-icon>{{ options.icon }}</mat-icon>
		</button>

		<button
			*ngIf="options.variant === 'mini-fab'"
			mat-mini-fab
			[color]="options.color || 'primary'"
			[disabled]="options.disabled">
			<mat-icon>{{ options.icon }}</mat-icon>
		</button>`,
})
export class ButtonComponent {
	@Input() public options!: IButton;
}
