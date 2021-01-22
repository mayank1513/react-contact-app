import DisplayContact from "../../components/DisplayContact";

import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <main className="main">
      <DisplayContact id={id} />
    </main>
  );
};
