import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className={"container"}>
      <Component {...pageProps} />
      <footer className="footer">
        <a
          href="https://mayank-chaudhari.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Mayank Chaudhari
        </a>
      </footer>
    </div>
  );
}

export default MyApp;
