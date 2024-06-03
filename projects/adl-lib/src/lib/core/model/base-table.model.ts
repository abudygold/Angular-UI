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
