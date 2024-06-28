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

### Import FormModule in the Module

```typescript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
	imports: [
		...,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
	],
})
export class ExampleModule {}
```

### Input Currency

#### HTML

```html
<mat-form-field appearance="outline">
	<mat-label>Input Currency Directive (Form Control)</mat-label>
	<input
		matInput
		[formControl]="formControl"
		appInputCurrency
		countryCode="en-US"
		currencyCode="USD" />
</mat-form-field>
<mat-form-field appearance="outline">
	<mat-label>Input Currency Directive (ngModel)</mat-label>
	<input
		matInput
		[(ngModel)]="value"
		appInputCurrency
		countryCode="id-ID"
		currencyCode="IDR" />
</mat-form-field>
```

#### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public formControl: FormControl = new FormControl();
	public value: string = '';
}
```

### Only Number

#### HTML

```html
<mat-form-field appearance="outline">
	<mat-label>Only Number Directive (Form Control)</mat-label>
	<input matInput [formControl]="formControl" appOnlyNumber />
</mat-form-field>
<mat-form-field appearance="outline">
	<mat-label>Only Number Directive (ngModel)</mat-label>
	<input matInput [(ngModel)]="value" appOnlyNumber />
</mat-form-field>
```

#### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public formControl: FormControl = new FormControl();
	public value: string = '';
}
```

### Remove Space

#### HTML

```html
<mat-form-field appearance="outline">
	<mat-label>Empty Space Directive (Form Control)</mat-label>
	<input matInput [formControl]="formControl" appEmptySpace />
</mat-form-field>
<mat-form-field appearance="outline">
	<mat-label>Empty Space Directive (ngModel)</mat-label>
	<input matInput [(ngModel)]="value" appEmptySpace />
</mat-form-field>
```

#### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public formControl: FormControl = new FormControl();
	public value: string = '';
}
```
