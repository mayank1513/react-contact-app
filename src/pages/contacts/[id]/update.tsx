import UpdateContact from "../../../components/UpdateContact.tsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getContact } from "../../../util/contacts";

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState();
  useEffect(() => {
    getContact(id).then((ct) => setContact(ct));
  }, [id]);

  return (
    <main className="main">
      {contact && <UpdateContact contact={contact} />}
    </main>
  );
};
