import styled from 'styled-components';

// 지역, 테마 셀렉트박스
const SelectBox = ({
  onChangeHandler,
  dataList,
  valueKey,
  width,
}: {
  onChangeHandler: any;
  dataList: any;
  valueKey: string;
  width: string;
}) => {
  return (
    <>
      <Select onChange={onChangeHandler} width={width}>
        <option defaultValue={valueKey}>{valueKey}</option>
        {dataList.length &&
          dataList.map((item: any, index: number) => {
            return (
              <option value={item['code']} key={index}>
                {item?.name}
              </option>
            );
          })}
      </Select>
    </>
  );
};

export default SelectBox;

const Select = styled.select<{ width: string }>`
  text-align: center;
  width: 100%;
  height: 40px;
  width: ${(props) => props.width};
  border: 0px;
  outline: none;
`;
