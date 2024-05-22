export class BaseDeleteReqModel {
	public id: string[];

	constructor(id: string[]) {
		this.id = id;
	}

	public convert(): any {
		return this;
	}
}
