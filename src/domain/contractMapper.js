import _ from "lodash";

const addAllValuesFor = (list, labels) => {
	let initialValue = _.reduce(labels, (acc, item) => {
		acc[item] = 0;
		return acc;
	}, {});

	return _.reduce(list, (accum, listItem) => {
			_.forEach(labels, (label) => {
				accum[label] = accum[label] + listItem[label];
			});
			return accum;
		}
		, initialValue);
};

const summary = (lines) => addAllValuesFor(lines, [
	'budgetedAmount',
	'currentYear8MonthsActuals',
	'currentYear4MonthsProbables',
	'previousYearActuals',
	'yearMinus1Actuals',
	'yearMinus2Actuals',
]);

const updateSummary = (budget) => {
	for(let majorHeadGroup in budget.items) {
		for (let majorHead in majorHeadGroup.items) {
			majorHead.summary = summary(majorHead.items);
		}
		majorHeadGroup.summary = summary(_.map(majorHeadGroup.items, ({summary}) => summary))
	}
};

const fromContract = ({budgetYear, budgetLines}) => {
	const filterByKeyValue = (budgetLines, key, value) => {
		return _.filter(budgetLines, line => line[key] === value);
	};

	const mapMajorHeadGroups = (allLines) => {
		const orderedMajorHeadGroups = _.chain(allLines)
			.map(({majorHeadGroup, majorHeadGroupDisplayOrder}) => ({majorHeadGroup, majorHeadGroupDisplayOrder}))
			.uniqBy('majorHeadGroup')
			.sortBy(['majorHeadGroupDisplayOrder'])
			.map(({majorHeadGroup}) => majorHeadGroup)
			.value();

		return _.map(orderedMajorHeadGroups, majorHeadGroup =>
			mapMajorHeadGroup(filterByKeyValue(allLines, 'majorHeadGroup', majorHeadGroup), majorHeadGroup));
	};

	const mapMajorHeadGroup = (linesInMajorHeadGroup, majorHeadGroup) => ({
		majorHeadGroup,
		items: mapMajorHeads(linesInMajorHeadGroup),
		summary: summary(linesInMajorHeadGroup)
	});

	const mapMajorHeads = (linesInMajorHeadGroup) => {
		const majorHeads = _.chain(linesInMajorHeadGroup).map(({majorHead}) => majorHead).uniq().value();
		return _.map(majorHeads, majorHead => mapMajorHead(filterByKeyValue(linesInMajorHeadGroup, 'majorHead', majorHead), majorHead))
	};

	const mapMajorHead = (linesInMajorHead, majorHead) => ({
		majorHead,
		items: mapLineItem(linesInMajorHead),
		summary: summary(linesInMajorHead)
	});

	const mapLineItem = (linesInMajorHead) => _.map(linesInMajorHead, line => ({
		...line,
		name: line.minorHead + ' - ' + line.name,
	}));

	return {
		year: Number.parseInt(budgetYear.substring(0, 4)),
		items: mapMajorHeadGroups(budgetLines),
		summary: summary(budgetLines)
	};
};

export {
	fromContract,
	updateSummary
};
