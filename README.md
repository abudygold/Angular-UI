# ADL Library

> Axiata Digital Labs Indonesia Design System.

## Features

- Component
  - [Search UI](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#search-ui-component)
  - [Table UI](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-TABLE.md)
  - [Form UI](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-FORM.md)
  - [Confirmation UI](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library/-/blob/master/README-CONFIRMATION.md)
  - [Button UI](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#button-ui-component)
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

### Button UI Component

#### html

```html
<adl-ui-button
	[options]="{
        variant: 'flat',
        color: 'primary',
        name: 'Simpan'
    }"></adl-ui-button>

<adl-ui-button
	[options]="{
        variant: 'stroked',
        color: 'primary',
        name: 'Batal'
    }"></adl-ui-button>
```

### Icon Service

#### component.ts

```typescript
import { IconService } from '@adl/angular-ui';
import { IconsList } from '../assets/svg/IconsList';

...

constructor(private iconService: IconService) {
  iconService.registerIcons(IconsList);
}
```
