// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {

	type UserType = {
		displayName: string | null;
		photoURL: string | null;
		uid: string;
		email: string | null;
	};

	type CommentType = {
		id: string,
		text: string,
		parent: string,
		level: number,
		createdBy: string,
		createdAt: Date,
		path: string,
		children?: CommentType[]
	};

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
