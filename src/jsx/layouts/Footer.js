import React from "react";

const Footer = () => {
	var d = new Date();
	return (
		<div className="footer">
			<div className="copyright border-top">
				<p>Projetado e desenvolvipo por {" "}
					<a href="https://www.instagram.com/eliton.exe/" target="_blank"  rel="noreferrer">
						Eliton Souza
					</a>
					{" "}
					©
					{" "}
					{d.getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default Footer;
