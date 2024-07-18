# ADL Library

> Axiata Digital Labs Indonesia Design System.

## Features

- Component
  - [Search UI](https://github.com/abudygold/Angular-UI?tab=readme-ov-file#search-ui-component)
  - [Table UI](https://github.com/abudygold/Angular-UI/blob/main/README-TABLE.md)
  - [Form UI](https://github.com/abudygold/Angular-UI/blob/main/README-FORM.md#input-text-dropdown-checkbox-and-radio-button)
    - [Sample Form](https://github.com/abudygold/Angular-UI/blob/main/README-FORM.md#form-ui-component-sample-form)
  - [Confirmation UI](https://github.com/abudygold/Angular-UI/blob/main/README-CONFIRMATION.md)
  - [Button UI](https://github.com/abudygold/Angular-UI?tab=readme-ov-file#button-ui-component)
- Service
  - [BaseService](https://github.com/abudygold/Angular-UI/blob/main/README-SERVICE.md#base-service)
  - [IconService](https://github.com/abudygold/Angular-UI/blob/main/README-SERVICE.md#icon-service)
- Directive
  - [Input Currency](https://github.com/abudygold/Angular-UI/blob/main/README-DIRECTIVE.md#input-currency)
  - [Only Number](https://github.com/abudygold/Angular-UI/blob/main/README-DIRECTIVE.md#only-number)
  - [Remove Space](https://github.com/abudygold/Angular-UI/blob/main/README-DIRECTIVE.md#remove-space)
- Pipe
  - [Currency](https://github.com/abudygold/Angular-UI?tab=readme-ov-file#currency)
- Base Model
  - [HTTP Body Request Pagination Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#http-body-request-pagination-model)
  - [HTTP Body Request Pagination with Filter Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#http-body-request-pagination-with-filter-model)
  - [HTTP Body Resp Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#http-body-resp-model)
  - [Upload File Request Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#upload-file-request-model)
  - [Form Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#form-model)
  - [Table Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#table-model)
  - [Option Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#option-model)
  - [Delete Model](https://github.com/abudygold/Angular-UI/blob/main/README-MODEL.md#delete-model)
- Util
  - [HTTP Param Generator](https://github.com/abudygold/Angular-UI/blob/main/README-UTIL.md#http-param-generator)
  - [Enum to Option Generator](https://github.com/abudygold/Angular-UI/blob/main/README-UTIL.md#enum-to-option-generator)

## Getting started

### Installation

```shell
npm i @adlfe/angular-ui
```

### Import the Module in the Root Module

```typescript
import { AdlLibModule } from '@adlfe/angular-ui';

@NgModule({
	imports: [
		...,
		AdlLibModule,
	],
})
export class AppModule {}
```

### Form UI Component (Sample Form)

#### HTML

```html
<div class="container">
	<div class="mb-3">
		<adl-ui-input-text
			[options]="{
				label: 'Full Name',
				appearance: 'outline',
				matPrefix: {
					icon: 'person',
				},
				field: {
					value: '',
					validation: {
						validators: formValidator.fullName.validators,
						message: formValidator.fullName.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'fullName')"></adl-ui-input-text>
	</div>

	<div class="mb-3">
		<adl-ui-input-text
			[options]="{
				label: 'Email',
				appearance: 'outline',
				matPrefix: {
					icon: 'email',
				},
				field: {
					value: '',
					validation: {
						validators: formValidator.email.validators,
						message: formValidator.email.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'email')"></adl-ui-input-text>
	</div>

	<div class="mb-3">
		<adl-ui-input-text
			[options]="{
				label: 'Body',
				appearance: 'outline',
				characterLimit: 250,
				field: {
					isTextArea: true,
					value: '',
					validation: {
						validators: formValidator.body.validators,
						message: formValidator.body.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'body')"></adl-ui-input-text>
	</div>

	<div class="d-flex gap-3 mb-3">
		<adl-ui-button
			[options]="{
				variant: 'stroked',
				name: 'Batal',
				disabled: isSubmit,
			}"
			(click)="onCancel()"></adl-ui-button>

		<adl-ui-button
			[options]="{
				variant: 'flat',
				name: 'Simpan',
				disabled: isSubmit,
			}"
			(click)="onSave()"></adl-ui-button>
	</div>
</div>
```

#### Component

```typescript
import { BaseService } from '@adlfe/angular-ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UNICORN_PATH_CONST, SAMPLE_FORM_CONST } from './app-config.const';
import { CommentReqModel } from './shared/model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public formValidator: any = SAMPLE_FORM_CONST;
	public isSubmit: boolean = false;
	public form!: FormGroup;

	private subscribers: Subscription[] = [];

	constructor(private baseService: BaseService) {}

	ngOnInit(): void {
		this.initForm();
	}

	private initForm(): void {
		this.form = new FormGroup({
			fullName: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			body: new FormControl(
				null,
				Validators.required,
				Validators.maxLength(250)
			),
		});
	}

	private createUnicornService(): void {
		const bodyReq = new CommentReqModel(this.form.getRawValue());

		const subs = this.baseService
			.postData(UNICORN_PATH_CONST, bodyReq)
			.subscribe({
				next: () => (this.isSubmit = false),
				error: () => (this.isSubmit = false),
			});

		this.subscribers.push(subs);
	}

	setValueField(value: any, control: string): void {
		this.form.get(control)?.setValue(value);
	}

	onSave(): void {
		this.form.markAllAsTouched();
		this.isSubmit = true;

		if (!this.form.valid) {
			setTimeout(() => (this.isSubmit = false));
			return;
		}

		this.createUnicornService();
	}

	ngOnDestroy(): void {
		this.subscribers.forEach((each) => each.unsubscribe());
	}
}
```

#### Const File

```typescript
/* Form  */
const SampleForm = {
	fullName: {
		validators: [Validators.required],
		validationMessages: [
			{ type: 'required', message: 'Full name is required' },
		],
	},
	email: {
		validators: [Validators.required, Validators.email],
		validationMessages: [
			{ type: 'required', message: 'Email is required' },
			{ type: 'email', message: "Email format doesn't correct" },
		],
	},
	body: {
		validators: [Validators.required, Validators.maxLength(250)],
		validationMessages: [
			{ type: 'required', message: 'Body is required' },
			{ type: 'maxlength', message: 'Body can be at most 250 characters' },
		],
	},
};
/* ./ Form  */

export const SAMPLE_FORM_CONST = SampleForm;
```

### Input Text, Dropdown, Checkbox, and Radio Button

#### HTML

```html
<div class="container mt-4">
	<h1 class="text-center text-uppercase font-weight-bold mb-4">--- Form ---</h1>

	<div class="mb-3">
		<adl-ui-input-text
			[options]="{
				label: 'Full Name',
				appearance: 'outline',
				matPrefix: {
					icon: 'person',
				},
				field: {
					value: '',
					validation: {
						validators: formValidator.fullName.validators,
						message: formValidator.fullName.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'fullName')"></adl-ui-input-text>
	</div>

	<div class="mb-3">
		<adl-ui-input-text
			[options]="{
				label: 'Body',
				appearance: 'outline',
				characterLimit: 250,
				field: {
					isTextArea: true,
					value: '',
					validation: {
						validators: formValidator.body.validators,
						message: formValidator.body.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'body')"></adl-ui-input-text>
	</div>

	<div class="mb-3">
		<adl-ui-select
			[options]="{
				label: 'Gender',
				appearance: 'outline',
				selectOptions: {
					label: 'label',
					value: 'value',
					data: [
						{
							label: 'Men',
							value: 'men',
						},
						{
							label: 'Women',
							value: 'women',
						},
					],
				},
				field: {
					value: 'men',
					validation: {
						validators: formValidator.gender.validators,
						message: formValidator.gender.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'gender')"></adl-ui-select>
	</div>

	<div class="mb-3">
		<adl-ui-select
			[options]="{
				label: 'Gender',
				appearance: 'outline',
				selectOptions: {
					isMultiple: true,
					label: 'label',
					value: 'value',
					data: [
						{
							label: 'Men',
							value: 'men',
						},
						{
							label: 'Women',
							value: 'women',
						},
					],
				},
				field: {
					value: ['men', 'women'],
					validation: {
						validators: formValidator.gender.validators,
						message: formValidator.gender.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'gender')"></adl-ui-select>
	</div>

	<div class="mb-3">
		<adl-ui-radio
			[options]="{
				label: 'Gender:',
				checkbox: {
					data: [
						{
							label: 'Men',
							value: 'men',
						},
						{
							label: 'Women',
							value: 'women',
						},
					],
				},
				field: {
					value: 'women',
					validation: {
						validators: formValidator.gender.validators,
						message: formValidator.gender.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueField($event, 'genderRadio')"></adl-ui-radio>
	</div>

	<div class="mb-3">
		<adl-ui-checkbox
			[options]="{
				label: 'Your Hobby:',
				checkbox: {
					data: [
						{
							label: 'Reading a book',
							value: 'read_a_book',
						},
						{
							label: 'Playing Football',
							value: 'football',
						},
						{
							label: 'Swimming',
							value: 'swimming',
							disabled: true,
						},
					],
					isVertical: true,
				},
				field: {
					value: 'read_a_book',
					validation: {
						validators: formValidator.hobby.validators,
						message: formValidator.hobby.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueChecked($event, 'hobby')"></adl-ui-checkbox>
	</div>

	<div class="mb-3">
		<adl-ui-checkbox
			[options]="{
				label: 'Your Hobby:',
				checkbox: {
					selectAll: {
						label: 'Select All'
					},
					data: [
						{
							label: 'Reading a book',
							value: 'read_a_book',
						},
						{
							label: 'Playing Football',
							value: 'football',
							checked: true,
						},
						{
							label: 'Swimming',
							value: 'swimming',
							checked: true,
							disabled: true,
						},
					],
					isVertical: true,
				},
				field: {
					value: '',
					validation: {
						validators: formValidator.hobby.validators,
						message: formValidator.hobby.validationMessages,
					},
				},
			}"
			[isSaveClicked]="isSubmit"
			(getValue)="setValueChecked($event, 'hobby')"></adl-ui-checkbox>
	</div>

	<div class="d-flex gap-3 mb-3">
		<adl-ui-button
			[options]="{
				variant: 'flat',
				color: 'primary',
				name: 'Simpan',
				disabled: isSubmit,
			}"
			(click)="onSave()"></adl-ui-button>

		<adl-ui-button
			[options]="{
				variant: 'stroked',
				color: 'primary',
				name: 'Batal',
				disabled: isSubmit,
			}"></adl-ui-button>
	</div>
</div>
```

#### HTML

```typescript
import { BaseService, CheckboxModel } from '@adlfe/angular-ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { COMMENT_PATH_CONST, SAMPLE_FORM_CONST } from './app-config.const';
import { CommentReqModel } from './shared/model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public formValidator: any = SAMPLE_FORM_CONST;
	public isSubmit: boolean = false;
	public form!: FormGroup;

	private subscribers: Subscription[] = [];

	constructor(private baseService: BaseService) {}

	ngOnInit(): void {
		this.initForm();
	}

	private initForm(): void {
		this.form = new FormGroup({
			fullName: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			body: new FormControl(
				null,
				Validators.required,
				Validators.maxLength(250)
			),
			gender: new FormControl(null, Validators.required),
			genderRadio: new FormControl(null, Validators.required),
			hobby: new FormControl(null, Validators.required),
		});
	}

	private createUnicornService(): void {
		const bodyReq = new CommentReqModel(this.form.getRawValue());

		const subs = this.baseService
			.postData(COMMENT_PATH_CONST, bodyReq)
			.subscribe({
				next: () => (this.isSubmit = false),
				error: () => (this.isSubmit = false),
			});

		this.subscribers.push(subs);
	}

	setValueField(value: any, control: string): void {
		this.form.get(control)?.setValue(value);
	}

	setValueChecked(options: CheckboxModel[], control: string): void {
		this.form
			.get(control)
			?.setValue(options.filter((t: CheckboxModel) => t.checked));
	}

	onSave(): void {
		this.form.markAllAsTouched();
		this.isSubmit = true;

		if (!this.form.valid) {
			setTimeout(() => (this.isSubmit = false));
			return;
		}

		this.createUnicornService();
	}

	ngOnDestroy(): void {
		this.subscribers.forEach((each) => each.unsubscribe());
	}
}
```

#### Const File

```typescript
/* Form  */
import { Validators } from '@angular/forms';

/* Form  */
const SampleForm = {
	fullName: {
		validators: [Validators.required],
		validationMessages: [
			{ type: 'required', message: 'Full name is required' },
		],
	},
	email: {
		validators: [Validators.required, Validators.email],
		validationMessages: [
			{ type: 'required', message: 'Email is required' },
			{ type: 'email', message: "Email format doesn't correct" },
		],
	},
	body: {
		validators: [Validators.required, Validators.maxLength(250)],
		validationMessages: [
			{ type: 'required', message: 'Body is required' },
			{ type: 'maxlength', message: 'Body can be at most 250 characters' },
		],
	},
	gender: {
		validators: [Validators.required],
		validationMessages: [{ type: 'required', message: 'Gender is required' }],
	},
	hobby: {
		validators: [Validators.required],
		validationMessages: [{ type: 'required', message: 'Hobby is required' }],
	},
};
/* ./ Form  */

export const SAMPLE_FORM_CONST = SampleForm;
```
