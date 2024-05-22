export class FormModel {
	public label: string;
	public id?: string;
	public field?: {
		value: string;
		validation?: {
			validators: any[];
			message: any[];
		};
	};
	public dataOptions?: {
		data: any[];
		label: any;
		value: any;
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
	public isDisabled?: boolean;
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
		this.isDisabled = false;
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
		this.checked = false;
	}
}
