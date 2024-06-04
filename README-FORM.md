# ADL Library

> Axiata Digital Labs Indonesia Design System.

## Features

- Component
  - [Search UI](https://github.com/abudygold/Angular-UI?tab=readme-ov-file#search-ui-component)
  - [Table UI](https://github.com/abudygold/Angular-UI/blob/main/README-TABLE.md)
  - [Form UI](https://github.com/abudygold/Angular-UI/blob/main/README-FORM.md)
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
  - [Currency (Rupiah)](https://github.com/abudygold/Angular-UI?tab=readme-ov-file#currency-rupiah)
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
npm i @adl/angular-ui
```

### Import the Module in the Root Module

```typescript
import { AdlLibModule } from '@adl/angular-ui';

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
				field: {
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

#### Component

```typescript
import { BaseService } from '@adl/angular-ui';
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
			body: new FormControl(null, Validators.required),
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
		validators: [Validators.required],
		validationMessages: [{ type: 'required', message: 'Body is required' }],
	},
};
/* ./ Form  */

export const SAMPLE_FORM_CONST = SampleForm;
```
