import {
	HttpClient,
	HttpEventType,
	HttpHeaders,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { generateHttpParams } from '../util';
import { HttpBodyRespModel } from '../model/http-body-resp';

@Injectable({
	providedIn: 'root',
})
export class BaseService {
	constructor(private http: HttpClient) {}

	public getBlobData(url: string, requestParamModel?: any): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		return this.http.get(url, {
			params,
			responseType: 'blob',
			observe: 'response',
		});
	}

	public getData(
		url: string,
		responseModel: any,
		requestParamModel?: any,
		isArray?: boolean
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		return this.http.get(url, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? isArray
						? this.mapArrayData(model.data, responseModel)
						: this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	public getPagingData(
		url: string,
		responseModel: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		return this.http.get(url, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				if (responseModel)
					model.data = this.mapArrayData(model.data, responseModel);

				return model;
			})
		);
	}

	public postWithProgress(url: string, requestBodyModel: any): Observable<any> {
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http
			.post(url, body, { reportProgress: true, observe: 'events' })
			.pipe(map(event => this.uploadProgress(event)));
	}

	public postBlobData(
		url: string,
		requestBodyModel: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http.post(url, body, {
			params,
			responseType: 'blob',
		});
	}

	public postData(
		url: string,
		requestBodyModel: any,
		responseModel?: any,
		requestParamModel?: any,
		isArray?: boolean
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http.post(url, body, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? isArray
						? this.mapArrayData(model.data, responseModel)
						: this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	public putData(
		url: string,
		requestBodyModel: any,
		responseModel?: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http.put(url, body, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	public patchData(
		url: string,
		requestBodyModel: any,
		responseModel?: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http.patch(url, body, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	public deleteData(
		url: string,
		requestParamModel: any,
		responseModel?: any,
		requestBodyModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const options = {
			params,
			body: requestBodyModel ? requestBodyModel.convert() : {},
		};

		return this.http.delete(url, options).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	private mapObjectData(dto: any, responseModel: any): any {
		if (!dto || Object.entries(dto).length === 0) return null;

		return new responseModel().convert(dto);
	}

	private mapArrayData(dtos: any[], responseModel: any): any[] {
		if (!dtos === null) return [];

		return dtos?.reduce((result, each) => {
			result.push(new responseModel().convert(each));
			return result;
		}, []);
	}

	private uploadProgress(event: any): number {
		if (event.type === HttpEventType.UploadProgress) {
			const percentDone = Math.round((100 * event.loaded) / event.total);
			return percentDone;
		} else if (event instanceof HttpResponse) {
			return 100;
		}

		return 0;
	}
}
