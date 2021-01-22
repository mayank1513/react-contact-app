import DisplayContact from "../../components/DisplayContact";

import { useHistory } from "react-router-dom";

export default () => {
  const router = useHistory();
  const { id } = router.query;
  return (
    <main className="main">
      <DisplayContact id={id} />
    </main>
  );
};
