import { DecimalPipe } from '@angular/common';
import {
	Directive,
	HostListener,
	OnChanges,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { InputNumberDirective } from './input-number.directive';

@Directive({
	selector: '[appInputDecimal]',
})
export class InputDecimalDirective
	extends InputNumberDirective
	implements OnInit, OnDestroy, OnChanges
{
	private decimalPipe!: DecimalPipe;

	@HostListener('blur', [])
	public override onBlur() {
		super.onBlur();
	}

	@HostListener('keydown', ['$event'])
	public override onKeyDown(event: KeyboardEvent) {
		super.onKeyDown(event);
	}

	override ngOnInit() {
		super.ngOnInit();

		this.allowComma = true;
	}

	override ngOnDestroy() {
		super.ngOnDestroy();
	}

	override ngOnChanges() {
		super.ngOnChanges();
	}

	/**
	 * override super.valueChange();
	 */
	public override valueChange() {
		this.transformToDecimal();
		this.checkMinMaxValue();
	}

	private transformToDecimal() {
		if (!this.decimalPipe) {
			this.decimalPipe = new DecimalPipe('id-ID');
		}

		if (this.value) {
			const targetValue = this.value.toString().replace(',', '.');

			this.ngControl.control?.setValue(Number(targetValue), {
				emitEvent: false,
			});

			const formatedValue = targetValue.toString().replace('.', ',');

			this.ngControl.valueAccessor?.writeValue(formatedValue);

			this.value = targetValue;
		}
	}
}
