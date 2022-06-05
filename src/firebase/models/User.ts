export default class User {
	private _id: string;
	private _name: string;
	private _age: number;

	constructor(name: string, age: number, id: string = null) {
		this._name = name;
		this._age = age;
		this._id = id;
	}

	static empty() {
		return new User('', 0);
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get age(): number {
		return this._age;
	}
}