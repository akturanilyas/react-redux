interface MessageProps {
  userName: string;
  text: string;
  time: Date;
  direction: string;
}

export const Message = (props: MessageProps) => {
  return (
    <>
      <div className="border w-auto">
        <div className="row" style={{ direction: 'ltr' }}>
          <span>{props.userName}</span>
        </div>
        <div className="row">
          <span>{props.text}</span>
        </div>
        <div className="row">
          <span>{props.time.toString()}</span>
        </div>
      </div>
    </>
  );
};
