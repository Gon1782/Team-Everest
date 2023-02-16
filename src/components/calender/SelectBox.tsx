import React from 'react';

// 지역, 테마 셀렉트박스
const SelectBox = ({
  onChangeHandler,
  dataList,
  valueKey,
}: {
  onChangeHandler: any;
  dataList: any;
  valueKey: string;
}) => {
  return (
    <select onChange={onChangeHandler}>
      <option defaultValue="선택">선택</option>
      {dataList.length &&
        dataList.map((item: any, index: number) => {
          return (
            <>
              <option value={item[valueKey]} key={index}>
                {item?.name}
              </option>
            </>
          );
        })}
    </select>
  );
};

export default SelectBox;
