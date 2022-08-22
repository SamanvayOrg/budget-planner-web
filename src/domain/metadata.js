import _ from 'lodash';

const getDetailsForMajorHeadName = (metadata, majorHeadName) => {
    if (!majorHeadName) return undefined;

    const majorHead =  _.chain(metadata)
        .get('majorHeadGroups')
        .map(group => group.majorHeads)
        .flatten()
        .find(majorHead => majorHead.name === majorHeadName)
        .value();

    const majorHeadGroup = _.find(metadata.majorHeadGroups, (group) => _.find(group.majorHeads, majorHead => majorHead.name === majorHeadName))

    return {majorHeadGroup, majorHead};
}

const getDetailsForMajorHeadGroupName = (metadata, majorHeadGroupName) => {
    if (!majorHeadGroupName) return undefined;

    const majorHeadGroup =  _.chain(metadata)
        .get('majorHeadGroups')
        .find(majorHeadGroup => majorHeadGroup.name === majorHeadGroupName)
        .value();

    return {majorHeadGroup};
}

export {
    getDetailsForMajorHeadName, getDetailsForMajorHeadGroupName
}