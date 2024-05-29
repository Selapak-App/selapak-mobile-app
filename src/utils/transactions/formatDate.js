import dayjs from "dayjs";

export const formatDate = (unixtime) => {
	const date = dayjs(unixtime);
	return date.format("DD/MM/YYYY");
};

export const formatAddMonth = (unixtime, months) => {
	const date = dayjs(unixtime).add(months, "month");
	return formatDate(date.valueOf());
};
