const BASE_URL = "http://localhost:3000";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			singleContact: {}
			//Your data structures, A.K.A Entities
		},
		actions: {
			fetchContacts: async (id = null) => {
				let url = BASE_URL + "/contacts";
				if (id != null) {
					url += "/" + id;
				}
				let response = await fetch(url);
				if (response.ok) {
					let body = await response.json();
					if (id == null) {
						setStore({
							contacts: body
						});
					} else {
						setStore({ singleContact: body });
					}
					return true;
				} else {
					console.log(response.status);
					return false;
				}
			},
			deleteContact: async id => {
				let actions = getActions();
				let url = BASE_URL + "/contacts/" + id;
				let response = await fetch(url, {
					method: "DELETE"
				});
				if (response.ok) {
					await actions.fetchContacts();
					return true;
				} else {
					console.log(response.status);
					return false;
				}
			}

			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
