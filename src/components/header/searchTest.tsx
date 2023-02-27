import React, { useState, useEffect } from 'react';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { FaSearch } from 'react-icons/fa';
import { db } from '../../common/api/firebase';
import { useLocation } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

const CityList = ({ data }: any): any => {
  if (!data) return;

  return (
    <>
      {Object.keys(data).map((i) => (
        <div key={i}>{data[i].name}</div>
      ))}
    </>
  );
};

const SearchTest = () => {
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
  // console.log(data);
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
      <form>
        <input
          type="text"
          placeholder="지역 검색"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button
          type="submit"
          style={{ border: 'none', backgroundColor: 'transparent' }}
        >
          <FaSearch />
        </button>
        {search ? <CityList data={data} /> : ''}
      </form>
    </div>
  );
};

export default SearchTest;
