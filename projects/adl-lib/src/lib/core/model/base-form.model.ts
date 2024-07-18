export class FormModel {
	public label: string;
	public id?: string;
	public field?: {
		value: string | any[];
		validation?: {
			validators: any[];
			message: any[];
		};
		directive?: {
			inputCurrency?: boolean;
			onlyNumber?: boolean;
		};
		isTextArea?: boolean;
	};
	public appearance?: 'fill' | 'outline';
	public floatLabel?: 'always' | 'auto';
	public placeholder?: string;
	public matPrefix?: {
		icon?: string;
		svgIcon?: string;
	};
	public matSuffix?: {
		icon?: string;
		svgIcon?: string;
	};
	public hint?: string;
	public characterLimit?: number;
	public disabled?: boolean;
	public selectOptions?: {
		data: any[];
		label: string;
		value: string;
		isMultiple?: boolean;
	};
	public checkbox?: {
		data: CheckboxModel[];
		isVertical?: boolean;
		labelPosition?: 'before' | 'after';
		selectAll?: {
			label: string;
		};
	};

	constructor() {
		this.label = '';
	}
}

export class CheckboxModel {
	public label: string;
	public value: string;
	public checked?: boolean;
	public disabled?: boolean;

	constructor() {
		this.label = '';
		this.value = '';
	}
}
