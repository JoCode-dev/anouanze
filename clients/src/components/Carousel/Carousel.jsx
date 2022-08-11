import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard, Pagination } from "swiper";
import { NavLink } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Redux Modules
import { useSelector } from "react-redux";

const Carousel = () => {
  const events = useSelector((state) => state.threeEvents);

  return (
    <div className="carousel-container">
      <div className="header-carousel">
        <NavLink to="/events">
          <h1>Évènements</h1>
        </NavLink>

        <NavLink to="/events" className="header-see-more">
          <h3>Voir +&nbsp;</h3>
          <img src={process.env.PUBLIC_URL + "/imgs/icons/arrow-right.png"} alt="arrow-right" />
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
          {events.length === 3 ? (
            events.map((event) => (
              <SwiperSlide key={event._id}>
                <NavLink to={`/event/${event._id}`}>
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
  );
};

export default Carousel;
