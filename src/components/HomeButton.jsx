import { useHistory } from 'react-router-dom';
import HomeCircleOutline from 'mdi-react/HomeIcon';
import { Button } from './Button';

export const HomeButton = () => {
  const history = useHistory();

  const handleClick = () => history.push('/');

  return (
    <Button onClick={handleClick}>
      <HomeCircleOutline />
    </Button>
  );
};

export default HomeButton;
