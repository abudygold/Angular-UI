import { Directive, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[appEmptySpace]',
})
export class EmptySpaceDirective {
	@HostListener('blur', [])
	public onBlur() {
		this.setValueChange();
	}

	constructor(
		@Self()
		public ngControl: NgControl
	) {}

	private setValueChange() {
		const input = this.ngControl.value?.trim().length;

		if (input === 0) this.ngControl.control?.setValue(null);
	}
}
