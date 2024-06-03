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

### Enum to Option Generator

#### How to use the model

```typescript
import {
	HttpBodyReqPaginationModel,
	BaseParamReqModel,
	HttpBodyRespModel,
	BaseUploadFileReqModel,
	FormModel,
	CheckboxModel,
	TableModel,
	BaseOptionModel,
} from '@adl/angular-ui';
```

#### HTTP Body Request Pagination Model

```typescript
export class HttpBodyReqPaginationModel {
	public pageSize: number;
	public pageNo: number;

	constructor() {
		this.pageSize = 10;
		this.pageNo = 1;
	}

	public convert(): any {
		return {
			pageSize: this.pageSize,
			pageNo: this.pageNo,
		};
	}
}
```

#### HTTP Body Request Pagination with Filter Model

```typescript
export class BaseParamReqModel extends HttpBodyReqPaginationModel {
	public filter!: string;

	constructor() {
		super();
	}

	public override convert(): any {
		return {
			filter: this.filter,
			pageNo: this.pageNo,
			rowPerPage: this.pageSize,
		};
	}
}
```

#### HTTP Body Resp Model

```typescript
export class HttpBodyRespModel {
	public status!: number;
	public errorCode!: number;
	public data: any;
	public code!: number;
	public message!: string;
	public haveNext!: boolean;
	public totalRecord!: number;
	public totalPage!: number;

	public convert(dto: any): HttpBodyRespModel {
		this.status = dto?.status ?? null;
		this.errorCode = dto?.errorCode ?? null;
		this.data = Array.isArray(dto) ? dto : dto?.data ?? null;
		this.code = dto?.code ?? null;
		this.message = dto?.message ?? null;
		this.haveNext = dto?.haveNext ?? false;
		this.totalRecord = dto?.totalRecord ?? 0;
		this.totalPage = dto?.totalPage ?? 0;

		return this;
	}
}
```

#### Upload File Request Model

```typescript
export class BaseUploadFileReqModel {
	public file!: File;

	public convert(): any {
		const formData = new FormData();
		formData.append('file', this.file);

		return formData;
	}
}
```

#### Form Model

```typescript
export class FormModel {
	public label: string;
	public id?: string;
	public field?: {
		value: string;
		validation?: {
			validators: any[];
			message: any[];
		};
		directive?: {
			inputCurrency?: boolean;
			onlyNumber?: boolean;
		};
	};
	public appearance?: 'fill' | 'outline';
	public floatLabel?: 'always' | 'auto';
	public placeholder?: string;
	public matPrefix?: {
		icon?: string;
		svgIcon?: string;
	};
	public matSuffix?: {
		icon?: string;
		svgIcon?: string;
	};
	public hint?: string;
	public disabled?: boolean;
	public selectOptions?: {
		data: any[];
		label: string;
		value: string;
	};
	public checkbox?: {
		data: CheckboxModel[];
		isVertical?: boolean;
		labelPosition?: 'before' | 'after';
		selectAll?: {
			label: string;
		};
	};

	constructor() {
		this.label = '';
	}
}

export class CheckboxModel {
	public label: string;
	public value: string;
	public checked?: boolean;
	public disabled?: boolean;

	constructor() {
		this.label = '';
		this.value = '';
	}
}
```

#### Table Model

```typescript
import { MatTableDataSource } from '@angular/material/table';

export class TableModel {
	public dataSource: MatTableDataSource<any>;
	public columns: {
		column: string;
		type: 'string' | 'number' | 'date' | 'currency' | 'rupiah' | 'actions';
		formatDate?: string;
		actions?: {
			name: string;
			filePath: string;
			tooltips: string;
		}[];
		currencyOptions?: {
			code: string;
			symbol?: {
				code: 'code' | 'symbol' | 'symbol-narrow';
				value?: string;
			};
		};
	}[];
	public labels: string[];
	public page: number;
	public pageSize: number;
	public totalData: number;
	public isPagination: boolean;
	public pageSizeOptions: number[];

	constructor() {
		this.dataSource = new MatTableDataSource();
		this.columns = [];
		this.labels = [];
		this.page = 1;
		this.pageSize = 10;
		this.totalData = 0;
		this.isPagination = false;
		this.pageSizeOptions = [10, 25, 100];
	}

	public getNumber(index: number, limit: number): number {
		return (this.page - 1) * limit + index;
	}

	public getPageIndex(): number {
		return this.page - 1;
	}

	public isEmpty(): boolean {
		return this.totalData === 0;
	}

	public setPage(page: number): void {
		this.page = page;
	}

	public setPageSize(size: number): void {
		this.pageSize = size;
	}

	public resetPage(): void {
		this.page = 1;
	}

	public setNextPage(isNext: boolean): void {
		if (!isNext && this.page === 1) {
			this.totalData = this.dataSource.data?.length ?? 0;
			return;
		}

		this.totalData =
			this.page === 1 ? this.pageSize * 2 : this.pageSize * (this.page + 1);

		const diffData = this.pageSize - this.dataSource.data?.length;

		/* totalData substracted by diffData if data < pageSize  */
		if (diffData !== 0) this.totalData -= diffData;

		/* totalData substracted by pageSize if isNext false */
		if (!isNext) this.totalData -= this.pageSize;
	}

	public setTotalPage(totalPage: number): void {
		const diffData = this.pageSize - this.dataSource.data?.length;

		this.totalData = (totalPage ?? 0) * this.pageSize;
		this.totalData -= diffData;
	}
}
```

#### Option Model

```typescript
export class BaseOptionModel {
	public label!: string;
	public value!: string | number;
}
```

#### Delete Model

```typescript
export class BaseDeleteReqModel {
	public id: string[];

	constructor(id: string[]) {
		this.id = id;
	}

	public convert(): any {
		return this;
	}
}
```
