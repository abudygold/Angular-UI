# ADL Library

> Axiata Digital Labs Indonesia Design System.

## Features

- [Search UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#search-ui-component)
- [Table UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#table-ui-component)
- [Confirmation UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#table-ui-component)
- Base Service
- Icon Service
- Input Currency Directive
- Only Number Directive
- Remove Space Text Field Directive
- Currency Pipe (Rupiah)
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

### Import the Module

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

### Search UI Component

#### html

```html
<adl-ui-search
	[options]="{
			placeholder: 'Search'
		}"
	(searchValue)="onSearch($event)"></adl-ui-search>
```

#### component.ts

```typescript
...

public onSearch(e: any): void {
    console.log(e);
}

...
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

### Confirmation UI Component

#### component.ts

```typescript
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent, IConfirmation } from '@adl/angular-ui';

...

constructor(private dialog: MatDialog) {}

...

public openDialog(): void {
    const confirmation: IConfirmation = {
        title: 'Test',
        content:
            "<p>I've updated my project to Angular 16. In <code>app.module.ts</code>, I have an array of components named <code>entryComponents</code>. However, the <code>entryComponents</code> is no longer available in Angular 16. Where should I add these components to my project:</p>",
        submitBtn: 'Simpan',
        cancelBtn: 'Batal',
    };

    const _dialog = this.dialog.open(ConfirmationComponent, {
        width: '500px',
        autoFocus: false,
        data: {
            options: confirmation,
        },
    });

    _dialog.componentInstance.options = confirmation;
    _dialog.afterClosed().subscribe((resp) => {
        if (!resp) return;

        console.log(resp);
    });
}
```
