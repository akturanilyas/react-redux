import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

interface ChatElementProps {
  avatar: string;
  fullName: string;
  text: string;
}

export const ChatElement = (props: ChatElementProps) => {
  return (
    <Box className={'border-2 rounded p-2 col-12 m-1'}>
      <div className="row">
        <div className="col-3">
          <Avatar>{props.avatar}</Avatar>
        </div>
        <div className="col-9">
          <div className="row">
            <h1>{props.fullName}</h1>
          </div>
          <div className="row">
            <span>{props.text}</span>
          </div>
        </div>
      </div>
    </Box>
  );
};
