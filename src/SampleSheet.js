import Spreadsheet from "react-spreadsheet";


const SampleSheet = () => {
	const data = [
		[{ value: "Vanilla" }, { value: "Chocolate" }],
		[{ value: "Strawberry" }, { value: "Cookies" }],
	];
	return <Spreadsheet data={data} />;
};
export default SampleSheet();
