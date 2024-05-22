# ADL Library

> Axiata Digital Labs Indonesia Design System.

## Features

- Component
  - [Search UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#search-ui-component)
  - [Table UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-TABLE.md)
  - [Form UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-FORM.md)
  - [Confirmation UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-CONFIRMATION.md)
  - [Button UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#button-ui-component)
- Service
  - [BaseService](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-SERVICE.md)
  - [IconService](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#icon-service)
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
            value: '',
            validation: {
                validators: formValidator.firstName.validators,
                message: formValidator.firstName.validationMessages
            }
        }
    }"
	(getValue)="onSearch($event)"></adl-ui-input-text>
<!-- put the value key to define default value -->

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
            value: '',
            validation: {
                validators: formValidator.gender.validators,
                message: formValidator.gender.validationMessages
            }
        }
    }"
	(getValue)="onSearch($event)"></adl-ui-radio>
<!-- put the value key to define default value -->

<adl-ui-checkbox
	[options]="{
        label: 'Hobby Anda:',
        checkbox: {
            data: [
                {
                    label: 'Membaca Buku',
                    value: 'baca',
                    disabled: false,
                    checked: true
                },
                {
                    label: 'Bermain Sepak Bola',
                    value: 'sepak_bola',
                    disabled: false
                },
                {
                    label: 'Berenang',
                    value: 'berenang',
                    disabled: false
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
	(getValue)="onSearch($event)"></adl-ui-checkbox>
<!-- add checked key in the data to default checked -->
```

#### component.ts

```typescript
import { SAMPLE_FORM_CONST} from './app-config.const';

...

public formValidator: any = SAMPLE_FORM_CONST;
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
