import React, { useState } from "react";

const CurrencyConverter: React.FC = () => {
	const [amount, setAmount] = useState<number>(0);
	const [fromCurrency, setFromCurrency] = useState<string>("USD");
	const [toCurrency, setToCurrency] = useState<string>("EUR");
	const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

	const handleAmountChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseFloat(e.target.value);
		setAmount(isNaN(newValue) ? 0 : newValue);
	};

	const handleFromCurrencyChange: any = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setFromCurrency(e.target.value);
	};

	const handleToCurrencyChange: any = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setToCurrency(e.target.value);
	};

	const apiKey = process.env.API_KEY;

	console.log(apiKey);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const url = `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": apiKey || "",
				"X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			setConvertedAmount(result.rates[toCurrency].rate_for_amount);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="amount"
					value={amount}
					onChange={handleAmountChange}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
				<select
					name="fromCurrency"
					value={fromCurrency}
					onChange={handleFromCurrencyChange}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="CAD">CAD</option>
					<option value="GBP">GBP</option>
					<option value="AUD">AUD</option>
					{/* Add more currency options here */}
				</select>
				<select
					name="toCurrency"
					value={toCurrency}
					onChange={handleToCurrencyChange}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="CAD">CAD</option>
					<option value="GBP">GBP</option>
					<option value="AUD">AUD</option>
					{/* Add more currency options here */}
				</select>
				<button className="button" type="submit">
					Submit
				</button>
			</form>
			<p>Amount: {amount}</p>
			{convertedAmount !== null && (
				<p className="text-white">
					Converted Amount: {convertedAmount} {toCurrency}
				</p>
			)}
		</>
	);
};

export default CurrencyConverter;
