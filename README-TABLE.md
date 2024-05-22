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

### Table UI Component

#### html

```html
<adl-ui-table *ngIf="table" [table]="table"></adl-ui-table>
```

#### component.ts

```typescript
import { TABLE_USER_CONST } from './app-config.const';

....

public table: TableModel = TABLE_USER_CONST;
```

#### const.ts

```typescript
import { TableModel } from '@adl/angular-ui';
import { MatTableDataSource } from '@angular/material/table';

/* Dummy Data  */
interface UserData {
	id: string;
	name: string;
	progress: number;
	fruit: string;
	price: number | string;
	priceRupiah: number | string;
	approveTime: string;
}

const FRUITS: string[] = [
	'blueberry',
	'lychee',
	'kiwi',
	'mango',
	'peach',
	'lime',
	'pomegranate',
	'pineapple',
];
const NAMES: string[] = [
	'Maia',
	'Asher',
	'Olivia',
	'Atticus',
	'Amelia',
	'Jack',
	'Charlotte',
	'Theodore',
	'Isla',
	'Oliver',
	'Isabella',
	'Jasper',
	'Cora',
	'Levi',
	'Violet',
	'Arthur',
	'Mia',
	'Thomas',
	'Elizabeth',
];

const createNewUser = (id: number): UserData => {
	const name =
		NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
		' ' +
		NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
		'.';

	return {
		id: id.toString(),
		name: name,
		progress: Math.round(Math.random() * 100),
		fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
		price: '112000000',
		priceRupiah: '112000000',
		approveTime: '2024-02-27T12:42:04.629923+07:00',
	};
};
/* ./ Dummy Data  */

/* Table  */
const TableConfig = new TableModel();
TableConfig.labels = [
	'ID',
	'Name',
	'Progress',
	'Fruit',
	'Price',
	'Price Rupiah',
	'Approve Time',
];
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
		column: 'progress',
		type: 'string',
	},
	{
		column: 'fruit',
		type: 'string',
	},
	{
		column: 'price',
		type: 'currency',
		currencyOptions: {
			code: 'GBP',
			symbol: {
				code: 'symbol-narrow',
			},
		},
	},
	{
		column: 'priceRupiah',
		type: 'rupiah',
	},
	{
		column: 'approveTime',
		type: 'date',
		formatDate: 'YYYY-MM-dd',
	},
];
TableConfig.dataSource = new MatTableDataSource(
	Array.from({ length: 100 }, (_, k) => createNewUser(k + 1))
);
/* ./ Table  */

export const TABLE_USER_CONST = TableConfig;
```
