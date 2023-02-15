import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchArea = () => {
  // URL의 파라미터값 확인
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let getQuery = useQuery();

  // 현재 URL에서 name의 값 가져오기
  let searchKeyword = getQuery.get('name');

  return <div>{searchKeyword}</div>;
};

export default SearchArea;
