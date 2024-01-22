// import { API } from 'api';
// const CashierURL = process.env.REACT_APP_CASHIER_API_URL;

// export const getInvoicesList = (data) => async (dispatch, getState) => {
// 	/**
// 	 * 1. In Segregator - To get particular salesmen/Delivery Persons all invoices
// 	 * 2. In Cashier - To get particular salesmen/Delivery Persons all invoices
// 	 */
// 	const { tab } = getState().invoice;
// 	const CREDENTIALS = {
// 		url: CashierURL,
// 		data: {
// 			action: 'invoicelist',
// 			search_info: '',
// 			tab,
// 		},
// 		method: 'post',
// 	};

// 	return API.common(CREDENTIALS).then((response) => response);
// };