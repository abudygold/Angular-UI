# ADL Library

> Axiata Digital Labs Indonesia Design System.

## Features

- [Search UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#search-ui-component)
- [Table UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-TABLE.md)
- [Form UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-FORM.md)
- [Confirmation UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-CONFIRMATION.md)
- [Button UI Component](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#button-ui-component)
- Service
  - [BaseService](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-FORM.md)
  - [IconService](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#iconservice)
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

### Confirmation UI Component

#### html

```html
<adl-ui-button
	[options]="{
        variant: 'basic',
        color: 'primary',
        name: 'Open Dialog'
    }"
	(click)="openDialog()"></adl-ui-button>
```

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
