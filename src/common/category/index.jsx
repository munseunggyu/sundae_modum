import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CategoryCon = styled.article`
  max-width: 450px;
  margin: 0 auto;
  padding: 14px 12px;
  font-weight: 600;
  position: relative;
  ${Swiper} {
    display: flex;
  }
`;
const CategoryUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Category() {
  let [a, setA] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <CategoryCon>
      <Swiper slidesPerView={5} spaceBetween={30}>
        {a.map((v) => (
          <SwiperSlide>
            <button>{v} </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </CategoryCon>
  );
}
export default Category;
