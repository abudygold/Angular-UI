import {
	Component,
	ViewChild,
	AfterViewInit,
	Input,
	OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableModel } from '../../core/model';

@Component({
	selector: 'adl-ui-table',
	template: `<table
			mat-table
			matSort
			aria-describedby="table-ui"
			[dataSource]="table.dataSource">
			<ng-container
				*ngFor="let item of table.columns; let i = index"
				[matColumnDef]="item.column">
				<th *matHeaderCellDef [mat-sort-header]="item.column">
					{{ table.labels[i] }}
				</th>
				<td mat-cell *matCellDef="let row">
					<ng-container *ngIf="item.type === 'string'">
						{{ row[item.column] }}
					</ng-container>
					<ng-container *ngIf="item.type === 'number'">
						{{ row[item.column] | number }}
					</ng-container>
					<ng-container *ngIf="item.type === 'rupiah'">
						{{ +row[item.column] | rupiah }}
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
				</td>
			</ng-container>

			<tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayColumns"></tr>
		</table>

		<mat-paginator [pageSizeOptions]="table.pageSizeOptions"></mat-paginator>`,
})
export class TableComponent implements OnInit, AfterViewInit {
	public displayColumns!: string[];

	@Input()
	public table!: TableModel;

	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	ngOnInit(): void {
		this.displayColumns = this.table.columns.map(t => t.column);
	}

	ngAfterViewInit() {
		this.table.dataSource.paginator = this.paginator;
		this.table.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.table.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.table.dataSource.paginator) {
			this.table.dataSource.paginator.firstPage();
		}
	}
}
