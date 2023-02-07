export interface Customer {
	/**
	 * Entity id
	 */
	readonly id: string;
	/**
	 * Customer full name
	 */
	readonly name: string;
	/**
	 * CPF
	 */
	readonly cpf: string;
	/**
	 * E-mail
	 */
	readonly email: string;
	/**
	 * Phone numbers
	 *
	 * List of phone numbers of the customer. Max of 2 different numbers.
	 */
	readonly phones: string[]; // limit 2
	/**
	 * Date of customer birth
	 */
	readonly birthdate: Date;
}

export interface CustomerConvenio {
	readonly id: string;

	/**
	 * Convenio name
	 */
	readonly name: string;

	/**
	 * Matricula Number
	 */
	readonly matricula: string | null;

	/**
	 * Benefit Amount
	 *
	 * Customer benefit amount of the matricula in this convenio.
	 */
	readonly benefit_amount: number | null;

	/**
	 * Total Margin
	 */
	readonly total_margin: number | null;

	/**
	 * Available Margin
	 */
	readonly available_margin: number | null;
}

export interface ConsignadoDebt {
	readonly bank_code: string;

	/**
	 * Matricula Number
	 *
	 * The matricula which the cosignado debt is registered.
	 */
	readonly matricula: string;

	/**
	 * Convenio name
	 */
	readonly convenio: string;

	/**
	 * Installment debt
	 *
	 * The amount discounted from the customer contra-cheque.
	 */
	readonly installment: number;

	/**
	 * Total installment count
	 *
	 * The total number of installments of this debt.
	 */
	readonly total_installment: number | null;

	/**
	 * Debt acquisition date
	 */
	readonly acquisition: Date;
}

export interface CustomerQueryParams {
	/**
	 * Customer name
	 */
	name?: string;
	/**
	 * Start of birthdate range
	 */
	birthdate_start?: Date;
	/**
	 * End of birthdate range
	 */
	birthdate_end?: Date;
	/**
	 * Customer cpf
	 */
	cpf?: string;
	/**
	 * Customer convenios
	 *
	 * One of the convenio name a customer has (op: OR).
	 */
	convenios?: string[];
}
