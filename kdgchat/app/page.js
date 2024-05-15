import Image from "next/image";
import styles from "./page.module.css"; 
import Chat from "/workspaces/codespaces-nextjs/components/chat/chat.js";  

export default function Home() {
  return (
    <main className={styles.main}>  {}
      <div className="container-md mb-3">
        <h1>Home</h1>
        <Chat />  {}
      </div>
    </main>
  );
}
