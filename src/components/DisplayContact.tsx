import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getContact, removeContact, updateContact } from "../util/contacts";
import styles from "./DisplayContact.module.css";
import FavButton from "./FavButton";

export default function DisplayContact({ id }) {
  const [animClass, setAnimClass] = useState("");
  const [contact, setContact] = useState();
  useEffect(() => {
    getContact(id)
      .then((it) => setContact(it))
      .catch((err) => {});

    setTimeout(() => setAnimClass(styles.animClass), 50);
  }, [id]);
  const router = useRouter();
  return (
    <div>
      <header>
        <img
          onClick={() => {
            setAnimClass("");
            setTimeout(() => router.push("/"), 250);
          }}
          src="/arrow-back.svg"
          className="logo"
        />
        <span className="spacer"></span>
        <FavButton
          fav={contact && contact.favorite}
          onClick={() => {
            const newContact = { ...contact, favorite: !contact.favorite };
            updateContact(newContact).then(() => {
              setContact(newContact);
            });
          }}
        />
      </header>
      {contact && (
        <div className={styles.container + " " + animClass}>
          <img src="/person.svg" className={styles.avatar + " " + animClass} />
          <h1>{contact.name}</h1>
          <p>
            <a href={"mailto:" + contact.email}>{contact.email}</a>
          </p>
          {contact.phone && <p>{contact.phone}</p>}
          <div className={styles.btns + " " + animClass}>
            <button
              onClick={() => {
                setAnimClass("");
                setTimeout(
                  () => router.push(`/contacts/${contact.id}/update`),
                  250
                );
              }}
            >
              Edit Contact
            </button>
            <button
              onClick={() => {
                setAnimClass("");
                setTimeout(() => {
                  removeContact(contact.id);
                  router.push("/");
                }, 250);
              }}
            >
              Remove Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
