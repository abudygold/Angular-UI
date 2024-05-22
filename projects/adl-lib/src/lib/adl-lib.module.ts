import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { ButtonComponent } from './component/button';
import { SearchComponent } from './component/search';
import { TableComponent } from './component/table';
import { ConfirmationComponent } from './component/confirmation';
import { InputTextComponent } from './component/input-text';
import { SelectComponent } from './component/select';
import { CheckboxComponent } from './component/checkbox';
import { RadioComponent } from './component/radio';
import { InputCurrencyDirective } from '../lib/core/directives/input-currency';
import { OnlyNumberDirective } from '../lib/core/directives/only-number';
import { EmptySpaceDirective } from '../lib/core/directives/empty-space';
import { RupiahPipe } from '../lib/core/pipes/rupiah';

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
	],
})
export class AdlLibModule {}
