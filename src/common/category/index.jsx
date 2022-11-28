import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CategoryCon = styled.article`
  max-width: 450px;
  margin: 0 auto;
  padding: 14px 18px;
  font-weight: 600;
  position: relative;
  text-align: center;
`;
const CategorySpan = styled.span`
  font-size: 14px;
  color: ${(props) => (props.changeColor ? 'black' : '#dbdbdb')};
  cursor: pointer;
`;
function Category() {
  const [select, setSelect] = useState('치킨');
  const categoryList = [
    '치킨',
    '중식',
    '패스트푸드',
    '양식',
    '돈까스',
    '회',
    '고기',
    '분식',
    '카페',
  ];
  const selectCategory = (e) => {
    setSelect(e.target.textContent);
  };
  return (
    <CategoryCon>
      <Swiper slidesPerView={6} spaceBetween={0}>
        {categoryList.map((category, i) => (
          <SwiperSlide>
            <CategorySpan
              onClick={selectCategory}
              changeColor={select === category ? true : false}
            >
              {category}
            </CategorySpan>
          </SwiperSlide>
        ))}
      </Swiper>
    </CategoryCon>
  );
}
export default Category;
