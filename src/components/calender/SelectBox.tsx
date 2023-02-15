import React from 'react';

const SelectBox = ({
  onChangeHandler,
  dataList,
  valueKey,
}: {
  onChangeHandler: any;
  dataList: any;
  valueKey: string;
}) => {
  console.log(valueKey);
  return (
    <select onChange={onChangeHandler}>
      <option defaultValue="선택">선택</option>
      {dataList.length &&
        dataList.map((item: any, index: number) => {
          console.log(item);
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
