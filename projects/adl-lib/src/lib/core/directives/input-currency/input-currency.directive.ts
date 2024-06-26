import {
	Directive,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
} from '@angular/core';

import { CurrencyIntlPipe } from '../../pipes/currency';
import { InputNumberDirective } from '../number';

@Directive({
	selector: '[appInputCurrency]',
})
export class InputCurrencyDirective
	extends InputNumberDirective
	implements OnInit, OnDestroy, OnChanges
{
	@Input()
	public countryCode!: string;

	@Input()
	public currencyCode!: string;

	private currencyIntlPipe: CurrencyIntlPipe = new CurrencyIntlPipe();

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

		this.preventFirstNumberZero = true;
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
		this.transformCurrencyByCountryCode();
		this.checkMinMaxValue();
		this.checkMinMaxDigit();
	}

	private transformCurrencyByCountryCode() {
		const targetValue = this.currencyIntlPipe.parse(this.value);

		if (+targetValue > 0) {
			const formatedValue = this.currencyIntlPipe.transform(
				+targetValue,
				this.countryCode,
				this.currencyCode
			);

			this.ngControl.control?.setValue(+targetValue, {
				emitEvent: false,
			});
			this.ngControl.valueAccessor?.writeValue(formatedValue);
		} else {
			this.elementRef.nativeElement.value = null;
			this.ngControl.control?.setValue(null, {
				emitEvent: false,
			});
		}

		this.value = targetValue;
	}
}
