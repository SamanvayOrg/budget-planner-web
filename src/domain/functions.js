import {useEffect} from "react";
import {allMunicipalityDetailsSelector, fetchMunicipalityDetails} from "../slices/municipalityReducer";
import {useDispatch, useSelector} from "react-redux";

const GetMunicipalityName = () => {
	const dispatch = useDispatch();
	const {details} = useSelector(allMunicipalityDetailsSelector)

	useEffect(() => {
		dispatch(fetchMunicipalityDetails());
	}, [dispatch]);

	return details ? details.name + ' ' + details.cityClass + ' ' : ''


}
export {GetMunicipalityName}