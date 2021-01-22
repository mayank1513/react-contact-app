import UpdateContact from "../../../components/UpdateContact.tsx";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContact } from "../../../util/contacts";

export default () => {
  const router = useHistory();
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
