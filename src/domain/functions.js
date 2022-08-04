import {useEffect} from 'react';
import {allMunicipalityDetailsSelector, fetchMunicipalityDetails} from '../slices/municipalityReducer';
import {useDispatch, useSelector} from 'react-redux';

const MunicipalityName = () => {
	const dispatch = useDispatch();
	const {currentMunicipality} = useSelector(allMunicipalityDetailsSelector)

	useEffect(() => {
		dispatch(fetchMunicipalityDetails());
	}, [dispatch]);

	return currentMunicipality ? currentMunicipality.name + ' ' + currentMunicipality.cityClass + ' ' : ''


}

export {MunicipalityName}