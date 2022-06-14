import _ from 'lodash';

const fromContract = ({budgetYear, budgetLines}) => {
	const filterByKeyValue = (budgetLines, key, value) => {
		return _.filter(budgetLines, line => line[key] === value);
	}

	const mapMajorHeadGroups = (allLines) => {
		const orderedMajorHeadGroups = _.chain(allLines)
			.map(({majorHeadGroup, majorHeadGroupDisplayOrder}) => ({majorHeadGroup, majorHeadGroupDisplayOrder}))
			.uniqBy('majorHeadGroup')
			.sortBy(['majorHeadGroupDisplayOrder'])
			.map(({majorHeadGroup}) => majorHeadGroup)
			.value();

		return _.map(orderedMajorHeadGroups, majorHeadGroup =>
			mapMajorHeadGroup(filterByKeyValue(allLines, 'majorHeadGroup', majorHeadGroup), majorHeadGroup));
	}

	const mapMajorHeadGroup = (linesInMajorHeadGroup, majorHeadGroup) => ({
		majorHeadGroup,
		items: mapMajorHeads(linesInMajorHeadGroup),
	});

	const mapMajorHeads = (linesInMajorHeadGroup) => {
		const majorHeads = _.chain(linesInMajorHeadGroup).map(({majorHead}) => majorHead).uniq().value();
		return _.map(majorHeads, majorHead => mapMajorHead(filterByKeyValue(linesInMajorHeadGroup, 'majorHead', majorHead), majorHead))
	};

	const mapMajorHead = (linesInMajorHead, majorHead) => {
		return {
			majorHead,
			items: mapLineItem(linesInMajorHead)
		}
	}

	const mapLineItem = (linesInMajorHead) => {
		return _.map(linesInMajorHead, line => (
			{
				...line,
				name: line.minorHead + ' - ' + line.name,
			}
		));
	}

	return {
		year: Number.parseInt(budgetYear.substring(0, 4)),
		items: mapMajorHeadGroups(budgetLines)
	};
};

export {
	fromContract
};