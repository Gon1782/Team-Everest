import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchModalState } from '@/recoil/atom/SearchModal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RecoilModal = () => {
  const [searchModal, setSearchModal] = useRecoilState(searchModalState);
  const [searcharea, setSearcharea] = useState('');
  const modalOpen = () => {
    setSearchModal(true);
  };
  const navigate = useNavigate();
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
    }
  };

  return (
    <div>
      {searchModal && (
        <SearchScreenWrapper>
          <SearchScreen>
            <button onClick={() => modalOpen}>X</button>
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
      )}
    </div>
  );
};

export default RecoilModal;

const SearchScreen = styled.div`
  width: 100%;
  height: 200px;
  background-color: #d6d6d6;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
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

const SearchIcon = styled(FaSearch)``;

const SearchForm = styled.form``;

const SearchInput = styled.input``;

const SearchButton = styled.button``;
