import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
	Component,
	ViewChild,
	AfterViewInit,
	Input,
	OnInit,
	Output,
	EventEmitter,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { TableModel } from '../../core/model';

@Component({
	selector: 'adl-ui-table',
	template: `<table
			mat-table
			[dataSource]="table.dataSource"
			[class]="table.tableClass ?? ''"
			aria-describedby="table-ui"
			matSort
			(matSortChange)="announceSortChange($event)">
			<ng-container
				*ngFor="let item of table.columns; let i = index"
				[matColumnDef]="item.column">
				<th mat-header-cell *matHeaderCellDef mat-sort-header>
					{{ table.labels[i] }}
				</th>
				<td
					mat-cell
					*matCellDef="let row"
					[ngStyle]="
						item.type === 'actions' ? { 'padding.px': 10, width: '10%' } : {}
					">
					<ng-container *ngIf="item.type === 'string'">
						{{ row[item.column] }}
					</ng-container>
					<ng-container *ngIf="item.type === 'number'">
						{{ row[item.column] | number }}
					</ng-container>
					<ng-container *ngIf="item.type === 'currency'">
						{{
							+row[item.column]
								| currency
									: item.currencyOptions?.code
									: item.currencyOptions?.symbol?.code
									: item.currencyOptions?.symbol?.value
						}}
					</ng-container>
					<ng-container *ngIf="item.type === 'date'">
						{{ row[item.column] | date: item.formatDate }}
					</ng-container>
					<ng-container *ngIf="item.type === 'actions'">
						<div style="display: flex; gap: .8rem;cursor: pointer">
							<img
								*ngFor="let action of item.actions"
								[src]="action.filePath"
								[alt]="action.tooltips"
								(click)="actionClicked.emit({ action: action.name, row })"
								style="width: 24px; height: 24px;" />
						</div>
					</ng-container>
				</td>
			</ng-container>

			<tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayColumns"></tr>
		</table>

		<mat-paginator
			*ngIf="table.isPagination"
			[length]="table.totalData"
			[pageSize]="table.pageSize"
			[pageIndex]="table.getPageIndex()"
			[pageSizeOptions]="table.pageSizeOptions"
			(page)="onClickPage($event)"></mat-paginator>`,
})
export class TableComponent implements OnInit, AfterViewInit {
	public displayColumns!: string[];

	@Input()
	public table!: TableModel;

	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	@Output()
	public pagination: EventEmitter<PageEvent> = new EventEmitter();

	@Output()
	public actionClicked: EventEmitter<{ action: string; row: any }> =
		new EventEmitter();

	constructor(private _liveAnnouncer: LiveAnnouncer) {}

	ngOnInit(): void {
		this.displayColumns = this.table.columns.map((t) => t.column);
	}

	ngAfterViewInit() {
		this.table.dataSource.paginator = this.paginator;
		this.table.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.table.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.table.dataSource.paginator)
			this.table.dataSource.paginator.firstPage();
	}

	onClickPage(pageEvent: PageEvent): void {
		if (!pageEvent) return;

		this.pagination.emit(pageEvent);
	}

	announceSortChange(sortState: Sort) {
		// This example uses English messages. If your application supports
		// multiple language, you would internationalize these strings.
		// Furthermore, you can customize the message to add additional
		// details about the values being sorted.
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}
}
