
const separateTrxByStatus = (datas) => {
	const onProgress = [];
	const done = [];

	datas.map((item) => {
		const result = refactorTrx(item);
		item.showStatus = result.showStatus;

		if (result.isDone) {
			done.push(item);
		} else {
			onProgress.push(item);
		}
	});

	return { done, onProgress };
};

export const refactorTrx = (data) => {
	let showStatus = "";
	let isDone = false;

	if (data.transactionStatus === "ON_PROGRESS") {
		if (data.verifyStatus === "PENDING") {
			showStatus = "VERIFY";
		} else if (data.verifyStatus === "APPROVED" && !data.isSurveyed) {
			showStatus = "SURVEY";
		} else if (
			data.verifyStatus === "APPROVED" &&
			data.isSurveyed &&
			data.surveyStatus === "PENDING"
		) {
			showStatus = "CONFIRMATION";
		} else {
			showStatus = "PAYMENT";
		}
	} else {
		isDone = true;
		showStatus = data.transactionStatus;
	}

	return { isDone, showStatus };
};

export default separateTrxByStatus;