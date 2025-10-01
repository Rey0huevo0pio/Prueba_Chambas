
const DangerPictogram = ({ children, selected, onClick }) => {
  return (
    <button
      type="button"
      className={`text-4xl p-3 rounded-lg border-2 ${selected ? 'border-error bg-error/10' : 'border-base-300'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DangerPictogram;