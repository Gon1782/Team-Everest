import React, { useEffect, useRef, useState } from 'react';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { db } from '../../common/api/firebase';
import { Link, useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import useDebounce from '../../hooks/useDebounce';

export interface Props {
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const CityList = ({ data, closeModal }: any): any => {
  if (!data) return;

  return (
    <CityItems>
      {Object.keys(data).map((i) =>
        data[i].areaCode && data[i].sigunguCode ? (
          <CityItemLink
            to={`citydetail/${data[i].areaCode}/${data[i].sigunguCode}`}
            key={data[i].mapx}
            onClick={() => closeModal()}
          >
            <CityItem>{data[i].name}</CityItem>
          </CityItemLink>
        ) : (
          <CityItemLink
            to={`citydetail/${data[i].areaCode}`}
            key={data[i].mapx}
            onClick={() => closeModal()}
          >
            <CityItem>{data[i].name}</CityItem>
          </CityItemLink>
        ),
      )}
    </CityItems>
  );
};

const SearchModal = ({ closeModal, closeModalIfClickOutside }: Props) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<any>(null);

  const debounceValue = useDebounce(search);

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

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
          <SearchForm onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="지역을 검색해주세요."
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            ></SearchInput>
            <SearchIcon />
          </SearchForm>
          <SearchCityWrapper>
            {search ? <CityList data={data} closeModal={closeModal} /> : ''}
          </SearchCityWrapper>
        </SearchScreen>
      </SearchScreenWrapper>
    </div>
  );
};

export default SearchModal;

const SearchScreenWrapper = styled.div`
  position: fixed;
  top: 65px;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 888;
`;

const SearchScreen = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.blue};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
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
  display: fixed;
  margin-top: 80px;
`;

const SearchInput = styled.input`
  color: white;
  outline: none;
  width: 300px;
  background-color: transparent;
  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchIcon = styled(BiSearch)`
  color: ${(props) => props.theme.dimgrey};
  font-size: 20px;
  margin-bottom: -5px;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.dimgrey};
    color: ${(props) => props.theme.darkblue};
  }
`;

// 자동완성 도시 태그

const SearchCityWrapper = styled.div`
  height: auto;
  width: 326px;
`;

const CityItems = styled.ul`
  width: 100%;
`;

const CityItemLink = styled(Link)`
  text-decoration: none;
  color: #222;
`;

const CityItem = styled.li`
  width: 100%;
  height: 26px;
  line-height: 26px;
  padding-left: 8px;
  background-color: #f2f2f2;
  margin-bottom: 2px;
`;
