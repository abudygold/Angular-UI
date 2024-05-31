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

### Base Service

#### const file

```typescript
export const RESOURCE_PATH_CONST =
	'https://crudcrud.com/api/b5bee03bb615487a8c54290a5eaf09cf';
```

#### component.ts

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseService } from '@adl/angular-ui';
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
			.subscribe(resp => {
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
		this.subscribers.forEach(each => each.unsubscribe());
	}
}
```

#### Rosource List Model

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

#### Rosource Body Request Model

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

#### component.ts

```typescript
import { IconService } from '@adl/angular-ui';
import { IconsList } from '../assets/svg/IconsList';

...

constructor(private iconService: IconService) {
  iconService.registerIcons(IconsList);
}
```

#### iconLists.ts (assets/svg/IconsList.ts)

```typescript
export const IconsList: { name: string; location: string }[] = [
	{ name: 'menu_email', location: 'navigation/email.svg' },
];

/* USAGE EXAMPLE 
  <mat-icon class="icon-menu" svgIcon="menu_email"></mat-icon>
*/
```
