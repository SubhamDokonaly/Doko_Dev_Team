import "./Loader.css";
import Dokologo from './dokologo.png';

const SpinnerLoader = () => {
  return (
    <div>
      <div className="loader-container">
        <img src={Dokologo} className="rotate" alt="Loader"/>
      </div>
    </div>
  )
}
export default SpinnerLoader;
