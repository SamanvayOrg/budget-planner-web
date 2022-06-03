const actions = {
	SET_ACTIVE_BUDGET: 'budgetDashboardReducer/setActiveBudget',
};

let initialState = {activeBudget: {}};

const budgetDashboardReducer = (state = initialState, action) => {

	switch(action.type) {
		case actions.SET_ACTIVE_BUDGET: {
			return {
				...state,
				activeBudget: action.payload,
			};
			break;
		}
		case actions.SET_USER_DETAILS: {
			return {
				...state,
				user: action.payload
			};
			break;
		}
		case actions.LOGOUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};


export {
	actions,
	budgetDashboardReducer,
};