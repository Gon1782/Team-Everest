import { registerSelector } from '@/common/utils/selector';
import * as S from '../Login/style/LoginTabStyled';

interface Props {
  name: string;
  value: string;
  check: boolean | RegExpMatchArray | null;
  dupCheck: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const RegisterInput = ({ name, value, check, dupCheck, onChange }: Props) => {
  const chosen = registerSelector(name, dupCheck);

  return (
    <>
      <S.LoginInputBox>
        <S.RegisterTitle>{chosen.title}</S.RegisterTitle>
        <S.MoreInfo>{chosen.info}</S.MoreInfo>
        <S.LoginInput
          tabIndex={chosen.tabIndex}
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
        />
      </S.LoginInputBox>
      <S.Warning
        style={{
          display: check ? 'none' : 'block',
        }}
      >
        {chosen.warning}
      </S.Warning>
      <S.Warning
        style={{
          display: check ? 'block' : 'none',
          visibility: !!value ? 'visible' : 'hidden',
          color: dupCheck ? 'lightgreen' : 'red',
        }}
      >
        {chosen.checkUse}
      </S.Warning>
    </>
  );
};

export default RegisterInput;
