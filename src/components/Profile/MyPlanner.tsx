import { Document } from '@/types/DetailType';
import { useNavigate } from 'react-router-dom';

const MyPlanner = ({ user }: { user: Document }) => {
  const navigate = useNavigate();

  const moveToMyPlan = (item: any, index: number) => {
    navigate(`/planner/${user['uid']}/${index}`);
  };
  return (
    <div>
      {!!user &&
        user['myPlanner']?.map((item: any, index: number) => {
          return (
            <div onClick={() => moveToMyPlan(item, index)}>{item?.name}</div>
          );
        })}
    </div>
  );
};

export default MyPlanner;
