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

### Base Service

#### Const File

```typescript
export const UNICORN_PATH_CONST =
	'https://jsonplaceholder.typicode.com/comments';
```

#### Component

```typescript
import { BaseParamReqModel, BaseService } from '@adlfe/angular-ui';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { UNICORN_PATH_CONST } from './app-config.const';
import { CommentModel, CommentReqModel } from './shared/model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public isSubmit: boolean = false;
	public isLoading: boolean = false;

	private unicornParam!: BaseParamReqModel;
	private subscribers: Subscription[] = [];

	constructor(private baseService: BaseService) {}

	ngOnInit(): void {
		this.unicornParam = new BaseParamReqModel();
		this.getUnicornListService();
	}

	private getUnicornListService(): void {
		this.isLoading = true;

		const subs = this.baseService
			.getPagingData(UNICORN_PATH_CONST, CommentModel, this.unicornParam)
			.subscribe({
				next: (resp) => {
					// Write code here
					this.isLoading = false;
				},
				error: () => (this.isLoading = false),
			});

		this.subscribers.push(subs);
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

	private updateUnicornService(): void {
		const bodyReq = new CommentReqModel(this.form.getRawValue());

		const subs = this.baseService
			.putData(UNICORN_PATH_CONST + '/:id', bodyReq)
			.subscribe({
				next: () => (this.isSubmit = false),
				error: () => (this.isSubmit = false),
			});

		this.subscribers.push(subs);
	}

	private deleteUnicornService(): void {
		const subs = this.baseService
			.deleteData(UNICORN_PATH_CONST + '/:id', null)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	ngOnDestroy(): void {
		this.subscribers.forEach((each) => each.unsubscribe());
	}
}
```

#### Comment Model

```typescript
export class CommentModel {
	id!: string;
	name!: string;
	email!: string;
	body!: string;

	convert(dto: any): CommentModel {
		this.id = dto.id ?? '';
		this.name = dto.name ?? '';
		this.email = dto.email ?? null;
		this.body = dto.body ?? '';

		return this;
	}
}
```

#### Comment Request Model

```typescript
export class CommentReqModel {
	name: string;
	email: string;
	body: string;

	constructor(source: any) {
		this.name = source?.fullName ?? '';
		this.email = source?.email ?? '';
		this.body = source?.body ?? '';
	}

	convert(): any {
		return this;
	}
}
```

### Icon Service

#### Component

```typescript
import { IconService } from '@adlfe/angular-ui';
import { Component } from '@angular/core';

import { IconsList } from '../assets/svg/IconsList';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(private iconService: IconService) {
		iconService.registerIcons(IconsList);
	}
}
```

#### Const File (assets/svg/IconsList.ts)

```typescript
export const IconsList: { name: string; location: string }[] = [
	{ name: 'menu_email', location: 'navigation/email.svg' },
];

/* USAGE EXAMPLE 
  <mat-icon class="icon-menu" svgIcon="menu_email"></mat-icon>
*/
```
