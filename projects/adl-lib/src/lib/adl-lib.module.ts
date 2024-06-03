import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { EmptySpaceDirective } from '../lib/core/directives/empty-space';
import { InputCurrencyDirective } from '../lib/core/directives/input-currency';
import { OnlyNumberDirective } from '../lib/core/directives/only-number';
import { RupiahPipe } from '../lib/core/pipes/rupiah';
import { ButtonComponent } from './component/button';
import { CheckboxComponent } from './component/checkbox';
import { ConfirmationComponent } from './component/confirmation';
import { InputTextComponent } from './component/input-text';
import { RadioComponent } from './component/radio';
import { SearchComponent } from './component/search';
import { SelectComponent } from './component/select';
import { TableComponent } from './component/table';

@NgModule({
	declarations: [
		ButtonComponent,
		SearchComponent,
		TableComponent,
		ConfirmationComponent,
		InputTextComponent,
		SelectComponent,
		CheckboxComponent,
		RadioComponent,
		InputCurrencyDirective,
		OnlyNumberDirective,
		EmptySpaceDirective,
		RupiahPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatCheckboxModule,
		MatRadioModule,
	],
	exports: [
		ButtonComponent,
		SearchComponent,
		TableComponent,
		ConfirmationComponent,
		InputTextComponent,
		SelectComponent,
		CheckboxComponent,
		RadioComponent,
		InputCurrencyDirective,
		OnlyNumberDirective,
		EmptySpaceDirective,
		RupiahPipe,
	],
})
export class AdlLibModule {}
