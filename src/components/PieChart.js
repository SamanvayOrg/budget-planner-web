import {Pie} from "nivo";
import React from "react";

const PieChart = ({data,width,height}) => {
	return <Pie
		width={width}
		height={height}
		data={data}
		margin={{
			top: 40,
			right: 80,
			bottom: 80,
			left: 80
		}}
		innerRadius={0.7}
		padAngle={0.7}
		cornerRadius={3}
		colorBy="id"
		borderColor="inherit:darker(0.6)"
		radialLabelsSkipAngle={10}
		radialLabelsTextXOffset={6}
		radialLabelsTextColor="#33333"
		radialLabelsLinkOffset={3}
		radialLabelsLinkDiagonalLength={16}
		radialLabelsLinkHorizontalLength={24}
		radialLabelsLinkStrokeWidth={3}
		radialLabelsLinkColor="inherit"
		slicesLabelsSkipAngle={10}
		slicesLabelsTextColor="#33333"
		// animate={true}
		motionStiffness={90}
		motionDamping={15}
		theme={{
			tooltip: {
				container: {
					fontSize: "13px",
					fontWeight: "bold"
				}
			},
			labels: {
				text: {color: "#333333" }

			}
		}}

	/>
}
export default PieChart;