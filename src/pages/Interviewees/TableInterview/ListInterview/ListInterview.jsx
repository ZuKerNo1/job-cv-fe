import Interviewer from './Interview/Interview';

const ListInterviewer = ({ listInterview, onReload }) => {
  return (
    <tbody>
      {listInterview.map((interview, index) => (
        <Interviewer
          key={interview._id}
          interviewer={interview}
          order={index + 1}
          onReload={onReload}
        />
      ))}
    </tbody>
  );
};
export default ListInterviewer;
