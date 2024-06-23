export type IPostPayload = {
	title: string;
	published: boolean;
	authorId: number;
	categoryId: number;
};

export type IPostQuery = {
	published?: boolean;
	authorId?: number;
	categoryId?: number;
	sortBy?: string;
	sortOrder?: string;
	page?: string;
	limit?: string;
	searchTerm?: string;
};
