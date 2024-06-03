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

### Confirmation UI Component

#### HTML

```html
<adl-ui-button
	[options]="{
        variant: 'basic',
        color: 'primary',
        name: 'Open Dialog'
    }"
	(click)="openDialog()"></adl-ui-button>
```

#### Component

```typescript
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent, IConfirmation } from '@adl/angular-ui';

...

constructor(private dialog: MatDialog) {}

...

openDialog(): void {
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
