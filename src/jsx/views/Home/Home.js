import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
//import {NavLink} from 'react-router-dom';
//import loadable from "@loadable/component";
//import pMinDelay from "p-min-delay";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import BannerSlider from './BannerSlider';
import CategorySlider from './CategorySlider';
import PopularDishesSlider from './PopularDishesSlider';
import RecentOrderSlider from './RecentOrderSlider';
import Carrinho from '../Produto/carrinho';


const Home = () => {

	const { changeBackground } = useContext(ThemeContext);

	 useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	 }, []);
		
	
	return(
		<>
			<div className="row">
				<div className="col-xl-8 col-xxl-7">
					<div className="row">
						<div className="col-xl-12">
							<BannerSlider />
						</div>

						<div className="col-xl-12">
							<div className="d-flex align-items-center justify-content-between mb-2 gap">
								<h4 className=" mb-0 cate-title">Categorias</h4>
								<Link to="/favorite-menu" className="text-primary">View all <i className="fa-solid fa-angle-right ms-2"></i></Link>
							</div>
							<CategorySlider />
						</div>	
						<div className="col-xl-12">
							<div className="d-flex align-items-center justify-content-between mb-2">
								<h4 className=" mb-0 cate-title">Popular Dishes</h4>
								<Link to="/favorite-menu" className="text-primary">View all <i className="fa-solid fa-angle-right ms-2"></i></Link>
							</div>
							<PopularDishesSlider />
						</div>
						<div className="col-xl-12">
							<div className="d-flex align-items-center justify-content-between mb-2">
								<h4 className=" mb-0 cate-title">Recent Order</h4>
								<Link to="/favorite-menu" className="text-primary">View all <i className="fa-solid fa-angle-right ms-2"></i></Link>
							</div>
							<RecentOrderSlider />
						</div>
					</div>	
				</div>

				<div className="col-xl-4 col-xxl-5">
					<Carrinho />
				</div>
				
			</div>
		</>
	)
}
export default Home;