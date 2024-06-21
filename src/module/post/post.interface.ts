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
};
