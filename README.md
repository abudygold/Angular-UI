# ADL Library

> Axiata Digital Labs Indonesia Design System.

## Features

- [Search UI](https://gitlab.axiatadigitallabs.com/fe-adli/angular-ui-library#search-ui-component)
- Table Component UI
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

```html
<adl-ui-search
	[options]="{
			placeholder: 'Search'
		}"
	(searchValue)="onSearch($event)"></adl-ui-search>
```

```typescript
public onSearch(e: any): void {
    console.log(e);
}
```
