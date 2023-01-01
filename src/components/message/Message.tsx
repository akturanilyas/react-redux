import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Direction, ListItem } from '@mui/material';
import React from 'react';
import { MessageDirection } from '../../enums/messageDirection';
import { getTime } from '../../helpers/timeHelper';

interface MessageProps {
  userName: string;
  text: string;
  time: Date;
  direction: string;
}

export const Message = (props: MessageProps) => {
  const { text, userName, time, direction } = props;
  let optionsClass = 'flex flex-col justify-evenly';
  let dir: Direction = 'ltr';

  let messageStyle: React.CSSProperties = {
    textAlign: direction !== MessageDirection.OUTBOUND ? 'end' : undefined,
    fontSize: '14px',
    backgroundColor: direction !== MessageDirection.OUTBOUND ? 'green' : 'blue',
  };

  if (direction === MessageDirection.OUTBOUND) {
    messageStyle = {
      textAlign: direction !== MessageDirection.OUTBOUND ? 'end' : undefined,
      fontSize: '14px',
      backgroundColor: direction !== MessageDirection.OUTBOUND ? 'green' : 'grey',
    };
    optionsClass += ' mr-2';
    dir = 'rtl';
  } else {
    optionsClass += ' ml-2';
  }

  return (
    <div style={{ direction: dir }}>
      <div className={'flex w-1/2'}>
        <div>
          <ListItem style={messageStyle} className={'border rounded-2xl'}>
            <span>{text}</span>
            <div className={optionsClass}>
              <ArrowDropDownIcon />
              <span className={'self-end'} children={getTime(time)}></span>
            </div>
          </ListItem>
        </div>
      </div>
    </div>
  );
};
