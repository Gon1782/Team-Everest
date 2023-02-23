import styled from 'styled-components';
import { MdOutlineAddLocation } from 'react-icons/md';

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
    <>
      <MdOutlineAddLocation
        style={{ width: 40, height: 40 }}
      ></MdOutlineAddLocation>
      <Select onChange={onChangeHandler} style={{ border: '0px solid' }}>
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
      </Select>
    </>
  );
};

export default SelectBox;

const Select = styled.select`
  width: 100%;
  height: 40px;
`;
