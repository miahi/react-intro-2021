import { useHistory } from 'react-router-dom';
import ArrowBackIcon from 'mdi-react/ArrowBackIcon';
import { Button } from './Button';

export const BackButton = () => {
  const history = useHistory();

  const handleClick = () => history.goBack(1);

  return (
    <Button onClick={handleClick}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackButton;
