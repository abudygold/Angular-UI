import { BaseOptionModel } from '../model/base-option.model';

export const generateEnumOption = (enumObject: Object): BaseOptionModel[] => {
	if (!enumObject) return [];

	return Object.keys(enumObject).reduce((result: any, each) => {
		if (isNaN(Number(each))) {
			const inputOption = new BaseOptionModel();
			const label = each.replace(/([A-Z])/g, ' $1');
			const finalLabel = label.charAt(0).toUpperCase() + label.slice(1);

			inputOption.label = finalLabel;

			if (isNaN(Number(enumObject[each as keyof typeof enumObject]))) {
				inputOption.value = enumObject[each as keyof typeof enumObject] as any;
			} else {
				inputOption.value = Number(enumObject[each as keyof typeof enumObject]);
			}

			result.push(inputOption);
		}

		return result;
	}, []);
};
