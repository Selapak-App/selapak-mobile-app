export const capitalizeEachWords = (sentence) => {
	return sentence
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export const separateFourChar = (chars) => {
	return chars.replace(/(.{4})/g, "$1 ");
};

export const formatPhoneNumber = (number) => {
	const digits = number.replace(/\D/g, "");

	if (digits.startsWith("62")) {
		return `+${digits}`;
	} else if (digits.startsWith("0")) {
		return `+62${digits.substring(1)}`;
	} else {
		return `+62${digits}`;
	}
};
