
import { ResponsivePieCanvas } from '@nivo/pie';
let data = [
	{
		"id": "lisp",
		"label": "lisp",
		"value": 383,
		"color": "hsl(153, 70%, 50%)"
	},
	{
		"id": "haskell",
		"label": "haskell",
		"value": 246,
		"color": "hsl(63, 70%, 50%)"
	},
	{
		"id": "c",
		"label": "c",
		"value": 598,
		"color": "hsl(238, 70%, 50%)"
	},
	{
		"id": "erlang",
		"label": "erlang",
		"value": 279,
		"color": "hsl(223, 70%, 50%)"
	},
	{
		"id": "sass",
		"label": "sass",
		"value": 260,
		"color": "hsl(249, 70%, 50%)"
	},
	{
		"id": "python",
		"label": "python",
		"value": 333,
		"color": "hsl(309, 70%, 50%)"
	},
	{
		"id": "go",
		"label": "go",
		"value": 30,
		"color": "hsl(350, 70%, 50%)"
	},
	{
		"id": "css",
		"label": "css",
		"value": 336,
		"color": "hsl(21, 70%, 50%)"
	},
	{
		"id": "make",
		"label": "make",
		"value": 22,
		"color": "hsl(219, 70%, 50%)"
	},
	{
		"id": "scala",
		"label": "scala",
		"value": 175,
		"color": "hsl(215, 70%, 50%)"
	},
	{
		"id": "stylus",
		"label": "stylus",
		"value": 544,
		"color": "hsl(91, 70%, 50%)"
	},
	{
		"id": "hack",
		"label": "hack",
		"value": 391,
		"color": "hsl(33, 70%, 50%)"
	},
	{
		"id": "javascript",
		"label": "javascript",
		"value": 325,
		"color": "hsl(264, 70%, 50%)"
	},
	{
		"id": "rust",
		"label": "rust",
		"value": 571,
		"color": "hsl(191, 70%, 50%)"
	},
	{
		"id": "ruby",
		"label": "ruby",
		"value": 533,
		"color": "hsl(350, 70%, 50%)"
	},
	{
		"id": "java",
		"label": "java",
		"value": 540,
		"color": "hsl(13, 70%, 50%)"
	},
	{
		"id": "elixir",
		"label": "elixir",
		"value": 5,
		"color": "hsl(118, 70%, 50%)"
	},
	{
		"id": "php",
		"label": "php",
		"value": 263,
		"color": "hsl(237, 70%, 50%)"
	}
];


const ResponsivePieChart = () => (
	<ResponsivePieCanvas
		width={400}
		height={400}
		data={data}
		margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
		innerRadius={0.75}
		activeOuterRadiusOffset={4}
		colors={{ scheme: 'paired' }}
		borderColor={{
			from: 'color',
			modifiers: [
				[
					'darker',
					0.6
				]
			]
		}}
		arcLinkLabelsSkipAngle={10}
		arcLinkLabelsTextColor="#333333"
		arcLinkLabelsThickness={2}
		arcLinkLabelsColor={{ from: 'color' }}
		arcLabelsSkipAngle={10}
		arcLabelsTextColor="#333333"
		defs={[
			{
				id: 'dots',
				type: 'patternDots',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				size: 4,
				padding: 1,
				stagger: true
			},
			{
				id: 'lines',
				type: 'patternLines',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				rotation: -45,
				lineWidth: 6,
				spacing: 10
			}
		]}
		fill={[
			{
				match: {
					id: 'ruby'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'c'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'go'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'python'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'scala'
				},
				id: 'lines'
			},
			{
				match: {
					id: 'lisp'
				},
				id: 'lines'
			},
			{
				match: {
					id: 'elixir'
				},
				id: 'lines'
			},
			{
				match: {
					id: 'javascript'
				},
				id: 'lines'
			}
		]}
		legends={[
			{
				anchor: 'right',
				direction: 'column',
				justify: false,
				translateX: 140,
				translateY: 0,
				itemsSpacing: 2,
				itemWidth: 60,
				itemHeight: 14,
				itemTextColor: '#999',
				itemDirection: 'left-to-right',
				itemOpacity: 1,
				symbolSize: 14,
				symbolShape: 'circle'
			}
		]}
	/>
)
export default ResponsivePieChart;