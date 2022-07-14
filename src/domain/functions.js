import {useEffect} from 'react';
import {allMunicipalityDetailsSelector, fetchMunicipalityDetails} from '../slices/municipalityReducer';
import {useDispatch, useSelector} from 'react-redux';

const MunicipalityName = () => {
	const dispatch = useDispatch();
	const {details} = useSelector(allMunicipalityDetailsSelector)

	useEffect(() => {
		dispatch(fetchMunicipalityDetails());
	}, [dispatch]);

	return details ? details.name + ' ' + details.cityClass + ' ' : ''


}

export {MunicipalityName}