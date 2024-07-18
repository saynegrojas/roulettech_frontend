import '../styles/loading.css';

const Loading = () => {
  return (
    <>
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
      <p className='loader-status'>Loading...</p>
    </>
  );
};

export default Loading;
