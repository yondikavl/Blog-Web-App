export interface FormUserProps {
	type: "create" | "update";
	oldData?: UserType;
}

export interface NewUserType {
	name: string;
	email: string;
	status: string;
	gender: string;
}

export interface UserType extends NewUserType {
	id: number;
}
