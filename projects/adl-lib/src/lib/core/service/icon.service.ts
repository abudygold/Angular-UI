import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class IconService {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
	) {}

	ngOnInit(): void {}

	public registerIcons(iconsList: any): void {
		this.loadIcons(iconsList, '../../../../assets/svg');
	}

	private loadIcons(iconKeys: any[], iconUrl: string): void {
		iconKeys.forEach(key => {
			const safeIconURL: SafeResourceUrl =
				this.domSanitizer.bypassSecurityTrustResourceUrl(
					`${iconUrl}/${key.location}`
				);

			this.matIconRegistry.addSvgIcon(key.name, safeIconURL);
		});
	}
}
