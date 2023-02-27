import React, { useEffect, useRef, useState } from 'react';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { db } from '../../common/api/firebase';
import { useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import useDebounce from '../../hooks/useDebounce';

interface Props {
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const CityList = ({ data }: any): any => {
  if (!data) return;

  return (
    <>
      {Object.keys(data).map((i) => (
        <li key={i}>{data[i].name}</li>
      ))}
    </>
  );
};

const SearchModal = ({ closeModal, closeModalIfClickOutside }: Props) => {
  // 리뷰 등록 모달

  const menuRef = useRef<HTMLDivElement>(null);
  // 검색창 키워드
  const [searcharea, setSearcharea] = useState('');
  const navigate = useNavigate();

  // 검색창 토글 외부 영역 클릭시 창 닫기

  const modalOpen = () => {};

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
  // -----------------------------------
  const [search, setSearch] = useState('');
  // const [data, setData] = useState<any>({});
  const [data, setData] = useState<any>(null);

  const debounceValue = useDebounce(search);

  // 도시 데이터 가져오기
  const searchCityRequest = async () => {
    const q = query(
      collection(db, 'cities'),
      where('name', '>=', search),
      where('name', '<=', search + '\uf8ff'),
    );

    const querySnapshot = await getDocs(q);

    const searchItem: any[] = [];
    querySnapshot.docs.forEach((doc) => {
      searchItem.push({ id: doc.id, ...doc.data() });
    });

    setData(searchItem);

    return searchItem;
  };

  useEffect(() => {
    const searchCityRequest = async () => {
      const q = query(
        collection(db, 'cities'),
        where('name', '>=', search),
        where('name', '<=', search + '\uf8ff'),
      );

      const querySnapshot = await getDocs(q);

      const searchItem: any[] = [];
      querySnapshot.docs.forEach((doc) => {
        searchItem.push({ id: doc.id, ...doc.data() });
      });

      setData(searchItem);

      return searchItem;
    };
    if (debounceValue) {
      searchCityRequest();
    }
  }, [debounceValue]);

  return (
    <div>
      <SearchScreenWrapper onClick={(e) => closeModalIfClickOutside(e)}>
        <SearchScreen>
          <CloseIconWrapper onClick={() => closeModal()}>
            <CloseIcon />
          </CloseIconWrapper>
          {/* <SearchForm onSubmit={handleSubmit}> */}
          <SearchForm onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="지역을 검색해주세요."
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            ></SearchInput>
            <SearchIcon />
          </SearchForm>
          {search ? <CityList data={data} /> : ''}
        </SearchScreen>
      </SearchScreenWrapper>
    </div>
  );
};

export default SearchModal;

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

const SearchScreen = styled.div`
  width: 100%;
  height: 200px;
  background-color: #256492;
  display: flex;
  justify-content: center;
  align-items: center;
  /* z-index: 999; */
  position: relative;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 300px;
  color: #fff;
`;

const SearchForm = styled.form`
  border-bottom: 1px solid white;
  padding: 5px;
`;

const SearchInput = styled.input`
  color: white;
  outline: none;
  width: 300px;
  background-color: transparent;
  /* border-bottom: 1px solid white; */
  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchIcon = styled(FaSearch)`
  color: white;
  cursor: pointer;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 20px;
  cursor: pointer;
`;
