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

### Table UI Component

#### HTML

```html
<ng-container *ngIf="!isLoading; else loadingTemplate">
	<adl-ui-table
		[table]="table"
		(pagination)="onUpdatePage($event)"
		(actionClicked)="onActionClicked($event)"></adl-ui-table>
</ng-container>

<ng-template #loadingTemplate> Please wait... </ng-template>
```

#### Component

```typescript
import { BaseParamReqModel, BaseService, TableModel } from '@adl/angular-ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { UNICORN_PATH_CONST, TABLE_USER_CONST } from './app-config.const';
import { CommentModel } from './shared/model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public table: TableModel = TABLE_USER_CONST;
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
					/* Pagination: Client Side */
					const start =
						this.table.pageSize * this.table.page - this.table.pageSize;
					const end = this.table.pageSize * this.table.page;

					this.table.dataSource = resp?.data?.slice(start, end) ?? null;
					this.table.totalData = resp?.data?.length;
					/* ./ Pagination: Client Side */
					/* Pagination: Server Side */
					/* this.table.dataSource = resp?.data ?? null;
					this.table.totalData = resp?.data?.length; */
					/* ./ Pagination: Server Side */
					this.isLoading = false;
				},
				error: () => (this.isLoading = false),
			});

		this.subscribers.push(subs);
	}

	onUpdatePage(page: PageEvent): void {
		this.table.page =
			this.table.pageSize === page?.pageSize ? page?.pageIndex + 1 : 1;
		this.table.pageSize = page?.pageSize;
		this.unicornParam.pageNo = this.table.page;
		this.unicornParam.pageSize = this.table.pageSize;
		this.getUnicornListService();
	}

	onActionClicked(e: { action: string; row: any }): void {
		console.log(e);
	}

	ngOnDestroy(): void {
		this.subscribers.forEach((each) => each.unsubscribe());
	}
}
```

#### Const File

```typescript
import { TableModel } from '@adl/angular-ui';

/* Table  */

const TableConfig = new TableModel();
TableConfig.isPagination = true;
TableConfig.labels = ['ID', 'Name', 'Email', 'Body', 'Actions'];
TableConfig.columns = [
	{
		column: 'id',
		type: 'string',
	},
	{
		column: 'name',
		type: 'string',
	},
	{
		column: 'email',
		type: 'string',
	},
	{
		column: 'body',
		type: 'string',
	},
	{
		column: 'actions',
		type: 'actions',
		actions: [
			{
				name: 'preview',
				filePath: './assets/svg/preview.svg',
				tooltips: 'Preview Icon',
			},
			{
				name: 'edit',
				filePath: './assets/svg/edit.svg',
				tooltips: 'Edit Icon',
			},
			{
				name: 'delete',
				filePath: './assets/svg/delete.svg',
				tooltips: 'Delete Icon',
			},
		],
	},
];
/* ./ Table  */

export const TABLE_USER_CONST = TableConfig;
export const RESOURCE_PATH_CONST =
	'https://jsonplaceholder.typicode.com/comments';
```
