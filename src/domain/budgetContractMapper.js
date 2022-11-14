import _ from "lodash";
import {getDetailLines} from './updateFromView';

const addAllValuesFor = (list, labels) => {
	let initialValue = _.reduce(labels, (acc, item) => {
		acc[item] = 0;
		return acc;
	}, {});

	return _.reduce(list, (accum, listItem) => {
			_.forEach(labels, (label) => {
				accum[label] = _.toNumber(_.isNaN(accum[label]) ? null : accum[label]) + _.toNumber(_.isNaN(listItem[label]) ? null : listItem[label]);
			});
			return accum;
		}
		, initialValue);
};

const summary = (lines) => addAllValuesFor(lines, [
	'id',
	'budgetedAmount',
	'currentYear8MonthsActuals',
	'currentYear4MonthsProbables',
	'previousYearActuals',
	'yearMinus1Actuals',
	'yearMinus2Actuals',
	'functionCode',
	'detailedHeadCode',
]);

const updateSummary = (budget) => {
	for (let i = 0; i < budget.items.length; i++) {
		let majorHeadGroup = budget.items[i];
		for (let j = 0; j < majorHeadGroup.items.length; j++) {
			let majorHead = majorHeadGroup.items[j]
			majorHead.summary = summary(majorHead.items);
		}
		majorHeadGroup.summary = summary(_.map(majorHeadGroup.items, ({summary}) => summary));
		budget.summary = summary(getDetailLines(budget));
	}
};

const fromContract = ({id, budgetYear, budgetLines, budgetStatusAuditContract}) => {
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
		name: line.name || line.minorHead + ' - ' + line.name,
	}));

	return {
		id,
		year: Number.parseInt(budgetYear.substring(0, 4)),
		items: mapMajorHeadGroups(budgetLines),
		summary: summary(budgetLines),
		budgetStatus: budgetStatusAuditContract.currentBudgetStatus
	};
};

const toContract = (budget) => {
	const budgetLines = getDetailLines(budget);
	return {
		id: budget.id,
		budgetYear: budget.year,
		budgetLines
	}

}

export {
	fromContract,
	toContract,
	updateSummary
};
