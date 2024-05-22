export class HttpBodyRespModel {
	public status!: number;
	public errorCode!: number;
	public data: any;
	public code!: number;
	public message!: string;
	public haveNext!: boolean;
	public totalRecord!: number;
	public totalPage!: number;

	public convert(dto: any): HttpBodyRespModel {
		this.status = dto.status ?? null;
		this.errorCode = dto.errorCode ?? null;
		this.data = dto.data ?? null;
		this.code = dto.code ?? null;
		this.message = dto.message ?? null;
		this.haveNext = dto.haveNext ?? false;
		this.totalRecord = dto.totalRecord ?? 0;
		this.totalPage = dto.totalPage ?? 0;

		return this;
	}
}
