import React, { useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard, Pagination } from "swiper";
import { NavLink } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//Actions
import { getPremiumEvents } from "../../actions/event";

// Import Redux Modules
import { useSelector, useDispatch } from "react-redux";

// Import tools
import { isEmpty } from "../utils";

const Carousel = () => {
  const events = useSelector((state) => state.premiumEvents);

  useEffect(() => {
    dispatch(getPremiumEvents());
    console.log("====================================");
    console.log(events);
    console.log("====================================");
  }, []);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const requireAuth = () => {
    return isEmpty(user) ? "/login" : "/events";
  };

  const requireAuthV2 = (id) => {
    return isEmpty(user) ? "/login" : `/event/${id}`;
  };

  return (
    <>
      <div className="carousel-container">
        <div className="header-carousel">
          <NavLink to={requireAuth()}>
            <h1>Évènements</h1>
          </NavLink>

          <NavLink to={requireAuth()} className="header-see-more">
            <h3>Voir +&nbsp;</h3>
            <img
              src={process.env.PUBLIC_URL + "/imgs/icons/arrow-right.png"}
              alt="arrow-right"
            />
          </NavLink>
        </div>
        <div className="swiper-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            keyboard={true}
            modules={[Autoplay, Pagination, Navigation, Keyboard]}
          >
            {events.length >= 1 ? (
              events.map((event) => (
                <SwiperSlide key={event._id}>
                  <NavLink to={requireAuthV2(event._id)}>
                    <img src={event.poster} alt="" width="1310vh" />
                  </NavLink>
                </SwiperSlide>
              ))
            ) : (
              <>
                <SwiperSlide>
                  <img src="./uploads/events/default-event.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="./uploads/events/default-event.jpg" alt="" />
                </SwiperSlide>
              </>
            )}
          </Swiper>
        </div>
      </div>
      <div className="purple-band"></div>
    </>
  );
};

export default Carousel;
