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

### Base Service

#### Const File

```typescript
export const RESOURCE_PATH_CONST =
	'https://crudcrud.com/api/b5bee03bb615487a8c54290a5eaf09cf';
```

#### Component

```typescript
import { BaseService } from '@adl/angular-ui';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { RESOURCE_PATH_CONST } from './app-config.const';
import { ResourceModel } from './shared/model';
import { ResourceReqModel } from './shared/model/resouce-req.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	private subscribers: Subscription[] = [];

	constructor(private baseService: BaseService) {}

	ngOnInit(): void {
		this.getResourceListService();
	}

	private getResourceListService(): void {
		const subs = this.baseService
			.getPagingData(RESOURCE_PATH_CONST + '/unicorns', ResourceModel)
			.subscribe((resp) => {
				this.table.dataSource = resp?.data ?? null;
			});

		this.subscribers.push(subs);
	}

	private createResourceService(): void {
		const bodyReq = new ResourceReqModel('Test', 10, 'blue');

		const subs = this.baseService
			.postData(RESOURCE_PATH_CONST + '/unicorns', bodyReq)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	private updateResourceService(): void {
		const bodyReq = new ResourceReqModel('Test 20', 20, 'Orange');

		const subs = this.baseService
			.putData(
				RESOURCE_PATH_CONST + '/unicorns/6659974519f3e403e81e18a6',
				bodyReq
			)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	private deleteResourceService(): void {
		const subs = this.baseService
			.deleteData(
				RESOURCE_PATH_CONST + '/unicorns/6659974519f3e403e81e18a6',
				null
			)
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

#### List Model

```typescript
export class ResourceModel {
	id!: string;
	name!: string;
	age!: number;
	colour!: string;

	convert(dto: any): ResourceModel {
		this.id = dto._id ?? '';
		this.name = dto.name ?? '';
		this.age = dto.age ?? null;
		this.colour = dto.colour ? this.capitalizeFirstLetter(dto.colour) : '';

		return this;
	}

	private capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
```

#### Body Request Model

```typescript
export class ResourceReqModel {
	name: string;
	age: number;
	colour: string;

	constructor(name: string, age: number, colour: string) {
		this.name = name ?? '';
		this.age = age ?? '';
		this.colour = colour ?? '';
	}

	convert(): any {
		return this;
	}
}
```

### Icon Service

#### Component

```typescript
import { IconService } from '@adl/angular-ui';
import { IconsList } from '../assets/svg/IconsList';

...

constructor(private iconService: IconService) {
  iconService.registerIcons(IconsList);
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
