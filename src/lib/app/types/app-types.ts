export type FileDataModelType = {
	_id?: number;
	name?: string;
	isFolder?: boolean;
	parent?: number | undefined,
	cat?: any;
	children?: FileDataModelType[],
};

export type NoteDataModelType = {
	isFolder?: boolean;
	code?: string;
};
