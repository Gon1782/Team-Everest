import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import styled from 'styled-components';

interface Props {
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const SearchModal = ({ closeModal, closeModalIfClickOutside }: Props) => {
  // 리뷰 등록 모달

  const menuRef = useRef<HTMLDivElement>(null);
  // 검색창 키워드
  const [searcharea, setSearcharea] = useState('');
  const navigate = useNavigate();

  // 검색창 토글 외부 영역 클릭시 창 닫기

  const modalOpen = () => {};

  // 모달창 오픈시, 스크롤 방지

  // useEffect(() => {
  //   document.body.style.cssText = `
  //     position: fixed;
  //     top: -${window.scrollY}px;
  //     overflow-y: scroll;
  //     width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = '';
  //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  //   };
  // }, [isMenuToggled]);

  // 검색창 키워드 입력시 검색 결과 페이지 이동
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (searcharea.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    } else {
      console.log(searcharea);
      navigate(`/searcharea?name=${searcharea}`);
      setSearcharea('');
      closeModal();
    }
  };
  return (
    <div>
      <SearchScreenWrapper onClick={(e) => closeModalIfClickOutside(e)}>
        <SearchScreen>
          <div onClick={(e) => closeModalIfClickOutside(e)}>X</div>
          <SearchForm onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="지역명 검색"
              onChange={(event) => setSearcharea(event.target.value)}
              value={searcharea}
            ></SearchInput>
            <SearchButton>검색</SearchButton>
          </SearchForm>
        </SearchScreen>
      </SearchScreenWrapper>
    </div>
  );
};

export default SearchModal;

const SearchScreen = styled.div`
  width: 100%;
  height: 200px;
  background-color: #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
  /* z-index: 999; */
`;

const SearchScreenWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SearchForm = styled.form``;

const SearchInput = styled.input``;

const SearchButton = styled.button``;
