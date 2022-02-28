import './style.less';

const Spinner = ({ loading }) =>
  loading && (
    <div className="spinner-wrapper">
      <div className="spinner" />
    </div>
  );

export default Spinner;
