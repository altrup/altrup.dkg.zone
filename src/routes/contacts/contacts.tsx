import { useEffect } from "react";

import setTitle from "../../helper-functions/setTitle";

function ContactsPage() {
	useEffect(() => setTitle('Contacts - Altrup'));
	
	return (
		<div>
			<h1>Contacts</h1>
		</div>
	);
}

export default ContactsPage;