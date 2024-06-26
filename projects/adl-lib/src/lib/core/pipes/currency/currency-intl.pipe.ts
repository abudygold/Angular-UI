import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyIntl' })
export class CurrencyIntlPipe implements PipeTransform {
	public transform(
		value: number,
		countryCode: string = 'en-US',
		currencyCode: string = 'USD'
	): string {
		return this.format(value, countryCode, currencyCode);
	}

	public format(
		value: number,
		countryCode: string = 'en-US',
		currencyCode: string = 'USD'
	): string {
		value = value ?? 0;

		return new Intl.NumberFormat(countryCode, {
			style: 'currency',
			currency: currencyCode,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);
	}

	public parse(value: string): string {
		return value
			?.toString()
			.split('.')
			.join('')
			.split(',')
			.join('')
			.split(' ')
			.join('')
			?.match(/(\d+)/)
			?.shift() as string;
	}
}
