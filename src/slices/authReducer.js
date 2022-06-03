const actions = {
	SET_TOKEN: 'setToken',
	SET_USER_DETAILS: 'setUserDetails',
	LOGOUT: 'logout',
};

let initialState = {user: {}, token: '', authDetailsAvailable: false};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.SET_TOKEN: {
			return {
				...state,
				token: action.payload,
				authDetailsAvailable: true
			};
			console.log('setting authdetailsavailable to true');
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
	authReducer,
};