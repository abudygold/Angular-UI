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
  - Input Currency
  - Only Number
  - Remove Space Text Field
- Pipe
  - Currency (Rupiah)
- Base Model
  - HTTP Body Request Pagination Model
  - HTTP Body Request Pagination with Filter Model
  - HTTP Body Resp Model
  - Upload File Request Model
  - Form Model
  - Table Model
  - Option Model
  - Delete Model
- Util
  - HTTP Param Generator
  - Enum to Option Generator

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

### Form UI Component

#### html

```html
<adl-ui-input-text
	[options]="{
        label: 'First Name',
        appearance: 'outline',
        field: {
            value: 'Steven',
            validation: {
                validators: formValidator.firstName.validators,
                message: formValidator.firstName.validationMessages
            }
        }
    }"
	[isSaveClicked]="isSubmit"
	(getValue)="onSearch($event)"></adl-ui-input-text>

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
                    value: 'men'
                },
                {
                    label: 'Women',
                    value: 'women'
                }
            ]
        },
        field: {
            value: '',
            validation: {
                validators: formValidator.gender.validators,
                message: formValidator.gender.validationMessages
            }
        }
    }"
	[isSaveClicked]="isSubmit"
	(getValue)="onSearch($event)"></adl-ui-select>

<adl-ui-radio
	[options]="{
        label: 'Jenis Kelamin:',
        checkbox: {
            data: [
                {
                    label: 'Laki-laki',
                    value: 'pria'
                },
                {
                    label: 'Perempuan',
                    value: 'wanita'
                }
            ]
        },
        field: {
            value: 'pria',
            validation: {
                validators: formValidator.gender.validators,
                message: formValidator.gender.validationMessages
            }
        }
    }"
	[isSaveClicked]="isSubmit"
	(getValue)="onChecked($event)"></adl-ui-radio>

<adl-ui-checkbox
	[options]="{
        label: 'Hobby Anda:',
        checkbox: {
            data: [
                {
                    label: 'Membaca Buku',
                    value: 'baca',
                    checked: true
                },
                {
                    label: 'Bermain Sepak Bola',
                    value: 'sepak_bola',
                },
                {
                    label: 'Berenang',
                    value: 'berenang',
                    disabled: true
                }
            ],
            isVertical: true
        },
        field: {
            value: '',
            validation: {
                validators: formValidator.hobby.validators,
                message: formValidator.hobby.validationMessages
            }
        }
    }"
	[isSaveClicked]="isSubmit"
	(getValue)="onChecked($event)"></adl-ui-checkbox>

<adl-ui-button
	[options]="{
        variant: 'flat',
        color: 'primary',
        name: 'Simpan'
    }"
	(click)="onSave()"></adl-ui-button>
```

#### component.ts

```typescript
import { SAMPLE_FORM_CONST} from './app-config.const';
import { CheckboxModel } from '@adl/angular-ui';

...

formValidator: any = SAMPLE_FORM_CONST;
isSubmit: boolean = false;

....

onChecked(e: any): void {
    console.log(e);
}

onChecked(e: CheckboxModel[]): void {
    console.log(e.filter((t: CheckboxModel) => t.checked));
}

onSave(): void {
    this.isSubmit = true;
    setTimeout(() => {
        this.isSubmit = false;
    }, 2000);
}

...
```

#### const.ts

```typescript
/* Form  */
const SampleForm = {
	firstName: {
		validators: [
			Validators.required,
			Validators.minLength(10),
			Validators.maxLength(30),
		],
		validationMessages: [
			{ type: 'required', message: 'First name is required' },
			{ type: 'minlength', message: 'Minimum characters: 10' },
			{ type: 'maxlength', message: 'Maximum characters: 30' },
		],
	},
	lastName: {
		validators: [Validators.required, Validators.maxLength(30)],
		validationMessages: [
			{ type: 'required', message: 'Last name is required' },
			{ type: 'maxlength', message: 'Maximum characters: 30' },
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
