import Topbar from "../components/Topbar";
import Diet from '../components/diet/Index'

export default () => {
  

  return (
    <div>
      <Topbar />
      <div className="pt-20 px-6">
        <Diet />
      </div>
    </div>
  );
}
