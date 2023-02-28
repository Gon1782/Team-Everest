import { auth } from '@/common/api/firebase';
import { emailRegex } from '@/common/utils/validations';
import useInput from '@/hooks/useInput';
import { sendPasswordResetEmail } from 'firebase/auth';
import * as S from './style/LoginTabStyled';

interface Props {
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const PasswordResetModal = ({
  closeModal,
  closeModalIfClickOutside,
}: Props) => {
  const [email, onChangeEmail] = useInput('');

  const emailCheck = !email || email.match(emailRegex);

  const ResetPassword = () => {
    if (!emailCheck) return;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('발송완료! 이메일을 확인해주세요!');
        closeModal();
      })
      .catch((error) => {
        return alert(
          '이메일이 없습니다.\n이메일로 가입한 회원만 이용가능합니다.',
        );
      });
  };

  return (
    <S.ModalContainer onClick={(e) => closeModalIfClickOutside(e)}>
      <S.ModalBox width="600px" height="300px" jc="space-evenly" ai="center">
        <S.PasswordCheckTitle>이메일을 입력해주세요</S.PasswordCheckTitle>
        <S.PasswordDiv>
          <S.EmailInput
            type="text"
            value={email}
            onChange={(e) => onChangeEmail(e)}
          />
          <S.Warning
            style={{
              visibility: emailCheck ? 'hidden' : 'visible',
            }}
          >
            ※ 이메일 형식에 맞게 입력해주세요.
          </S.Warning>
        </S.PasswordDiv>
        <S.PasswordCheckBtnBox>
          <S.PasswordCheckBtn color="lightgray" onClick={() => ResetPassword()}>
            발송
          </S.PasswordCheckBtn>
        </S.PasswordCheckBtnBox>
      </S.ModalBox>
    </S.ModalContainer>
  );
};

export default PasswordResetModal;
